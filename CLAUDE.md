# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Prime is a corporate golf club platform with two components:

**1. Landing Page** (Current — Live)
- Static marketing site built with Astro + React + Tailwind CSS
- Interactive 3D membership card component
- Deployed to GitHub Pages and Cloudflare Pages

**2. MVP Demo** (In Development — Planned)
- Full-featured investor demo with mocked data
- LIFF Mini-App, Concierge Console, Partner Portal, E-Sign Widget
- Timeline: 14 days to investor-ready demo
- See [todo.plan](./todo.plan) for implementation roadmap

**Deployment:**
- GitHub Pages: `https://adimov-eth.github.io/p1/` (base path: `/p1/`)
- Cloudflare Pages: `https://prime.pages.dev` (base path: `/`)

The site automatically detects the deployment environment via `process.env.CF_PAGES` in `astro.config.mjs`.

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

**Dual deployment strategy** configured in `astro.config.mjs`:

```javascript
site: process.env.CF_PAGES
  ? 'https://prime.pages.dev'
  : 'https://adimov-eth.github.io',
base: process.env.CF_PAGES ? '/' : '/p1'
```

- **GitHub Pages**: Uses `/p1/` base path, deploys via `.github/workflows/deploy.yml` on push to main
- **Cloudflare Pages**: Uses `/` base path, auto-detected via `CF_PAGES` env var

When referencing assets or links:
- Astro's path resolution handles base path automatically for `import` statements
- For hardcoded paths in components, use relative paths or Astro's `base` config
- All assets in `src/assets/` get optimized and path-rewritten automatically

## Styling Approach

- **Tailwind CSS 4**: CSS-first configuration in `src/styles/global.css` (no `tailwind.config.js`)
- **Integration**: Via `@tailwindcss/vite` plugin in `astro.config.mjs`
- **Utilities**: Compose classes directly in JSX using `cn()` helper from `src/lib/utils.ts`
- **Design System**:
  - Base styles and CSS variables in `src/styles/global.css`
  - Utility classes in `src/styles/utils.css`
  - `cn()` function merges Tailwind classes with conditional logic (uses `clsx` + `tailwind-merge`)
- **Icons**: Lucide React (`lucide-react`) for all icons
- **Interactive Effects**:
  - `PrimeLanding.tsx`: Mouse-tracking spotlight on feature cards using CSS custom properties
  - `PlasticCard.tsx`: 3D tilt and holographic glare effects with mouse interaction

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
- **Imports**: Use `@/` path alias for all src imports (configured in `tsconfig.json`)

## Key Implementation Details

**Interactive Card Effects:**

The `PlasticCard.tsx` component implements 3D perspective transforms and holographic glare:
- Mouse position relative to card → rotation angles (yaw/pitch)
- Dynamic CSS custom properties for real-time updates
- Smooth transitions on hover/leave
- Works in both gold and navy color variants

**Mouse Tracking Pattern:**

Both `PrimeLanding.tsx` and `PlasticCard.tsx` use `useEffect` to attach mouse event listeners:
```tsx
React.useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    // Calculate position relative to element
    // Update CSS custom properties
    element.style.setProperty('--mouse-x', `${x}px`);
  };
  element.addEventListener('mousemove', handleMouseMove);
  return () => element.removeEventListener('mousemove', handleMouseMove);
}, []);
```

**Astro Islands Architecture:**

- `.astro` files are server-rendered by default (static HTML)
- `client:load` directive hydrates React components on page load
- Only `PrimeLanding` needs hydration (for mouse interactions)
- Keep heavy interactive logic in React components, not Astro files

**Future Implementation Note:**

When transitioning from landing page to full app (as documented in `spec/`):
- Current React components can be migrated to the app shell
- Astro will likely be replaced with a React SPA framework (Next.js/Remix)
- Tailwind design tokens in `global.css` should be preserved
- `PlasticCard` component can be reused in the LINE Mini-App digital card view

---

## MVP Demo Development

**If you're implementing the MVP demo, read these documents first:**

### Quick Start (Read in Order)

