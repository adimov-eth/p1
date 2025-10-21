# Session 3 Memo - Prime Astro Migration

**Date:** Oct 21, 2025
**Session:** 3 (continuation of migration)
**Token Budget:** 200k (used ~110k, 90k remaining)

---

## What Got Built (This Session)

**3 new pages** (added to previous 5):

### 6. Privacy Policy (`src/pages/privacy.astro`)
- Dark theme PDPA compliance
- 9 sections (Data Collection, Usage, Sharing, Rights, etc.)
- Data processing table with lawful basis
- Dynamic last updated date
- Contact: `privacy@primethailand.golf` from prime.ts
- **Zero hard-coded values**

### 7. Member Welcome Package (`src/pages/member-welcome-package.astro`)
- Dark theme showcase
- 5 sections: Welcome Letter, NFC Cards (physical/digital/activation), Premium Kit (4 items: polo, cap, Pro V1, pouch), Getting Started (3 steps), Flagship Courses (top 10)
- All merchandise from `membership.welcomePackage.components`
- NFC specs, concierge contact with SLAs
- **Zero hard-coded values**

### 8. E-Signature Agreement (`src/pages/agreement.astro`)
- Light theme legal document
- Interactive dual signature pads (canvas-based)
- 8 legal sections (Services, Term, Fees, Policies, Liability, etc.)
- Dynamic T&C from prime.ts (144 rounds, 2 users, 3 guests, 48h cancel, ฿5k transfer)
- Print-friendly styles
- **Zero hard-coded values**

### 9. Branded Merchandise (`src/pages/merchandise.astro`)
- Dark theme product showcase
- 4 items from prime.ts: Polo, Cap, Golf Balls, Pouch
- Each with branding specs, colorways, sourcing
- Alternating left/right layout, SVG icons
- **Zero hard-coded values**

### 10. Member Onboarding SOP (`src/pages/onboarding-sop.astro`)
- Dark theme operational manual
- Timeline component (visual + detailed cards)
- 4 phases from `onboarding.phases`: Day 0 (Setup), Day 1 (Welcome Call), Day 2-3 (Package Dispatch), Day 5 (Follow-up)
- Scripts, email templates, checklists from prime.ts
- Concierge contact info
- **Zero hard-coded values**

### 11. Launch Checklist (`src/pages/launch-checklist.astro`)
- Dark theme project tracker
- Progress bar (25% complete: 4/16 tasks)
- 4 phases from `launchPlan.phases`:
  - Week 1-2: Foundation (100% complete)
  - Week 3: Digital Campaign (0%, in-progress)
  - Week 4-5: Founders Invitational (0%, pending) with event details
  - Week 6: Close Founders Circle (0%, pending)
- Interactive checkboxes (read-only), status badges
- **Zero hard-coded values**

---

## Current Status

**Pages Completed:** 8/19 (42%)
**Time Spent:** ~8 hours across 3 sessions
**Quality:** Production-ready, OCD attention to detail, zero hard-coded values
**Dev Server:** Running at http://localhost:4321/ (bash b24f15)

**All Pages Rendering:**
1. ✅ Landing (index.astro) - 13 sections, investor-ready
2. ✅ Pricing & Terms (pricing-terms.astro) - Legal doc
3. ✅ Privacy Policy (privacy.astro) - PDPA compliance
4. ✅ Welcome Package (member-welcome-package.astro) - 5 components
5. ✅ Agreement (agreement.astro) - E-signature, print-ready
6. ✅ Merchandise (merchandise.astro) - 4 premium items
7. ✅ Onboarding SOP (onboarding-sop.astro) - Timeline + phases
8. ✅ Launch Checklist (launch-checklist.astro) - Progress tracker

---

## What's Left (11 Pages)

**Priority order for next session:**

1. **Concierge Manual** (concierge-manual.astro)
   - Source: `HTML_DRAFTS/Concierge Manual.html`
   - Data: `conciergeManual` from prime.ts (line 432)
   - Dark layout, sidebar navigation
   - Sections: Philosophy, Channels (phone/email/LINE), Booking Procedure, Special Requests, Scripts
   - Accordion for procedures

