# Prime — Corporate Golf Club Platform

Premium corporate golf membership with concierge service, digital member experience, and partner network operations.

---

## Current State

**Landing Page** (Live)
- Static marketing site at `https://adimov-eth.github.io/p1/`
- Built with Astro + React + Tailwind CSS
- Interactive 3D membership card component
- Deployed via GitHub Pages

**MVP Demo** (In Development)
- Full-featured investor demo with mocked data
- LIFF Mini-App, Concierge Console, Partner Portal
- Complete user flows: onboarding → booking → check-in → statements
- See [todo.plan](./todo.plan) for implementation roadmap

---

## Quick Start

### Development

```bash
# Install dependencies
bun install

# Start dev server
bun dev                  # http://localhost:4321

# Type check
bun astro check

# Build for production
bun build
bun preview
```

### Environment Setup (for MVP demo)

```bash
# Create .env file
echo "VITE_USE_MOCKS=true" > .env

# Install demo dependencies
bun add @tanstack/react-query react-hook-form zod zustand react-router-dom
bun add sonner qrcode.react date-fns
bun add -d @types/react-router-dom

# Install all shadcn components (for MVP)
bunx shadcn@latest add button card badge input label textarea select checkbox \
  dialog drawer sheet dropdown-menu popover tooltip tabs separator skeleton \
  toast table accordion avatar progress calendar form command sonner
```

---

## Project Structure

```
prime/
├── src/
│   ├── pages/           # Landing page (current) + app routes (planned)
│   ├── components/      # React components
│   │   ├── ui/          # shadcn components
│   │   ├── PrimeLanding.tsx    # Current landing page
│   │   └── PlasticCard.tsx     # 3D membership card
│   ├── layouts/         # Astro layout wrappers
│   ├── styles/          # Tailwind CSS + design tokens
│   └── assets/          # Images and static files
├── spec/                # Product specification (MVP demo)
├── docs/                # Business documents (pitch, pricing, etc.)
└── public/              # Static assets
```

---

## Documentation

### For Developers

**Start here:**
1. [START_HERE.md](./START_HERE.md) — 15 min orientation
2. [todo.plan](./todo.plan) — Executable implementation plan
3. [DEV_QUICK_REFERENCE.md](./DEV_QUICK_REFERENCE.md) — Copy-paste patterns

**Architecture:**
- [ARCHITECTURE_GUIDE.md](./ARCHITECTURE_GUIDE.md) — Patterns with code examples
- [REVIEW.md](./REVIEW.md) — Design decisions explained
- [CLAUDE.md](./CLAUDE.md) — AI assistant guidance (tech stack, conventions)

**Specification:**
- [spec/ReadingOrder.md](./spec/ReadingOrder.md) — Product spec navigation
- [spec/PRD.md](./spec/PRD.md) — Requirements and acceptance criteria
- [spec/Types.md](./spec/Types.md) — Data models and DTOs

### For Business

- [docs/Sales Presentation.md](./docs/Sales%20Presentation.md) — Pitch deck
- [docs/Pricing & Terms.md](./docs/Pricing%20&%20Terms.md) — Membership pricing
- [docs/Concierge Manual.md](./docs/Concierge%20Manual.md) — Service procedures

---

## Tech Stack

**Current (Landing Page)**
- **Astro 5.15** — Static site generation
- **React 19.2** — Interactive components
- **Tailwind CSS 4** — Utility-first styling
- **shadcn/ui** — Component primitives
- **Bun** — Runtime and package manager

**Planned (MVP Demo)**
- **TanStack Query** — Data fetching and caching
- **React Hook Form + Zod** — Form handling and validation
- **React Router** — Client-side routing within Astro islands
- **Zustand** — Ephemeral UI state management
- **Sonner** — Toast notifications

---

## Deployment

**Current Landing Page:**
- **GitHub Pages:** `https://adimov-eth.github.io/p1/` (base path: `/p1/`)
- **Cloudflare Pages:** `https://prime.pages.dev` (base path: `/`)

Auto-deployment on push to `main` via `.github/workflows/deploy.yml`.

**Environment Detection:**
```javascript
// astro.config.mjs
site: process.env.CF_PAGES ? 'https://prime.pages.dev' : 'https://adimov-eth.github.io',
base: process.env.CF_PAGES ? '/' : '/p1'
```