1. **[START_HERE.md](./START_HERE.md)** (15 min) — Orientation and navigation
2. **[todo.plan](./todo.plan)** (10 min) — Phase-by-phase executable plan
3. **[DEV_QUICK_REFERENCE.md](./DEV_QUICK_REFERENCE.md)** (bookmark) — Keep open while coding

### Architecture & Patterns

- **[ARCHITECTURE_GUIDE.md](./ARCHITECTURE_GUIDE.md)** — Complete code examples for:
  - Observable mock state singleton (critical for auto-updating UI)
  - Mock service layer with mutations
  - React Router in Astro islands
  - Type organization (domain, API, forms, UI)
  - i18n implementation (Context provider)
  - Complete check-in flow example

- **[REVIEW.md](./REVIEW.md)** — Critical analysis explaining:
  - What Codex's original plan got right
  - Critical gaps and how we fixed them
  - Architectural decisions with rationale
  - Why 14 days (not 10)

### Product Specification

Located in `spec/` directory:

- **[spec/ReadingOrder.md](./spec/ReadingOrder.md)** — Start here for spec navigation
- **[spec/PRD.md](./spec/PRD.md)** — Requirements and acceptance criteria
- **[spec/Types.md](./spec/Types.md)** — Data models (copy these exactly)
- **[spec/APIs.md](./spec/APIs.md)** — Endpoint contracts (mock implementations)
- **[spec/Vision.md](./spec/Vision.md)** — Product vision and principles

## MVP Tech Stack (Additional)

**Beyond landing page stack, add:**

- **@tanstack/react-query** — Data fetching and caching with auto-invalidation
- **react-hook-form + zod** — Form validation (schema-first)
- **react-router-dom** — Client-side routing within Astro islands
- **zustand** — Ephemeral UI state (modals, form state)
- **sonner** — Toast notifications
- **qrcode.react** — QR code generation for check-in
- **date-fns** — Date manipulation

**Installation:**
```bash
bun add @tanstack/react-query react-hook-form zod zustand sonner qrcode.react date-fns
```

**All shadcn components (install once):**
```bash
bunx shadcn@latest add button card badge input label textarea select checkbox \
  dialog drawer dropdown-menu popover tooltip tabs separator skeleton toast \
  table accordion avatar progress calendar form command sonner
```

## MVP Architecture Patterns

### Observable Mock State (Critical)

**The key pattern that makes the demo work:**

```typescript
// src/mocks/state.ts
export const mockState = {
  data: seedData,
  mutate(fn) {
    fn(this.data);
    this.notify(); // Triggers UI update
  },
  subscribe(listener) { ... },
  notify() { listeners.forEach(fn => fn()) }
};
```

**Why this matters:** When check-in happens, rounds update on home page automatically without manual cache invalidation.

**Integration with TanStack Query:**
```typescript
// src/lib/providers/QueryProvider.tsx
function useMockStateSync() {
  const queryClient = useQueryClient();
  useEffect(() => {
    return mockState.subscribe(() => {
      queryClient.invalidateQueries();
    });
  }, [queryClient]);
}
```

### Routing: React Router in Astro Islands

**Pattern:** One Astro page per area, React Router handles sub-routes.

```
src/pages/app.astro
  → <AppRouter client:only="react" />
    → React Router: /app/bookings, /app/card, etc.

src/pages/console.astro
  → <ConsoleRouter client:only="react" />
    → React Router: /console/bookings, /console/members/:id, etc.
```

**Why:** Simpler than Astro dynamic routes, easier to extract into SPA later.

### Type Organization

```
src/types/
├── domain.ts      # Core entities (Organization, User, Booking, etc.)
├── api.ts         # Request/response types (AppHomeResponse, etc.)
├── forms.ts       # Zod schemas for validation
└── index.ts       # Re-exports
```

**Rule:** Types come from spec/Types.md exactly. Don't invent new fields.

### i18n Pattern

```typescript
// Simple Context provider (no library)
const { t } = useTranslation();
<h1>{t('app.home.title')}</h1>
```

**Rule:** All visible text uses `t()`. No hardcoded strings.

## Development Workflow (MVP)

### Before Starting Any Screen

1. Check seed data exists in `src/mocks/state.ts`
2. Check mock service function implemented in `src/mocks/service.ts`
3. Check i18n keys added to `src/locales/en.json`
4. Check types defined in `src/types/*`

