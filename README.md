# CircuitMind AI

CircuitMind AI is an AI engineering workspace for early-stage electronics design. It converts a natural-language requirement into a structured circuit graph, exposes missing specifications, records traceable design decisions, runs deterministic topology checks, and exports KiCad/SKiDL artifacts.

## Run locally

```powershell
cd web-app
npm install
npm run dev
```

Open the local address printed by Vite, normally `http://localhost:5173`.

## Technology

- React, TypeScript, Vite, and Tailwind CSS
- NVIDIA Nemotron through the Nebius Token Factory OpenAI-compatible API
- KiCad/SKiDL artifact generation and JSZip project-bundle export

## AI setup

Copy `.env.example` to `.env.local` and configure a Nebius Token Factory key:

```text
VITE_NEBIUS_API_KEY=your_key_here
VITE_NEBIUS_MODEL=nvidia/Nemotron-3_5-Lightning
```

The app calls `https://api.tokenfactory.nebius.com/v1/chat/completions`. The local settings modal can also configure a key for a development-only demo. **Do not use a browser-stored or `VITE_*` key in a public deployment**; use a server-side proxy instead.

## What is implemented

- Structured circuit components and nets, with KiCad/SKiDL artifact generation.
- Requirement extraction and unanswered-specification detection.
- Traceable state labels: user-provided, verified, recommendation, assumption, and requires confirmation.
- Deterministic circuit-topology checks for ground, power rails, disconnected components, TPS54331 enable wiring, and ESP32 3.3V rails.
- Graceful local circuit fallbacks when the AI service is unavailable.

## Current limitations

- The topology validator is **not** KiCad ERC/DRC, SPICE simulation, or datasheet verification.
- Supplier prices and stock shown in the starter designs are sample data, not live supplier data.
- RAG ingestion and simulation screens are prototype UI flows, not production document retrieval or SPICE execution.
- No server-side proxy is included yet; a production deployment must add one to protect API keys.

See [`docs/HACKATHON_READINESS.md`](docs/HACKATHON_READINESS.md) for the evidence-based scope and next priorities.

## Notes

The app includes local demo flows for several common circuits, so an AI API key is optional. Never commit API keys or `.env` files; use `web-app/.env.example` as the configuration template.
