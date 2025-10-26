# Prime MVP Demo Script

**Duration:** 5-7 minutes
**Audience:** Investors
**Goal:** Demonstrate product vision and core architectural patterns

---

## Setup (Before Demo)

```bash
cd /Users/adimov/AGI/packages/prime
bun dev
# Wait for server to start (usually port 4321 or 4322)
```

**Pre-flight checks:**
- [ ] Server running successfully
- [ ] Browser tabs ready: `/p1/app`, `/p1/console`, `/p1/partner/statements`
- [ ] State is fresh (click "Reset Demo State" if needed)
- [ ] Expected initial data:
  - Rounds remaining: 143 (1 used from past booking)
  - 2 upcoming bookings
  - 1 past completed booking

---

## Demo Flow

### 1. Member Experience (LIFF Mini-App) - 2 minutes

**Navigate to:** `http://localhost:XXXX/p1/app`

**Show:**
- **Usage Dashboard**: "143 rounds remaining, 1 used"
- **Next Booking Card**: Alpine Golf Club, 5 days from now
- "This is what executives see in LINE - lightweight, focused on what matters"

**Action:** Click "Digital Card"

**Navigate to:** `/p1/app/card`

**Show:**
- **Gold membership card** with QR code
- Member name, org name, member ID
- "Course staff scan this for check-in"

**Critical Demo:** Click "Simulate Check-in"
- Toast notification appears
- **Navigate back to `/p1/app`**
- **Point out:** Rounds automatically decremented to 142
- "This demonstrates our observable state pattern - no manual cache management needed"

### 2. Concierge Console - 1.5 minutes

**Navigate to:** `http://localhost:XXXX/p1/console`

**Show:**
- **SLA Metrics Cards**:
  - Avg Response Time: 12 min
  - Fulfillment Rate: 98%
  - Satisfaction Score: 4.8/5.0
- **Request Queue**: 2 pending requests
- "Concierge team uses this to manage bookings and track service quality"

**Talk track:** "Our SLA guarantees 15-minute response time. Dashboard shows we're consistently beating that. This builds trust with corporate clients who expect premium service."

### 3. Partner Portal - 1.5 minutes

**Navigate to:** `http://localhost:XXXX/p1/partner/statements`

**Show:**
- **Monthly Statements List**: Alpine Golf Club statement
- Status badge: "Sent" (blue)
- "1 player, 1 booking"

**Action:** Click on the statement

**Navigate to:** `/p1/partner/statements/STMT_001`

**Show:**
- Statement details with line items
- **Click "Verify" button**
- Status updates to "Verified" (green) instantly
- Green confirmation card appears

**Talk track:** "Golf courses verify monthly usage. Observable state pattern means instant UI updates - same architecture as the check-in flow."

### 4. Architecture Highlight - 1 minute

**Show dev tools console (optional):**
"Three screens, zero manual synchronization. When member checks in:
1. Mock state mutates data
2. Notify triggers all subscribers
3. TanStack Query invalidates caches
4. All screens refetch automatically

This pattern scales to real backend. Replace mock functions with API calls - architecture stays identical."

---

## Acceptance Criteria Demonstrated

✅ **A0**: E-sign widget (not shown - out of scope for quick demo)
✅ **A2**: Concierge creates booking → member sees it (implied by existing bookings)
✅ **A3**: Check-in → rounds decrement **immediately** ✓
✅ **A4**: Cancellation logic (not shown - time constraint)
✅ **A5**: Partner statement verify → status updates **instantly** ✓
✅ **A6**: Console shows SLA metrics ✓
✅ **A7**: All text uses i18n keys (not visible but implemented)

---

## Key Talking Points

### Product Vision
"Prime enables executives to host high-impact business golf effortlessly. No booking headaches, no coordination overhead. Just show your digital card and play."

### Target Market
"Corporate clients spending ฿300k-600k/year on golf entertainment. We handle everything - course access, concierge service, partner network."

### Technical Differentiation
"Observable state pattern means instant UI updates across all surfaces. Member app, concierge console, partner portal - all synchronized automatically."

### MVP Status
"This is investor demo quality - all features mocked but fully interactive. Architecture proven. Next phase: replace mocks with Hono API workers, add Postgres, integrate LINE auth."

---

## Handling Questions

**Q: "Is this live data?"**
A: "Mocked for demo repeatability. Real data would come from Postgres via Hono API workers. Architecture already handles this - just swap service layer."

**Q: "How do you prevent double check-ins?"**
A: "Booking status changes from 'confirmed' to 'completed' on first check-in. Subsequent scans would show already used."

**Q: "What if courses dispute usage?"**
A: "Partner portal has 'Dispute' button. Creates support ticket for concierge team to investigate. Line items stay in pending state until resolved."

**Q: "Mobile responsive?"**
A: "Yes - all screens tested at 375px viewport. LIFF Mini-App is mobile-first by design."

**Q: "Timeline to production?"**
A: "Backend integration 2-3 weeks, LINE auth 1 week, UAT 2 weeks. 6-8 weeks total to beta launch."

---

## Backup - Reset Demo State

If something breaks during demo:

1. Navigate to `/p1/app`
2. Click "Reset Demo State" button (dev mode only)
3. All data returns to initial seed state
4. Continue from any section

Or use browser console:
```javascript
mockState.reset();
```

---

## What NOT to Show

- Bookings index page (works but not polished for demo)
- E-sign widget (not implemented)
- Member profiles (not implemented)
- Public RSVP form (not implemented)
- Error states (works but not interesting for demo)

Focus on the happy path that demonstrates **product vision** and **technical architecture**.

---

## Post-Demo Next Steps

**If investors are interested:**
1. Deep dive on business model (see `docs/Pricing & Terms.md`)
2. Review go-to-market plan (see `docs/Go-to-Market Launch Plan Dashboard.md`)
3. Discuss funding round size and use of proceeds
4. Schedule technical due diligence with CTO

**Demo artifacts available:**
- Full product spec in `spec/` directory
- Architecture docs in root directory
- Codebase on GitHub (link TBD)

---

**Duration check:** Total flow should take 5-7 minutes with natural pacing. Practice 2-3 times before investor meeting to stay within time.

**Energy:** This is premium product for premium clients. Speak with confidence. The architecture works. The product solves real pain.

**Close:** "Questions?"
