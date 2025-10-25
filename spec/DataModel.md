# Data Model

This defines core entities and relationships for MVP.

## Entities
- Organization
  - id, name, billingContact{name,email,phone}, address, status{prospect,invoiced,active,suspended}
  - membershipStartAt, membershipEndAt, annualQuotaDefault(144)

- User
  - id, orgId, role{org_admin,designated,concierge,partner}
  - name, email, phone, lineUserId, status{active,inactive}

- Course
  - id, name, location, contact, policy{blackouts[], guestLimits, notes}

- Booking
  - id, orgId, courseId, date, teeTime, status{pending,confirmed,cancelled,completed}
  - createdBy{userId}, cancellationWindowHours(48)
  - players[{type{member,guest}, userId?, guestId?, name}]

- Guest
  - id, orgId, name, phone?, notes?

- UsageEvent
  - id, bookingId, orgId, date, playersCount, status{deducted,restored,forfeited}, source{checkin,cancel_window}

- Invitation
  - id, bookingId, guestId, sentAt, channel{line,link}, status{sent,accepted}

- Statement
  - id, courseId, month, lines[{bookingId,date,playersCount,confirmed:boolean}], totals{players}
  - status{draft,sent,verified,disputed,paid}

- Invoice (external ref)
  - id, orgId, amount, currency, dueAt, paidAt, status{draft,sent,paid,overdue}

- AuditLog
  - id, actor{userId,role}, action, entity{type,id}, payload, createdAt

## Relationships
- Organization 1‑N Users (includes admins and designated users).
- Organization 1‑N Bookings; Booking N‑players (member+guests).
- Booking 1‑N UsageEvents.
- Course 1‑N Bookings; Course 1‑N Statements.
- Statement 1‑N Lines referencing Bookings.
- Booking 1‑N Invitations to Guests.

## Policy Encoding
- Annual quota stored at org level; computed usage = sum(deducted) − sum(restored).
- Cancellation window per booking (default 48h) drives forfeiture rules.
- Transfer fee events recorded as audit entries; accounting handled externally.

