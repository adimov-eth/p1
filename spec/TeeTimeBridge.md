# TeeTime Bridge — Partner Ops SaaS (Concept)

Problem: Most courses lack APIs; bookings run through phone calls, LINE messages, or email. Coordination is manual, error‑prone, and not measurable.

Opportunity: A vertical SaaS to unify multi‑channel tee‑time operations with structured workflows, SLAs, and reconciliation — used by concierge teams and offered to courses.

## Core Jobs
- Unified Inbox: phone call logs, LINE OA threads, and email in one queue with course/member context.
- Templates & Scripts: course‑specific policies embedded; one‑click confirmations.
- Availability Recording: structured slots captured from calls/messages for future reference.
- Statement Assist: auto‑compile monthly lines from confirmed bookings; dispute workflow.

## Architecture (Phase 1)
- Channels: LINE Messaging API + IMAP/SMTP + call log integration (manual entry or VoIP later).
- Data: courses, contacts, bookings, messages, statements.
- APIs: webhook endpoints to push status back to Prime or other clients.

## KPIs
- Time‑to‑confirm per request; first‑contact resolution; dispute rate.
- Course adoption (logo count); message→confirmation conversion.

## Business Model
- Per‑course subscription; concierge team seats; optional revenue share for referred bookings.

This is optional for Prime MVP but informs our internal tooling choices.
