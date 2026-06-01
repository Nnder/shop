# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

Two independent applications, each with its own `package.json` and `node_modules`. There is **no root workspace** — `cd` into the relevant directory before running any command.

- `backend/` — Strapi v4 headless CMS (TypeScript). SQLite locally (`better-sqlite3`), PostgreSQL (`pg`) in production. Runs on `http://localhost:1337`, admin at `/admin`.
- `frontend/` — Next.js 14 App Router (TypeScript). Runs on `http://localhost:3000`.

`GEMINI.md` is an older context file covering the same ground; keep it roughly in sync when architecture changes.

## Commands

Backend (`cd backend`, Node 18–20 required):
- `npm run develop` — dev server with admin rebuild + autoreload
- `npm run build` — build admin panel
- `npm run start` — production server

Frontend (`cd frontend`):
- `npm run dev` — dev server
- `npm run build` / `npm run start` — production build / serve
- `npm run lint` — ESLint (`eslint-config-next`)

There is **no test suite** in either project. Don't invent test commands.

## Environment

Both apps need `.env` (copy from each `.env.example`). Key frontend vars: `API_URL` (Strapi `/api`), `BACK_URL` (Strapi root, used for media URLs), OAuth client IDs/secrets (Google, Yandex), `YANDEX_APIKEY_MAP`, SMTP creds, `STRAPI_API_TOKEN`, `MANAGER_EMAILS`.

**Gotcha:** `frontend/next.config.js` re-exports a fixed set of vars through the `env` block, so `API_URL`, `BACK_URL`, and the OAuth/map keys are bundled to the **client**. `FetchClient` runs client-side and reads `process.env.API_URL` directly. Secret-only logic (SMTP, `STRAPI_API_TOKEN`) must stay inside Next API routes, never in components.

## Architecture

### Data flow
Frontend talks to Strapi two ways:
1. **Direct, client-side** via `restClient` (`frontend/src/6_shared/api/api.fetch.ts`) — a thin `FetchClient`. When `isAuth` is true it attaches `Authorization: Bearer <localStorage 'token'>`.
2. **Through Next API routes** (`frontend/app/api/...`) for anything needing secrets or server logic: injecting `STRAPI_API_TOKEN`, sending email, etc. Routes: `bids`, `bids/user`, `products/[id]`, `orders/confirm`, `contact`, `auth/register`, `auth/[...nextauth]`.

**Crucial:** Strapi here runs `strapi-plugin-untransform-response`, which flattens responses (no `data`/`attributes` wrapper). When parsing Strapi responses in API routes, handle **both** transformed and untransformed shapes — they can differ by endpoint.

### Backend (Strapi)
Standard Strapi structure. Custom content types live under `backend/src/api/`:
- `bid` — orders (content-type + controllers/routes/services)
- `product` — catalog

Config in `backend/config/`: `plugins.ts` (untransform-response, i18n, users-permissions, cloud), `database.ts`, `middlewares.ts`, `server.ts`.

### Frontend (Feature-Sliced Design)
Layers under `frontend/src/` use FSD numbering (note: **no `2_` layer**, imports flow downward only):
- `1_app` — providers and session: `MainProvider.tsx` (MUI + TanStack Query), `Session.tsx` (NextAuth), `Cache.tsx`, `globals.css`
- `3_widget` — composite UI: `Navbar`, `Footer`, `BucketList`, `CardList`, `BidList`
- `4_features` — interactive features: `Forms`, `Search`/`Find`, `GoogleAuth`, `YandexAuth`, `YandexMap`, `ImageViewer`, `ProductImages`, `ProductInfo`, `Card`, `BucketItem`, `NavbarMobileMunu`
- `5_entities` — entity logic + state: `product`, `bid`, `user`
- `6_shared` — `api/` (FetchClient), `auth/config.ts` (NextAuth config), `hooks/`, `ui/`

Routes live in `frontend/app/` (App Router): `products`, `products/[id]`, `bucket` (cart), `about`, `contacts`, `offer`, `terms`, `privacy`, `privacy-policy`, `signin`, `signup`.

### State
- **Zustand** for client state — the cart/order lives in `useBidStore` (`frontend/src/5_entities/bid/bid.ts`).
- **TanStack Query** for server state, caching, fetch sync.

### Auth
NextAuth (`frontend/src/6_shared/auth/config.ts`) handles Google + Yandex OAuth and Credentials login against Strapi. Strapi's JWT is stored in the NextAuth session and **mirrored to `localStorage` as `token`** by `1_app/Cache.tsx` so `FetchClient` can read it for authenticated direct calls.

### Email
Nodemailer inside Next API routes (`api/auth/register`, `api/orders/confirm`, `api/contact`) sends via Yandex SMTP using the `SMTP_*` env vars. Manager notifications go to `MANAGER_EMAILS` (comma-separated).

## Conventions
- Codebase and commit messages are in Russian; product copy is Russian (e.g. `MAIL_FROM_NAME=УПК МЯСО`). Match existing language in user-facing strings.
- Yandex Maps via `react-yandex-maps` / `@yandex/ymaps3-types`, gated on `YANDEX_APIKEY_MAP`.
- `frontend/next.config.js` allows images from any host (`remotePatterns` `**`).
