# CircuitMind AI — Hackathon Readiness

## Evidence-based scorecard

| Criterion | Score | Current evidence | Highest-value improvement |
| --- | ---: | --- | --- |
| Technological implementation | 3/5 | React circuit workspace, structured graph, deterministic validation, KiCad/SKiDL export | Add a minimal server-side Nebius proxy and integration test |
| Design | 4/5 | Cohesive dark engineering workspace, graph canvas, right-side copilot | Replace static schematic mock with graph-driven rendering |
| Potential impact | 4/5 | Reduces the gap from natural language to editable circuit artifacts | Demonstrate a complete ESP32 reference workflow |
| Quality of idea | 4/5 | Requirement-to-validation workflow, not merely a chat response | Add approval-backed correction actions |
| Nebius/Nemotron integration | 3/5 | Configurable Token Factory endpoint and NVIDIA Nemotron model IDs | Run and record a live Nebius smoke test |
| Agentic workflow | 3/5 | Structured requirement, graph, and validation stages are displayed | Add explicit tool-call and correction history |
| Demo readiness | 3/5 | Built-in circuit flows and graceful fallback | Create a scripted 3-minute demo with an intentional topology issue |

## Current architecture

- **Frontend:** a single React + TypeScript + Vite app in `web-app/`.
- **State:** component-local React state in `src/App.tsx`; no backend, database, or Tauri project exists in this repository.
- **AI:** browser-side OpenAI-compatible call to Nebius Token Factory, configured for NVIDIA Nemotron. A key must be treated as development-only until a backend proxy exists.
- **Circuit model:** `CircuitData` component and net graph, converted into SKiDL/KiCad artifacts by `src/utils/kicadSkidlGenerator.ts`.
- **Engineering workflow:** deterministic requirement extraction and topology validation in `src/utils/engineeringAgent.ts`.

## P0 — before submission

1. Configure a real Nebius Token Factory key and demonstrate `nvidia/Nemotron-3_5-Lightning` successfully generating a structured circuit graph.
2. Record a short end-to-end demo: requirement → missing specifications → graph → topology validation → KiCad/SKiDL export.
3. Keep all prototype-only capabilities labeled accurately. Do not call the current simulation, RAG, supplier, or DRC screens live services.
4. Add a server-side proxy before any public deployment; never publish a Token Factory key in a Vite bundle.
5. Add a license, repository screenshots, and a short architecture diagram.

## P1 — highest-value next work

- Implement approval-gated remediation actions from validation findings.
- Replace static schematic drawing with a renderer based on `CircuitData`.
- Add a local ESP32 temperature-monitor reference design with its assumptions clearly labeled.
- Persist project state and validation history in local storage or a local file.
- Add a real document parser/vector store only after it can cite source sections reliably.

## Avoid before judging

- Full PCB autorouting, a custom SPICE implementation, live multi-supplier integrations, authentication, or a large cloud backend. These add risk without improving the core demonstration proportionally.
