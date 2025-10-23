# Repository Guidelines

## Project Structure & Module Organization
Prime is an Astro + React landing experience. Route entry points live in `src/pages` (for example `src/pages/index.astro`), while shared layouts sit in `src/layouts`. Reusable UI belongs in `src/components` and `src/components/ui`; keep marketing copy or data objects alongside the component that consumes them (see `PrimeLanding.jsx`). Global styles sit in `src/styles` and `src/app/globals.css`, and static assets ship from `public/`. When introducing new feature areas, mirror this separation so Astro pages stay thin wrappers around React presentation components.

## Build, Test, and Development Commands
- `bun install`: install or update dependencies declared in `package.json`.
- `bun dev`: launch the Astro dev server at `http://localhost:4321` with hot reloading.
- `bun build`: output the production site to `dist/`; required before deployment.
- `bun preview`: serve the contents of `dist/` locally to sanity-check a production build.
- `bun astro check`: run Astro’s type-aware diagnostics; use this before opening a pull request.

## Coding Style & Naming Conventions
Follow Astro defaults with two-space indentation and single quotes in `.ts`, `.tsx`, and `.astro` files. Export React components and Astro layouts using PascalCase (`PrimeLanding`, `Layout`), and keep utility helpers in camelCase within `src/lib`. Tailwind CSS is configured globally; compose utility classes directly in JSX and keep shared design tokens in `src/styles/utils.css`. When adding icons, prefer Lucide (`lucide-react`) to stay consistent with existing imports.

## Testing Guidelines
The project does not yet include an automated test harness. Before merging significant UI or data logic, add co-located component tests (for example `PrimeLanding.test.tsx`) using Vitest + Testing Library, and run them with a temporary `bun vitest` script. At minimum, run `bun astro check` and manually exercise the updated page in `bun dev`. Target meaningful coverage of new logic and document manual testing notes in the pull request.

## Commit & Pull Request Guidelines
Use concise, imperative commit messages (e.g., `Add concierge feature section`) and keep commits scoped to a single concern. For pull requests, include a summary of the change, linked issue or task reference, screenshots or screen recordings of UI updates, and any manual test steps performed. Request review whenever you touch shared UI, layouts, or configuration files, and wait for CI (or documented manual checks) to pass before merging.