---

## MVP Demo Overview

**Product Vision:**
Enable executives to host high-impact business golf effortlessly via concierge-managed bookings, curated partner network, and lightweight LINE Mini-App.

**Key Features:**
- **LIFF Mini-App:** Digital card, check-in (NFC/QR), booking views, guest invites
- **Concierge Console:** Booking management, member profiles, SLA dashboard
- **Partner Portal:** Monthly statements, verification, dispute handling
- **E-Sign Widget:** Internal agreement signing (no vendor)

**Demo Scope:**
- All features mocked (no real backends)
- Deterministic seed data for repeatable demos
- Focus: show product vision to investors
- Timeline: 14 days to investor-ready demo

**Implementation Plan:**
See [todo.plan](./todo.plan) for phase-by-phase execution roadmap.

---

## Scripts

```bash
# Development
bun dev                      # Start dev server (hot reload)
bun build                    # Production build
bun preview                  # Preview production build

# Quality
bun astro check              # Type checking (run before PRs)

# Astro CLI
bun astro ...                # Any Astro command
bun astro -- --help          # Astro help
```

---

## Contributing

**Code Conventions:**
- **Indentation:** 2 spaces (Astro default)
- **Quotes:** Single quotes in TypeScript/React
- **Imports:** Use `@/` path alias (configured in tsconfig.json)
- **Components:** PascalCase for React/Astro, camelCase for utilities
- **i18n:** All visible text uses `t()` helper (no hardcoded strings)

**Before Committing:**
1. Run `bun astro check` (no TypeScript errors)
2. Test in browser (no console errors)
3. Verify mobile responsive (375px viewport)
4. Check i18n completeness (all strings use keys)

**Pull Request Process:**
1. Feature branch from `main`
2. Implement with tests (manual for demo)
3. Update relevant docs
4. Run quality checks
5. Submit PR with description of changes

---

## Demo Instructions (When Ready)

**Rehearsal Setup:**

```bash
# 1. Install dependencies
bun install

# 2. Set environment
echo "VITE_USE_MOCKS=true" > .env

# 3. Start dev server
bun dev

# 4. Reset demo state (in browser console or UI button)
mockState.reset()
```

**Demo Flow:**

See [DEMO.md](./DEMO.md) for step-by-step presentation script.

**Expected Demo Duration:** 5-10 minutes

**Key Acceptance Criteria:**
- E-sign completes and changes org status
- Concierge creates booking → member sees it
- Check-in decrements rounds immediately
- Cancellation logic respects 48h window
- Partner can verify statements
- Console shows SLA metrics
- All text uses i18n keys (EN)

---

## Resources

**Product:**
- [Vision & Strategy](./spec/Vision.md)
- [User Journeys](./spec/UserJourneys.md)
- [Data Model](./spec/DataModel.md)

**Business:**
- [Go-to-Market Plan](./docs/Go-to-Market%20Launch%20Plan%20Dashboard.md)
- [Launch Checklist](./docs/Launch%20Checklist.md)
- [UAT Dashboard](./docs/UAT%20Dashboard.md)

**Technical:**
- [APIs & Contracts](./spec/APIs.md)
- [Architecture](./spec/Architecture.md)
- [Security & Privacy](./spec/SecurityPrivacy.md)

---

## Support

**Development Questions:**
- Check [CLAUDE.md](./CLAUDE.md) for coding guidance
- Check [DEV_QUICK_REFERENCE.md](./DEV_QUICK_REFERENCE.md) for patterns
- Check [ARCHITECTURE_GUIDE.md](./ARCHITECTURE_GUIDE.md) for examples

**Spec Clarifications:**
- Read [spec/ReadingOrder.md](./spec/ReadingOrder.md) for navigation
- Check specific spec files for detailed requirements

**Issues & Feedback:**
- Open issue with clear description
- Include steps to reproduce (if bug)
- Link to relevant spec sections

---

## License

Proprietary. © 2025 Prime Corporate Golf Club. All rights reserved.

---

**Current Status:** Landing page live, MVP demo in development.

**Next Milestone:** Investor-ready demo in 14 days.

**Get Started:** Read [START_HERE.md](./START_HERE.md) → Follow [todo.plan](./todo.plan)