### While Building Screen

1. Import shadcn components (don't build from scratch)
2. Use `t()` for all text (no hardcoded strings)
3. Add loading state (Skeleton)
4. Add empty state (EmptyState component)
5. Add error handling (ErrorBoundary or inline)
6. Test mobile viewport (375px)

### Before Committing Screen

1. `bun astro check` passes (no TS errors)
2. Screen works in browser (no console errors)
3. All text uses i18n keys
4. Loading/empty/error states work
5. Mobile responsive
6. Keyboard accessible

## MVP Implementation Phases

**Follow [todo.plan](./todo.plan) exactly. Summary:**

- **Phase 0** (0.5 day): Install all dependencies
- **Phase 1** (2 days): Foundation (types, mock state, i18n, providers)
- **Phase 2** (1 day): Vertical slice GATE (home + check-in working)
  - **This validates architecture before going wide**
- **Phase 3-6** (6 days): Build all screens (LIFF, Console, Partner, Public)
- **Phase 7** (2 days): Polish (loading/empty/error, mobile, keyboard)
- **Phase 8** (1.5 days): Demo prep (script, rehearsal, docs)

**Total: 14 days to investor-ready demo**

## Critical Success Factors (MVP)

### Phase 2 Gate (Vertical Slice)

**Must work before building other screens:**

1. Navigate to `/app` → see rounds remaining
2. Navigate to `/app/card` → simulate check-in
3. Navigate back to `/app` → rounds decremented (without refresh)

**If this doesn't work:**
- Check `useMockStateSync()` in RootProvider
- Check `mockState.notify()` called in mutations
- Check TanStack Query DevTools (queries invalidating?)

### Acceptance Criteria (From PRD)

Must demonstrate:

- ✅ E-sign widget completes → org status changes
- ✅ Concierge creates booking → member sees in LIFF
- ✅ Check-in → rounds decrement immediately
- ✅ Cancellation respects 48h window (restored vs forfeited)
- ✅ Partner can verify statements
- ✅ Console shows SLA metrics
- ✅ All text uses i18n keys

### Quality Checklist

Before calling demo "done":

- [ ] No TypeScript errors (`bun astro check`)
- [ ] All screens have loading/empty/error states
- [ ] Mobile responsive (test at 375px)
- [ ] Keyboard accessible (tab order makes sense)
- [ ] Performance: loads < 2.5s on Fast 3G
- [ ] Demo script written and rehearsed

## Common Pitfalls (MVP)

### 1. Skipping Vertical Slice

**Don't build all screens then discover architecture issues.**

Phase 2 gate forces you to prove one complete flow works before going wide.

### 2. Manual Cache Invalidation

**Don't manually invalidate TanStack Query caches.**

The observable mock state pattern handles this automatically.

### 3. Hardcoding Strings

**Don't hardcode text in JSX.**

Use `t()` from the start. Going back to fix later wastes time.

### 4. Overengineering Backend

**This is a demo with mocks, not production.**

- No real API calls
- No database
- No authentication (just role-based UI)
- Artificial 250-600ms delays are realistic enough

Focus: clickable prototype that shows product vision.

## When You Get Stuck (MVP)

| Problem | Solution |
|---------|----------|
| Architecture question | Read [ARCHITECTURE_GUIDE.md](./ARCHITECTURE_GUIDE.md) |
| Spec clarification | Check `spec/` directory |
| Pattern needed | Check [DEV_QUICK_REFERENCE.md](./DEV_QUICK_REFERENCE.md) |
| State not updating | Verify `mockState.notify()` called |
| TypeScript errors | Run `bun astro check` |
| Routing confusion | See ARCHITECTURE_GUIDE.md § Routing |

## Demo vs Production

**Demo scope (14 days):**
- All features mocked
- No tests (manual verification)
- No CI/CD (beyond landing page)
- Deterministic seed data
- Focus: investor presentation

**Production scope (post-demo):**
- Replace mocks with Hono API Workers
- Add Postgres database
- Implement LINE auth
- Add payment integration
- Write tests
- Set up monitoring

**The demo validates product vision. Production implements for real users.**
