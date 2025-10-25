# APIs & Webhooks (MVP Contracts)

Goal: define lightweight, clear contracts to support LIFF, concierge console, and partner workflows. Actual implementation may be serverless endpoints.

## Auth & Context
- LIFF provides user identity via LINE; map to internal `User` by `lineUserId`.
- Internal console uses role‑based auth tokens.

## Member (LIFF)
- GET `/api/app/home` → { usageSummary, nextBooking }
- GET `/api/app/bookings?status=upcoming|past` → Booking[]
- GET `/api/app/bookings/:id` → Booking detail
- POST `/api/app/invitations` { bookingId, guest:{id?|name} } → Invitation

## Check‑in
- POST `/api/checkin` { bookingId, playerIds[]?, method{nfc,qr} } → UsageEvent
  - Behavior: validates booking date/time window and players; creates `UsageEvent(deducted)`.

## Concierge Console
- GET `/api/console/queue` → [{requestId, channel, receivedAt, status}]
- POST `/api/console/bookings` { orgId, courseId, date, teeTime, players[] } → Booking
- PATCH `/api/console/bookings/:id` { updates } → Booking
- POST `/api/console/cancellations` { bookingId } → Booking + UsageEvent(restored|forfeited)
- GET `/api/console/members/:id` → { profile, usage[], bookings[] }
- GET `/api/console/courses` → Course[]

## Partner Portal
- GET `/api/partner/statements?month=YYYY-MM` → Statement[]
- GET `/api/partner/statements/:id` → Statement detail
- POST `/api/partner/statements/:id/verify` { lines[] } → Statement
- POST `/api/partner/statements/:id/dispute` { reason, lines[] } → Statement

## E‑Sign (Internal, no 3rd party)
- POST `/api/esign/initiate` { orgId, agreementVersion } → { signingSessionId, url }
- POST `/api/esign/complete` { signingSessionId, orgId, signer:{name,title,email}, signatureHash } → { agreementId, status:signed }
  - Behavior: stores executed agreement metadata; marks org `invoiced_ready` for internal invoicing.

## Webhooks (External — optional)
- POST `/api/hooks/accounting` { invoiceId, orgId, status{sent,paid,overdue} } → transition org → active on `paid`

## Response Shapes (examples)
- UsageSummary → { roundsUsed:number, roundsRemaining:number, lastPlayedAt?:ISO, upcomingCount:number }
- Booking → { id, course:{id,name}, date, teeTime, players:[{type,name}], status, cancellationWindowHours }
- Statement → { id, month, course:{id,name}, lines:[{bookingId,date,players,confirmed}], totals:{players}, status }

## Errors & Codes
- 400 policy_violation (e.g., within 48h cancellation window)
- 401/403 auth
- 404 not_found (booking, course)
- 409 quota_insufficient
- 5xx service errors
