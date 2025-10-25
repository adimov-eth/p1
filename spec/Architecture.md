# Architecture Overview (Lean MVP)

Goal: ship an investor-ready demo with mocked data and a clear path to production.

- Frontend stack
  - Astro + React for marketing pages and shells, Tailwind + shadcn-ui 3.5.0 for UI.
  - LIFF Mini-App (LINE) delivered as React routes under `/app/*` with mobile-first design.
  - Internal Concierge Console and Partner Portal as React routes under `/console/*` and `/partner/*`.
  - i18n: key-based resources with `t(key, params?)`; EN now, TH later.

- Data & integration
  - Demo mode: in-memory mock services with delayed Promises to simulate API latency; deterministic seeds for repeatable demos.
  - Production path: Hono+Workers API backed by Postgres; same DTOs, swapped transport.

- State & forms
  - Data fetching/caching: TanStack Query; staleTime tuned per screen.
  - Forms: React Hook Form + Zod schemas; shadcn Form primitives.
  - Ephemeral UI state: Zustand or local component state; avoid global stores unless needed.

- Routing
  - Astro pages thin; React handles view logic. Route map mirrors `spec/Views.md`.
  - No locale prefixes; locale resolved from user profile when implemented.

- Security & privacy
  - PDPA-aware: minimal PII in the demo; audit events simulated.
  - Future: JWT/role-based auth; Workers KV for sessions if needed.

- Build & deploy
  - bun for dev/build. Cloudflare Pages for static; Cloudflare Workers for API (future).

See also: `spec/DataModel.md`, `spec/APIs.md`, `spec/I18n.md`, `spec/SLAs.md`.
