# Prime Backoffice Architecture Analysis

**Date:** October 26, 2025
**Context:** Planning backoffice UI for Prime operations team

---

## Decision: Option A - Unified Backoffice with Single Source of Truth

### Architecture

```
Single Postgres Database (Source of Truth)

Backoffice (/console + /admin)
  ├── Role-based views (concierge, finance, operations, management)
  ├── Reads/writes Postgres directly
  ├── Triggers workflows (invoice generation, notifications)
  └── Integrates external systems:
      ├── Accounting API (Thai accounting software)
      ├── Email/SMS (customer notifications)
      ├── LINE API (concierge ↔ member communication)
      └── Partner course systems (API or manual)

Member LIFF (/app): Reads from same Postgres
Partner Portal (/partner): Reads from same Postgres
```

**Not 4 separate systems.** One database, multiple UIs, role-based access.

### Current State vs Missing Pieces

| Role | Exists | Missing |
|------|--------|---------|
| **Member** | LIFF app (`/app`) - bookings, card, usage | ✓ Complete (demo) |
| **Concierge** | Dashboard (`/console`) - SLA metrics, queue | Booking creation, member communication |
| **Partner** | Statements (`/partner/statements`) | Settlement workflow UI |
| **Finance** | None | Invoice generation, payment tracking, settlements |
| **Operations** | None | Org onboarding, user management |
| **Management** | None | Business analytics, SLA reports |

### Recommended Scope

#### For Demo (Investor Presentation)

**Add 2-3 key workflows:**

1. `/console/create-booking` - Concierge booking creation
2. `/admin/orgs` - Organization onboarding pipeline
3. `/admin/settlements` - Partner settlement workflow

**Timeline:** 2-3 days
**Goal:** Show complete operational loop (sales → operations → finance)

#### For Production

**Phase 1: Backend (3-4 weeks)**
- Replace mocks with Hono API + Postgres
- Implement LINE auth
- Database schema for all entities

**Phase 2: Backoffice Workflows (2-3 weeks)**
- Org onboarding (sales → finance → ops handoff)
- Booking management (concierge creates bookings)
- Partner settlements (monthly workflow)
- Payment reconciliation

**Phase 3: Integrations (2-4 weeks)**
- Thai accounting software API
- Email/SMS providers
- LINE Messaging API
- Bank API (payment reconciliation)

**Total: 8-12 weeks**

### Build vs Buy Decision

**Build (differentiated workflows):**
- Org onboarding (unique to Prime's B2B2C model)
- Concierge booking coordination
- Partner network management
- Member usage tracking

**Buy or Integrate (generic workflows):**
- Invoicing (use Thai accounting software API)
- Payment processing (bank integration)
- CRM (if needed - consider Pipedrive/HubSpot for sales)
- Email/SMS (Resend, Twilio)

**Principle:** Build the 20% that's unique to Prime. Integrate the 80% that's generic business operations.

### Key Insight

Prime's value is **white-glove service coordination**, not software. The backoffice should:

1. **Make concierge superhuman** - instant access to member history, course availability, preferences
2. **Automate bookkeeping** - invoice generation, payment matching, partner settlements
3. **Track service quality** - SLA metrics, member satisfaction, response times
4. **Unify operations** - one system, not 4 separate tools requiring manual sync

The software enables the service. The service is the product.

### Technology Stack (Production)

**Extends existing demo architecture:**

```typescript
Frontend:
- Astro 5 + React 19 (same as current demo)
- TanStack Query (same pattern as demo)
- React Hook Form + Zod (same validation)
- shadcn/ui components (same design system)

Backend:
- Hono (Cloudflare Workers)
- Postgres (Neon or Supabase)
- Drizzle ORM
- LINE Login SDK
- Zod validation (shared with frontend)

External Integrations:
- Thai accounting software (Flowaccount or Juristic)
- Resend (email) + Twilio (SMS)
- LINE Messaging API
- Bank API (SCB or Bangkok Bank)
```

**Migration path:** Replace mock services with Hono API calls. Same UI patterns, real data.

### Risks & Mitigation

**Risk 1: Build too much, launch too late**
- **Mitigation:** Start with concierge workflows only. Add finance/ops incrementally.

**Risk 2: Data consistency across 4 systems**
- **Mitigation:** Single source of truth (Postgres). External systems are write-only (accounting) or read-only (analytics).

**Risk 3: Operational bottleneck (concierge manually handles everything)**
- **Mitigation:** Phase 2 adds member self-service booking (optional). Concierge remains available for complex requests.

### Next Steps

1. **Demo extension:** Add booking creation + org onboarding workflows (2-3 days)
2. **Production planning:** Database schema design + API endpoints
3. **Integration research:** Which Thai accounting software? Bank API availability?

---

## Conclusion

**Unified backoffice with single source of truth.** Build what's differentiated (concierge coordination, org onboarding), integrate the rest (invoicing, payments, accounting).

The goal: Make 1 concierge feel like 10 through great software.