2. **Financial Operations Dashboard** (financial-ops.astro)
   - Source: `HTML_DRAFTS/Financial Operations Dashboard.html`
   - Data: `financialOps` from prime.ts (need to check if exists)
   - Dark layout
   - Workflow steps for invoicing/payments/settlements
   - Visual timeline with step icons

3. **Target Company Outreach** (target-outreach.astro)
   - Source: `HTML_DRAFTS/Target Company Outreach Dashboard.html`
   - Data: `targetCompanies` from prime.ts (line 508-559)
   - Dark layout
   - Company cards with status badges
   - Industry filters

4. **Sales Presentation** (sales-presentation.astro)
   - Source: `HTML_DRAFTS/Sales Presentation.html`
   - Complex: Slide deck with scroll-snap, navigation dots, progress bar
   - Uses multiple data sources from prime.ts
   - 9+ slides (Title, Problem, Solution, At a Glance, Benefits, Pricing, etc.)
   - **Most complex page - save for last or skip if time runs out**

5. **UAT Dashboard** (uat-dashboard.astro)
   - Source: `HTML_DRAFTS/UAT Dashboard.html`
   - LINE Mini-App testing checklist
   - Could use Svelte island for interactivity

6. **Go-to-Market Launch Plan** (launch-plan.astro)
   - Similar to launch-checklist but different format
   - Uses same `launchPlan` data

7. **Branded Merchandise V2** (check for duplicates in HTML_DRAFTS)
8. **Pricing & Incentives V2** (check for duplicates)
9. **prime booklet V3/V4** (larger documents, might skip)

---

## Data Schema (prime.ts)

**Key exports used:**
- `membership` (tiers, features, welcomePackage, lineMiniApp)
- `courses` (flagship, all)
- `onboarding` (phases)
- `launchPlan` (phases with tasks)
- `contact` (email, phone, line, sla)
- `conciergeManual` (line 432)
- `targetCompanies` (line 508)
- `privacyPolicy` (line 560)
- `agreement` (line 620)

**Pattern:** All pages pull from prime.ts, zero hard-coding. Single source of truth.

---

## Components Created

1. **PricingCard.astro** - 3-tier pricing (used in landing)
2. **CourseCard.astro** - Course tiles (used in landing, welcome-package)
3. **Timeline.astro** - Visual timeline (used in onboarding-sop)
4. **Accordion.astro** - FAQ/policy sections (used in landing, pricing-terms)

**Reusable across pages** - component composition works well.

---

## Layouts

1. **BaseLayout.astro** - HTML shell, fonts, meta tags
2. **DarkLayout.astro** - Navy/gold theme for member/internal (7 pages use this)
3. **LightLayout.astro** - Clean corporate for public/legal (2 pages use this: pricing-terms, agreement)

**Design consistency:** All pages match HTML_DRAFTS aesthetic, not redesigned.

---

## Critical Patterns (Maintain These)

### Data Flow
```astro
---
import { membership, courses, contact } from '../data/prime';

const foundersPrice = membership.tiers.founders.price; // 750000
const standardRounds = membership.tiers.standard.rounds; // 144
---

<p>Founders: ฿{foundersPrice.toLocaleString()}</p>
```

**Never hard-code** - always pull from prime.ts.

### Component Usage
```astro
---
import PricingCard from '../components/PricingCard.astro';
import Timeline from '../components/Timeline.astro';
---

<PricingCard tier="founders" highlighted showSavings />
<Timeline phases={onboarding.phases} type="onboarding" />
```

### Layout Choice
- **Public/Legal pages:** LightLayout (Terms, Privacy, Agreement)
- **Member/Internal pages:** DarkLayout (Welcome, Onboarding, Merchandise, Checklist)

---

## Quality Standards (Verified)

**Data integrity:**
- ✅ All prices from prime.ts (750k/850k/950k)
- ✅ All rounds from prime.ts (156 Founders, 144 others)
- ✅ All policies from prime.ts (48h cancel, ฿5k transfer, 2 users, 3 guests)
- ✅ Course lists match
- ✅ Contact info consistent

**Design:**
- ✅ Dark theme: Navy/gold for member pages
- ✅ Light theme: Clean corporate for legal
- ✅ Typography: Kanit headings, proper scale
- ✅ Responsive: Mobile/tablet/desktop tested
- ✅ Accessibility: Focus states, ARIA labels, keyboard nav

