# View Inventory (shadcn)

This is the UI blueprint to implement with shadcn + Tailwind. Keep screens minimal, fast, and mobile-first.

## UI Kit Baseline
Install common primitives before building screens:

bunx shadcn@latest add button card badge input label textarea select checkbox radio-group \
  dialog drawer sheet dropdown-menu popover tooltip tabs separator skeleton toast \
  table accordion avatar progress calendar form command sonner

Notes
- Configured via `components.json` with css at `src/styles/global.css`.
- Components live in `src/components/ui/*`; wrap domain widgets in `src/components/*`.

## Apps & Screens

Mini-App (LIFF)
- Home `/app` — purpose: snapshot (rounds remaining, next booking). Components: Card, Badge, Button, Tabs, Skeleton.
- Digital Card `/app/card` — purpose: NFC/QR check-in. Components: Card, Button, Tooltip, Alert.
- Bookings `/app/bookings` — purpose: list upcoming/past. Components: Tabs, Table, Badge, Button, Skeleton.
- Booking Detail `/app/bookings/:id` — purpose: details + invite guest. Components: Card, Separator, Dialog (invite), Share/Command.

Concierge Console (Internal)
- Dashboard `/console` — purpose: SLA overview and queues. Components: Cards, Progress, Table, Badge.
- Booking Queue `/console/bookings` — purpose: triage and create bookings. Components: Data Table (table + dropdown-menu), Dialog (create/edit), Date picker (calendar), Form.
- Member Profile `/console/members/:id` — purpose: usage timeline, notes. Components: Card, Tabs, Table, Accordion.
- Courses `/console/courses` — purpose: directory + policies. Components: Table, Badge, Dialog.

Partner Portal
- Statements `/partner/statements` — purpose: list monthly statements. Components: Table, Badge, Button.
- Statement Detail `/partner/statements/:id` — purpose: verify/flag. Components: Table, Dialog (dispute), Alert.

Public (Astro)
- RSVP `/rsvp` — purpose: event registration. Components: Card, Form, Input, Select, Toast.

## Screen Contracts (examples)
- Booking (read): id, course, date, time, players[], status, cancellationWindow.
- Usage Summary: roundsUsed, roundsRemaining, lastPlayedAt, upcomingCount.
- Statement: id, month, course, lines[{date, players, confirmed}], totals.

## Interaction Notes
- Use Dialog for modal edits; Drawer/Sheet on mobile.
- Prefer optimistic UI for minor edits; toast success/error.
- Use Skeleton on first load; keep p95 < 2.5s on 4G.

## Naming & Structure
- Components: PascalCase (e.g., `BookingCard`, `UsageBadge`).
- Route files: kebab-case in app directories; colocate minor widgets with screens.
- Styles: rely on Tailwind + design tokens; avoid ad-hoc CSS.
