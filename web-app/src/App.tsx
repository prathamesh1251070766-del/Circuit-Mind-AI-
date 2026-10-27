import { useState, useRef, useEffect } from 'react';
import { Cpu, User, LayoutGrid, Bot, AlertTriangle, CheckCircle2, CircleDashed, Zap, Activity, DollarSign, Package, Shuffle, X, Layers, Maximize, Eye, ClipboardList, Download, ShieldCheck, XCircle, Play, LineChart, PlayCircle, Database, UploadCloud, FileText, Server, BookOpen, FileCode2, Sparkles, Search, Settings, ExternalLink, RefreshCw } from 'lucide-react';
import KicadWorkspace from './components/KicadWorkspace';
import circuitMindLogo from './assets/circuitmind-logo.png';
import { buildEngineeringState, type EngineeringProjectState } from './utils/engineeringAgent';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface Constraints {
  known: { name: string; value: string }[];
  missing: string[];
}

interface ComponentIntelligence {
  price: string;
  stock: string;
  supplier: string;
  specs: { [key: string]: string };
  alternatives: string[];
}

interface CircuitComponent {
  id: string;
  name: string;
  type: string;
  pins: string[];
  intelligence?: ComponentIntelligence;
}

interface CircuitNet {
  name: string;
  type: 'power' | 'gnd' | 'signal';
  connections: string[];
}

interface CircuitData {
  components: CircuitComponent[];
  nets: CircuitNet[];
}

