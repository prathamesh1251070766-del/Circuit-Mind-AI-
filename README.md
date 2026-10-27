# CircuitMind AI

CircuitMind AI is an AI-powered circuit-design copilot. Describe an electronics idea in natural language and the app helps structure circuit constraints, components, nets, BOM information, and KiCad/SKiDL export artifacts.

## Run locally

```powershell
cd web-app
npm install
npm run dev
```

Open the local address printed by Vite, normally `http://localhost:5173`.

## Technology

- React, TypeScript, Vite, and Tailwind CSS
- OpenRouter-compatible AI models for custom circuit generation
- KiCad/SKiDL artifact generation and JSZip project-bundle export

## Notes

The app includes local demo flows for several common circuits, so an AI API key is optional. Never commit API keys or `.env` files; use `web-app/.env.example` as the configuration template.
