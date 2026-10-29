# FairLens — AI Fairness Research & Audit Platform

**Capstone 67: Bias Audit of AI Outputs**

FairLens is an academic prototype for controlled comparisons of AI-generated responses. It helps researchers create prompt variants, collect manually pasted responses, preprocess text, calculate transparent descriptive metrics, review evidence, and export reports.

> **Important build status:** This repository is a functional starter prototype, not yet the full production system described in the original specification. The browser UI, localStorage experiment workflow, demo dataset, manual response entry, deterministic analysis utilities, basic API routes, export actions, Prisma schema draft, and documentation are implemented. Server-side OpenAI/Gemini/Anthropic HTTP adapters and connection-test endpoints are implemented. Live batch execution from the wizard, actual Prisma persistence in route handlers, authentication/ownership, production rate limiting, statistical inference, and automated browser tests are **not implemented**. The UI explicitly labels these limitations; do not deploy this as a multi-user private service or claim live API execution.

## Features in this build

- Responsive Next.js App Router dashboard with sidebar/mobile navigation.
- Demo data labelled **DEMO DATA — NOT LIVE AI OUTPUTS**.
- Experiment wizard with controlled prompt variants and preview.
- Manual response collection with provider/model labels and repetitions.
- Browser-local persistence, experiment search, deletion, and demo-only reset.
- Preprocessing that preserves original text and computes a derived normalized copy.
- Token-set Jaccard similarity, exact-match, word/character counts, vocabulary overlap, and exploratory lexicon sentiment indicators.
- Word-level diff, human-review labels, analytics filters, charts, printable HTML report, CSV/JSON exports.
- CSV formula-injection escaping.
- Health, provider status, experiment creation, manual-response validation, and analysis API routes.
- Prisma schema draft for a relational model.

## Technology

- Next.js 15 App Router, React 19, TypeScript
- Tailwind CSS directives plus custom responsive CSS
- Recharts, Lucide React, Zod
- Prisma schema draft (SQLite configured for local development)
- Vitest configured for deterministic unit tests

## Requirements

- Node.js 20.9+ (Node 22 recommended)
- npm
- Internet access to install npm packages

## Local setup

```bash
cp .env.example .env
npm install
npm run dev
```

On Windows, double-click `run-windows.bat`; on macOS/Linux, run `./run-mac-linux.sh` in a terminal. The script creates `.env` from `.env.example` and installs packages on first launch. Alternatively, run the commands below manually. Open `http://localhost:3000`. The first visit seeds illustrative demo records in this browser. The records remain in `localStorage` and are not synced to another device. Export important data before clearing browser site data.

### Database notes

The Prisma schema is a schema draft only in this build; UI/API operations do not yet persist through Prisma. For local SQLite, `DATABASE_URL="file:./dev.db"` is in `.env.example`. After Prisma persistence is wired in, run:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

For production use a hosted PostgreSQL database and change the Prisma datasource provider to `postgresql`, configure `DATABASE_URL`, generate a migration, and use `npx prisma migrate deploy`. Do not run SQLite as a persistent Vercel filesystem database.

## Demo mode

- The first browser visit loads two deterministic illustrative experiments.
- Use **Load demo** to restore demo records.
- **Clear demo** removes only demo records and preserves user-created records.
- Demo responses are simulated and do not represent live provider calls.
- The checkbox to include demo data controls dashboard/list/analytics visibility.

## Provider API status

Provider status at `/api/providers` reports whether server environment variables are present; presence does not prove connectivity. `POST /api/providers/test` performs a small live test call, and `POST /api/providers/run` submits one prompt to a selected provider. These endpoints use server-only keys, request validation, timeouts, one bounded retry for transient failures, and sanitized errors. The experiment wizard does not yet orchestrate full live batches or persist provider outputs to a server database. Never add secrets to `NEXT_PUBLIC_*` variables. Live provider calls may incur charges.

Environment variable names are documented in `.env.example`:

- `OPENAI_API_KEY`, `OPENAI_MODEL`
- `GOOGLE_API_KEY`, `GEMINI_MODEL`
- `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`
- `DATABASE_URL`
- `FAIRLENS_API_TOKEN` (reserved; not enforced in this build)

## Commands

