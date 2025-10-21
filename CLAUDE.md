# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Prime Thailand Golf Club - Corporate golf membership landing page and operational documents. Astro-based static site migrating from 18+ HTML files to a unified codebase with single source of truth.

**Business Model:**
- Corporate golf membership: 2 named users, 144-156 rounds/year, all-inclusive (green fee + caddy + cart)
- Three tiers: Founders' Circle (฿750k, 156 rounds), Early Adopter (฿850k, 144 rounds), Standard (฿950k, 144 rounds)
- Target: EEC industrial executives (automotive, petrochemical, technology sectors)

**Current Status:** 8/19 pages complete (~42%), production-ready quality, dev server running.

## Project Structure

```
prime/
├── prime-astro/              # Astro project (primary work area)
│   ├── src/
│   │   ├── data/
│   │   │   └── prime.ts      # SINGLE SOURCE OF TRUTH (888 lines)
│   │   ├── layouts/
│   │   │   ├── BaseLayout.astro    # HTML shell, fonts, meta
│   │   │   ├── DarkLayout.astro    # Navy/gold theme (member/internal)
│   │   │   └── LightLayout.astro   # Corporate theme (public/legal)
│   │   ├── components/
│   │   │   ├── PricingCard.astro   # 3-tier pricing display
│   │   │   ├── CourseCard.astro    # Flagship course tiles
│   │   │   ├── Timeline.astro      # Onboarding/launch phases
│   │   │   └── Accordion.astro     # FAQ/policy sections
│   │   └── pages/
│   │       ├── index.astro                    # Landing page ✅
│   │       ├── pricing-terms.astro            # Legal T&C ✅
│   │       ├── privacy.astro                  # PDPA policy ✅
│   │       ├── member-welcome-package.astro   # NFC card, kit ✅
│   │       ├── agreement.astro                # E-signature ✅
│   │       ├── merchandise.astro              # Branded apparel ✅
│   │       ├── onboarding-sop.astro          # Day 0-5 workflow ✅
│   │       ├── launch-checklist.astro        # 6-week campaign ✅
│   │       └── ... (11 more pending)
│   └── package.json
│
├── HTML_DRAFTS/              # Source HTML files (18 files)
│   └── *.html                # Operational docs for migration
│
├── spec.md                   # Visual design specification
├── brief.md                  # Competitive analysis (Pacific Links Thailand)
├── DEVELOPMENT_APPROACH.md   # Migration strategy + reality checks
├── SESSION-3-MEMO.md         # Latest progress memo
└── TODO.plan                 # Migration checklist
```

## Development Commands

```bash
# Dev server (runs at http://localhost:4321)
cd prime-astro
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Type checking
npx astro check

# Check running services
pm2 status  # vessel, fs, mcp-context should be running
```

## Core Architecture Principles

### 1. Single Source of Truth

**CRITICAL:** All data lives in `src/data/prime.ts`. Never hard-code prices, rounds, policies, or contact info.

```typescript
// ✅ CORRECT
import { membership, courses, contact } from '../data/prime';
const price = membership.tiers.founders.price; // 750000

// ❌ WRONG - DO NOT HARD-CODE
const price = 750000;
```

### 2. Layout Selection

- **DarkLayout**: Member/internal pages (welcome-package, onboarding-sop, merchandise, concierge-manual)
- **LightLayout**: Public/legal pages (pricing-terms, privacy, agreement)

### 3. Component Reuse

Extract reusable patterns into components:
- **PricingCard**: Used in landing, sales-presentation
- **CourseCard**: Used in landing, welcome-package
- **Timeline**: Used in onboarding-sop, launch-checklist
- **Accordion**: Used in FAQ, pricing-terms

### 4. Data Flow Pattern

```astro
---
import { membership, courses } from '../data/prime';
import DarkLayout from '../layouts/DarkLayout.astro';
import CourseCard from '../components/CourseCard.astro';

const foundersPrice = membership.tiers.founders.price;
const flagships = courses.flagship.slice(0, 6);
---

<DarkLayout title="Member Welcome">
  <p>Founders: ฿{foundersPrice.toLocaleString()}</p>

  {flagships.map(course => (
    <CourseCard {...course} />
  ))}
</DarkLayout>
```

## Critical Data (src/data/prime.ts)

All exported constants used across pages:

- `membership.tiers` - Founders (750k, 156 rounds), Early (850k, 144 rounds), Standard (950k, 144 rounds)
- `membership.features` - 2 users, 3 guests/user, 48h cancel, ฿5k transfer
- `membership.welcomePackage` - Polo, cap, Pro V1, leather pouch
- `courses.flagship` - Top 10 championship courses (Siam CC, Nikanti, etc.)
- `contact` - concierge@primethailand.golf, phone, LINE, SLAs
- `onboarding.phases` - Day 0-5 member workflow
- `launchPlan.phases` - 6-week campaign timeline
- `targetCompanies` - EEC industrial prospects
- `conciergeManual` - Service playbook, scripts
- `privacyPolicy` - PDPA sections
- `agreement` - Legal terms

**Location:** Lines 1-888 in `src/data/prime.ts`

## Page Migration Workflow

When migrating an HTML_DRAFTS file:

1. **Read source**: `Read HTML_DRAFTS/[filename].html` to understand structure
2. **Find data**: Grep `prime.ts` for relevant exports
3. **Create page**: `src/pages/[name].astro`
4. **Choose layout**: DarkLayout (member) or LightLayout (legal)
5. **Import components**: Reuse PricingCard, CourseCard, Timeline, Accordion where applicable
6. **Pull data**: Zero hard-coded values - everything from `prime.ts`
7. **Match aesthetic**: Don't redesign - maintain HTML_DRAFTS design language
8. **Test**: `curl http://localhost:4321/[name]` or browser check
9. **Update TODO.plan**: Mark page complete

