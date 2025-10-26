# Prime MVP - Development Plan

## Current State Assessment (Oct 26, 2025)

### ✅ Complete
- Landing page (deployed to GitHub Pages + Cloudflare)
- Member app foundation (home, card pages with mock data)
- Console foundation (dashboard with SLA metrics)
- Mock state architecture (observable pattern with auto-update)
- Basic routing (Astro + React Router in islands)
- i18n infrastructure (LocaleProvider with context)

### ⚠️ Built But Unverified (BLOCKER)
- **Booking creation flow** - Code exists, UI renders, BUT submit handler never tested
- mockState auto-update mechanism - Looks correct, never verified across tabs
- Rounds calculation logic - Math is correct, never seen it execute

### ❌ Not Built
- 70% of console features (booking management, member management, org management)
- 50% of member app features (check-in, booking list, cancellation)
- 100% of partner portal (check-in verification, statements)
- 100% of public onboarding (e-sign, org registration)
- Most error/loading/empty states

---

## Phase 0: Verify Foundation (TODAY - CRITICAL - 1 hour)

**DO NOT SKIP THIS. Everything else depends on this working.**

### Task 0.1: Manual Flow Testing (30 min)

**Open browser:**
```bash
open http://localhost:4321/console
```

**Test booking creation end-to-end:**
1. Open browser console (F12 → Console tab)
2. Click "Create Booking" on John Smith's request
3. Fill form:
   - Course: Select "Alpine Golf Club" from dropdown
   - Date: Pick tomorrow's date
4. Click "Confirm Booking"
5. **Watch console logs** - should see:
   ```
   🎯 [BOOKING FORM] Submit clicked {courseId: "COURSE_001", ...}
   📊 [BOOKING FORM] Selected entities: {org: "Acme Corporation", ...}
   🆔 [BOOKING FORM] Generated booking ID: BOOKING_...
   💾 [BOOKING FORM] Mutating mockState...
     📝 Adding booking to state
     🎟️  Adding usage event
     ✅ Marking request as completed: REQ_001
     💾 mockState mutation complete
   ✅ [BOOKING FORM] Booking created successfully
   🧭 [BOOKING FORM] Navigating back to dashboard...
   ```
6. Verify dashboard shows "1 pending" (was "2 pending")
7. Navigate to http://localhost:4321/app
8. Verify new booking appears in "Upcoming Bookings"
9. Check rounds decreased (was 142, should be 140)

**If it works:**
- ✅ Remove all debug console.log statements
- ✅ Document working flow in BOOKING_FLOW_COMPLETE.md
- ✅ Commit changes
- ✅ Proceed to Phase 1

**If it fails:**
- ❌ Check browser console for actual error
- ❌ Check mockState structure in React DevTools
- ❌ Verify React Hook Form validation isn't blocking
- ❌ Debug from instrumentation logs
- ❌ **FIX BUGS BEFORE BUILDING ANYTHING NEW**

### Task 0.2: mockState Auto-Update Verification (15 min)

**Test cross-tab reactivity:**
1. Open http://localhost:4321/console in Tab 1
2. Open http://localhost:4321/app in Tab 2
3. Create booking in Tab 1 (console)
4. **WITHOUT REFRESHING** switch to Tab 2 (app)
5. Verify booking appears automatically
6. Check TanStack Query DevTools - should show invalidation

**Expected behavior:**
- mockState.notify() fires after mutation
- RootProvider's useMockStateSync subscribes to changes
- queryClient.invalidateQueries() triggers
- Both UIs update without manual refresh

**If broken:**
- Check RootProvider integration
- Verify mockState.subscribe() actually calls listeners
- Check if mutation wrapping is correct
- Fix before proceeding

### Task 0.3: Rounds Calculation Audit (15 min)

**Verify math in CreateBookingForm.tsx:**
```typescript
// Current logic:
const usedRounds = usageEvents
  .filter(e => e.status === 'deducted')
  .reduce((sum, e) => sum + e.playersCount, 0);

const current = org.annualQuotaDefault - usedRounds;
const after = current - playersCount;
```

**Manual verification:**
1. Check seed data: `annualQuotaDefault` should be 144
2. Count seed usage events: should sum to 2 (one 2-player booking)
3. Current should show 142
4. After 2-player booking should show 140
5. Form should disable submit if `after < 0`

**If wrong:**
- Fix calculation logic
- Update seed data
- Re-test

**If right:**
- Document expected values
- Add to test plan

---

## Phase 1: Core User Journeys (3-4 days)

**Goal**: Complete vertical slice - member requests → concierge books → member checks in → partner verifies

### Day 1: Member App - Check-In Flow

**Why first**: This is the demo "wow" moment - scan QR, rounds update instantly

**Files to create:**
```
src/components/app/AppRouter.tsx
src/components/app/CheckInPage.tsx
src/components/app/BookingDetailPage.tsx
```

