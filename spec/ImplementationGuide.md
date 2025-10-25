# Implementation Guide (Step-by-Step)

Audience: coding agent implementing the demo with mocks, ready to swap to API later.

- 0) Prereqs
  - bun installed; run `bun install`.
  - shadcn configured (3.5.0). If missing components, add with `bunx shadcn@latest add ...`.

- 1) Core plumbing
  - Create `src/types/` and copy interfaces from `spec/Types.md` (domain.ts, api.ts).
  - Add `src/lib/i18n/` with `t()` helper and load EN resources (see `spec/I18n.md`).
  - Add `src/lib/services/` with index that chooses between `mockService` and `apiClient` using `import.meta.env.VITE_USE_MOCKS`.
  - Add TanStack Query provider at app root; configure sensible `staleTime`.

- 2) Mock services
  - Implement `src/mocks/seed.ts`, `src/mocks/service.ts`, `src/mocks/util.ts` per `spec/Mocks.md`.
  - Ensure functions match `spec/APIs.md` signatures and return `spec/Types.md` DTOs.

- 3) UI shells
  - Add layout wrappers for each area (App/Console/Partner/Public) with header slots.
  - Extract all text to EN keys from `spec/i18n/en.sample.json`.

- 4) LIFF screens
  - `/app` Home: fetch `getAppHome`; display usage/next booking; skeleton/empty.
  - `/app/card` Digital Card: show QR; simulate check-in → toast + rounds update.
  - `/app/bookings` Tabs Upcoming/Past: list; row click to detail.
  - `/app/bookings/:id` Detail: show players; Invite dialog (existing/new guest) → sendInvitation → toast.

- 5) Concierge console
  - `/console` Dashboard: SLA cards from mock metrics; queue table.
  - `/console/bookings` Data table; create/edit dialog with Zod+RHF; actions: cancel/complete.
  - `/console/members/:id` Tabs (Usage/Bookings/Notes) with tables; add note (no persistence needed in demo).
  - `/console/courses` Table with policy dialog; load from `spec/Courses.md` seed.

- 6) Partner portal
  - `/partner/statements` List; badge statuses.
  - `/partner/statements/:id` Lines table; verify/dispute dialog → update mock state.

- 7) Public RSVP
  - `/rsvp` simple form; on submit show toast; no backend.

- 8) E‑Sign widget
  - `/esign/:orgId` page: show summary of key terms; name/title/email; checkbox consent; signature pad (draw or type); submit → mock `esignComplete` → show success.

- 9) Polish & validation
  - Loading/empty/error states; toasts; keyboard nav; mobile spacing.
  - i18n completeness vs EN keys; log missing in dev.
  - Ensure all DTOs conform; compile with strict TS.

- 10) Demo script
  - Step-by-step clicks to showcase: onboarding → create booking → invite guest → simulate check-in → statements → partner verify.

- 11) Swap plan (post-demo)
  - Replace mock service with `apiClient` using same signatures; add Hono Workers per `spec/APIs.md`.