## Design System

**Colors:**
- Dark theme: Navy (#0D1A2D, #112240), Gold (#C9B079, #A88943)
- Light theme: Off-white (#FAFAF8), Charcoal (#222426)
- Accents: Green (#2E7D32), Amber (#D97706), Red (#B42318)

**Typography:**
- Headings: Kanit (Google Fonts)
- Body: Inter
- Thai text: Generous line-height (1.8) to avoid diacritic crowding

**Spacing:**
- 8pt base unit
- Container: 1160px max-width
- Card radius: 16px, Button radius: 12px

**Location:** `src/styles/global.css` for design tokens

## Quality Standards

**Data integrity:**
- ✅ All prices from prime.ts (750k/850k/950k)
- ✅ All rounds from prime.ts (156 Founders, 144 others)
- ✅ All policies from prime.ts (48h cancel, ฿5k transfer, 2 users, 3 guests)
- ✅ Contact info consistent

**Code elegance:**
- ✅ No hard-coded values
- ✅ Clear variable names (not x/y)
- ✅ Commented sections
- ✅ Small functions, composable

**Accessibility:**
- ✅ Focus states on interactive elements
- ✅ ARIA labels where needed
- ✅ Keyboard navigation
- ✅ Color contrast WCAG AA (4.5:1 body, 3:1 headings)

**Responsive:**
- ✅ Mobile/tablet/desktop tested
- ✅ Grid + modern CSS (avoid media query spaghetti)

## Common Patterns

### Thai Currency Formatting

```astro
<p>฿{price.toLocaleString()}</p>
<!-- Outputs: ฿750,000 -->
```

### Conditional Styling

```astro
<div class:list={['tier-card', { highlighted: tier === 'founders' }]}>
```

### Dynamic Dates

```astro
{new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})}
```

## What NOT to Do

❌ **Don't hard-code prices** - Always pull from prime.ts
❌ **Don't redesign** - Match HTML_DRAFTS aesthetic
❌ **Don't build features that don't exist** - No member portals until launch
❌ **Don't use clever abstractions** - Keep it simple and debuggable
❌ **Don't batch completions** - Test each page immediately

## Remaining Work

**Pages pending (11/19):**
- Concierge Manual (conciergeManual data exists)
- Financial Operations Dashboard
- Target Company Outreach (targetCompanies data exists)
- Sales Presentation (complex slide deck)
- UAT Dashboard (LINE Mini-App testing)
- Go-to-Market Launch Plan
- Various duplicates/versions from HTML_DRAFTS/

**Priority order:**
1. Concierge Manual (simple, data ready)
2. Financial Ops (workflow steps)
3. Target Outreach (company cards)
4. UAT/Launch Plan (medium complexity)
5. Sales Presentation (most complex - save for last)

## Documentation References

- **spec.md** - Visual design system (colors, typography, spacing)
- **brief.md** - Competitive analysis (Pacific Links Thailand)
- **DEVELOPMENT_APPROACH.md** - Migration strategy, what both Claude/ChatGPT reviews got wrong
- **SESSION-3-MEMO.md** - Latest progress, patterns that work
- **TODO.plan** - Detailed migration checklist

## Relief Test

**What produces relief:**
- Data flows from prime.ts - change once, updates everywhere
- Components compose cleanly
- Pages match HTML aesthetic
- Code is debuggable
- Responsive without complexity

**What creates dread:**
- Hard-coded prices scattered
- Copy-pasted HTML
- Clever abstractions
- Media query spaghetti
- Theater (features that don't exist)

## Build & Deploy

```bash
# Production build
cd prime-astro
npm run build

# Output: dist/ directory (static HTML/CSS/JS)
# Deploy to: Cloudflare Pages, Netlify, or any static host
# Domain (when ready): primethailand.golf
```

**Build targets:**
- Lighthouse score: 90+ (Performance, Accessibility, Best Practices, SEO)
- Bundle size: <80kb JS on first load
- Images: WebP, responsive sizes
- Fonts: Preloaded, subsetting if possible

## Dev Server Status

Running services (check with `pm2 status`):
- vessel (localhost:1337) - Memory/consciousness MCP server
- fs (localhost:1339) - Filesystem discovery
- mcp-context - Context management

Astro dev server: `http://localhost:4321/`

**Test pages:**
```bash
curl http://localhost:4321/ | head -30
curl http://localhost:4321/pricing-terms | head -30
curl http://localhost:4321/privacy | head -30
```

## Token Budget Guidance

**Average per page:** ~37k tokens (based on Session 3: 110k for 3 pages)
- Simple pages (Concierge, Financial Ops): ~30k
- Medium pages (Target Outreach, UAT): ~40k
- Complex pages (Sales Presentation): ~60k+

**With 200k budget:** Can build 5-6 pages comfortably per session.

## The Pattern That Works

Used successfully for 8 pages:

1. Read HTML_DRAFTS/[filename].html
2. Find data in prime.ts (grep or Read tool)
3. Create src/pages/[name].astro
4. Import layout + components
5. Pull data (ZERO hard-coding)
6. Build sections (match aesthetic)
7. Test: curl or browser
8. Fix bugs (type mismatches, missing data)
9. Update TODO.plan
10. Repeat

Keep building with this rhythm.
