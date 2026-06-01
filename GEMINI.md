# Shop Project Context

This project is a full-stack e-commerce application consisting of a Strapi backend and a Next.js frontend.

## Project Overview

*   **Backend:** Strapi (v4) Headless CMS, built with TypeScript.
    *   **Main Technologies:** Strapi, TypeScript, SQLite (local dev), PostgreSQL (production-ready).
    *   **Architecture:** Standard Strapi structure with custom API routes for `bid` (order) and `product`.
    *   **Key Plugins:** `users-permissions`, `i18n`, `strapi-plugin-untransform-response`.
    *   **Note:** The `strapi-plugin-untransform-response` plugin is used to flatten the standard Strapi JSON output, removing the `data` and `attributes` wrapping.

*   **Frontend:** Next.js (App Router), built with TypeScript.
    *   **Main Technologies:** Next.js, React, TypeScript, Material UI (MUI), TanStack Query, Zustand, NextAuth.js.
    *   **Architecture:** Follows **Feature-Sliced Design (FSD)** principles.
        *   `1_app`: Global providers, styles, and session management.
        *   `3_widget`: Complex UI components (e.g., `Navbar`, `Footer`, `BucketList`).
        *   `4_features`: Interactive user features (e.g., `FormBid`, `Search`, `GoogleAuth`).
        *   `5_entities`: Business logic and state management for core entities (`product`, `bid`, `user`).
        *   `6_shared`: Reusable UI components, hooks, and API clients.

## Building and Running

### Backend (`/backend`)
*   **Install dependencies:** `npm install` or `yarn install`
*   **Development mode:** `npm run develop` (runs on `http://localhost:1337`)
*   **Build admin panel:** `npm run build`
*   **Start production server:** `npm run start`

### Frontend (`/frontend`)
*   **Install dependencies:** `npm install`
*   **Development mode:** `npm run dev` (runs on `http://localhost:3000`)
*   **Build for production:** `npm run build`
*   **Start production server:** `npm run start`
*   **Linting:** `npm run lint`

## Development Conventions

### API Communication
*   The frontend uses a custom `FetchClient` located in `frontend/src/6_shared/api/api.fetch.ts`.
*   Direct communication with Strapi often goes through Next.js API routes (`frontend/app/api/...`) to handle sensitive logic (like email sending) or to inject API tokens (`STRAPI_API_TOKEN`).
*   **Crucial:** When handling Strapi responses in API routes, always account for both transformed and untransformed data structures due to the `strapi-plugin-untransform-response` plugin.

### State Management
*   **Zustand:** Used for client-side state like the shopping cart (`useBidStore` in `frontend/src/5_entities/bid/bid.ts`).
*   **TanStack Query:** Used for server state, caching, and data fetching synchronization.

### Authentication
*   **NextAuth.js:** Handles OAuth (Google, Yandex) and Credentials-based authentication.
*   The `JWT` token from Strapi is stored in the NextAuth session and mirrored to `localStorage` as `token` via the `Cache` component for use by the `FetchClient`.

### Email System
*   Nodemailer is used within Next.js API routes (`/api/auth/register`, `/api/orders/confirm`) to send emails via Yandex SMTP.
*   Configuration requires `SMTP_HOST`, `SMTP_PORT` (usually 465 for Yandex), `SMTP_USERNAME`, and `SMTP_PASSWORD`.

## Key Files to Watch
*   `frontend/src/6_shared/api/api.fetch.ts`: The primary client-side data fetcher.
*   `frontend/src/5_entities/bid/bid.ts`: Shopping cart and order placement logic.
*   `frontend/src/6_shared/auth/config.ts`: NextAuth configuration.
*   `backend/config/plugins.ts`: Strapi plugin configuration.
