# User Journeys & Flows

## 1) New Member Onboarding
Actors: Sales → Ops → Concierge → Org Admin → Designated Users

Flow
1. Agreement signed (E‑Signature).
2. Invoice issued (Net 30). Status → Invoiced.
3. Payment reconciled → Status → Active.
4. Concierge assigned; welcome call + email.
5. LIFF access activated for two designated users.
6. Welcome package shipped; follow‑up on delivery.

Notes
- See `docs/Member Onboarding Process.md`.
- Track SLA: activation ≤ 7 days from payment.

## 2) Booking Creation (Concierge‑led)
Actors: Designated User ↔ Concierge; Partner Course (availability)

Flow
1. Member requests tee time (LINE OA/Email/Call).
2. Concierge acknowledges (ACK SLA 5–15m by channel).
3. Validate quota and policy constraints (guests, limits, blackouts).
4. Confirm course availability and propose options.
5. Create booking; send confirmation (LIFF, email invite).
6. Update CRM/usage pre‑hold as needed.

Edge Cases
- Low quota → propose alternative date; flag to org admin if pattern.
- Policy conflict (within 48h window) → escalate per playbook.

## 3) Check‑in & Usage
Actors: Designated User (+ guests), Partner Staff, System

Flow
1. Arrive; open LIFF Digital Card.
2. Tap NFC (or display QR fallback).
3. Verify check‑in at course desk.
4. System records usage for member + guests; decrement rounds.
5. Post‑round: usage reconciled; statement line prepared.

Edge Cases
- No NFC device → QR fallback.
- Guest mismatch at desk → concierge notified; adjust players before reconciliation.

## 4) Cancellation & No‑Show
Actors: Designated User, Concierge, System

Flow
1. Cancellation request received.
2. If ≥ 48h, restore any pre‑hold usage.
3. If < 48h, mark usage forfeited per policy.
4. Communicate clearly; log in audit trail.

## 5) Guest Invitation
Actors: Designated User, Guest

Flow
1. From booking detail, select Invite Guest.
2. Choose existing or add new guest.
3. Share invite via LINE; guest receives details + map.

## 6) Partner Statement & Settlement
Actors: Concierge/Ops, Partner Course Accounts

Flow
1. Monthly statement generated per course from usage records.
2. Email to partner for verification (3–5 business days).
3. Process payment; record expense.
4. Resolve disputes; adjust records if needed.

See: `docs/Financial Operations Dashboard.md`.

## 7) User Transfer (Org Admin)
Actors: Org Admin, Concierge

Flow
1. Admin requests user change.
2. Collect new user’s details; verify employment.
3. Apply transfer fee (฿5,000) per policy.
4. Activate new user; deactivate prior; update audit.