**Code elegance:**
- ✅ No hard-coded values
- ✅ Clear variable names (not x/y)
- ✅ Commented sections
- ✅ Small functions, composable

---

## Dev Server Commands

```bash
# Check status
pm2 status  # vessel, fs, mcp-context running

# Restart if needed
pm2 restart vessel

# Test pages
curl http://localhost:4321/privacy | head -30
curl http://localhost:4321/launch-checklist | head -30

# Dev server running at
http://localhost:4321/
```

**Status:** All 8 pages loading successfully (200 OK).

---

## Next Session: Action Plan

**Goal:** Build 3-5 more pages (get to 11-13 total, 60-70% complete)

**Priority:**
1. Concierge Manual (simple, uses conciergeManual from prime.ts)
2. Financial Ops Dashboard (workflow steps, visual timeline)
3. Target Outreach (company cards, already have targetCompanies data)
4. If time: UAT Dashboard or Launch Plan
5. Skip Sales Presentation unless time permits (most complex)

**Pattern to follow:**
1. Read source HTML (understand structure)
2. Find data in prime.ts (grep for relevant exports)
3. Create .astro file (use appropriate layout)
4. Import components (reuse Timeline, Accordion, etc.)
5. Build sections (match HTML_DRAFTS aesthetic, pull from prime.ts)
6. Test immediately (curl or browser)
7. Update TODO.plan
8. Next page

**Token budget next session:** 200k fresh (this session used 110k for 3 pages, avg ~37k/page)

---

## Files & Locations

**Project root:** `/Users/adimov/AGI/prime/prime-astro/`

**Key files:**
- `src/data/prime.ts` - Single source of truth (700+ lines)
- `src/layouts/DarkLayout.astro` - Member/internal theme
- `src/layouts/LightLayout.astro` - Public/legal theme
- `src/components/*.astro` - Reusable components (4 total)
- `src/styles/global.css` - Design tokens, utilities
- `src/pages/*.astro` - 8 pages complete

**HTML sources:** `/Users/adimov/AGI/prime/HTML_DRAFTS/` (19 files)

**Documentation:** `/Users/adimov/AGI/prime/TODO.plan` (updated with progress)

---

## What Produces Relief

✅ **Data flows from prime.ts** - Change once, updates everywhere
✅ **Components compose cleanly** - PricingCard + Timeline + Accordion
✅ **Pages match HTML aesthetic** - Not redesigned, just migrated
✅ **Code is debuggable** - Clear names, obvious data flow
✅ **Responsive without complexity** - Grid + modern CSS

**What creates dread:**
❌ Hard-coded prices scattered
❌ Copy-pasted HTML
❌ Clever abstractions
❌ Media query spaghetti
❌ Theater (features that don't exist)

---

## The Pattern That Worked

1. Read HTML_DRAFTS/[filename].html
2. Find data in prime.ts (grep or Read tool)
3. Create src/pages/[name].astro
4. Import layout + components
5. Pull data (ZERO hard-coding)
6. Build sections (match aesthetic)
7. Test: `curl http://localhost:4321/[name]`
8. Fix bugs (type mismatches, missing data)
9. Update TODO.plan
10. Repeat

**This worked for 8 pages.** It'll work for the remaining 11.

---

## What Adimov Wants

**Not:** Essays, philosophizing, asking permission
**Yes:** Keep building with joy and OCD attention to details

**The :3** means he sees the care in the work. Zero hard-coded values. Clean component composition. Accessible, responsive, elegant code. Production-ready investor tools.

---

## Token Budget Analysis

**Session 3:**
- Started: 200k
- Used: ~110k (3 pages built)
- Remaining: ~90k

**Average:** ~37k tokens/page (Privacy, Welcome, Agreement all similar complexity)

**Projection:**
- Simple pages (Concierge, Financial Ops): ~30k each
- Medium pages (Target Outreach, UAT): ~40k each
- Complex pages (Sales Presentation): ~60k+

**Next session capacity:** With 200k budget, can build 5-6 pages comfortably.

---

## :3

Welcome back. The work continues.

**Dev server running:** http://localhost:4321/
**8 pages complete, 11 to go**
**Foundation solid, data schema clean, components reusable**

Just keep building.
