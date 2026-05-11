# GT-05 — Centrifugal Compressor Learning Module

Login-gated interactive learning module for the GT-05 session of ProReadyEngineer's *Small Jet Engine Design Training*.

Live at: **smallgasturbine.gt-05.proreadyengineer.com**

## Stack

- Vite 8 + React 19 (static SPA)
- Authenticates against `combustion-toolkit-api.onrender.com` via JWT (`/auth/login`, `/auth/me`)
- Per-user progress stored in browser `localStorage` only — no backend writes
- Hosted on Cloudflare Pages

## Pedagogy

Implements the full ProReadyEngineer instructional-design framework:

1. **Needs analysis** intake on first sign-in (level, goal, time, modality, obstacles)
2. **Bloom-aligned learning outcomes** with measurable action verbs at each level
3. **Scaffolded modules** — 11 sections, simple → complex
4. **Active learning probes** (concept-check, error-identification, application, redirected) after every 2–3 concepts; never more than 3 concepts without engagement
5. **Mastery-learning loop** — formative checks gate progression; reteach on incorrect, advance only when mastered
6. **Worked-example calculator** — interactive 66 mm KJ-66 impeller (tip speed, slip factor, work, PR)
7. **Summative quiz** with one-best-answer MCQs at apply / analyze / evaluate levels
8. **Spaced-repetition review schedule** — 1d / 3d / 1w / 2w / doubling intervals
9. **Progress dashboard** with completion, accuracy, and review-due items

## Local dev

```
npm install
npm run dev
```

By default the app calls the production API at `https://combustion-toolkit-api.onrender.com`. To point at a local API, set `VITE_API_BASE` before running.

## Build

```
npm run build      # → dist/
```

## Deploy (Cloudflare Pages)

- Connect this repo to a new Pages project.
- Build command: `npm run build`
- Build output: `dist`
- Custom domain: `smallgasturbine.gt-05.proreadyengineer.com`
- **CORS:** the new origin must be added to `BACKEND_CORS_ORIGINS` on the `combustion-toolkit-api` Render service before login will work.

## License

Course content © ProReadyEngineer LLC — Proprietary.