**AppRouter.tsx:**
```tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import CardPage from './CardPage';
import BookingDetailPage from './BookingDetailPage';
import CheckInPage from './CheckInPage';

export default function AppRouter() {
  return (
    <BrowserRouter basename="/app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/card" element={<CardPage />} />
        <Route path="/bookings/:bookingId" element={<BookingDetailPage />} />
        <Route path="/check-in/:bookingId" element={<CheckInPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
```

**CheckInPage.tsx:**
```tsx
import QRCode from 'qrcode.react';
import { useParams } from 'react-router-dom';
import { mockState } from '@/mocks/state';

export default function CheckInPage() {
  const { bookingId } = useParams();
  const booking = mockState.data.bookings.find(b => b.id === bookingId);

  if (!booking) return <div>Booking not found</div>;

  const qrData = JSON.stringify({
    type: 'check-in',
    bookingId: booking.id,
    timestamp: new Date().toISOString(),
    signature: 'mock-signature',
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Check-In</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {/* Booking details */}
            <div className="mb-6">
              <h3 className="font-bold text-xl">{booking.courseName}</h3>
              <p className="text-slate-600">{booking.date} at {booking.teeTime}</p>
              <p className="text-sm text-slate-500">{booking.players.length} players</p>
            </div>

            {/* QR Code */}
            <div className="bg-white p-8 rounded-xl inline-block shadow-lg">
              <QRCode value={qrData} size={256} level="H" />
            </div>

            {/* Status */}
            <div className="mt-6">
              {booking.checkedInAt ? (
                <div className="text-green-600 font-semibold">
                  ✓ Checked in at {new Date(booking.checkedInAt).toLocaleTimeString()}
                </div>
              ) : (
                <div className="text-slate-600">
                  Show this QR code at the course
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-8 text-xs text-slate-500 text-left">
              <p className="font-semibold mb-2">Check-in Instructions:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Arrive at the course</li>
                <li>Show this QR code to staff</li>
                <li>Wait for confirmation</li>
                <li>Enjoy your game!</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={() => navigate(`/bookings/${bookingId}`)}
          variant="outline"
          className="w-full mt-4"
        >
          Back to Booking Details
        </Button>
      </div>
    </div>
  );
}
```

**BookingDetailPage.tsx:**
```tsx
export default function BookingDetailPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const booking = mockState.data.bookings.find(b => b.id === bookingId);

  if (!booking) return <div>Booking not found</div>;

  const canCheckIn = () => {
    // Can check in if:
    // - Booking is today
    // - Within 2 hours of tee time
    // - Not already checked in
    const bookingDate = new Date(booking.date);
    const today = new Date();

    if (bookingDate.toDateString() !== today.toDateString()) return false;
    if (booking.checkedInAt) return false;

    // Check if within 2h of tee time
    const [hours, mins] = booking.teeTime.split(':').map(Number);
    const teeTime = new Date(today);
    teeTime.setHours(hours, mins, 0);

    const diffHours = (teeTime.getTime() - today.getTime()) / (1000 * 60 * 60);
    return diffHours <= 2 && diffHours >= -1; // 2h before to 1h after
  };

  const canCancel = () => {
    const bookingDateTime = new Date(`${booking.date}T${booking.teeTime}`);
    const hoursUntil = (bookingDateTime.getTime() - Date.now()) / (1000 * 60 * 60);
    return hoursUntil >= booking.cancellationWindowHours;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Booking details card */}
        <Card>
          <CardHeader>
            <CardTitle>{booking.courseName}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-600">Date & Time</p>
                <p className="font-semibold">{booking.date} at {booking.teeTime}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Players</p>
                {booking.players.map((p, i) => (
                  <p key={i} className="font-medium">
                    {i + 1}. {p.name} {p.type === 'member' && '(Member)'}
                  </p>
                ))}
              </div>
              <div>
                <p className="text-sm text-slate-600">Status</p>
                <Badge variant={booking.checkedInAt ? 'default' : 'secondary'}>
                  {booking.checkedInAt ? 'Checked In' : 'Confirmed'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mt-6 space-y-3">
          {canCheckIn() && (
            <Button
              onClick={() => navigate(`/check-in/${bookingId}`)}
              className="w-full"
              size="lg"
            >
              Check In Now
            </Button>
          )}

          {canCancel() && !booking.checkedInAt && (
            <Button
              onClick={() => {/* Show cancel modal */}}
              variant="outline"
              className="w-full"
            >
              Cancel Booking
            </Button>
          )}

          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="w-full"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
```

**mockState changes:**
```typescript
// Add to Booking interface in domain.ts:
checkedInAt?: string;
checkedInBy?: string; // Partner user ID

// Add method to mockState:
checkIn(bookingId: string, partnerId: string) {
  this.mutate((state) => {
    const booking = state.bookings.find(b => b.id === bookingId);
    if (!booking) throw new Error('Booking not found');

    booking.checkedInAt = new Date().toISOString();
    booking.checkedInBy = partnerId;

    console.log('✅ Check-in recorded:', bookingId);
  });
}
```

