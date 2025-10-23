# Prime Membership Experience — PRD v1

## Summary
Prime delivers a corporate golf membership platform: two designated users per organization, 144 rounds/year across 80+ courses, concierge-managed bookings, and a LINE Mini-App (LIFF) for digital card, usage, and guest invites.

## Objectives & Success Metrics
- Convert first 10–25 members (Founders/Early Adopters) with seamless onboarding.
- 95%+ successful check-ins (NFC/QR) without concierge escalation.
- Concierge SLA: <5m ACK (LINE), <15m ACK (email); first-response compliance ≥ 95%.
- Accurate usage tracking: zero unresolved quota discrepancies per billing cycle.

## Users & Roles
- Organization Admin: manages designated users; reviews usage and invoices.
- Designated User (Member): books via concierge, checks in, invites guests.
- Concierge Agent: creates bookings, manages waitlists, logs communications.
- Partner Course Staff: verifies statements, confirms usage.

## Scope (MVP)
- Identity & Roles: org-scoped auth; 2 designated users per org.
- Usage & Quota: track 144 rounds; deduct on check-in; 48h cancellation policy.
- Bookings: concierge-created bookings with course/date/time/players; member view-only.
- Digital Card: LIFF-based card with NFC + QR fallback; check-in creates usage event.
- Invitations: member shares digital guest invites from a booking (LINE share).
- Partner Statements: monthly usage export and simple partner review screen.
- E-Sign → Invoice → Activation: webhook stubs to move status across stages.

Out of Scope (MVP)
- Self-serve booking engine; payments; multi-currency; advanced analytics.

## Non-Functional Requirements
- Privacy/PDPA: consent logging, data minimization, retention policy; audit trails for concierge actions.
- Availability: 99.9% for LIFF APIs; backups nightly; PII encrypted at rest.
- Performance: LIFF views TTI < 2.5s on 4G; API p95 < 300ms in-region.

## Dependencies
- LIFF (LINE Mini-App), Postgres, email provider, LINE Official Account, e-sign + accounting integration (webhook-based).

## Acceptance Criteria
- A1: Organization admin can assign two designated users; changes log and enforce fee for transfers (logic stub OK).
- A2: Concierge can create booking with players (member + guests); member sees it in LIFF.
- A3: NFC/QR check-in records usage and decrements remaining rounds correctly; guest count respected.
- A4: Cancellations inside 48h mark usage as forfeited; outside 48h restore quota.
- A5: Monthly statement export includes course, date, players, and status; partner can mark verified.
- A6: PRD metrics and SLAs can be monitored (basic dashboards or logs).

## Open Questions
- Which e-sign and accounting vendors (DocuSign/Xero/etc.) for v1?
- Are any partner courses requiring API-based tee-time verification?
- Multi-language requirement at launch (TH/EN) for LIFF and concierge comms?
