# Analytics & Metrics

## North Star
- Member Time Saved and Round Completion without Escalation.

## Product Metrics
- Activation: time from invoice paid → first booking.
- Usage: rounds used vs remaining; avg players per round; guest ratio.
- Reliability: LIFF p95/99; API p95/99; uptime.
- Check‑in success rate; fallback QR usage.
 - E‑sign funnel: initiate → complete rate; time to sign.
 - i18n coverage: missing key count per release (dev only).

## Service Metrics
- Concierge ACK/Resolve SLA compliance by channel.
- Queue age distribution; first response time; resolution time.

## Financial Metrics
- AR aging; churn/renewal rate; partner payout cycle time.
- Unit economics per round: revenue vs partner fees and service cost.

## Instrumentation Plan
- Event: `app_viewed`, `booking_viewed`, `card_shown`, `checkin_success`, `checkin_fallback_qr`, `invite_sent`, `invite_opened`.
- Console: `booking_created`, `booking_cancelled`, `policy_override`, `statement_sent`, `statement_verified`.
- Correlate events to org and membership term; keep PII minimal.
 - E‑sign: `esign_initiated`, `esign_completed` with durations.

## Dashboards
- Ops: SLA compliance + queue; incidents.
- Product: usage funnel; check‑in success; invites.
- Finance: AR aging; partner payouts; statements status.
