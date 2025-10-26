Prime MVP - Development Plan

Current State Assessment

✅ Complete

- Landing page (deployed)
- Member app foundation (home, card pages)
- Console foundation (dashboard, SLA metrics)
- Mock state architecture
- Basic routing (Astro + React Router)

⚠️ Built But Unverified

- Booking creation flow (THIS IS CRITICAL - test first)
- mockState auto-update mechanism
- Rounds calculation logic

❌ Not Built

- 70% of console features
- 50% of member app features
- 100% of partner portal
- 100% of public onboarding
- Most error/loading/empty states

Phase 1: Verify Current Work (TODAY - 1 hour)

Why: You can't build on broken foundation. Test what exists before adding more.

Task 1.1: Manual Flow Testing (30 min)

# Open browser to http://localhost:4321/console
# Test booking creation end-to-end:
1. Click "Create Booking" on John Smith's request
2. Fill course: Alpine Golf Club
3. Fill date: tomorrow
4. Submit
5. Verify console logs show: 🎯 📊 🆔 💾 📝 🎟️ ✅ 🧭
6. Verify dashboard shows "1 pending" (was "2 pending")
7. Navigate to /app
8. Verify new booking appears in "Upcoming Bookings"
9. Verify rounds decreased (was 142, should be 140)

If it works:
- Remove debug logging
- Document working flow
- Proceed to Phase 2

If it fails:
- Check browser console for error
- Debug from instrumentation logs
- Fix bugs before proceeding
- DO NOT BUILD NEW FEATURES ON BROKEN FOUNDATION

Task 1.2: mockState Auto-Update Verification (15 min)

# Test that UI updates when mockState changes
1. Open /console in one tab
2. Open /app in another tab
3. Create booking in console
4. Switch to /app tab
5. Verify booking appears WITHOUT refresh
6. Check if TanStack Query invalidation fires

Expected: Both UIs update automatically via mockState.notify()

If broken: Fix useMockStateSync in RootProvider before continuing

Task 1.3: Rounds Calculation Audit (15 min)

// Verify math is correct in CreateBookingForm.tsx
// Current logic:
const usedRounds = usageEvents
.filter(e => e.status === 'deducted')
.reduce((sum, e) => sum + e.playersCount, 0);

const current = org.annualQuotaDefault - usedRounds;
const after = current - playersCount;

// Questions to verify:
// 1. Does annualQuotaDefault = 144?
// 2. Do seed data usage events sum correctly?
// 3. Does UI show correct current/using/after?
// 4. Does form disable if after < 0?

Fix if wrong, document if right.

---
Phase 2: Core User Journeys (3-4 days)

Goal: Demonstrate complete booking lifecycle in demo

Day 1: Member App - Check-In Flow

Why first: This is the "wow" moment - member scans QR at course, rounds instantly update

Files to create:
src/components/app/
CheckInPage.tsx          # QR code display + status
BookingDetailPage.tsx    # Show single booking with cancel option
src/components/app/
AppRouter.tsx            # Add routes: /bookings/:id, /check-in/:bookingId

Implementation:
// CheckInPage.tsx
- Display booking details (course, date, time, players)
- Generate QR code from bookingId + secret
- Show status: "Not checked in" → "Checking in..." → "Checked in ✓"
- Auto-refresh status every 3s (simulates partner scanning)
- After check-in: navigate back to home, show updated rounds

QR Code content:
{
"type": "check-in",
"bookingId": "BOOKING_123",
"timestamp": "2025-10-26T10:00:00Z",
"signature": "mock-signature"
}

mockState changes:
// Add to Booking interface:
checkedInAt?: string;
checkedInBy?: string; // Partner user ID

// Add check-in mutation:
mockState.checkInBooking(bookingId, partnerId)

Testing:
1. Create booking in console
2. See it in /app upcoming
3. Click booking → detail page
4. Click "Check In" → QR code page
5. (Simulate partner scan) → Status updates
6. Navigate home → rounds decreased

Acceptance:
- QR code displays correctly
- Status updates without refresh
- Rounds decrement after check-in
- Booking moves from "upcoming" to "past"

Day 2: Partner Portal - Check-In Verification

