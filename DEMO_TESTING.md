# Demo Testing Checklist

## Setup

```bash
bun dev
# Visit http://localhost:4321/p1/ (or whatever port Astro assigns)
```

## Test Flows

### 1. LIFF Mini-App Flow

#### Home Page (`/app`)
- [ ] See "Welcome to Prime" header
- [ ] See rounds remaining (should be 143 initially)
- [ ] See rounds used (should be 1 - from seed data)
- [ ] See next booking card (Alpine Golf Club, 5 days from today)
- [ ] See upcoming bookings count

#### Digital Card (`/app/card`)
- [ ] See membership card with gold gradient
- [ ] See member name "John Smith"
- [ ] See QR code
- [ ] See member ID USER_001
- [ ] Click "Simulate Check-in" button
- [ ] See success toast
- [ ] Navigate back to `/app`
- [ ] **CRITICAL**: Rounds remaining should now be 142 (auto-updated via observable state)

#### My Bookings (`/app/bookings`)
- [ ] See "Upcoming" and "Past" tabs
- [ ] Upcoming tab shows 2 bookings
- [ ] Past tab shows 1 completed booking
- [ ] Click on a booking card

#### Booking Detail (`/app/bookings/BOOKING_001`)
- [ ] See booking details (course, date, time)
- [ ] See players list (2 players: John Smith + Bob Wilson)
- [ ] See "Invite" button
- [ ] Click Invite → dialog opens
- [ ] Enter guest name and email
- [ ] Click "Send Invitation"
- [ ] See success toast
- [ ] **CRITICAL**: Player count should update to 3 (observable state)

### 2. Concierge Console Flow

#### Dashboard (`/console`)
- [ ] See SLA metrics cards:
  - Avg Response Time: 12 min
  - Fulfillment Rate: 98%
  - Satisfaction Score: 4.8/5.0
- [ ] See request queue with 2 pending requests
- [ ] See quick action links (Manage Bookings, Member Profiles)

### 3. Partner Portal Flow

#### Statements List (`/partner/statements`)
- [ ] See monthly statements list
- [ ] See Alpine Golf Club statement
- [ ] See status badge "sent"
- [ ] See totals (1 player, 1 booking)
- [ ] Click on statement card

#### Statement Detail (`/partner/statements/STMT_001`)
- [ ] See course name and month
- [ ] See totals (1 player, 1 booking)
- [ ] See activity details with 1 line item
- [ ] See "Verify" and "Dispute" buttons
- [ ] Click "Verify" button
- [ ] See success toast
- [ ] **CRITICAL**: Status badge should update to "verified" (observable state)
- [ ] See green "verified" confirmation card

## Observable State Validation

The key architectural pattern to validate:

1. **Check-in Flow**:
   - HomePage shows 143 rounds
   - CardPage → Simulate Check-in
   - Navigate back to HomePage
   - HomePage should show 142 rounds WITHOUT refresh

2. **Guest Invite Flow**:
   - BookingDetail shows 2 players
   - Invite guest
   - Players list should update to 3 WITHOUT refresh

3. **Statement Verification Flow**:
   - Statement status "sent"
   - Click Verify
   - Status should update to "verified" WITHOUT refresh

If all three flows work without manual refresh, the observable state pattern is validated.

## Cross-Screen Consistency

Open multiple tabs:
- Tab 1: `/app` (HomePage)
- Tab 2: `/app/card` (CardPage)

In Tab 2: Click "Simulate Check-in"
In Tab 1: **Manually refresh** → rounds should be 142

(Note: Without WebSocket, auto-sync only works within same tab via TanStack Query invalidation)

## Mobile Responsive

Test at 375px viewport:
- [ ] All pages render correctly
- [ ] No horizontal scroll
- [ ] Touch targets are 44px minimum
- [ ] Text is readable

## Error States

Test error handling:
- [ ] Navigate to `/app/bookings/INVALID_ID` → see "Booking not found"
- [ ] Navigate to `/partner/statements/INVALID_ID` → see "Statement not found"

## Loading States

All pages should show skeleton loading states while data fetches (300-500ms delays in mocks).

## i18n Coverage

All visible text should use `t()` helper - no hardcoded strings.

## Performance

- [ ] Initial load < 2.5s on Fast 3G
- [ ] No console errors
- [ ] No TypeScript errors in terminal

## Demo Readiness

When all checkboxes pass:
- Observable state pattern works ✓
- Cross-screen consistency validated ✓
- All user flows complete ✓
- Ready for investor demo ✓