**Update AppPage.tsx to use AppRouter:**
```tsx
// Replace direct HomePage rendering with:
import AppRouter from './AppRouter';

export default function AppPage() {
  return (
    <RootProvider>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </RootProvider>
  );
}
```

**Testing:**
1. Create booking in console
2. See it in /app upcoming bookings
3. Click booking → detail page shows
4. Click "Check In" → QR code page
5. (For now) Manually call `mockState.checkIn(bookingId, 'PARTNER_001')` in console
6. Refresh → status shows "Checked In"
7. Home page shows decreased rounds

**Acceptance:**
- ✅ QR code displays correctly
- ✅ Check-in button only shows when appropriate (today, near tee time)
- ✅ Detail page shows all booking info
- ✅ Navigation works between all pages

### Day 2: Partner Portal - Check-In Verification

**Files to create:**
```
src/pages/partner.astro
src/components/partner/PartnerPage.tsx
src/components/partner/PartnerRouter.tsx
src/components/partner/CheckInScannerPage.tsx
```

**partner.astro:**
```astro
---
import Layout from '@/layouts/Layout.astro';
import PartnerPage from '@/components/partner/PartnerPage';
---

<Layout title="Partner Portal - Prime">
  <PartnerPage client:only="react" />
</Layout>
```

**CheckInScannerPage.tsx:**
```tsx
import { useState } from 'react';
import { mockState } from '@/mocks/state';

export default function CheckInScannerPage() {
  const [scannedData, setScannedData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleScan = (file: File) => {
    // For demo: just parse filename or use mock data
    // In real app: use QR code scanner library
    try {
      const mockQRData = {
        type: 'check-in',
        bookingId: 'BOOKING_xxx', // Would come from actual QR scan
        timestamp: new Date().toISOString(),
        signature: 'mock-signature',
      };
      setScannedData(mockQRData);
    } catch (error) {
      toast.error('Invalid QR code');
    }
  };

  const confirmCheckIn = async () => {
    if (!scannedData) return;

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay

    mockState.checkIn(scannedData.bookingId, 'PARTNER_001');

    toast.success('Check-in confirmed!');
    setScannedData(null);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Check-In Scanner</h1>

        {/* Scanner UI */}
        {!scannedData ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="mb-6">
                <QrCode className="h-24 w-24 mx-auto text-slate-300" />
              </div>
              <p className="text-slate-600 mb-6">
                Scan member's QR code to check them in
              </p>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => e.target.files?.[0] && handleScan(e.target.files[0])}
                className="hidden"
                id="qr-upload"
              />
              <label htmlFor="qr-upload">
                <Button asChild>
                  <span>Open Camera / Upload QR</span>
                </Button>
              </label>
            </CardContent>
          </Card>
        ) : (
          /* Confirmation UI */
          <Card>
            <CardHeader>
              <CardTitle>Confirm Check-In</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Show booking details from scannedData.bookingId */}
              <Button
                onClick={confirmCheckIn}
                disabled={isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? 'Processing...' : 'Confirm Check-In'}
              </Button>
              <Button
                onClick={() => setScannedData(null)}
                variant="outline"
                className="w-full mt-3"
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Today's check-ins */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Today's Check-Ins</h2>
          {/* List of checked-in bookings for today */}
        </div>
      </div>
    </div>
  );
}
```

**Testing:**
1. Open /partner
2. Click scanner
3. Upload QR code screenshot (or mock it)
4. Verify booking details display
5. Confirm check-in
6. Switch to /app → verify rounds updated
7. Check today's list shows the check-in

### Day 3-4: Console & Member Booking Management

*(Detailed tasks omitted for brevity - see original plan above)*

---

## Phase 2: Administrative Features (2 days)

### E-Sign Onboarding
### Org Management
### Member Management

*(See original plan for details)*

---

## Phase 3: Polish & Demo Prep (1.5 days)

### Loading States
### Empty States
### Error Boundaries
### Toast Notifications
### Demo Script
### Rehearsal

---

## Timeline Summary

**Total: 7-8 days to investor-ready demo**

- **Phase 0** (TODAY): 1 hour - Verify current work
- **Phase 1**: 3-4 days - Core user journeys
- **Phase 2**: 2 days - Admin features
- **Phase 3**: 1.5 days - Polish & demo prep

---

## Critical Path

```
Phase 0 (verify) → BLOCKER until complete
  ↓
Day 1 (check-in flow)
  ↓
Day 2 (partner verification)
  ↓
Day 3-4 (booking management)
  ↓
Day 5-6 (admin features)
  ↓
Day 7 (polish + demo)
```

**Do NOT skip Phase 0.** Everything depends on verifying the foundation works.

---

## Next Session Start Here

1. Read `/memos/2025-10-26-prime-booking-flow.md`
2. Check this file (FURTHER_PLAN.md)
3. Run `bun dev` if not running
4. Execute Phase 0, Task 0.1 (manual testing)
5. If tests pass → proceed to Phase 1
6. If tests fail → debug before building anything new

The most important thing is **verify before build**.
