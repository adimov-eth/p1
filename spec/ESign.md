# Internal E‑Sign Widget (MVP)

## Goals
- Capture legally binding acceptance for corporate membership without third‑party vendors.
- Generate a signed agreement record with signer details and signature hash.

## Flow
- Admin receives a link to review agreement.
- Widget displays latest agreement version, highlights key terms (144 rounds, 48h cancellation, transfer fee).
- Admin enters name/title/email, checks consent box, draws or types signature, and submits.
- System stores immutable record and marks org `invoiced_ready`.

## Data Stored
- agreementId, version, orgId
- signer{name,title,email}
- signedAt (ISO), signatureHash, clientIp, userAgent
- pdfSnapshotUrl (generated asynchronously), checksum

## API
- POST `/api/esign/initiate` { orgId, agreementVersion }
- POST `/api/esign/complete` { signingSessionId, orgId, signer, signatureHash }

## Security
- CSRF protection, one‑time signing session tokens, rate limiting.
- Tamper‑evident hashes and PDF snapshot stored in object storage.

## Acceptance
- Signed record is visible to Ops; invoice step can proceed.
- AuditLog entry created with minimal PII.
