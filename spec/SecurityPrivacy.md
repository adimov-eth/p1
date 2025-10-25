# Security & Privacy (PDPA)

## Data Minimization & Purpose
- Collect only what’s needed for membership, bookings, check‑ins, and settlements.
- Map purposes to lawful bases (contract, legitimate interest, consent for marketing) per `docs/Privacy Policy.md`.

## Personal Data
- Corporate: company, billing, representative.
- Users: name, email, phone, LINE user ID.
- Guests: name.
- Usage: bookings, check‑in timestamps, location (for NFC/QR events).
- Communications: concierge correspondence metadata.

## Controls
- Access control by role; least privilege; staff SSO where possible.
- Encryption: at rest for PII; TLS in transit.
- Audit Logs: all concierge actions, policy overrides, user transfers.
- Backups: nightly; protected keys; restore tests monthly.

## Retention
- Operational data retained for membership term + statutory periods (accounting/tax).
- Post‑term: deletion or anonymization after legal obligations expire.

## Data Subject Rights
- Access, rectify, erase, restrict, object, port, withdraw consent.
- DPO contact: privacy@primegolf.co

## Contact Details (Mock)
- Email: privacy@primegolf.co
- Address: Prime Corporate Golf Club Co., Ltd., 123 Wireless Road, Lumphini, Pathum Wan, Bangkok 10330, Thailand
- Phone: +66 2 123 4567

## Third Parties
- LINE (platform), hosting, accounting, e‑signature vendors bound by DPA.
- No selling of personal data.

## Incident Handling
- Detect → Contain → Eradicate → Recover; notify per PDPA thresholds and timelines.
