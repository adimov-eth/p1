# Repository Guidelines

## Project Structure & Module Organization
Prime pairs Astro routing with React presentations. Route entry points live in `src/pages`, while shared wrappers stay in `src/layouts`. UI blocks belong in `src/components`, with granular primitives under `src/components/ui`. Co-locate marketing copy or data alongside the component that consumes it (see `src/components/PrimeLanding/PrimeLanding.jsx`). Keep utilities in `src/lib`, global styles in `src/styles` and `src/app/globals.css`, and ship static assets from `public/`. When adding new features, keep Astro files thin and import React modules for the heavy lifting. Place feature tests next to their components (`ComponentName.test.tsx`).

## Build, Test, and Development Commands
- `bun install` – install or update dependencies in `package.json`.
- `bun dev` – start the Astro dev server on `http://localhost:4321` with hot reload.
- `bun build` – generate the production bundle in `dist/`.
- `bun preview` – serve the `dist/` output for a final QA pass.
- `bun astro check` – run Astro’s type-aware diagnostics before opening a PR.
Add a temporary `bun vitest` script when you introduce automated tests.

## Coding Style & Naming Conventions
Use two-space indentation and single quotes across `.ts`, `.tsx`, and `.astro`. Export React components and Astro layouts in PascalCase; keep helper utilities in camelCase. Compose styles with Tailwind classes and reuse shared tokens from `src/styles/utils.css`. Prefer Lucide icons (`lucide-react`) to stay aligned with existing imports. Stick to ASCII unless a file already employs extended characters.

## Testing Guidelines
The project has no permanent test harness yet. When you add meaningful UI or logic, co-locate Vitest + Testing Library specs (`ComponentName.test.tsx`) beside the source module and cover the user flows you touched. Document manual QA steps in the PR and, at minimum, run `bun astro check` plus a `bun dev` smoke test of the affected pages.

## Commit & Pull Request Guidelines
Write concise, imperative commit messages such as `Add concierge feature section`. Scope each commit to a single concern. PRs should summarize changes, reference the relevant issue or task, and attach screenshots or recordings for UI updates. Note executed commands (`bun astro check`, manual QA) in the description, and request review whenever shared UI, layouts, or configuration change.

## Security & Configuration Tips
Store secrets in local environment files; never commit `.env`. Review third-party scripts or analytics snippets with the maintainers before adding them to Astro pages. For dependency updates, prefer `bun install --frozen-lockfile` during verification to avoid unintentional lockfile churn.