function generateBuiltinCircuit(prompt: string): string | null {
  const p = prompt.toLowerCase();

  // Voltage divider
  if (p.includes('divider') || (p.includes('convert') && (p.includes('3.3') || p.includes('5v'))) || (p.includes('voltage') && p.includes('3.3'))) {
    return `I have designed a precision resistive voltage divider converting **5V to ~3.24V - 3.3V** using standard E24 1% tolerance resistors.

- **R1 (Top Resistor)**: 1.8 kΩ (0805, 1%) from VIN to VOUT_3V3
- **R2 (Bottom Resistor)**: 3.3 kΩ (0805, 1%) from VOUT_3V3 to GND
- **C1 (Decoupling Filter)**: 100 nF capacitor across VOUT_3V3 and GND to eliminate noise
- **Transfer Function**: $V_{out} = V_{in} \\times \\frac{R_2}{R_1 + R_2} = 5V \\times \\frac{3.3}{1.8 + 3.3} \\approx 3.235V$ (within 2% of 3.3V)
- **Quiescent Current**: $\\approx 0.98\\text{ mA}$ at 5V input.

You can inspect the architecture, view the schematic layout, check BOM pricing, and export to KiCad / SKiDL!

<constraints>
{
  "known": [
    {"name": "Input Voltage (Vin)", "value": "5V"},
    {"name": "Target Output Voltage", "value": "3.3V"},
    {"name": "Calculated Output", "value": "3.235V"},
    {"name": "Divider Ratio", "value": "0.647"}
  ],
  "missing": [
    "Maximum Output Load Current / Impedance",
    "Resistor Power Rating (Standard 1/8W 0805 used)",
    "Output Voltage Tolerance"
  ]
}
</constraints>

<circuit>
{
  "components": [
    {
      "id": "R1", 
      "name": "RC0805FR-071K8L", 
      "type": "1.8kΩ Resistor (0805, 1%)", 
      "pins": ["1", "2"],
      "intelligence": {
        "price": "$0.04",
        "stock": "In Stock (120,000+)",
        "supplier": "Yageo / DigiKey",
        "specs": {
          "Resistance": "1.8 kΩ",
          "Tolerance": "±1%",
          "Power Rating": "125 mW",
          "Package": "0805 (2012 Metric)"
        },
        "alternatives": ["ERJ-6ENF1801V", "CRCW08051K80FKEA"]
      }
    },
    {
      "id": "R2", 
      "name": "RC0805FR-073K3L", 
      "type": "3.3kΩ Resistor (0805, 1%)", 
      "pins": ["1", "2"],
      "intelligence": {
        "price": "$0.04",
        "stock": "In Stock (150,000+)",
        "supplier": "Yageo / DigiKey",
        "specs": {
          "Resistance": "3.3 kΩ",
          "Tolerance": "±1%",
          "Power Rating": "125 mW",
          "Package": "0805 (2012 Metric)"
        },
        "alternatives": ["ERJ-6ENF3301V", "CRCW08053K30FKEA"]
      }
    },
    {
      "id": "C1", 
      "name": "GRM188R71H104KA93D", 
      "type": "100nF Filter Cap (0603, 50V)", 
      "pins": ["1", "2"],
      "intelligence": {
        "price": "$0.06",
        "stock": "In Stock (80,000+)",
        "supplier": "Murata / Mouser",
        "specs": {
          "Capacitance": "100 nF (0.1 µF)",
          "Voltage Rating": "50V",
          "Dielectric": "X7R",
          "Package": "0603"
        },
        "alternatives": ["CC0603KRX7R9BB104", "CL10B104KB8NNNC"]
      }
    }
  ],
  "nets": [
    {"name": "VIN", "type": "power", "connections": ["R1-1"]},
    {"name": "VOUT_3V3", "type": "power", "connections": ["R1-2", "R2-1", "C1-1"]},
    {"name": "GND", "type": "gnd", "connections": ["R2-2", "C1-2"]}
  ]
}
</circuit>`;
  }

  // Buck converter / TPS54331
  if (p.includes('tps54331') || p.includes('buck') || p.includes('step-down') || (p.includes('5v') && p.includes('converter'))) {
    return `I have designed a 5V buck converter using the TPS54331. I've placed the main IC, the inductor, and the necessary capacitors. You can now use the workspaces on the left to view the Layout, BOM, Validation, and run SPICE Simulations!
        
<constraints>
{
  "known": [{"name": "Output Voltage", "value": "5V"}, {"name": "IC", "value": "TPS54331"}],
  "missing": ["Max Input Voltage", "Target Output Current", "Ripple Requirement"]
}
</constraints>

<circuit>
{
  "components": [
    {
      "id": "U1", 
      "name": "TPS54331", 
      "type": "Buck Converter IC", 
      "pins": ["BOOT", "VIN", "EN", "SS", "VSENSE", "COMP", "GND", "PH"],
      "intelligence": {
        "price": "$1.42",
        "stock": "In Stock (45,000+)",
        "supplier": "DigiKey",
        "specs": {
          "Input Voltage": "3.5V to 28V",
          "Output Current": "3A",
          "Switching Frequency": "570 kHz",
          "Efficiency": "Up to 95%"
        },
        "alternatives": ["LMR14030", "LM2596", "MP2315"]
      }
    },
    {
      "id": "L1", 
      "name": "SRR1280-100M", 
      "type": "10uH Inductor", 
      "pins": ["1", "2"],
      "intelligence": { "price": "$0.65", "stock": "In Stock (12,000)", supplier: "Mouser", specs: {}, alternatives: [] }
    },
    {
      "id": "C1", 
      "name": "GRM32ER71H106KA12L", 
      "type": "10uF Input Cap", 
      "pins": ["1", "2"],
      "intelligence": { "price": "$0.22", "stock": "In Stock (100,000+)", supplier: "DigiKey", specs: {}, alternatives: [] }
    },
    {
      "id": "C2", 
      "name": "T491D476K016AT", 
      "type": "47uF Output Cap", 
      "pins": ["1", "2"],
      "intelligence": { "price": "$0.35", "stock": "In Stock (8,500)", supplier: "Mouser", specs: {}, alternatives: [] }
    },
    {
      "id": "D1", 
      "name": "B340A-13-F", 
      "type": "Schottky Diode", 
      "pins": ["A", "K"],
      "intelligence": { "price": "$0.15", "stock": "In Stock (20,000)", supplier: "DigiKey", specs: {}, alternatives: [] }
    }
  ],
  "nets": [
    {"name": "VIN", "type": "power", "connections": ["C1-1", "U1-VIN"]},
    {"name": "GND", "type": "gnd", "connections": ["C1-2", "C2-2", "D1-A", "U1-GND"]},
    {"name": "SW_NODE", "type": "signal", "connections": ["U1-PH", "D1-K", "L1-1"]},
    {"name": "VOUT_5V", "type": "power", "connections": ["L1-2", "C2-1", "U1-VSENSE"]}
  ]
}
</circuit>`;
  }

  // 555 Timer Astable Oscillator
  if (p.includes('555') || p.includes('timer') || p.includes('oscillator')) {
    return `I have designed an astable multivibrator oscillator using the NE555 timer generating a ~1kHz clock signal.

- **R1**: 10 kΩ charging resistor
- **R2**: 47 kΩ timing resistor
- **C1**: 10 nF timing capacitor
- **Formula**: $f \\approx \\frac{1.44}{(R_1 + 2 R_2) C_1} \\approx 1.38\\text{ kHz}$.

<constraints>
{
  "known": [
    {"name": "IC", "value": "NE555"},
    {"name": "Topology", "value": "Astable Multivibrator"},
    {"name": "Supply Voltage", "value": "5V - 12V"},
    {"name": "Nominal Frequency", "value": "~1 kHz"}
  ],
  "missing": ["Exact Duty Cycle Requirement", "Load Capacitance"]
}
</constraints>

<circuit>
{
  "components": [
    {
      "id": "U1",
      "name": "NE555P",
      "type": "Precision Timer IC",
      "pins": ["GND", "TRIG", "OUT", "RESET", "CTRL", "THRES", "DISCH", "VCC"],
      "intelligence": {
        "price": "$0.45",
        "stock": "In Stock (50,000+)",
        "supplier": "TI / DigiKey",
        "specs": { "Supply Voltage": "4.5V to 16V", "Max Frequency": "500 kHz" },
        "alternatives": ["TLC555", "LM555"]
      }
    },
    {
      "id": "R1",
      "name": "RC0805FR-0710KL",
      "type": "10kΩ Resistor (0805)",
      "pins": ["1", "2"],
      "intelligence": { "price": "$0.04", "stock": "In Stock (100,000+)", "supplier": "DigiKey", "specs": {}, "alternatives": [] }
    },
    {
      "id": "R2",
      "name": "RC0805FR-0747KL",
      "type": "47kΩ Resistor (0805)",
      "pins": ["1", "2"],
      "intelligence": { "price": "$0.04", "stock": "In Stock (100,000+)", "supplier": "DigiKey", "specs": {}, "alternatives": [] }
    },
    {
      "id": "C1",
      "name": "GRM188R71H103KA01D",
      "type": "10nF Timing Cap",
      "pins": ["1", "2"],
      "intelligence": { "price": "$0.05", "stock": "In Stock (60,000+)", "supplier": "Murata", "specs": {}, alternatives: [] }
    }
  ],
  "nets": [
    {"name": "VCC", "type": "power", "connections": ["U1-VCC", "U1-RESET", "R1-1"]},
    {"name": "GND", "type": "gnd", "connections": ["U1-GND", "C1-2"]},
    {"name": "DISCHARGE_NET", "type": "signal", "connections": ["R1-2", "R2-1", "U1-DISCH"]},
    {"name": "TIMING_NET", "type": "signal", "connections": ["R2-2", "C1-1", "U1-TRIG", "U1-THRES"]},
    {"name": "PULSE_OUT", "type": "signal", "connections": ["U1-OUT"]}
  ]
}
</circuit>`;
  }

  // Linear Regulator (AMS1117 / LM7805)
  if (p.includes('ams1117') || p.includes('linear') || p.includes('ldo') || p.includes('7805')) {
    return `I have designed a low-dropout 3.3V linear regulator circuit based on the AMS1117-3.3.

<constraints>
{
  "known": [
    {"name": "Input Voltage", "value": "5V"},
    {"name": "Regulator Output", "value": "3.3V"},
    {"name": "IC", "value": "AMS1117-3.3"}
  ],
  "missing": ["Maximum Load Current (Max 800mA)", "Heatsink Thermal Dissipation"]
}
</constraints>

<circuit>
{
  "components": [
    {
      "id": "U1",
      "name": "AMS1117-3.3",
      "type": "3.3V 800mA LDO Regulator",
      "pins": ["GND", "VOUT", "VIN"],
      "intelligence": {
        "price": "$0.20",
        "stock": "In Stock (90,000+)",
        "supplier": "LCSC / DigiKey",
        "specs": { "Output Voltage": "3.3V", "Max Current": "800mA", "Dropout Voltage": "1.1V" },
        "alternatives": ["LM1117-3.3", "AP1117-33"]
      }
    },
    {
      "id": "C1",
      "name": "GRM32ER71H106KA12L",
      "type": "10uF Input Ceramic Cap",
      "pins": ["1", "2"],
      "intelligence": { "price": "$0.12", "stock": "In Stock (75,000+)", "supplier": "DigiKey", "specs": {}, "alternatives": [] }
    },
    {
      "id": "C2",
      "name": "GRM32ER71H226KE14L",
      "type": "22uF Output Tantalum/Ceramic Cap",
      "pins": ["1", "2"],
      "intelligence": { "price": "$0.25", "stock": "In Stock (40,000+)", "supplier": "Mouser", "specs": {}, "alternatives": [] }
    }
  ],
  "nets": [
    {"name": "VIN_5V", "type": "power", "connections": ["C1-1", "U1-VIN"]},
    {"name": "GND", "type": "gnd", "connections": ["C1-2", "C2-2", "U1-GND"]},
    {"name": "VOUT_3V3", "type": "power", "connections": ["U1-VOUT", "C2-1"]}
  ]
}
</circuit>`;
  }

  // Fallback generic circuit for other queries
  return `I have synthesized a standard hardware circuit architecture for: "${prompt}".

<constraints>
{
  "known": [
    {"name": "Circuit Type", "value": "Custom Hardware Synthesis"},
    {"name": "System Voltage", "value": "5V / 3.3V"}
  ],
  "missing": ["Specific Current Requirement", "Operating Frequency"]
}
</constraints>

<circuit>
{
  "components": [
    {
      "id": "R1",
      "name": "RC0805FR-0710KL",
      "type": "10kΩ Pull-up Resistor",
      "pins": ["1", "2"],
      "intelligence": { "price": "$0.04", "stock": "In Stock (200,000+)", "supplier": "DigiKey", "specs": {}, "alternatives": [] }
    },
    {
      "id": "C1",
      "name": "GRM188R71H104KA93D",
      "type": "100nF Decoupling Capacitor",
      "pins": ["1", "2"],
      "intelligence": { "price": "$0.05", "stock": "In Stock (150,000+)", "supplier": "Murata", "specs": {}, "alternatives": [] }
    }
  ],
  "nets": [
    {"name": "VCC", "type": "power", "connections": ["R1-1", "C1-1"]},
    {"name": "GND", "type": "gnd", "connections": ["C1-2"]},
    {"name": "SIG_OUT", "type": "signal", "connections": ["R1-2"]}
  ]
}
</circuit>`;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'architecture' | 'schematic' | 'bom' | 'validation' | 'simulation' | 'rag' | 'kicad'>('architecture');
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am CircuitMind AI. Describe the circuit you want to build. I will extract constraints and generate the circuit architecture.'
    }
  ]);
  const [constraints, setConstraints] = useState<Constraints>({ known: [], missing: [] });
  const [circuit, setCircuit] = useState<CircuitData | null>(null);
  const [engineeringState, setEngineeringState] = useState<EngineeringProjectState | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<CircuitComponent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simFinished, setSimFinished] = useState(false);
  const [isRagInitialized, setIsRagInitialized] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [ragDocuments, setRagDocuments] = useState<{name: string, pages: number, chunks: number}[]>([
    { name: 'TPS54331_Datasheet.pdf', pages: 48, chunks: 342 },
    { name: 'LM2596_Regulator.pdf', pages: 32, chunks: 185 }
  ]);
  const [isProcessingPdf, setIsProcessingPdf] = useState(false);
  const [pdfProgressText, setPdfProgressText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // API Key & Model Configuration
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('circuitmind_nebius_api_key') || import.meta.env.VITE_NEBIUS_API_KEY || '';
  });
  const [selectedModel, setSelectedModel] = useState<string>(() => {
    return localStorage.getItem('circuitmind_nebius_model') || import.meta.env.VITE_NEBIUS_MODEL || 'nvidia/Nemotron-3_5-Lightning';
  });
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');
  const [tempModel, setTempModel] = useState('');
  const [customModelInput, setCustomModelInput] = useState('');
  const [keyValidationStatus, setKeyValidationStatus] = useState<{
    status: 'idle' | 'validating' | 'valid' | 'invalid';
    message?: string;
  }>({ status: 'idle' });

  const loadDemoCircuit = () => {
    const demoCircuit: CircuitData = {
      components: [
        {
          id: "U1", 
          name: "TPS54331", 
          type: "Buck Converter IC", 
          pins: ["BOOT", "VIN", "EN", "SS", "VSENSE", "COMP", "GND", "PH"],
          intelligence: {
            price: "$1.42",
            stock: "In Stock (45,000+)",
            supplier: "DigiKey",
            specs: {
              "Input Voltage": "3.5V to 28V",
              "Output Current": "3A",
              "Switching Frequency": "570 kHz",
              "Efficiency": "Up to 95%"
            },
            alternatives: ["LMR14030", "LM2596", "MP2315"]
          }
        },
        {
          id: "L1", 
          name: "SRR1280-100M", 
          type: "10uH Inductor", 
          pins: ["1", "2"],
          intelligence: { price: "$0.65", stock: "In Stock (12,000)", supplier: "Mouser", specs: {}, alternatives: [] }
        },
        {
          id: "C1", 
          name: "GRM32ER71H106KA12L", 
          type: "10uF Input Cap", 
          pins: ["1", "2"],
          intelligence: { price: "$0.22", stock: "In Stock (100,000+)", supplier: "DigiKey", specs: {}, alternatives: [] }
        },
        {
          id: "C2", 
          name: "T491D476K016AT", 
          type: "47uF Output Cap", 
          pins: ["1", "2"],
          intelligence: { price: "$0.35", stock: "In Stock (8,500)", supplier: "Mouser", specs: {}, alternatives: [] }
        },
        {
          id: "D1", 
          name: "B340A-13-F", 
          type: "Schottky Diode", 
          pins: ["A", "K"],
          intelligence: { price: "$0.15", stock: "In Stock (20,000)", supplier: "DigiKey", specs: {}, alternatives: [] }
        }
      ],
      nets: [
        {"name": "VIN", "type": "power", "connections": ["C1-1", "U1-VIN"]},
        {"name": "GND", "type": "gnd", "connections": ["C1-2", "C2-2", "D1-A", "U1-GND"]},
        {"name": "SW_NODE", "type": "signal", "connections": ["U1-PH", "D1-K", "L1-1"]},
        {"name": "VOUT_5V", "type": "power", "connections": ["L1-2", "C2-1", "U1-VSENSE"]}
      ]
    };
    setCircuit(demoCircuit);
    setEngineeringState(buildEngineeringState('Design a 5V buck converter using TPS54331.', demoCircuit));
    setConstraints({
      known: [{ name: "Output Voltage", value: "5V" }, { name: "IC", value: "TPS54331" }],
      missing: ["Max Input Voltage", "Target Output Current", "Ripple Requirement"]
    });
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setSimFinished(false);
    setTimeout(() => {
      setIsSimulating(false);
      setSimFinished(true);
    }, 2000);
  };

  const handleRagInit = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsRagInitialized(true);
    }, 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsProcessingPdf(true);
    setPdfProgressText('Uploading document...');
    
    setTimeout(() => setPdfProgressText('Running PDF Parser...'), 1000);
    setTimeout(() => setPdfProgressText('Semantic Chunking Engine...'), 2500);
    setTimeout(() => setPdfProgressText('Generating ADA Embeddings...'), 4000);
    setTimeout(() => {
      setRagDocuments(prev => [{
        name: file.name,
        pages: Math.floor(Math.random() * 30) + 5,
        chunks: Math.floor(Math.random() * 200) + 50
      }, ...prev]);
      setIsProcessingPdf(false);
      setPdfProgressText('');
    }, 5500);
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleValidateKey = async (keyToTest: string) => {
    if (!keyToTest || !keyToTest.trim()) {
      setKeyValidationStatus({ status: 'invalid', message: 'Please enter a Nebius Token Factory API key.' });
      return;
    }
    setKeyValidationStatus({ status: 'validating' });
    try {
      const res = await fetch('https://api.tokenfactory.nebius.com/v1/models', {
        headers: { 'Authorization': `Bearer ${keyToTest.trim()}` }
      });
      const data = await res.json();
      if (res.ok && data?.data) {
        setKeyValidationStatus({
          status: 'valid',
          message: `Connected to Nebius Token Factory. ${data.data.length ?? 0} model(s) available.`
        });
      } else {
        const errMsg = data?.error?.message || `HTTP ${res.status} Unauthorized`;
        setKeyValidationStatus({ status: 'invalid', message: `Nebius Token Factory error: ${errMsg}` });
      }
    } catch (e: any) {
      setKeyValidationStatus({ status: 'invalid', message: e.message || 'Network error verifying key.' });
    }
  };

  const handleSaveSettings = () => {
    const trimmedKey = tempApiKey.trim();
    const finalModel = (tempModel === 'custom' ? customModelInput : tempModel).trim() || 'nvidia/Nemotron-3_5-Lightning';
    setApiKey(trimmedKey);
    setSelectedModel(finalModel);
    localStorage.setItem('circuitmind_nebius_api_key', trimmedKey);
    localStorage.setItem('circuitmind_nebius_model', finalModel);
    setShowSettingsModal(false);
  };

  const openSettings = () => {
    setTempApiKey(apiKey);
    const standardModels = [
      'nvidia/Nemotron-3_5-Lightning',
      'nvidia/Nemotron-3-Nano-30B-A3B',
      'nvidia/Nemotron-3-Super-120B-A12B'
    ];
    if (standardModels.includes(selectedModel)) {
      setTempModel(selectedModel);
      setCustomModelInput('');
    } else {
      setTempModel('custom');
      setCustomModelInput(selectedModel);
    }
    setKeyValidationStatus({ status: 'idle' });
    setShowSettingsModal(true);
  };

  const handleSendMessage = async (overridePrompt?: string) => {
    const promptToSend = overridePrompt !== undefined ? overridePrompt : messageInput;
    if (!promptToSend.trim() || isLoading) return;

    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', content: promptToSend };
    setMessages(prev => [...prev, newUserMsg]);
    if (overridePrompt === undefined) {
      setMessageInput('');
    }
    setIsLoading(true);

    try {
      const lowerPrompt = promptToSend.toLowerCase().trim();

      // FAST-PATH GREETINGS
      if (['hi', 'hello', 'hey', 'help', 'hi!', 'hello!'].includes(lowerPrompt)) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Hello! I am **CircuitMind AI**. Describe any circuit you want to build and I will extract electrical constraints, generate the component architecture, netlist, BOM, and KiCad / SKiDL models.

Try these examples:
• **"Design a voltage divider to convert 5V to approximately 3.3V."**
• **"Design a 5V buck converter using TPS54331."**
• **"Design a 1kHz square wave oscillator using a 555 timer."**
• **"Design a 5V to 3.3V linear regulator circuit with AMS1117."**

*(Note: Configure NVIDIA Nemotron through Nebius Token Factory in Settings.)*`
        }]);
        setIsLoading(false);
        return;
      }

      // FAST-PATH MOCK FOR DEMONSTRATION
      if (newUserMsg.content.toLowerCase().includes('tps54331')) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockBotResponse = `I have designed a 5V buck converter using the TPS54331. I've placed the main IC, the inductor, and the necessary capacitors. You can now use the workspaces on the left to view the Layout, BOM, Validation, and run SPICE Simulations!
        
<constraints>
{
  "known": [{"name": "Output Voltage", "value": "5V"}, {"name": "IC", "value": "TPS54331"}],
  "missing": ["Max Input Voltage", "Target Output Current", "Ripple Requirement"]
}
</constraints>

<circuit>
{
  "components": [
    {
      "id": "U1", 
      "name": "TPS54331", 
      "type": "Buck Converter IC", 
      "pins": ["BOOT", "VIN", "EN", "SS", "VSENSE", "COMP", "GND", "PH"],
      "intelligence": {
        "price": "$1.42",
        "stock": "In Stock (45,000+)",
        "supplier": "DigiKey",
        "specs": {
          "Input Voltage": "3.5V to 28V",
          "Output Current": "3A",
          "Switching Frequency": "570 kHz",
          "Efficiency": "Up to 95%"
        },
        "alternatives": ["LMR14030", "LM2596", "MP2315"]
      }
    },
    {
      "id": "L1", 
      "name": "SRR1280-100M", 
      "type": "10uH Inductor", 
      "pins": ["1", "2"],
      "intelligence": { "price": "$0.65", "stock": "In Stock (12,000)", "supplier": "Mouser", "specs": {}, "alternatives": [] }
    },
    {
      "id": "C1", 
      "name": "GRM32ER71H106KA12L", 
      "type": "10uF Input Cap", 
      "pins": ["1", "2"],
      "intelligence": { "price": "$0.22", "stock": "In Stock (100,000+)", "supplier": "DigiKey", "specs": {}, "alternatives": [] }
    },
    {
      "id": "C2", 
      "name": "T491D476K016AT", 
      "type": "47uF Output Cap", 
      "pins": ["1", "2"],
      "intelligence": { "price": "$0.35", "stock": "In Stock (8,500)", "supplier": "Mouser", "specs": {}, "alternatives": [] }
    },
    {
      "id": "D1", 
      "name": "B340A-13-F", 
      "type": "Schottky Diode", 
      "pins": ["A", "K"],
      "intelligence": { "price": "$0.15", "stock": "In Stock (20,000)", "supplier": "DigiKey", "specs": {}, "alternatives": [] }
    }
  ],
  "nets": [
    {"name": "VIN", "type": "power", "connections": ["C1-1", "U1-VIN"]},
    {"name": "GND", "type": "gnd", "connections": ["C1-2", "C2-2", "D1-A", "U1-GND"]},
    {"name": "SW_NODE", "type": "signal", "connections": ["U1-PH", "D1-K", "L1-1"]},
    {"name": "VOUT_5V", "type": "power", "connections": ["L1-2", "C2-1", "U1-VSENSE"]}
  ]
}
</circuit>`;
        
        let botResponse = mockBotResponse;
        
        const constraintsMatch = botResponse.match(/<constraints>([\s\S]*?)<\/constraints>/);
        if (constraintsMatch) {
          try {
            setConstraints(JSON.parse(constraintsMatch[1]));
            botResponse = botResponse.replace(constraintsMatch[0], '').trim();
          } catch (e) { console.error(e); }
        }

        const circuitMatch = botResponse.match(/<circuit>([\s\S]*?)<\/circuit>/);
        if (circuitMatch) {
          try {
            const parsedCircuit = JSON.parse(circuitMatch[1]) as CircuitData;
            setCircuit(parsedCircuit);
            setEngineeringState(buildEngineeringState(promptToSend, parsedCircuit));
            botResponse = botResponse.replace(circuitMatch[0], '').trim();
          } catch (e) { console.error(e); }
        }

        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: botResponse
        }]);
        setIsLoading(false);
        return;
      }

      let botResponse = '';
      let usedLocalSynthesizer = false;
      let apiErrorMessage = '';

      const activeKey = apiKey && apiKey !== 'your_nebius_api_key_here' ? apiKey : '';

      if (activeKey) {
        try {
          const systemPrompt = `You are CircuitMind AI, an expert electronic design automation assistant. Return engineering decisions only when supported by the prompt; label unknowns as assumptions or missing requirements. Output constraints in <constraints>...</constraints> JSON and a circuit graph in <circuit>...</circuit> JSON. Include components with id, name, type, pins, intelligence (price, stock, supplier, specs, alternatives), and nets with name, type (power/gnd/signal), and connections. Never claim ERC, DRC, SPICE, stock, or datasheet verification unless evidence is supplied.`;

          const response = await fetch('https://api.tokenfactory.nebius.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${activeKey}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': window.location.origin || 'http://localhost:5173',
              'X-Title': 'CircuitMind AI'
            },
            body: JSON.stringify({
              model: selectedModel || 'nvidia/Nemotron-3_5-Lightning',
              messages: [
                { role: 'system', content: systemPrompt },
                ...messages.filter(m => m.role !== 'system').map(m => ({ role: m.role, content: m.content })),
                { role: 'user', content: promptToSend }
              ]
            })
          });

          if (!response.ok) {
            let detail = `HTTP ${response.status} ${response.statusText}`;
            try {
              const errBody = await response.json();
              if (errBody?.error?.message) {
                detail = errBody.error.message;
              }
            } catch {}
            throw new Error(`Nebius Token Factory API: ${detail}`);
          }

          const data = await response.json();
          botResponse = data.choices[0].message.content;
        } catch (apiErr: any) {
          console.warn('Nebius Token Factory API call failed:', apiErr);
          apiErrorMessage = apiErr.message || 'Failed to communicate with Nebius Token Factory.';
          
          // Fallback to built-in hardware synthesis engine
          const localFallback = generateBuiltinCircuit(promptToSend);
          if (localFallback) {
            botResponse = localFallback;
            usedLocalSynthesizer = true;
          } else {
            throw new Error(`${apiErrorMessage}. Please update your API key in Settings (⚙️).`);
          }
        }
      } else {
        // No key: try local synthesizer
        const localFallback = generateBuiltinCircuit(promptToSend);
        if (localFallback) {
          botResponse = localFallback;
          usedLocalSynthesizer = true;
        } else {
          throw new Error('Nebius Token Factory API key is missing or unavailable. Open Settings to configure NVIDIA Nemotron, or try a built-in circuit workflow.');
        }
      }

      // Parse constraints
      const constraintsMatch = botResponse.match(/<constraints>([\s\S]*?)<\/constraints>/);
      if (constraintsMatch) {
        try {
          setConstraints(JSON.parse(constraintsMatch[1]));
          botResponse = botResponse.replace(constraintsMatch[0], '').trim();
        } catch (e) { console.error(e); }
      }

      // Parse circuit
      const circuitMatch = botResponse.match(/<circuit>([\s\S]*?)<\/circuit>/);
      if (circuitMatch) {
        try {
            const parsedCircuit = JSON.parse(circuitMatch[1]) as CircuitData;
            setCircuit(parsedCircuit);
            setEngineeringState(buildEngineeringState(promptToSend, parsedCircuit));
          botResponse = botResponse.replace(circuitMatch[0], '').trim();
        } catch (e) { console.error(e); }
      }

      let finalBotMessage = botResponse;
      if (usedLocalSynthesizer && apiErrorMessage) {
        finalBotMessage = `> ⚠️ **Nebius notice**: ${apiErrorMessage}\n> *Architecture synthesized by the local deterministic workflow; it is not an AI-verified result.*\n\n` + botResponse;
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: finalBotMessage
      }]);

    } catch (err: any) {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'system', content: `Error: ${err.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const totalBOMCost = circuit?.components.reduce((sum, comp) => {
    if (comp.intelligence?.price) {
      const priceNum = parseFloat(comp.intelligence.price.replace('$', ''));
      if (!isNaN(priceNum)) return sum + priceNum;
    }
    return sum;
  }, 0) || 0;

  return (
    <div className="circuit-console flex h-screen w-full bg-charcoal-900 text-gray-200 overflow-hidden font-sans">
      
      {/* Left Navigation */}
      <nav className="circuit-rail w-[250px] flex flex-col p-2 bg-charcoal-800 border-r border-charcoal-700 shadow-xl z-20 shrink-0">
        <div className="brand-panel brand-mark flex items-center gap-3 p-3 mb-4 rounded-lg text-cyan-accent cursor-pointer" title="CircuitMind">
          <img src={circuitMindLogo} alt="CircuitMind circuit board logo" className="h-10 w-10 rounded-md object-cover" />
          <div className="min-w-0">
            <div className="font-black text-white tracking-wide text-base leading-none">CIRCUITMIND</div>
            <div className="mt-1 text-[9px] font-mono tracking-[0.16em] text-gray-400">AI CIRCUIT STUDIO</div>
          </div>
        </div>
        <div className="text-[10px] font-bold text-gray-400 px-2 pb-2 tracking-wider">TOOLS</div>
        <div className="flex flex-col gap-1 flex-1 w-full">
          <NavIcon label="OVERVIEW" icon={<LayoutGrid size={17} />} active={activeTab === 'architecture'} onClick={() => setActiveTab('architecture')} tooltip="Architecture Dashboard" />
          <NavIcon label="SCHEMATIC" icon={<Layers size={17} />} active={activeTab === 'schematic'} onClick={() => setActiveTab('schematic')} tooltip="Schematic Editor" />
          <NavIcon label="BILL OF MATERIALS" icon={<ClipboardList size={17} />} active={activeTab === 'bom'} onClick={() => setActiveTab('bom')} tooltip="Bill of Materials" />
          <NavIcon label="VALIDATION" icon={<ShieldCheck size={17} />} active={activeTab === 'validation'} onClick={() => setActiveTab('validation')} tooltip="Validation (ERC/DRC)" />
          <NavIcon label="SIMULATION" icon={<LineChart size={17} />} active={activeTab === 'simulation'} onClick={() => setActiveTab('simulation')} tooltip="SPICE Simulation" />
          <div className="h-px bg-charcoal-700 w-full my-2"></div>
          <NavIcon label="KNOWLEDGE BASE" icon={<Database size={17} />} active={activeTab === 'rag'} onClick={() => setActiveTab('rag')} tooltip="Knowledge Base (RAG)" />
          <NavIcon label="KICAD EXPORT" icon={<FileCode2 size={17} />} active={activeTab === 'kicad'} onClick={() => setActiveTab('kicad')} tooltip="KiCad / SKiDL Integration" />
        </div>
        <div className="operator-card mt-3 p-3 rounded-lg border border-charcoal-700">
          <div className="text-[9px] font-bold text-gray-400 tracking-wider mb-2">OPERATOR</div>
          <div className="flex items-center gap-2"><div className="h-7 w-7 rounded bg-cyan-accent/15 flex items-center justify-center"><Cpu size={14} className="text-cyan-accent" /></div><div><div className="text-xs font-bold text-white">CircuitMind</div><div className="text-[9px] font-mono text-gray-500">LOCAL WORKSPACE</div></div></div>
        </div>
      </nav>

      {/* Split View */}
      <div className="flex-1 flex min-w-0">
        
        {/* Left Panel: Chat */}
        <aside className="circuit-chat w-[400px] flex flex-col border-r border-charcoal-700 bg-charcoal-800 shrink-0 z-10 shadow-[5px_0_15px_-5px_rgba(0,0,0,0.3)]">
          <div className="h-16 flex items-center justify-between px-6 border-b border-charcoal-700 bg-charcoal-800 shrink-0">
            <h2 className="text-white font-semibold text-sm flex items-center gap-2 tracking-wide">
              <Bot size={18} className="text-cyan-accent" /> CircuitMind <span className="text-[10px] font-mono text-cyan-accent/80">AI</span>
            </h2>
            <button
              onClick={openSettings}
              className="p-1.5 px-2.5 rounded-lg text-gray-300 hover:text-white bg-charcoal-700/70 hover:bg-charcoal-700 border border-charcoal-600 transition-colors flex items-center gap-1.5 text-xs cursor-pointer shadow-sm"
              title="Configure Nebius Token Factory & NVIDIA Nemotron"
            >
              <Settings size={14} className="text-cyan-accent" />
              <span>Settings</span>
            </button>
          </div>

          <div className="px-4 py-2 border-b border-charcoal-700/70 text-[10px] font-mono text-gray-500 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent"></span> NVIDIA NEMOTRON VIA NEBIUS TOKEN FACTORY
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 text-sm">
            {messages.map((msg) => (
              <div key={msg.id} className="flex gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 bg-charcoal-700">
                  {msg.role === 'user' ? <User size={12} /> : <Bot size={12} className={msg.role==='assistant'?"text-cyan-accent":"text-red-400"} />}
                </div>
                <div className={`p-3 rounded-xl whitespace-pre-wrap flex-1 ${
                  msg.role === 'user' 
                    ? 'bg-charcoal-700 text-white' 
                    : msg.role === 'system'
                    ? 'bg-red-950/40 border border-red-500/40 text-red-200'
                    : 'bg-charcoal-900 border border-charcoal-700 text-gray-200'
                }`}>
                  {msg.content}
                  {msg.role === 'system' && (
                    <div className="mt-3 pt-2.5 border-t border-red-500/20 flex flex-wrap gap-2">
                      <button
                        onClick={openSettings}
                        className="px-2.5 py-1 text-xs bg-red-900/60 hover:bg-red-800 text-white rounded border border-red-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Settings size={12} /> Configure API Key
                      </button>
                      <button
                        onClick={() => handleSendMessage('Design a voltage divider to convert 5V to approximately 3.3V.')}
                        className="px-2.5 py-1 text-xs bg-charcoal-800 hover:bg-charcoal-700 text-cyan-accent rounded border border-charcoal-600 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        Try Voltage Divider (Local)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && <div className="p-3 text-cyan-accent animate-pulse text-xs">AI is thinking...</div>}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-charcoal-700 bg-charcoal-800 flex flex-col gap-2.5">
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => handleSendMessage('Design a voltage divider to convert 5V to approximately 3.3V.')}
                className="text-[11px] px-2 py-0.5 rounded-full bg-charcoal-900 hover:bg-cyan-accent/20 text-gray-300 hover:text-cyan-accent border border-charcoal-700 transition-colors cursor-pointer"
              >
                ⚡ 5V to 3.3V Divider
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('Design a 5V buck converter using TPS54331.')}
                className="text-[11px] px-2 py-0.5 rounded-full bg-charcoal-900 hover:bg-cyan-accent/20 text-gray-300 hover:text-cyan-accent border border-charcoal-700 transition-colors cursor-pointer"
              >
                🔌 TPS54331 Buck
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('Design an astable 555 timer oscillator generating a 1kHz square wave.')}
                className="text-[11px] px-2 py-0.5 rounded-full bg-charcoal-900 hover:bg-cyan-accent/20 text-gray-300 hover:text-cyan-accent border border-charcoal-700 transition-colors cursor-pointer"
              >
                ⏱️ 555 Timer
              </button>
            </div>
            <input 
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask the AI to design a circuit..."
              className="w-full bg-charcoal-900 border border-charcoal-700 rounded-lg p-3 text-sm focus:outline-none focus:border-cyan-accent"
            />
          </div>
        </aside>

        {/* Right Panel: Workspace Area */}
        <div className="circuit-workspace flex-1 flex flex-col min-w-0 bg-[#0d0d0d] relative overflow-hidden">
          
          {/* Main Content Area based on Tab */}
          {activeTab === 'architecture' ? (
            // ==========================================
            // ARCHITECTURE WORKSPACE (Restored)
            // ==========================================
            <div className="flex-1 flex flex-col w-full h-full">
              <header className="workspace-header h-16 flex items-center justify-between px-6 bg-charcoal-800 border-b border-charcoal-700 shrink-0 z-10">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-accent/70">Design workspace</p>
                    <h1 className="text-white font-semibold">Circuit Architecture</h1>
                  </div>
                  <span className="hidden xl:inline-flex items-center gap-1.5 px-2 py-1 rounded border border-green-400/20 bg-green-400/5 text-[10px] font-mono text-green-400"><span className="status-pulse"></span> SYSTEM READY</span>
                </div>
                {circuit ? (
                  <button 
                    onClick={() => setActiveTab('kicad')}
                    className="px-3.5 py-1.5 flex items-center gap-2 bg-cyan-accent/10 hover:bg-cyan-accent/20 text-cyan-accent text-xs font-semibold rounded-lg transition-colors border border-cyan-accent/30 cursor-pointer"
                  >
                    <FileCode2 size={14} /> KiCad / SKiDL Output
                  </button>
                ) : (
                  <button 
                    onClick={loadDemoCircuit}
                    className="px-3.5 py-1.5 flex items-center gap-2 bg-charcoal-700 hover:bg-charcoal-600 text-gray-200 text-xs font-semibold rounded-lg transition-colors border border-charcoal-600 cursor-pointer"
                  >
                    <Sparkles size={14} className="text-cyan-accent" /> Load Demo Circuit
                  </button>
                )}
              </header>

              <main className="flex-1 flex relative overflow-hidden">
                <div className="absolute inset-0 z-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 0.7px, transparent 0.8px), linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                
                {/* Constraints Overlay */}
                <div className="w-[280px] bg-charcoal-900/90 border-r border-charcoal-700 p-4 z-10 flex flex-col gap-4 backdrop-blur shrink-0 overflow-y-auto">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Constraints</h3>
                  <div className="space-y-2">
                    {constraints.known.map((c, i) => (
                      <div key={i} className="text-xs bg-charcoal-800 p-2 rounded flex justify-between border border-charcoal-700">
                        <span className="text-gray-300">{c.name}</span>
                        <span className="text-cyan-accent">{c.value}</span>
                      </div>
                    ))}
                    {constraints.missing.map((m, i) => (
                      <div key={i} className="text-xs bg-red-500/10 text-red-300 border border-red-500/30 p-2 rounded flex gap-2">
                        <CircleDashed size={14} /> {m}
                      </div>
                    ))}
                    {constraints.known.length === 0 && constraints.missing.length === 0 && (
                      <p className="text-xs text-gray-500 italic">No constraints extracted yet.</p>
                    )}
                  </div>
                </div>

                <div className="flex-1 p-8 z-10 overflow-auto">
                  {!circuit ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
                      <LayoutGrid size={48} className="mb-4 text-cyan-accent opacity-50" />
                      <p className="mb-4 text-sm text-gray-400">Awaiting circuit architecture from AI...</p>
                      <button 
                        onClick={loadDemoCircuit}
                        className="px-4 py-2 bg-cyan-accent/10 border border-cyan-accent/30 hover:bg-cyan-accent/20 text-cyan-accent rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <Sparkles size={14} /> Load Demo Circuit (TPS54331 Buck)
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
                      {engineeringState && (
                        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                          <div className="xl:col-span-2 bg-charcoal-800 border border-charcoal-700 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2"><Bot size={14} className="text-cyan-accent" /> AI Engineering State</h3>
                              <span className="text-[10px] font-mono text-cyan-accent">STRUCTURED • TRACEABLE</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">Captured requirements</p>
                                <div className="space-y-1.5">{engineeringState.requirements.slice(0, 4).map(requirement => <div key={requirement.name} className="flex justify-between gap-2 text-xs bg-charcoal-900/70 rounded px-2 py-1.5"><span className="text-gray-300">{requirement.name}: {requirement.value}</span><span className="text-cyan-accent text-[9px] shrink-0">{requirement.status}</span></div>)}</div>
                              </div>
                              <div>
                                <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">Needs confirmation</p>
                                <div className="space-y-1.5">{engineeringState.unresolvedQuestions.slice(0, 3).map(question => <div key={question} className="text-xs text-yellow-200 bg-yellow-500/5 border border-yellow-500/15 rounded px-2 py-1.5">{question}</div>)}</div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-charcoal-800 border border-charcoal-700 rounded-xl p-4">
                            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Agent activity</h3>
                            <div className="space-y-2">{engineeringState.activity.map(activity => <div key={activity.label} className="text-xs"><div className="flex items-center gap-2 text-gray-200"><span className={`w-1.5 h-1.5 rounded-full ${activity.status === 'completed' ? 'bg-green-400' : 'bg-yellow-400'}`}></span>{activity.label}</div><p className="text-[10px] text-gray-500 mt-0.5 ml-3.5">{activity.detail}</p></div>)}</div>
                          </div>
                        </section>
                      )}
                      <div>
                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><Cpu size={16} className="text-cyan-accent" /> Components</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                          {circuit.components.map(comp => (
                            <a 
                              key={comp.id} 
                              href={`https://octopart.com/search?q=${encodeURIComponent(comp.name)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setSelectedComponent(comp)}
                              className={`block bg-charcoal-800 border rounded-xl p-4 shadow-lg cursor-pointer transition-colors ${
                                selectedComponent?.id === comp.id ? 'border-cyan-accent ring-1 ring-cyan-accent/50' : 'border-charcoal-700 hover:border-cyan-accent/50'
                              }`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-lg font-bold text-white">{comp.id}</span>
                                <span className="text-xs px-2 py-0.5 bg-charcoal-700 rounded text-gray-400">{comp.type}</span>
                              </div>
                              <div className="text-sm text-cyan-accent mb-3">{comp.name}</div>
                              <div className="flex flex-wrap gap-1">
                                {comp.pins.map((pin, i) => (
                                  <span key={i} className="text-[10px] bg-charcoal-900 border border-charcoal-600 px-1.5 py-0.5 rounded text-gray-400">{pin}</span>
                                ))}
                              </div>
                              {comp.intelligence && (
                                <div className="mt-3 pt-3 border-t border-charcoal-700 flex items-center gap-2 text-[10px] text-teal-accent">
                                  <CheckCircle2 size={12} /> Intelligence Data Available
                                </div>
                              )}
                            </a>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><Activity size={16} className="text-teal-accent" /> Netlist & Connections</h3>
                        <div className="bg-charcoal-800 border border-charcoal-700 rounded-xl overflow-hidden">
                          {circuit.nets.map((net, i) => (
                            <div key={i} className={`p-3 border-b border-charcoal-700 flex items-center gap-4 ${i === circuit.nets.length-1 ? 'border-none' : ''}`}>
                              <div className="w-24 shrink-0 flex items-center gap-2">
                                {net.type === 'power' && <Zap size={14} className="text-red-400" />}
                                {net.type === 'gnd' && <Zap size={14} className="text-green-400" />}
                                {net.type === 'signal' && <Activity size={14} className="text-cyan-accent" />}
                                <span className={`text-sm font-mono font-bold ${net.type === 'power' ? 'text-red-400' : net.type === 'gnd' ? 'text-green-400' : 'text-cyan-accent'}`}>{net.name}</span>
                              </div>
                              <div className="flex-1 flex flex-wrap gap-2 items-center">
                                {net.connections.map((conn, j) => (
                                  <div key={j} className="flex items-center gap-2">
                                    <span className="text-xs text-gray-300 bg-charcoal-900 px-2 py-1 rounded border border-charcoal-700">{conn}</span>
                                    {j < net.connections.length - 1 && <span className="text-gray-600 text-xs">—</span>}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {selectedComponent && (
                  <div className="w-[320px] bg-charcoal-800 border-l border-charcoal-700 z-20 flex flex-col shadow-[-10px_0_20px_rgba(0,0,0,0.3)] shrink-0">
                    <div className="h-16 flex items-center justify-between px-6 border-b border-charcoal-700 bg-charcoal-900 shrink-0">
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Search size={16} className="text-cyan-accent" /> Component Intel
                      </h3>
                      <button onClick={() => setSelectedComponent(null)} className="text-gray-500 hover:text-white">
                        <X size={18} />
                      </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-6">
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white mb-1">{selectedComponent.name}</h2>
                        <p className="text-sm text-cyan-accent">{selectedComponent.type} ({selectedComponent.id})</p>
                      </div>

                      {!selectedComponent.intelligence ? (
                        <div className="text-sm text-gray-500 italic flex items-center gap-2 bg-charcoal-900 p-4 rounded-lg border border-charcoal-700">
                          <AlertTriangle size={16} /> No intelligence data available.
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Supply Chain</h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-charcoal-900 p-3 rounded-lg border border-charcoal-700">
                                <div className="text-gray-500 mb-1 flex items-center gap-1"><DollarSign size={12} /> Unit Price</div>
                                <div className="text-green-400 font-mono font-bold">{selectedComponent.intelligence.price}</div>
                              </div>
                              <div className="bg-charcoal-900 p-3 rounded-lg border border-charcoal-700">
                                <div className="text-gray-500 mb-1 flex items-center gap-1"><Package size={12} /> Status</div>
                                <div className="text-white text-sm font-bold">{selectedComponent.intelligence.stock}</div>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Specifications</h4>
                            <div className="bg-charcoal-900 rounded-lg border border-charcoal-700 divide-y divide-charcoal-700">
                              {Object.entries(selectedComponent.intelligence.specs).map(([key, value], i) => (
                                <div key={i} className="p-3 flex justify-between items-center text-sm">
                                  <span className="text-gray-400">{key}</span>
                                  <span className="text-white font-mono">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-3">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2"><Shuffle size={14} /> Drop-in Alternatives</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedComponent.intelligence.alternatives.map((alt, i) => (
                                <span key={i} className="text-xs bg-charcoal-700 border border-charcoal-600 px-2 py-1 rounded text-gray-300">
                                  {alt}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </main>
            </div>
          ) : activeTab === 'schematic' ? (
            // ==========================================
            // SCHEMATIC WORKSPACE (Moved to second icon)
            // ==========================================
            <div className="flex-1 flex flex-col w-full h-full bg-white text-black font-sans">
              {/* Top Menu Bar exactly like CircuitLab */}
              <header className="h-8 flex items-center justify-between px-4 bg-[#2b2b2b] text-gray-300 text-xs shrink-0 z-20 border-b border-black">
                <div className="flex items-center gap-4">
                  <div className="font-bold text-white text-[15px] tracking-widest flex items-center gap-1 leading-none">
                    <Activity size={18} /> CIRCUIT<span className="font-light">LAB</span>
                  </div>
                  <div className="flex gap-4 ml-2 mt-1">
                    <span className="cursor-pointer hover:text-white" onClick={() => setActiveTab('kicad')}>File ▾</span>
                    <span className="cursor-pointer hover:text-cyan-400 font-semibold" onClick={() => setActiveTab('kicad')}>KiCad/SKiDL Export ▾</span>
                    <span className="cursor-pointer hover:text-white">Help ▾</span>
                  </div>
                </div>
                <div className="text-right flex items-center gap-3">
                  <button 
                    onClick={() => setActiveTab('kicad')}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white px-2.5 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
                  >
                    <FileCode2 size={12} /> Export KiCad / SKiDL
                  </button>
                  <div className="flex flex-col justify-center leading-tight">
                    <div className="text-[#a0a0a0] text-[10px]">Hi there, Circuit Lab (CircuitLab)</div>
                    <div className="text-yellow-500 text-[10px]">Warning unsaved changes! Now editing: Unnamed Circuit</div>
                  </div>
                </div>
              </header>

              <main className="flex-1 flex relative overflow-hidden">
                
                {/* Left Component Sidebar */}
                <div className="w-48 bg-[#f5f5f5] border-r border-[#ccc] flex flex-col z-10 shrink-0 overflow-y-auto">
                   
                   {/* Essentials */}
                   <div className="bg-[#555] text-white text-[10px] font-bold py-1 px-2 border-b border-[#333]">Essentials</div>
                   <div className="flex p-2 gap-2 border-b border-[#ddd] bg-[#e0e0e0]">
                     <div className="border border-gray-400 bg-white rounded p-1 flex flex-col items-center justify-center w-12 h-12 cursor-pointer shadow-sm text-[8px] font-bold leading-tight text-center">
                       <div className="border border-black px-1 mb-0.5">NAME</div>NODE
                     </div>
                     <div className="border border-gray-400 bg-white rounded p-1 flex flex-col items-center justify-center w-12 h-12 cursor-pointer shadow-sm text-[8px] font-bold">
                       WIRE
                       <div className="w-6 h-px bg-black mt-1.5 relative"><div className="absolute -left-1 -top-1 w-2 h-2 rounded-full border border-black bg-white"></div><div className="absolute -right-1 -top-1 w-2 h-2 rounded-full border border-black bg-white"></div></div>
                     </div>
                   </div>

                   {/* Ideal Sources */}
                   <div className="bg-[#555] text-white text-[10px] font-bold py-1 px-2 border-b border-[#333]">Ideal Sources</div>
                   <div className="flex p-2 gap-2 border-b border-[#ddd] bg-[#e0e0e0]">
                     <div className="border border-gray-400 bg-white rounded p-1 flex flex-col items-center justify-center w-12 h-12 cursor-pointer shadow-sm">
                       <div className="w-6 h-6 rounded-full border border-black flex flex-col items-center justify-center text-[10px] leading-none"><span>+</span><span>-</span></div>
                     </div>
                     <div className="border border-gray-400 bg-white rounded p-1 flex flex-col items-center justify-center w-12 h-12 cursor-pointer shadow-sm">
                       <div className="w-6 h-6 rounded-full border border-black flex items-center justify-center"><div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[6px] border-b-black"></div></div>
                     </div>
                   </div>

                   {/* Passive Elements */}
                   <div className="bg-[#555] text-white text-[10px] font-bold py-1 px-2 border-b border-[#333]">Passive Elements</div>
                   <div className="flex p-2 gap-2 border-b border-[#ddd] bg-[#e0e0e0]">
                     <div className="border border-gray-400 bg-white rounded p-1 flex flex-col items-center justify-center w-12 h-12 cursor-pointer shadow-sm">
                       <svg width="20" height="20" viewBox="0 0 20 20"><path d="M10,0 L10,3 L15,5 L5,9 L15,13 L5,17 L10,19 L10,20" fill="none" stroke="black" strokeWidth="1.5"/></svg>
                     </div>
                     <div className="border border-gray-400 bg-white rounded p-1 flex flex-col items-center justify-center w-12 h-12 cursor-pointer shadow-sm">
                       <svg width="20" height="20" viewBox="0 0 20 20"><path d="M10,0 L10,8 M5,8 L15,8 M5,12 L15,12 M10,12 L10,20" fill="none" stroke="black" strokeWidth="1.5"/></svg>
                     </div>
                   </div>

                   {/* Signal Sources */}
                   <div className="bg-[#555] text-white text-[10px] font-bold py-1 px-2 border-b border-[#333]">Signal Sources</div>
                   <div className="flex p-2 gap-2 border-b border-[#ddd] bg-[#e0e0e0]">
                     <div className="border border-gray-400 bg-white rounded p-1 flex flex-col items-center justify-center w-12 h-12 cursor-pointer shadow-sm">
                       <div className="w-6 h-6 rounded-full border border-black flex items-center justify-center">
                         <svg width="12" height="12" viewBox="0 0 12 12"><path d="M0,6 Q3,0 6,6 T12,6" fill="none" stroke="black" strokeWidth="1"/></svg>
                       </div>
                     </div>
                     <div className="border border-gray-400 bg-white rounded p-1 flex flex-col items-center justify-center w-12 h-12 cursor-pointer shadow-sm">
                       <div className="w-6 h-6 rounded-full border border-black flex items-center justify-center">
                         <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[6px] border-b-black"></div>
                       </div>
                     </div>
                   </div>

                   {/* Operational Amplifiers */}
                   <div className="bg-[#555] text-white text-[10px] font-bold py-1 px-2 border-b border-[#333]">Operational Amplifiers</div>
                   <div className="flex p-2 gap-2 border-b border-[#ddd] bg-[#e0e0e0]">
                     <div className="border border-gray-400 bg-white rounded p-1 flex flex-col items-center justify-center w-16 h-12 cursor-pointer shadow-sm">
                       <svg width="30" height="20" viewBox="0 0 30 20">
                         <path d="M5,2 L15,10 L5,18 Z" fill="none" stroke="black" strokeWidth="1.5"/>
                         <path d="M0,6 L5,6 M0,14 L5,14 M15,10 L20,10" stroke="black" strokeWidth="1.5"/>
                       </svg>
                     </div>
                   </div>
                   
                   {/* Diodes */}
                   <div className="bg-[#555] text-white text-[10px] font-bold py-1 px-2 border-b border-[#333]">Diodes</div>
                   <div className="flex p-2 gap-2 border-b border-[#ddd] bg-[#e0e0e0] flex-1">
                     <div className="border border-gray-400 bg-white rounded p-1 flex flex-col items-center justify-center w-12 h-12 cursor-pointer shadow-sm">
                       <svg width="20" height="20" viewBox="0 0 20 20"><path d="M10,0 L10,6 M5,6 L15,6 L10,14 Z M5,14 L15,14 M10,14 L10,20" fill="none" stroke="black" strokeWidth="1.5"/></svg>
                     </div>
                   </div>
                </div>

                {/* White Checked Canvas */}
                <div className="flex-1 relative overflow-hidden" 
                     style={{ 
                       backgroundColor: '#ffffff',
                       backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', 
                       backgroundSize: '20px 20px',
                       backgroundPosition: '-10px -10px'
                     }}>
                  
                  {/* Schematic SVG Area */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {!circuit ? (
                      <div className="text-[#888] font-bold text-lg border-2 border-dashed border-[#ccc] p-8 rounded-xl bg-white/50 select-none flex flex-col items-center gap-3">
                        <span>No circuit data. Ask the AI to generate a design.</span>
                        <button 
                          onClick={loadDemoCircuit}
                          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold cursor-pointer shadow flex items-center gap-1.5 transition-colors"
                        >
                          <Sparkles size={14} /> Load Demo Circuit (TPS54331)
                        </button>
                      </div>
                    ) : (
                      <svg width="800" height="500" viewBox="0 0 800 500" className="overflow-visible select-none drop-shadow-sm">
                        
                        {/* Wires */}
                        {/* VIN */}
                        <path d="M 150 170 L 350 170" stroke="#555" strokeWidth="2" fill="none" />
                        <path d="M 250 170 L 250 200" stroke="#555" strokeWidth="2" fill="none" />
                        <circle cx="250" cy="170" r="3.5" fill="#555" />
                        
                        {/* GND line */}
                        <path d="M 250 350 L 650 350" stroke="#555" strokeWidth="2" fill="none" />
                        {/* C1 to GND */}
                        <path d="M 250 220 L 250 350" stroke="#555" strokeWidth="2" fill="none" />
                        <circle cx="250" cy="350" r="3.5" fill="#555" />
                        
                        {/* U1 GND */}
                        <path d="M 450 270 L 480 270 L 480 350" stroke="#555" strokeWidth="2" fill="none" />
                        <circle cx="480" cy="350" r="3.5" fill="#555" />
                        
                        {/* PH to Inductor */}
                        <path d="M 450 210 L 500 210" stroke="#555" strokeWidth="2" fill="none" />
                        {/* D1 down to GND */}
                        <path d="M 480 210 L 480 240" stroke="#555" strokeWidth="2" fill="none" />
                        <circle cx="480" cy="210" r="3.5" fill="#555" />
                        <path d="M 480 260 L 480 350" stroke="#555" strokeWidth="2" fill="none" />
                        
                        {/* L1 to VOUT */}
                        <path d="M 540 210 L 700 210" stroke="#555" strokeWidth="2" fill="none" />
                        
                        {/* C2 down to GND */}
                        <path d="M 650 210 L 650 230" stroke="#555" strokeWidth="2" fill="none" />
                        <circle cx="650" cy="210" r="3.5" fill="#555" />
                        <path d="M 650 250 L 650 350" stroke="#555" strokeWidth="2" fill="none" />
                        <circle cx="650" cy="350" r="3.5" fill="#555" />

                        {/* VSENSE feedback */}
                        <path d="M 680 210 L 680 250 L 450 250" stroke="#555" strokeWidth="2" fill="none" />
                        <circle cx="680" cy="210" r="3.5" fill="#555" />

                        {/* GND Symbols */}
                        <path d="M 435 350 L 465 350 L 450 370 Z" fill="white" stroke="#555" strokeWidth="2" />

                        {/* --- COMPONENTS --- */}

                        {/* U1: TPS54331 */}
                        <g className="cursor-pointer">
                          <rect x="350" y="150" width="100" height="140" fill="#fafafa" stroke="#333" strokeWidth="2" />
                          <text x="400" y="210" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#333" textAnchor="middle">
                            {circuit.components.find(c => c.id === 'U1')?.id || 'U1'}
                          </text>
                          <text x="400" y="228" fontFamily="sans-serif" fontSize="11" fill="#666" textAnchor="middle">
                            {circuit.components.find(c => c.id === 'U1')?.name || 'IC'}
                          </text>
                          {/* Pins Left */}
                          <text x="355" y="174" fontFamily="sans-serif" fontSize="10" fill="#444">VIN</text>
                          <text x="355" y="214" fontFamily="sans-serif" fontSize="10" fill="#444">EN</text>
                          <text x="355" y="254" fontFamily="sans-serif" fontSize="10" fill="#444">SS</text>
                          <text x="355" y="274" fontFamily="sans-serif" fontSize="10" fill="#444">COMP</text>
                          {/* Pins Right */}
                          <text x="445" y="174" fontFamily="sans-serif" fontSize="10" fill="#444" textAnchor="end">BOOT</text>
                          <text x="445" y="214" fontFamily="sans-serif" fontSize="10" fill="#444" textAnchor="end">PH</text>
                          <text x="445" y="254" fontFamily="sans-serif" fontSize="10" fill="#444" textAnchor="end">VSENSE</text>
                          <text x="445" y="274" fontFamily="sans-serif" fontSize="10" fill="#444" textAnchor="end">GND</text>
                        </g>

                        {/* VIN Node */}
                        <path d="M 110 170 L 120 155 L 150 155 L 150 185 L 120 185 Z" fill="white" stroke="#555" strokeWidth="1.5" />
                        <text x="135" y="174" fontFamily="sans-serif" fontSize="12" fontWeight="bold" fill="#333" textAnchor="middle">VIN</text>

                        {/* VOUT Node */}
                        <path d="M 700 155 L 740 155 L 750 170 L 740 185 L 700 185 Z" fill="white" stroke="#555" strokeWidth="1.5" />
                        <text x="720" y="174" fontFamily="sans-serif" fontSize="12" fontWeight="bold" fill="#333" textAnchor="middle">VOUT</text>

                        {/* C1: Input Cap */}
                        <path d="M 235 200 L 265 200 M 235 220 L 265 220" stroke="#555" strokeWidth="2.5" fill="none" />
                        <text x="275" y="205" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="#333">
                          {circuit.components.find(c => c.id === 'C1')?.id || 'C1'}
                        </text>
                        <text x="275" y="222" fontFamily="sans-serif" fontSize="12" fill="#666">
                          10μF
                        </text>

                        {/* D1: Schottky Diode */}
                        <path d="M 465 240 L 495 240 L 480 260 Z" fill="white" stroke="#555" strokeWidth="2" />
                        <path d="M 465 260 L 495 260" stroke="#555" strokeWidth="2" />
                        <text x="505" y="245" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="#333">
                          {circuit.components.find(c => c.id === 'D1')?.id || 'D1'}
                        </text>
                        <text x="505" y="262" fontFamily="sans-serif" fontSize="12" fill="#666">
                          Schottky
                        </text>

                        {/* L1: Inductor */}
                        <path d="M 500 210 Q 510 190 520 210 Q 530 190 540 210" fill="none" stroke="#555" strokeWidth="2.5" />
                        <text x="520" y="185" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="#333" textAnchor="middle">
                          {circuit.components.find(c => c.id === 'L1')?.id || 'L1'}
                        </text>
                        <text x="520" y="235" fontFamily="sans-serif" fontSize="12" fill="#666" textAnchor="middle">
                          10μH
                        </text>

                        {/* C2: Output Cap */}
                        <path d="M 635 230 L 665 230 M 635 250 L 665 250" stroke="#555" strokeWidth="2.5" fill="none" />
                        <text x="675" y="235" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="#333">
                          {circuit.components.find(c => c.id === 'C2')?.id || 'C2'}
                        </text>
                        <text x="675" y="252" fontFamily="sans-serif" fontSize="12" fill="#666">
                          47μF
                        </text>

                      </svg>
                    )}
                  </div>

                  {/* Bottom Toolbar */}
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#e0e0e0] border-t border-[#ccc] flex items-center justify-between px-2 text-[11px] text-[#333]">
                     <div className="flex gap-1 h-full py-1.5">
                       <button className="px-3 bg-white border border-[#bbb] rounded hover:bg-gray-50 flex items-center justify-center text-gray-500 shadow-sm"><Maximize size={12} /></button>
                       <button className="px-5 bg-white border border-[#bbb] rounded hover:bg-gray-50 font-bold shadow-sm text-gray-700">Build</button>
                       <button className="px-5 bg-white border border-[#bbb] rounded font-bold shadow-inner text-blue-600 bg-gray-100">Simulate</button>
                       <button onClick={() => setActiveTab('kicad')} className="px-3.5 bg-cyan-700 hover:bg-cyan-600 text-white rounded font-bold shadow-sm flex items-center gap-1.5 cursor-pointer transition-colors">
                         <FileCode2 size={12} /> KiCad / SKiDL
                       </button>
                     </div>
                     <div className="flex items-center gap-2 h-full py-1.5">
                       <button className="px-2 bg-white border border-[#bbb] rounded shadow-sm text-gray-500">🔍</button>
                       <div className="bg-white border border-[#bbb] rounded px-3 h-full flex items-center font-bold text-gray-700 shadow-inner">144%</div>
                       <button className="px-2 bg-white border border-[#bbb] rounded shadow-sm text-gray-500">⚙</button>
                     </div>
                  </div>
                </div>
              </main>
            </div>
          ) : activeTab === 'bom' ? (
            // ==========================================
            // BOM WORKSPACE
            // ==========================================
            <div className="flex-1 flex flex-col w-full h-full">
              <header className="h-16 flex items-center justify-between px-6 bg-charcoal-800 border-b border-charcoal-700 shrink-0 z-10">
                <h1 className="text-white font-semibold">Bill of Materials</h1>
                <div className="flex gap-4">
                  <button className="px-4 py-1.5 flex items-center gap-2 bg-charcoal-700 hover:bg-charcoal-600 text-gray-200 text-sm font-semibold rounded-lg transition-colors border border-charcoal-600">
                    <Download size={16} /> Export CSV
                  </button>
                  <button className="px-4 py-1.5 flex items-center gap-2 bg-cyan-accent text-charcoal-900 text-sm font-semibold rounded-lg hover:bg-teal-accent transition-colors shadow-[0_0_15px_rgba(0,210,255,0.3)]">
                    <DollarSign size={16} /> Purchase Cart
                  </button>
                </div>
              </header>
              <main className="flex-1 p-8 overflow-auto bg-[#0a0a0a]">
                {!circuit ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-50">
                    <ClipboardList size={48} className="mb-4 text-cyan-accent" />
                    <p>No architecture generated yet.</p>
                  </div>
                ) : (
                  <div className="max-w-6xl mx-auto">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                       <div className="bg-charcoal-800 border border-charcoal-700 rounded-xl p-6 shadow-lg">
                         <div className="text-gray-400 text-sm mb-1">Total Components</div>
                         <div className="text-3xl font-bold text-white">{circuit.components.length}</div>
                       </div>
                       <div className="bg-charcoal-800 border border-charcoal-700 rounded-xl p-6 shadow-lg">
                         <div className="text-gray-400 text-sm mb-1">Estimated Cost</div>
                         <div className="text-3xl font-bold text-green-400">${totalBOMCost.toFixed(2)}</div>
                       </div>
                       <div className="bg-charcoal-800 border border-charcoal-700 rounded-xl p-6 shadow-lg">
                         <div className="text-gray-400 text-sm mb-1">Supply Chain Risk</div>
                         <div className="text-3xl font-bold text-teal-accent">Low</div>
                       </div>
                    </div>

                    {/* BOM Table */}
                    <div className="bg-charcoal-800 border border-charcoal-700 rounded-xl overflow-hidden shadow-2xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-charcoal-900 border-b border-charcoal-700 text-xs uppercase tracking-wider text-gray-400">
                            <th className="p-4 font-semibold">Reference</th>
                            <th className="p-4 font-semibold">Part Number</th>
                            <th className="p-4 font-semibold">Description</th>
                            <th className="p-4 font-semibold">Qty</th>
                            <th className="p-4 font-semibold">Unit Price</th>
                            <th className="p-4 font-semibold">Availability</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-charcoal-700">
                          {circuit.components.map((comp) => (
                            <tr key={comp.id} className="hover:bg-charcoal-700/50 transition-colors">
                              <td className="p-4">
                                <span className="font-mono text-cyan-accent font-bold">{comp.id}</span>
                              </td>
                              <td className="p-4 text-white font-medium">
                                <a 
                                  href={`https://octopart.com/search?q=${encodeURIComponent(comp.name)}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="hover:text-cyan-accent hover:underline"
                                >
                                  {comp.name}
                                </a>
                              </td>
                              <td className="p-4 text-gray-400 text-sm">{comp.type}</td>
                              <td className="p-4 text-gray-300">1</td>
                              <td className="p-4 text-green-400 font-mono">{comp.intelligence?.price || '$—'}</td>
                              <td className="p-4">
                                <span className={`text-xs px-2 py-1 rounded-full border ${comp.intelligence?.stock?.includes('In Stock') ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-charcoal-600 text-gray-400 border-charcoal-500'}`}>
                                  {comp.intelligence?.stock || 'Unknown'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </main>
            </div>
          ) : activeTab === 'validation' ? (
            // ==========================================
            // VALIDATION WORKSPACE
            // ==========================================
            <div className="flex-1 flex flex-col w-full h-full">
              <header className="h-16 flex items-center justify-between px-6 bg-charcoal-800 border-b border-charcoal-700 shrink-0 z-10">
                <h1 className="text-white font-semibold">ERC & DRC Validation</h1>
                <button onClick={() => circuit && setEngineeringState(buildEngineeringState(messages[messages.length - 1]?.content || '', circuit))} className="px-4 py-1.5 flex items-center gap-2 bg-cyan-accent text-charcoal-900 text-sm font-semibold rounded-lg hover:bg-teal-accent transition-colors shadow-[0_0_15px_rgba(0,210,255,0.3)]">
                  <Play size={16} /> Run Full Check
                </button>
              </header>

              <main className="flex-1 p-8 overflow-auto bg-[#0a0a0a]">
                {!circuit ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-50">
                    <ShieldCheck size={48} className="mb-4 text-cyan-accent" />
                    <p>No architecture generated to validate.</p>
                  </div>
                ) : (
                  <div className="max-w-5xl mx-auto flex flex-col gap-8">
                    
                    {(() => {
                      const findings = engineeringState?.validation || buildEngineeringState('', circuit).validation;
                      const errors = findings.filter(finding => finding.severity === 'error').length;
                      const warnings = findings.filter(finding => finding.severity === 'warning').length;
                      const passed = findings.filter(finding => finding.severity === 'pass').length;
                      return <>
                        <div className={`bg-charcoal-800 border rounded-xl p-6 flex items-center justify-between ${errors ? 'border-red-500/30' : warnings ? 'border-yellow-500/30' : 'border-green-500/30'}`}>
                          <div><h2 className="text-lg font-bold text-white flex items-center gap-2 mb-1">{errors ? <XCircle size={20} className="text-red-400" /> : warnings ? <AlertTriangle size={20} className="text-yellow-400" /> : <CheckCircle2 size={20} className="text-green-400" />}{errors ? 'Review required' : warnings ? 'Review recommended' : 'Topology checks passed'}</h2><p className="text-sm text-gray-400">Rule-based architecture checks only. This is not a physical DRC, SPICE, or datasheet verification.</p></div>
                          <div className="flex gap-3"><div className="text-center"><div className="text-xl font-bold text-red-400">{errors}</div><div className="text-[10px] text-gray-500">ERRORS</div></div><div className="text-center"><div className="text-xl font-bold text-yellow-400">{warnings}</div><div className="text-[10px] text-gray-500">WARNINGS</div></div><div className="text-center"><div className="text-xl font-bold text-green-400">{passed}</div><div className="text-[10px] text-gray-500">PASSED</div></div></div>
                        </div>
                        <div className="bg-charcoal-800 border border-charcoal-700 rounded-xl overflow-hidden">{findings.map((finding, index) => <div key={finding.id} className={`p-4 flex gap-3 ${index ? 'border-t border-charcoal-700' : ''}`}><div>{finding.severity === 'error' ? <XCircle size={18} className="text-red-400" /> : finding.severity === 'warning' ? <AlertTriangle size={18} className="text-yellow-400" /> : <CheckCircle2 size={18} className="text-green-400" />}</div><div><div className="text-sm font-bold text-white">{finding.title}</div><p className="text-xs text-gray-400 mt-1">{finding.detail}</p>{finding.recommendation && <p className="text-xs text-cyan-accent mt-2">Recommended action: {finding.recommendation}</p>}</div></div>)}</div>
                      </>;
                    })()}

                  </div>
                )}
              </main>
            </div>
          ) : activeTab === 'simulation' ? (
            // ==========================================
            // SIMULATION WORKSPACE (Phase 13)
            // ==========================================
            <div className="flex-1 flex flex-col w-full h-full">
              <header className="h-16 flex items-center justify-between px-6 bg-charcoal-800 border-b border-charcoal-700 shrink-0 z-10">
                <div className="flex items-center gap-4">
                  <h1 className="text-white font-semibold">SPICE Simulation Engine</h1>
                  <span className="bg-cyan-accent/10 text-cyan-accent text-xs px-2 py-1 rounded border border-cyan-accent/30 font-mono">ngspice</span>
                </div>
                <div className="flex gap-4">
                  <select className="bg-charcoal-900 border border-charcoal-700 text-sm text-gray-300 rounded p-1.5 focus:outline-none">
                    <option>Transient Analysis (.tran)</option>
                    <option>AC Sweep (.ac)</option>
                    <option>DC Operating Point (.op)</option>
                  </select>
                  <button 
                    onClick={runSimulation}
                    disabled={isSimulating}
                    className="px-4 py-1.5 flex items-center gap-2 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-400 transition-colors shadow-[0_0_15px_rgba(34,197,94,0.3)] disabled:opacity-50"
                  >
                    <PlayCircle size={16} /> {isSimulating ? 'Running...' : 'Run Simulation'}
                  </button>
                </div>
              </header>

              <main className="flex-1 flex relative overflow-hidden bg-[#0a0a0a]">
                
                {/* Probes Panel */}
                <div className="w-[250px] bg-charcoal-900 border-r border-charcoal-700 p-4 shrink-0 flex flex-col gap-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Probes</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-charcoal-800 border border-charcoal-700 p-2 rounded cursor-pointer hover:border-green-400/50">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        <span className="text-sm font-mono text-gray-200">V(VOUT)</span>
                      </div>
                      <Eye size={14} className="text-gray-400" />
                    </div>

                    <div className="flex items-center justify-between bg-charcoal-800 border border-charcoal-700 p-2 rounded cursor-pointer hover:border-cyan-accent/50">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-cyan-accent"></div>
                        <span className="text-sm font-mono text-gray-200">V(SW_NODE)</span>
                      </div>
                      <Eye size={14} className="text-gray-400" />
                    </div>

                    <div className="flex items-center justify-between bg-charcoal-800 border border-charcoal-700 p-2 rounded cursor-pointer hover:border-red-500/50">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-sm font-mono text-gray-200">V(VIN)</span>
                      </div>
                      <Eye size={14} className="text-gray-400" />
                    </div>
                  </div>

                  <button className="mt-2 w-full py-2 border border-charcoal-600 border-dashed rounded text-xs text-gray-400 hover:text-white hover:border-gray-400 transition-colors">
                     + Add Probe
                  </button>
                </div>

                {/* Oscilloscope Graph View */}
                <div className="flex-1 p-6 relative flex flex-col">
                  {/* Graph Metadata */}
                  <div className="absolute top-8 right-8 flex gap-4 text-xs font-mono z-10">
                     <span className="text-gray-500">Time: 0 to 5ms</span>
                     <span className="text-gray-500">Step: 1µs</span>
                  </div>

                  {/* SVG Graph Canvas */}
                  <div className="flex-1 bg-charcoal-900 border border-charcoal-700 rounded-lg relative overflow-hidden shadow-inner flex flex-col items-center justify-center">
                    {/* Grid Lines */}
                    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '10% 10%' }}></div>
                    
                    {/* Y-Axis Labels */}
                    <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-between py-4 text-[10px] text-gray-600 font-mono pointer-events-none z-10">
                      <span>15V</span><span>10V</span><span>5V</span><span>0V</span>
                    </div>

                    {isSimulating ? (
                      <div className="z-10 flex flex-col items-center text-cyan-accent animate-pulse">
                        <Activity size={32} className="mb-2" />
                        <span>Running ngspice kernel...</span>
                      </div>
                    ) : !simFinished ? (
                      <div className="z-10 flex flex-col items-center text-gray-500">
                        <LineChart size={32} className="mb-2 opacity-50" />
                        <span>No simulation data. Click 'Run Simulation'.</span>
                      </div>
                    ) : (
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 100">
                        {/* V(VIN) - Solid Red at 12V */}
                        <polyline points="0,20 1000,20" fill="none" stroke="#ef4444" strokeWidth="2" className="opacity-80" />
                        
                        {/* V(SW_NODE) - Square Wave Cyan between 0 and 12V */}
                        <polyline points="0,100 50,100 50,20 100,20 100,100 150,100 150,20 200,20 200,100 250,100 250,20 300,20 300,100 350,100 350,20 400,20 400,100 450,100 450,20 500,20 500,100 550,100 550,20 600,20 600,100 650,100 650,20 700,20 700,100 750,100 750,20 800,20 800,100 850,100 850,20 900,20 900,100 950,100 950,20 1000,20" fill="none" stroke="#00d2ff" strokeWidth="1.5" className="opacity-90" />
                        
                        {/* V(VOUT) - Slow ramp up to 5V, then slight ripple */}
                        <path d="M 0 100 Q 100 100 150 66 T 300 66 T 450 66 T 600 66 T 750 66 T 900 66 T 1000 66" fill="none" stroke="#4ade80" strokeWidth="3" className="drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]" />
                      </svg>
                    )}

                    {/* X-Axis Labels */}
                    <div className="absolute bottom-2 left-0 right-0 flex justify-between px-10 text-[10px] text-gray-600 font-mono pointer-events-none z-10">
                      <span>0ms</span><span>1ms</span><span>2ms</span><span>3ms</span><span>4ms</span><span>5ms</span>
                    </div>
                  </div>
                </div>

              </main>
            </div>
          ) : activeTab === 'rag' ? (
            // ==========================================
            // RAG PIPELINE WORKSPACE (Phase 14)
            // ==========================================
            <div className="flex-1 flex flex-col w-full h-full bg-[#0a0a0a]">
              <header className="h-16 flex items-center justify-between px-6 bg-charcoal-800 border-b border-charcoal-700 shrink-0 z-10">
                <div className="flex items-center gap-4">
                  <h1 className="text-white font-semibold">Knowledge Base (RAG)</h1>
                  <span className={`text-xs px-2 py-1 rounded-full border font-mono ${isRagInitialized ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-charcoal-700 text-gray-400 border-charcoal-600'}`}>
                    Vector DB: {isRagInitialized ? 'Online' : 'Offline'}
                  </span>
                </div>
                <button 
                  onClick={handleRagInit}
                  disabled={isRagInitialized || isUploading}
                  className="px-4 py-1.5 flex items-center gap-2 bg-cyan-accent text-charcoal-900 text-sm font-semibold rounded-lg hover:bg-teal-accent transition-colors shadow-[0_0_15px_rgba(0,210,255,0.3)] disabled:opacity-50 disabled:shadow-none"
                >
                  <Server size={16} /> {isUploading ? 'Initializing...' : isRagInitialized ? 'Database Active' : 'Initialize Vector DB'}
                </button>
              </header>

              <main className="flex-1 p-8 overflow-auto">
                <div className="max-w-5xl mx-auto flex flex-col gap-8">
                  
                  {/* Pipeline Visualization */}
                  <div className="bg-charcoal-800 border border-charcoal-700 rounded-xl p-8 shadow-lg">
                    <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                      <Activity size={16} className="text-cyan-accent" /> Ingestion Pipeline
                    </h3>
                    <div className="flex items-center justify-between relative">
                      {/* Connecting Line */}
                      <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-charcoal-600 -translate-y-1/2 z-0"></div>
                      
                      {/* Step 1: PDF Parsing */}
                      <div className="flex flex-col items-center gap-3 z-10">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 ${isRagInitialized ? 'bg-charcoal-900 border-cyan-accent text-cyan-accent' : 'bg-charcoal-900 border-charcoal-600 text-gray-500'}`}>
                          <FileText size={28} />
                        </div>
                        <div className="text-center">
                          <div className="text-white font-bold text-sm">PDF Parser</div>
                          <div className="text-xs text-gray-400">Extracts text/tables</div>
                        </div>
                      </div>

                      {/* Step 2: Chunking */}
                      <div className="flex flex-col items-center gap-3 z-10">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 ${isRagInitialized ? 'bg-charcoal-900 border-teal-accent text-teal-accent' : 'bg-charcoal-900 border-charcoal-600 text-gray-500'}`}>
                          <Layers size={28} />
                        </div>
                        <div className="text-center">
                          <div className="text-white font-bold text-sm">Chunking Engine</div>
                          <div className="text-xs text-gray-400">Semantic splitting</div>
                        </div>
                      </div>

                      {/* Step 3: Embedding */}
                      <div className="flex flex-col items-center gap-3 z-10">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 ${isRagInitialized ? 'bg-charcoal-900 border-blue-400 text-blue-400' : 'bg-charcoal-900 border-charcoal-600 text-gray-500'}`}>
                          <Activity size={28} />
                        </div>
                        <div className="text-center">
                          <div className="text-white font-bold text-sm">Embedding Model</div>
                          <div className="text-xs text-gray-400">text-embedding-ada</div>
                        </div>
                      </div>

                      {/* Step 4: Vector DB */}
                      <div className="flex flex-col items-center gap-3 z-10">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 ${isRagInitialized ? 'bg-charcoal-900 border-green-400 text-green-400 shadow-[0_0_20px_rgba(74,222,128,0.2)]' : 'bg-charcoal-900 border-charcoal-600 text-gray-500'}`}>
                          <Database size={28} />
                        </div>
                        <div className="text-center">
                          <div className="text-white font-bold text-sm">Vector Store</div>
                          <div className="text-xs text-gray-400">Pinecone / Milvus</div>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    {/* Upload Section */}
                    <div>
                      <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                        <UploadCloud size={16} className="text-teal-accent" /> Upload Datasheets
                      </h3>
                      <div 
                        className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-colors ${isRagInitialized && !isProcessingPdf ? 'border-charcoal-600 hover:border-cyan-accent bg-charcoal-800/50 cursor-pointer' : 'border-charcoal-700 bg-charcoal-900/50 opacity-50 cursor-not-allowed'}`}
                        onClick={() => isRagInitialized && !isProcessingPdf && fileInputRef.current?.click()}
                      >
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          className="hidden" 
                          accept=".pdf" 
                          onChange={handleFileUpload} 
                        />
                        <UploadCloud size={48} className={`mb-4 ${isProcessingPdf ? 'text-cyan-accent animate-bounce' : 'text-gray-500'}`} />
                        <h4 className="text-white font-bold mb-2">
                          {isProcessingPdf ? 'Processing Document...' : 'Drag & Drop PDFs here'}
                        </h4>
                        <p className="text-xs text-gray-400 max-w-[250px]">
                          {isProcessingPdf ? pdfProgressText : "Upload component datasheets to ground the AI's architecture decisions."}
                        </p>
                        {!isRagInitialized && (
                          <div className="mt-4 text-xs text-red-400 font-bold bg-red-500/10 px-3 py-1 rounded">
                            Initialize Vector DB first
                          </div>
                        )}
                        {isProcessingPdf && (
                          <div className="mt-4 w-full max-w-[200px] h-1 bg-charcoal-700 rounded-full overflow-hidden relative">
                            <div className="absolute top-0 bottom-0 left-0 bg-cyan-accent animate-[pulse_1s_ease-in-out_infinite]" style={{width: '60%'}}></div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Knowledge Base Section */}
                    <div>
                      <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                        <BookOpen size={16} className="text-blue-400" /> Indexed Documents
                      </h3>
                      <div className="bg-charcoal-800 border border-charcoal-700 rounded-xl overflow-hidden flex flex-col h-[260px]">
                        {!isRagInitialized ? (
                          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm italic">
                            Database is offline.
                          </div>
                        ) : (
                          <div className="divide-y divide-charcoal-700 overflow-y-auto">
                            
                            {ragDocuments.map((doc, idx) => (
                              <div key={idx} className="p-4 hover:bg-charcoal-700/50 transition-colors flex items-center gap-4">
                                <div className="w-10 h-10 rounded bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
                                  <FileText size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-bold text-white truncate">{doc.name}</div>
                                  <div className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                                    <span>{doc.pages} Pages</span>
                                    <span>•</span>
                                    <span className="text-cyan-accent">{doc.chunks} Chunks</span>
                                  </div>
                                </div>
                                <CheckCircle2 size={16} className="text-green-400 shrink-0" />
                              </div>
                            ))}

                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </main>
            </div>
          ) : activeTab === 'kicad' ? (
            <KicadWorkspace circuit={circuit} onLoadDemoCircuit={loadDemoCircuit} />
          ) : null}
        </div>
      </div>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-charcoal-800 border border-charcoal-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-700 bg-charcoal-900">
              <div className="flex items-center gap-2">
                <Settings size={18} className="text-cyan-accent" />
                <h3 className="text-white font-bold text-base">API & AI Model Settings</h3>
              </div>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5 text-sm">
              <div>
                <label className="block text-gray-300 font-medium mb-1.5 flex items-center justify-between">
                  <span>Nebius Token Factory API Key</span>
                  <a 
                    href="https://api.tokenfactory.nebius.com/docs"
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs text-cyan-accent hover:underline flex items-center gap-1"
                  >
                    Nebius API documentation <ExternalLink size={11} />
                  </a>
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={tempApiKey}
                    onChange={(e) => {
                      setTempApiKey(e.target.value);
                      setKeyValidationStatus({ status: 'idle' });
                    }}
                    placeholder="sk-or-v1-..."
                    className="flex-1 bg-charcoal-900 border border-charcoal-700 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-cyan-accent"
                  />
                  <button
                    type="button"
                    disabled={keyValidationStatus.status === 'validating'}
                    onClick={() => handleValidateKey(tempApiKey)}
                    className="px-3 py-2 bg-charcoal-700 hover:bg-charcoal-600 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {keyValidationStatus.status === 'validating' ? (
                      <>
                        <RefreshCw size={13} className="animate-spin text-cyan-accent" /> Testing...
                      </>
                    ) : (
                      'Test Key'
                    )}
                  </button>
                </div>

                {keyValidationStatus.status === 'valid' && (
                  <p className="mt-2 text-xs text-green-400 flex items-center gap-1.5 bg-green-950/40 border border-green-700/40 p-2 rounded">
                    <CheckCircle2 size={13} className="shrink-0" />
                    <span>{keyValidationStatus.message}</span>
                  </p>
                )}
                {keyValidationStatus.status === 'invalid' && (
                  <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5 bg-red-950/40 border border-red-700/40 p-2 rounded">
                    <AlertTriangle size={13} className="shrink-0" />
                    <span>{keyValidationStatus.message}</span>
                  </p>
                )}
                <p className="mt-1.5 text-xs text-gray-500">
                  For this local prototype, the key is stored in browser localStorage. Use a server-side proxy before production deployment so the key is never exposed to visitors.
                </p>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1.5">
                  AI Model
                </label>
                <select
                  value={tempModel}
                  onChange={(e) => setTempModel(e.target.value)}
                  className="w-full bg-charcoal-900 border border-charcoal-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-cyan-accent cursor-pointer"
                >
                  <option value="nvidia/Nemotron-3_5-Lightning">NVIDIA Nemotron 3.5 Lightning — fast agent workflow</option>
                  <option value="nvidia/Nemotron-3-Nano-30B-A3B">NVIDIA Nemotron 3 Nano — efficient workflow</option>
                  <option value="nvidia/Nemotron-3-Super-120B-A12B">NVIDIA Nemotron 3 Super — complex reasoning</option>
                  <option value="custom">Custom Nebius model ID...</option>
                </select>
                {tempModel === 'custom' && (
                  <input
                    type="text"
                    value={customModelInput}
                    placeholder="Enter a Nebius Token Factory model ID"
                    onChange={(e) => setCustomModelInput(e.target.value)}
                    className="mt-2 w-full bg-charcoal-900 border border-charcoal-700 rounded-lg px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-cyan-accent"
                  />
                )}
              </div>

              <div className="bg-charcoal-900/80 border border-charcoal-700/60 rounded-xl p-3 text-xs text-gray-400 space-y-1">
                <div className="font-semibold text-gray-300 flex items-center gap-1.5">
                  <Sparkles size={13} className="text-cyan-accent" /> Offline Circuit Synthesizer
                </div>
                <p>
                  If Nebius is unavailable or no key is configured, CircuitMind keeps the project open and supports deterministic local workflows for <strong>Voltage Dividers</strong>, <strong>TPS54331 Buck Regulators</strong>, <strong>555 Timers</strong>, and <strong>LDO Regulators</strong>. Local results are visibly labeled as non-AI fallback output.
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-charcoal-900 border-t border-charcoal-700 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-400 hover:text-white hover:bg-charcoal-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveSettings}
                className="px-5 py-2 rounded-lg text-xs font-bold bg-cyan-accent text-charcoal-900 hover:opacity-90 shadow-md transition-all cursor-pointer"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NavIcon({ icon, label, active = false, onClick, tooltip }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void, tooltip?: string }) {
  return (
    <div 
      onClick={onClick}
      className={`p-2.5 w-full rounded-md flex items-center gap-3 cursor-pointer transition-all text-[11px] font-bold tracking-wide ${
        active ? 'bg-charcoal-700 text-white shadow-inner' : 'text-gray-400 hover:text-white hover:bg-charcoal-700'
      }`}
      title={tooltip}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
