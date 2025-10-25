# Mock Data & Services (Demo Mode)

Purpose: deterministic, realistic demo data with slight network-like latency to showcase the full experience without backends.

- Toggle
  - Env: `VITE_USE_MOCKS=true` enables mock provider; `false` uses API client.
  - Single switch point in `src/lib/services/index.ts`.

- Files
  - `src/mocks/seed.ts` – seeded data for org, users, courses, bookings, statements.
  - `src/mocks/service.ts` – async functions matching `APIs.md` with 250–600ms delays.
  - `src/mocks/util.ts` – helpers: `delay(ms)`, `pick<T>()`, seed random.

- Seeds
  - Organization: `Prime Demo Co.`, annualQuotaDefault=144, active.
  - Users: two designated users; one org admin.
  - Courses: Alpine, Nikanti, Siam Country Club (variants under single id list ok for demo).
  - Bookings: 2 upcoming, 3 past; players mix of member + guests.
  - Statements: current month with 3–6 lines; 1 verified, 1 draft.

- Functions (mock signatures)
  - `getAppHome(): Promise<AppHomeResponse>`
  - `listBookings(status: 'upcoming' | 'past'): Promise<ListBookingsResponse>`
  - `getBooking(id: string): Promise<Booking>`
  - `sendInvitation(bookingId: string, guest: { id?: string; name: string }): Promise<Invitation>`
  - `postCheckin(bookingId: string, playerIds?: string[], method: 'nfc' | 'qr'): Promise<{ usageEventId: string }>`
  - Console endpoints mirror `spec/APIs.md`.

- Constraints embedded
  - 48h cancellation window and forfeiture logic.
  - Group size and guest accompaniment rules.
  - Quota accounting for used/restored/forfeited.

- Notes
  - Do not leak PII; keep guest names generic.
  - Keep IDs short and stable for predictable demos.
