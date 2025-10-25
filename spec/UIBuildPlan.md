# UI Build Plan (shadcn-ui 3.5.0)

Principles: mobile-first, minimal props, clear empty/loading/error states, optimistic for small edits, skeleton on first load.

- Global
  - Import and configure shadcn 3.5.0; ensure `button`, `card`, `badge`, `tabs`, `table`, `dialog`, `drawer/sheet`, `tooltip`, `toast/sonner`, `form`, `command`, `popover`, `select`, `calendar`, `progress`, `skeleton`, `separator`, `avatar`.
  - Theme/tokens: keep Tailwind defaults; add minimal brand tokens in `src/styles/utils.css`.
  - Layout shells per area with header/title, back, and action slots.

- LIFF (/app)
  - Home `/app`
    - Components: Card (usage), Badge (status), Button (Support), Tabs (Upcoming/Past count), Skeleton.
    - States: loading skeleton → content; empty states with CTA.
  - Card `/app/card`
    - Components: Card, Button (Simulate check-in), Tooltip, Alert/Toast.
    - Show QR always; NFC hint if available; demo uses simulate button.
  - Bookings `/app/bookings`
    - Components: Tabs (Upcoming/Past), Table (course/date/time/players/status), Skeleton.
    - Row click → detail.
  - Booking Detail `/app/bookings/:id`
    - Components: Card, Separator, Dialog (Invite), Button (Invite), Command/Select (guest), Toast.

- Concierge Console (/console)
  - Dashboard `/console`
    - Components: Cards (SLA), Progress, Table (queue), Badge.
  - Booking Queue `/console/bookings`
    - Components: Data Table (sort/filter), Dialog (create/edit booking), Calendar (date), Form (zod + RHF), Dropdown actions (cancel/complete).
  - Member Profile `/console/members/:id`
    - Components: Card, Tabs (Usage/Bookings/Notes), Table (usage), Accordion (notes).
  - Courses `/console/courses`
    - Components: Table, Badge, Dialog (policy).

- Partner Portal (/partner)
  - Statements `/partner/statements`
    - Components: Table (month/course/status/totals), Badge.
  - Statement Detail `/partner/statements/:id`
    - Components: Table (lines), Dialog (dispute), Button (verify), Alert.

- Public (/rsvp)
  - RSVP
    - Components: Card, Form, Input, Select, Toast.

- i18n
  - Wrap all labels/strings with `t()` keys; start with EN sample resources.

- Definition of Done (per screen)
  - Loading/empty/error states implemented.
  - Keyboard and mobile gestures work; focus order sensible.
  - Strings externalized; types aligned with `spec/Types.md`.
  - Mock data connected behind TanStack Query.