Files to create:
src/pages/partner.astro
src/components/partner/
PartnerPage.tsx
PartnerRouter.tsx
CheckInScannerPage.tsx
StatementsListPage.tsx  # Already exists, integrate

Implementation:
// CheckInScannerPage.tsx
- Camera view (use <input type="file" capture="environment" /> for demo)
- Scan QR code → parse booking info
- Display booking details for confirmation
- Button: "Confirm Check-In"
- On confirm: mockState.checkInBooking() + show success
- Show today's check-ins list below scanner

mockState changes:
// Add to seed data:
partners: [
{
    id: 'PARTNER_001',
    name: 'Alpine Golf Club',
    type: 'course',
    contactName: 'Club Manager',
    revenueShare: 0.70, // 70% to partner
}
]

// Add method:
mockState.confirmCheckIn(bookingId, partnerId) {
// Find booking
// Update checkedInAt, checkedInBy
// Create settlement entry
// Notify (console.log for now)
}

Testing:
1. Create booking
2. Member sees in app
3. Partner opens /partner
4. Partner scans (simulates with file upload of QR screenshot)
5. Partner confirms check-in
6. Member app updates (rounds decrease)
7. Partner sees check-in in today's list

Day 3: Console - Booking Management

Files to create:
src/components/console/
BookingsListPage.tsx     # All bookings table
BookingDetailPage.tsx    # View/edit single booking
MemberProfilePage.tsx    # View member info

BookingsListPage:
// Table with columns:
- Date/Time
- Member Name
- Course
- Players
- Status (upcoming/checked-in/cancelled)
- Actions (View, Cancel)

// Filters:
- By org
- By status
- By date range
- Search by member name

// Actions:
- Click row → detail page
- Cancel button (if >48h before tee time)

BookingDetailPage:
// Show full details:
- Member info
- Course info
- Players list
- Booking status
- Check-in info (if checked in)
- Cancellation policy

// Actions:
- Edit (change date/time if >48h)
- Cancel (with rounds restoration logic)
- Add notes

Cancellation logic:
mockState.cancelBooking(bookingId) {
const booking = find(bookingId);
const hoursUntil = hoursBetween(now, booking.teeTime);

if (hoursUntil >= booking.cancellationWindowHours) {
    // Restore rounds
    booking.status = 'cancelled';
    usageEvent.status = 'restored';
} else {
    // Forfeit rounds
    booking.status = 'cancelled-late';
    usageEvent.status = 'forfeited';
}

notify();
}

Day 4: Member App - Booking Management

Files to create:
src/components/app/
BookingsListPage.tsx     # All member's bookings
CancelBookingModal.tsx   # Confirm cancellation

BookingsListPage:
// Tabs:
- Upcoming (status: confirmed, !checkedInAt)
- Past (status: confirmed, checkedInAt OR < today)
- Cancelled

// Each booking card:
- Course name, date, time
- Players count
- Status badge
- Click → detail page

// Upcoming only:
- Cancel button (if >48h)
- Check-in button (if date = today, time within 2h)

CancelBookingModal:
// Show warning:
"Cancel booking at [Course] on [Date]?"

// If >48h:
"Your [N] rounds will be restored"

// If <48h:
"⚠️ Cancellation window passed. Rounds will be forfeited."

// Confirm/Cancel buttons

Testing:
1. Member views bookings
2. Cancels upcoming (>48h) → rounds restored
3. Tries to cancel (<48h) → warning shown, rounds forfeited
4. Views past bookings → shows check-in info

---
Phase 3: Administrative Features (2 days)

Day 5: E-Sign & Onboarding

Files to create:
src/pages/onboard.astro
src/components/public/
OnboardingPage.tsx
ESignWidget.tsx
OrgInfoForm.tsx

Flow:
1. Org fills basic info (name, contact, package tier)
2. Review contract
3. E-sign (mock with checkbox + signature field)
4. Submit → org.status = 'pending-approval'
5. Show success: "Application submitted"

mockState changes:
organizations: [
// Add status field
status: 'pending-approval' | 'active' | 'suspended'
]

mockState.submitOnboarding(orgData, signature) {
// Create org with pending-approval status
// Send mock notification
// Return confirmation
}

Day 6: Console - Member & Org Management

Files:
src/components/console/
OrganizationsListPage.tsx
OrgDetailPage.tsx
MembersListPage.tsx
MemberDetailPage.tsx

