# Codex Review

## Landing (`/`)
- Marketing hero, benefits grid, partner carousel, pricing, testimonials, and CTA strip render as expected.
- Header CTA (`Get Started`) and hero CTAs (`Apply for Membership`, `View Benefits`) are plain buttons without navigation or click handlers, so they do nothing.
- Footer and toolbar links still point to `#` placeholders; consider swapping to real routes or defaulting to `/contact` style anchors.

## Member App (`/app`, `/app/card`, `/app/bookings`, `/app/bookings/[id]`)
- `/app` dashboard loads mock usage stats, next booking, and quick links; the “Reset Demo State” control correctly appears only in dev.
- `/app` quick links work, but several back links render as `← ← Back to Home` because `CardPage` and `BookingsPage` prepend an arrow to a translation string that already includes one (`src/lib/i18n/resources.ts:91`).
- `/app/bookings` tab switcher operates, but selecting any booking leads to a server error: navigating to `/app/bookings/BOOKING_001` returns Astro’s `GetStaticPathsRequired`. `src/pages/app/bookings/[id].astro` needs either an exported `getStaticPaths()` or `export const prerender = false;` to enable SSR.
- `/app/card` presents the digital card and check-in simulation flow as expected apart from the duplicated back arrow noted above.

## Concierge Console (`/console`, `/console/bookings`, `/console/members`, `/console/statements`, `/console/analytics`)
- Primary dashboard (`/console`) renders SLA metrics and booking queue cards. Navigation buttons swap routes client-side.
- `/console/bookings`, `/console/members`, and `/console/statements` list data but the row-level `View`/`Verify` buttons have no handlers—clicking them leaves the route unchanged with the button stuck in an active state. Consider routing to detail views or toggling drawers/modal state.
- `/console/analytics` surfaces summary cards, but “Organization Health” reports `0` active organizations and “Average quota utilization” as `Infinity%`, which signals a divide-by-zero in the mock data pipeline.

## Partner Portal (`/partner`, `/partner/statements`, `/partner/statements/[id]`)
- `/partner` QR verification flow works once a QR value is entered; success toast and status card display.
- `/partner/statements` list view renders, but the detail route (`/partner/statements/STMT_001`) hits the same `GetStaticPathsRequired` error as the member booking detail—`src/pages/partner/statements/[id].astro` needs `getStaticPaths()` or `prerender = false`.

## E-Sign (`/esign/[orgId]`)
- `/esign/ORG_001` end-to-end flow (form fill, signature consent, toast + success state) behaves nominally and redirects with `window.location.href = '/console'`.
- Visiting unsupported org IDs (e.g. `/esign/demo-org`) returns the default 404 because `getStaticPaths()` only exposes `ORG_001`–`ORG_003`. If broader coverage is required, extend the paths or disable prerendering.

