import type { CircuitData } from './kicadSkidlGenerator';

export type EvidenceStatus = 'USER PROVIDED' | 'VERIFIED' | 'ASSUMPTION' | 'RECOMMENDATION' | 'REQUIRES CONFIRMATION';
export type FindingSeverity = 'error' | 'warning' | 'pass';

export interface EngineeringRequirement {
  name: string;
  value: string;
  status: EvidenceStatus;
}

export interface EngineeringDecision {
  title: string;
  reason: string;
  constraint: string;
  status: EvidenceStatus;
}

export interface ValidationFinding {
  id: string;
  severity: FindingSeverity;
  title: string;
  detail: string;
  recommendation?: string;
}

export interface AgentActivity {
  label: string;
  status: 'completed' | 'attention';
  detail: string;
}

export interface EngineeringProjectState {
  requirements: EngineeringRequirement[];
  unresolvedQuestions: string[];
  decisions: EngineeringDecision[];
  validation: ValidationFinding[];
  activity: AgentActivity[];
}

function contains(prompt: string, ...terms: string[]) {
  return terms.some(term => prompt.includes(term));
}

/**
 * Local, deterministic requirement pass. It intentionally makes no claims that
 * need a datasheet or supplier API; those remain assumptions or confirmations.
 */
export function extractRequirements(prompt: string): Pick<EngineeringProjectState, 'requirements' | 'unresolvedQuestions'> {
  const normalized = prompt.toLowerCase();
  const requirements: EngineeringRequirement[] = [];
  const unresolvedQuestions: string[] = [];

  const voltage = normalized.match(/\b(\d+(?:\.\d+)?)\s*v\b/);
  if (voltage) requirements.push({ name: 'Input voltage', value: `${voltage[1]}V`, status: 'USER PROVIDED' });
  else unresolvedQuestions.push('What is the input voltage and power source?');

  if (contains(normalized, 'esp32')) {
    requirements.push({ name: 'Controller', value: 'ESP32 family', status: 'USER PROVIDED' });
    requirements.push({ name: 'Logic rail', value: '3.3V required by the design intent', status: 'RECOMMENDATION' });
    requirements.push({ name: 'Communication', value: 'Wi-Fi', status: 'VERIFIED' });
  }

  if (contains(normalized, 'temperature', 'thermal')) {
    requirements.push({ name: 'Sensing function', value: 'Temperature measurement', status: 'USER PROVIDED' });
    unresolvedQuestions.push('What accuracy and operating-temperature range are required?');
    unresolvedQuestions.push('Which sensor package and interface are preferred?');
  }

  if (contains(normalized, 'i2c', 'i²c')) requirements.push({ name: 'Communication bus', value: 'I²C', status: 'USER PROVIDED' });
  if (contains(normalized, 'wifi', 'wi-fi')) requirements.push({ name: 'Communication', value: 'Wi-Fi', status: 'USER PROVIDED' });

  unresolvedQuestions.push('What PCB dimensions and target production quantity are required?');
  unresolvedQuestions.push('What is the maximum load current and cost target?');

  return { requirements, unresolvedQuestions: [...new Set(unresolvedQuestions)] };
}

/** Deterministic topology checks. They are architecture checks, not a KiCad DRC or SPICE result. */
export function validateCircuit(circuit: CircuitData): ValidationFinding[] {
  const findings: ValidationFinding[] = [];
  const netNames = new Set(circuit.nets.map(net => net.name.toUpperCase()));
  const allConnections = circuit.nets.flatMap(net => net.connections);
  const connectedRefs = new Set(allConnections.map(connection => connection.split('-')[0]));

  if (!netNames.has('GND')) {
    findings.push({ id: 'ground', severity: 'error', title: 'No ground net is defined', detail: 'The architecture has no GND reference net.', recommendation: 'Add a GND net and connect every powered circuit block to it.' });
  } else {
    findings.push({ id: 'ground', severity: 'pass', title: 'Ground reference present', detail: 'A GND net is defined in the circuit graph.' });
  }

  const powerNets = circuit.nets.filter(net => net.type === 'power');
  if (powerNets.length === 0) {
    findings.push({ id: 'power', severity: 'error', title: 'No power rail is defined', detail: 'The circuit graph contains no net marked as a power rail.', recommendation: 'Define the input and regulated power rails before export.' });
  } else {
    findings.push({ id: 'power', severity: 'pass', title: 'Power rail present', detail: `${powerNets.map(net => net.name).join(', ')} is marked as a power rail.` });
  }

  circuit.components.filter(component => !connectedRefs.has(component.id)).forEach(component => {
    findings.push({ id: `unconnected-${component.id}`, severity: 'warning', title: `${component.id} is not connected`, detail: `${component.name} does not appear in any net connection.`, recommendation: 'Connect the required pins or remove the unused component.' });
  });

  const regulator = circuit.components.find(component => /buck|regulator|tps54331|ams1117|7805/i.test(`${component.name} ${component.type}`));
  if (regulator && /TPS54331/i.test(`${regulator.name} ${regulator.type}`)) {
    const enConnected = allConnections.some(connection => connection === `${regulator.id}-EN`);
    if (!enConnected) findings.push({ id: 'enable', severity: 'warning', title: `${regulator.id} enable pin needs review`, detail: 'The generated topology does not connect the TPS54331 EN pin.', recommendation: 'Connect EN to a valid enable source or VIN through the manufacturer-recommended network.' });
  }

  const esp32 = circuit.components.find(component => /ESP32/i.test(`${component.name} ${component.type}`));
  if (esp32) {
    const has3v3 = [...netNames].some(name => /3V3|3\.3V/.test(name));
    if (!has3v3) findings.push({ id: 'esp32-rail', severity: 'error', title: 'ESP32 3.3V rail is missing', detail: 'An ESP32 component is present but no 3.3V power net was found.', recommendation: 'Add a regulated 3.3V rail before connecting the ESP32 supply pins.' });
  }

  if (!findings.some(finding => finding.severity === 'warning' || finding.severity === 'error')) {
    findings.push({ id: 'topology', severity: 'pass', title: 'Topology checks passed', detail: 'The available architecture checks found no missing power, ground, or unconnected components.' });
  }
  return findings;
}

export function buildEngineeringState(prompt: string, circuit: CircuitData): EngineeringProjectState {
  const { requirements, unresolvedQuestions } = extractRequirements(prompt);
  const validation = validateCircuit(circuit);
  const regulator = circuit.components.find(component => /buck|regulator|tps54331|ams1117|7805/i.test(`${component.name} ${component.type}`));
  const decisions: EngineeringDecision[] = regulator ? [{
    title: `${regulator.id}: ${regulator.name}`,
    reason: 'Selected by the current circuit architecture.',
    constraint: 'Verify electrical limits, compensation, thermal design, and footprint against the manufacturer datasheet before fabrication.',
    status: 'REQUIRES CONFIRMATION'
  }] : [];

  const issueCount = validation.filter(finding => finding.severity !== 'pass').length;
  return {
    requirements,
    unresolvedQuestions,
    decisions,
    validation,
    activity: [
      { label: 'Requirement analyzer', status: 'completed', detail: `${requirements.length} captured; ${unresolvedQuestions.length} need confirmation.` },
      { label: 'Circuit graph', status: 'completed', detail: `${circuit.components.length} components and ${circuit.nets.length} nets structured.` },
      { label: 'Topology validator', status: issueCount ? 'attention' : 'completed', detail: issueCount ? `${issueCount} item(s) require review.` : 'No topology issues found.' }
    ]
  };
}
