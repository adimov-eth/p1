# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Prime is a corporate golf club landing page built with Astro and React. The project showcases premium membership offerings with interactive 3D card effects and modern design. It's deployed to GitHub Pages at `https://adimov-eth.github.io/p1/`.

## Commands

```bash
# Development
bun install              # Install dependencies
bun dev                  # Start dev server at http://localhost:4321
bun build                # Build production site to ./dist/
bun preview              # Preview production build locally
bun astro check          # Run type-aware diagnostics (use before PRs)

# Astro CLI
bun astro ...            # Run any Astro CLI command
bun astro -- --help      # Get CLI help
```

## Architecture

**Framework Stack:**
- **Astro 5.15**: Static site generation with hybrid rendering
- **React 19.2**: Interactive components via Astro islands (`client:load`)
- **Tailwind CSS 4**: Utility-first styling with Vite plugin integration
- **Bun**: Runtime and package manager

**Directory Structure:**
```
src/
├── pages/           # Route entry points (index.astro)
├── layouts/         # Shared layout wrappers (Layout.astro)
├── components/      # React components
│   ├── ui/          # Reusable UI primitives (button, section)
│   ├── PrimeLanding.tsx    # Main landing page component
│   └── PlasticCard.tsx     # 3D membership card component
├── lib/             # Utility functions (utils.ts for cn())
├── styles/          # Global CSS and Tailwind utilities
└── assets/          # Images and static assets

public/              # Static files (favicon, etc.)
```

**Key Patterns:**

1. **Astro Pages as Thin Wrappers**: Route files in `src/pages/` import React components and wrap them in layouts. Keep logic in React components, not `.astro` files.

2. **Path Aliases**: TypeScript configured with `@/*` mapping to `./src/*` for clean imports:
   ```tsx
   import bgImage from '@/assets/bg2.png';
   import { Button } from '@/components/ui/button';
   ```

3. **Tailwind Integration**: Configured via `@tailwindcss/vite` plugin in `astro.config.mjs`. No separate `tailwind.config.js` - using Tailwind v4 CSS-first config in `src/styles/`.

4. **Astro Islands**: React components use `client:load` directive to hydrate on page load:
   ```astro
   <PrimeLanding client:load />
   ```

5. **Component Co-location**: Keep marketing copy, data objects, and styles alongside the component that uses them (see `PrimeLanding.tsx`).

## Deployment Configuration

The site deploys to GitHub Pages with:
- **Base path**: `/p1/` (configured in `astro.config.mjs`)
- **Site URL**: `https://adimov-eth.github.io`

When modifying asset paths or links, account for the `/p1/` base path.

## Styling Approach

- **Tailwind Utilities**: Compose classes directly in JSX
- **Design Tokens**: Shared utilities in `src/styles/utils.css`
- **Icons**: Use Lucide React (`lucide-react`) for consistency
- **Custom Effects**: See `PrimeLanding.tsx` for mouse-tracking spotlight effect implementation

## Testing

No automated test framework is currently configured. Before merging:
1. Run `bun astro check` for type errors
2. Manually test changes in `bun dev`
3. Verify production build with `bun build && bun preview`
4. Document manual testing in PR description

To add tests: Install Vitest + Testing Library and create co-located `.test.tsx` files.

## Code Conventions

- **Indentation**: 2 spaces (Astro default)
- **Quotes**: Single quotes in TypeScript/React
- **Component Names**: PascalCase for React components and Astro layouts
- **Utilities**: camelCase in `src/lib/`
- **Imports**: Use `@/` path alias for all src imports