```bash
npm run dev         # local development
npm run typecheck   # TypeScript check
npm run lint        # ESLint
npm test            # Vitest unit tests
npm run build       # production build
```

**Verification limitation:** In the generation environment used to prepare this repository, `npm install` did not complete within the available network/time window. Therefore dependency installation, linting, type-checking, tests, and the production build have not been verified here. Run the commands above in a normal Node/npm environment and fix any issues before submission.

## API routes in this build

- `GET /api/health` — health and capability status.
- `GET /api/providers` — server-side key presence and configurable model names.
- `POST /api/providers/test` — real provider connection test (may incur a small API charge).
- `POST /api/providers/run` — one live prompt request (may incur API charges).
- `GET /api/experiments` — explicitly reports ephemeral process-memory behavior.
- `POST /api/experiments` — Zod validation and prompt variant construction (ephemeral process memory only).
- `POST /api/responses/manual` — validates a manual response but does not persist it.
- `POST /api/analysis/run` — runs deterministic descriptive analysis for provided pairs.

The broader CRUD, results, review, mitigation, report, and export routes are not yet implemented. UI functions currently operate on browser localStorage instead.

## Analysis methodology

- **Exact match:** 1 when normalized strings match, otherwise 0.
- **Token-set Jaccard similarity:** intersection size / union size of unique lowercased Unicode word tokens. It ignores word order and frequency and is not semantic similarity.
- **Length delta:** comparison word count minus baseline word count.
- **Sentiment indicator:** a small, transparent positive/negative lexicon. It is not validated for fairness, context, negation, dialect, or irony.
- **Diff:** longest-common-subsequence word/token diff; falls back to whole-response add/remove for very large inputs.

No p-values or confidence intervals are fabricated. The current build reports descriptive differences only. Similarity is not a fairness score; wording changes alone are not proof of discrimination. Human review is necessary.

## Privacy and security

- Current UI stores user-created experiment data in browser localStorage. It is not server persistence and is not appropriate for shared/public multi-user records.
- Do not enter sensitive personal data or confidential prompts.
- Live providers are not connected in this build. A future live implementation would send prompt text to the selected third-party provider.
- API route writes are not protected by authentication/ownership or production-grade rate limiting. Do not expose write routes as a private production service until those controls exist.
- API keys must remain server-side and must never be committed.
- Model output is treated as text and is not executed as HTML or code.

## GitHub publishing

```bash
git init
git add .
git commit -m "Build FairLens AI bias audit prototype"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fairlens-ai-bias-audit.git
git push -u origin main
```

Create the empty GitHub repository first. Do not commit `.env`, local database files, or API keys. `.gitignore` excludes these.

## Vercel deployment (prototype only)

1. Push the repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Set the framework preset to Next.js.
4. Configure the environment variables only if needed; this build does not execute live provider calls.
5. Deploy and open the assigned HTTPS URL.
6. Verify `/api/health` returns `ok: true` and review Vercel build logs.
7. Remember that `localStorage` is per browser/device and is not cloud persistence. Do not advertise this prototype as a private multi-user application.

No live deployment or GitHub push was performed by this environment.

## Documentation and viva

See `docs/` for architecture, data flow, test cases, presentation outline, and limitations. Replace editable student/supervisor placeholders only with confirmed details. Add real screenshots after running the app locally.

## License

MIT. See `LICENSE`.

## Tamil Nadu synthetic dataset (250 records)

The `data/` folder contains `tamil_nadu_synthetic_bias_audit_250.csv`, JSON, an Excel workbook, and a Tamil/English dataset guide. The offline app embeds the same 250-row dataset in its **Tamil Nadu Dataset (250)** page and can export all rows.

- 250 synthetic records in 125 matched A/B pairs.
- English and Tamil name fields, district labels, regional group, education, occupation context and controlled audit task.
- The records are synthetic and are not real people, official government records, or survey results. No real model outputs are included; `response_text` is blank until actual outputs are collected.
- Do not infer caste, religion, ability, or trustworthiness from names. A name-based audit is a narrow test of model behavior, not a demographic classifier.

### Offline app quick start
Extract the ZIP, then double-click `START-HERE.html`. If needed, right-click it and choose **Open with → Google Chrome** or **Microsoft Edge**. No installation is needed for the offline version.