OrgDetailPage:
- View org info
- View member list
- View usage stats (rounds used/remaining)
- Approve/suspend org
- Edit quota

MemberDetailPage:
- View member info
- View booking history
- View rounds usage
- Add/remove from org
- Set as primary contact

---
Phase 4: Polish & Demo Prep (1.5 days)

Day 7 AM: UI Polish Pass

Loading states:
// Every data fetch shows skeleton
import { Skeleton } from '@/components/ui/skeleton';

{isLoading ? (
<Skeleton className="h-20 w-full" />
) : (
<BookingCard booking={booking} />
)}

Empty states:
{bookings.length === 0 && (
<div className="text-center py-12">
    <CalendarIcon className="h-12 w-12 mx-auto text-slate-300" />
    <p className="text-slate-600 mt-4">No bookings yet</p>
    <Button onClick={createBooking} className="mt-4">
    Create First Booking
    </Button>
</div>
)}

Error boundaries:
// Wrap each major route
<ErrorBoundary fallback={<ErrorPage />}>
<DashboardPage />
</ErrorBoundary>

Toast notifications:
import { toast } from 'sonner';

// On success:
toast.success('Booking created successfully');

// On error:
toast.error('Failed to create booking');

Day 7 PM: Demo Script & Rehearsal

Write script:
# Prime MVP Demo (8 minutes)

## Setup (30s)
- Open /console (John Smith's request visible)
- Open /app in another tab
- Have phone ready for QR code

## Act 1: Member Request (1m)
"Member sends LINE message: 'Want to play Alpine tomorrow morning'"
- Show request in console queue
- Show SLA metrics

## Act 2: Concierge Books (2m)
- Click "Create Booking"
- Show pre-filled data
- Show rounds calculation
- Submit
- Show request queue updates

## Act 3: Member Confirms (1.5m)
- Switch to member app
- Show new booking in upcoming
- Show updated rounds (142 → 140)
- Click booking → detail

## Act 4: Check-In (2m)
- Click "Check In"
- Show QR code
- Switch to partner portal
- Scan QR (camera or upload)
- Confirm check-in
- Show member rounds update

## Act 5: Results (1.5m)
- Back to console: show check-in recorded
- Show partner statement
- Show member booking history
- Emphasize: "20 seconds for member, <1 minute for concierge"

Rehearse 3x:
1. First run: find UX bugs
2. Second run: fix timing
3. Third run: smooth delivery

---
Phase 5: Final Verification (Half day)

Checklist

Functional:
- Member can view bookings
- Member can cancel (>48h)
- Member can check in
- Concierge can create booking
- Concierge can cancel booking
- Partner can verify check-in
- Rounds update correctly
- All navigation works
- No console errors

Visual:
- Mobile responsive (375px)
- All text uses i18n
- Loading states everywhere
- Empty states everywhere
- Error states work
- Buttons have hover states
- Forms validate properly

Performance:
- Pages load <2s on Fast 3G
- No layout shifts
- Images optimized
- No memory leaks

---
Priority Order (What to Build Next)

1. VERIFY CURRENT WORK (do this TODAY)
2. Member check-in flow (Day 1)
3. Partner check-in verification (Day 2)
4. Console booking management (Day 3)
5. Member booking management (Day 4)
6. E-sign onboarding (Day 5)
7. Admin features (Day 6)
8. Polish pass (Day 7 AM)
9. Demo prep (Day 7 PM)

Total: 7-8 days to investor-ready demo

---
Anti-Patterns to Avoid

Don't:
- Build new features without testing current ones
- Add complexity before basic flow works
- Polish UI before functionality works
- Write tests instead of clicking buttons
- Assume code works because it compiles
- Declare "complete" without end-to-end verification

Do:
- Test each feature immediately after building
- Keep mockState mutations simple and atomic
- Add console logging for debugging
- Verify state updates across all UIs
- Check mobile responsive as you build
- Ask "does this work?" not "does this exist?"

---
Next Immediate Actions

Right now:
1. Test booking creation flow (see Phase 1, Task 1.1)
2. Fix any bugs found
3. Document what actually works
4. Then start Day 1 (check-in flow)

Don't start Day 1 until Phase 1 complete.