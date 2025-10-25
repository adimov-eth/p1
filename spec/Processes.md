# Operations — SOPs

Compiled from `docs/Concierge Manual.md` and `docs/Financial Operations Dashboard.md`.

## Communication Channels
- Phone: 07:00–19:00, answer ≤ 3 rings; voicemail checked every 30m.
- Email: `concierge@primegolf.co`; ACK ≤ 15m; resolve ≤ 60m.
- LINE OA: ACK ≤ 5m; resolve ≤ 30m; off‑hours auto‑reply.

## Booking Request Workflow
1) Receive & Acknowledge using scripted response.
2) Gather Big 5: member, course/date, preferred tee time, players, guest names.
3) Check availability and quota; review course policies.
4) Confirm with member; restate 48h cancellation policy.
5) Finalize: create booking; send LIFF confirmation + calendar invite; update CRM.

## Cancellation
- Outside 48h: confirm, update, restore any holds.
- Inside 48h: inform forfeiture; empathize; escalate if contested; log thoroughly.

## Complaints
- Listen → Empathize → Document → Immediate action → Escalate → Follow‑up.

## Financial Operations
Corporate Invoicing
- Agreement signed → Ready for Invoice (E‑Sign).
- Create invoice (accounting), Net 30; send PDF with payment link.
- Status → Invoiced; reminders configured.

Payment Tracking & Activation
- Daily reconciliation (bank/gateway).
- Match & apply payment; mark paid.
- Status → Active; trigger welcome packet to member and users.

Partner Settlement
- Log all rounds (course, date, member, players).
- On the 1st: generate per‑course statements; send for verification (3–5 biz days).
- Process payment via bank transfer; record expense under Partner Course Fees.

## Partner Communication (Manual Channels)
- Booking confirmations and inquiries are via phone, LINE, or email; no partner APIs initially.
- Maintain a contact directory per course (see `spec/Courses.md`).
- Log all communications (time, channel, staff) in the CRM/audit log.

## Scripts (excerpts)
- Phone Greeting: “Good morning/afternoon, Prime Corporate Golf Club, [Name] speaking. How may I assist you?”
- LINE ACK: “Thank you for contacting the Prime Concierge. We have received your request and are working on it now. We will be back to you within 30 minutes.”
