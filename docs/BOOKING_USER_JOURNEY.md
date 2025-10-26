# Prime Golf Booking - Complete User Journey

**Scenario:** C-level executive wants to play golf with a colleague

**Date:** October 26, 2025

---

## The Cast

**Customer Side:**
- **Khun Somchai** (CEO, Acme Corporation) - Primary member
- **Khun Apinya** (CFO, Acme Corporation) - Colleague/guest
- **Khun Napat** (Executive Assistant) - May coordinate on behalf of executives

**Prime Side:**
- **Concierge (Khun Ploy)** - Handles all booking coordination
- **System** - Automated tracking and notifications

**Partner Side:**
- **Alpine Golf Club** - Course where they want to play

---

## Customer Journey (What They Experience)

### Step 1: Initiation - "I want to play golf" (10 seconds)

**Thursday, 2:00 PM - Office**

**Option A (Easiest - 95% of bookings):**
```
Khun Somchai opens LINE app
Taps Prime chat
Types: "Want to play Alpine this Saturday morning, 2 players"
Sends message
```

**Option B (Via Assistant):**
```
Khun Napat (assistant): "Khun Somchai wants to play Saturday at Alpine, 2 players"
Calls Prime concierge directly: +66-XX-XXX-XXXX
```

**Option C (Via LIFF App):**
```
Opens Prime Mini-App in LINE
Taps "Request Booking" button
→ Opens LINE chat with concierge pre-filled template
Edits details, sends
```

**UX Perfection Points:**
- ✅ Natural language (no forms)
- ✅ Single tap to initiate (LINE is already on their phone)
- ✅ Flexible (message, call, or app)
- ✅ Assistant can act on behalf (same interface)
- ✅ No course availability checking needed (concierge handles)

### Step 2: Confirmation - "It's done" (Passive, 5 min later)

**Thursday, 2:05 PM - Receives LINE notification**

```
🏌️ Prime Concierge

Confirmed! Saturday, November 2
⛳ Alpine Golf Club
🕘 9:00 AM Tee Time
👥 2 Players

Your booking details are in the Prime app.
See you on the course!

Remaining rounds: 140/144
```

**In LIFF App:**
```
Opens Prime Mini-App
Sees "Upcoming Bookings" section
Shows:
  Alpine Golf Club
  Saturday, November 2
  9:00 AM | 2 players
  Status: Confirmed ✓
```

**UX Perfection Points:**
- ✅ Confirmation in < 5 minutes
- ✅ LINE notification (where they already are)
- ✅ Clear details (course, time, players)
- ✅ Rounds remaining visible (transparency)
- ✅ Accessible in app for reference

### Step 3: Reminder - "Don't forget" (Automated)

**Friday, 5:00 PM - Receives reminder**

```
🏌️ Prime Reminder

Tomorrow at 9:00 AM
Alpine Golf Club
2 Players

Need to cancel? Reply to this message.
(Cancellations after 6 PM will forfeit rounds)
```

**UX Perfection Points:**
- ✅ Automated reminder 24h before
- ✅ Clear cancellation policy
- ✅ Easy cancellation (just reply)

### Step 4: Day Of - Check-in (10 seconds)

**Saturday, 8:55 AM - Alpine Golf Club Entrance**

```
Khun Somchai arrives at course
Opens Prime Mini-App
Taps "Digital Card"
Shows QR code to course staff
Staff scans → "Welcome, Khun Somchai! Enjoy your round."
```

**Alternative (No phone needed):**
```
Course staff: "Name?"
Khun Somchai: "Somchai, Acme Corporation"
Staff checks iPad → finds booking → checks in manually
```

**UX Perfection Points:**
- ✅ QR code check-in (contactless, fast)
- ✅ Fallback to name lookup (if phone dead)
- ✅ Guest doesn't need app (covered by primary member)
- ✅ No payment at course (already covered)

### Step 5: Post-Round - Automatic Tracking (Invisible)

**Saturday, 1:00 PM - After round completes**

**Customer sees:**
```
Opens Prime app later
Sees:
  Rounds Remaining: 140 (was 142)
  Recent Activity:
    ✓ Alpine Golf Club - Nov 2
      2 rounds used
```

**What happened (invisible to customer):**
- Check-in triggered round deduction (142 → 140)
- Booking status updated: Confirmed → Completed
- Usage history updated
- No action needed from customer

**UX Perfection Points:**
- ✅ Fully automatic tracking
- ✅ Transparent round usage
- ✅ Historical record accessible
- ✅ No manual logging needed

---

## Edge Case: Late Cancellation

**Friday, 7:00 PM - Plans change**

```
Khun Napat (assistant) messages Prime:
"Need to cancel tomorrow's booking at Alpine"

Prime Concierge replies:
"Understood. Since this is within 48 hours,
2 rounds will be forfeited per policy.

Booking cancelled.
Rounds remaining: 140

Would you like to reschedule?"
```

**UX Perfection Points:**
- ✅ Policy clearly communicated
- ✅ Rounds forfeited automatically (no debate)
- ✅ Offer to help reschedule
- ✅ Transparent round tracking

---

## What Makes This UX Perfect for C-Level Customers

### 1. **Cognitive Load = Zero**

No decisions to make:
- ❌ Which course? (Just tell concierge your preference)
- ❌ What time slots available? (Concierge finds best slot)
- ❌ How to pay? (Already covered by membership)
- ❌ How many rounds left? (Shown automatically)

### 2. **Time Investment = Minimal**

- Request booking: 10 seconds (one LINE message)
- Receive confirmation: Passive (notification)
- Check-in: 10 seconds (show QR code)
- Track usage: Automatic (no action needed)

**Total active time: 20 seconds.**

### 3. **Delegation-Friendly**

Assistant can:
- Request bookings via same LINE chat
- Receive confirmations
- Cancel/reschedule
- No separate login needed

### 4. **Status Anxiety = None**

Always know:
- ✓ Booking confirmed or not (LINE notification)
- ✓ When and where (in LIFF app)
- ✓ How many rounds left (always visible)
- ✓ What happens if cancel (policy stated clearly)

### 5. **Premium Feel**

- Personal concierge (not a bot, real human)
- Confirmation in minutes (not hours)
- Proactive reminders (don't have to remember)
- Automatic tracking (feel like VIP)

### 6. **Corporate-Appropriate**

- Assistant can coordinate (common in Thai business culture)
- Rounds tracked per organization (not individual)
- Clear audit trail (CFO can review usage)
- Consolidated billing (no expense reports)

---

## Concierge Journey (Prime Manager Perspective)

### Step 1: Request Received (Real-time notification)

**Thursday, 2:00 PM - Concierge Dashboard**

**Notification appears:**
```
🔔 New Booking Request

Khun Somchai (Acme Corporation)
"Want to play Alpine this Saturday morning, 2 players"

[View Request]
```

**Clicks → Opens request detail:**
```
Request #1247
From: Khun Somchai (LINE: @somchai_acme)
Organization: Acme Corporation
Status: 🟡 Pending

Message:
"Want to play Alpine this Saturday morning, 2 players"

Member Details:
- Name: Somchai Techavichit
- Organization: Acme Corporation
- Rounds Remaining: 142/144
- Recent Bookings:
  ✓ Siam Country Club - Oct 28 (2 rounds)
  ✓ Alpine Golf Club - Oct 21 (1 round)
- Preferences: Prefers morning tee times

[Create Booking] [Reply to Member]
```

**UX for Concierge:**
- ✅ All context in one screen (no switching tabs)
- ✅ Member history visible (knows preferences)
- ✅ Rounds remaining clear (validates request)
- ✅ Quick actions (create booking or reply)

### Step 2: Check Course Availability

**Two options:**

**Option A (Integrated - Future):**
```
Clicks "Create Booking"
System shows:
  Alpine Golf Club - Saturday, Nov 2
  Available slots:
    ✓ 8:00 AM (available)
    ✓ 9:00 AM (available)
    ✗ 10:00 AM (fully booked)
```

**Option B (Manual - Current):**
```
Opens Alpine Golf Club's booking portal (separate tab)
Or calls: +66-XX-XXX-XXXX
Checks availability → 9:00 AM slot available
Returns to Prime dashboard
```

**Concierge Decision:**
```
9:00 AM slot → Perfect (member prefers morning)
Confirms with Alpine: "Reserve for Acme Corporation, 2 players"
Alpine: "Confirmed"
```

### Step 3: Create Booking (Form - 1 minute)

**Opens `/console/create-booking` form:**

```
┌─────────────────────────────────────┐
│ Create Booking                       │
├─────────────────────────────────────┤
│ Organization: Acme Corporation ▼     │
│ (Auto-filled from request)           │
│                                      │
│ Primary Member: Khun Somchai ▼       │
│ (Auto-filled)                        │
│                                      │
│ Course: Alpine Golf Club ▼           │
│ (Type to search)                     │
│                                      │
│ Date: Nov 2, 2024 📅                 │
│ Time: 09:00 AM ▼                     │
│                                      │
│ Players:                             │
│ ☑ Khun Somchai (Primary)            │
│ ☐ Add Guest +                        │
│                                      │
│ Total Players: 2                     │
│ Rounds to Use: 2                     │
│                                      │
│ Rounds After Booking: 140/144        │
│                                      │
│ [Cancel] [Confirm Booking]           │
└─────────────────────────────────────┘
```

**Fills in:**
- Organization: ✓ Pre-filled (Acme Corporation)
- Member: ✓ Pre-filled (Khun Somchai)
- Course: Types "Alpine" → selects from dropdown
- Date: Picks Saturday, Nov 2
- Time: Selects 9:00 AM
- Players: 2 (Khun Somchai + 1 guest)

**Validation shown:**
- ✓ Rounds available (142 → 140 after booking)
- ✓ Valid date (future date)
- ✓ Within quota (2 players valid for tier)

**Clicks "Confirm Booking"**

### Step 4: Booking Created (Automatic actions cascade)

**System does (automatically):**

1. **Updates database:**
   - Booking created (status: Confirmed)
   - Rounds reserved: 142 → 140
   - Primary member: Khun Somchai
   - Course: Alpine Golf Club
   - Date/Time: Nov 2, 9:00 AM

2. **Sends notifications:**
   - LINE message to Khun Somchai (confirmation)
   - Email to Alpine Golf Club (booking notification)
   - Updates LIFF app (booking appears in Khun Somchai's upcoming)

3. **Dashboard updates:**
   - Request #1247 status: Pending → Completed
   - New booking appears in "Upcoming Bookings"
   - SLA timer stops (request handled in 3 minutes)

**Concierge sees confirmation:**
```
✓ Booking Created Successfully

Booking #BR-2024-1247
Acme Corporation - Khun Somchai
Alpine Golf Club
Saturday, Nov 2 at 9:00 AM
2 Players

✓ Member notified via LINE
✓ Course notified via email
✓ Rounds updated: 140 remaining

[View Booking] [Back to Dashboard]
```

**UX for Concierge:**
- ✅ Form takes < 1 minute to fill
- ✅ All validations inline (rounds, dates, quota)
- ✅ Automatic notifications (no manual LINE message)
- ✅ Immediate confirmation (no "pending" state)
- ✅ SLA tracking automatic (performance metrics)

### Step 5: Day Of - Check-in Tracking

**Saturday, 8:55 AM - Concierge Dashboard**

**Real-time update appears:**
```
🔔 Check-in Alert

Booking #BR-2024-1247
Khun Somchai checked in at Alpine Golf Club
Time: 8:55 AM (5 min early)

[View Details]
```

**Dashboard shows:**
```
Today's Bookings (5 total)

Alpine Golf Club:
  ✓ 8:00 AM - Khun Prakit (checked in 7:55 AM)
  ✓ 9:00 AM - Khun Somchai (checked in 8:55 AM)
  ⏱ 10:00 AM - Khun Narong (not checked in yet)

Siam Country Club:
  ✓ 9:30 AM - Khun Pensri (checked in 9:25 AM)

Thai Country Club:
  ⏱ 2:00 PM - Khun Wichai (not checked in yet)
```

**UX for Concierge:**
- ✅ Real-time check-in tracking (know who showed up)
- ✅ Early/late arrival visibility (SLA monitoring)
- ✅ No-show detection (if 30 min past tee time, alert)
- ✅ Multi-course view (all bookings today)

### Step 6: Post-Round - Automatic Completion

**Saturday, 1:00 PM - System auto-completes**

**No action needed from concierge:**
```
Booking #BR-2024-1247 completed automatically
- Status: Checked In → Completed
- Rounds deducted: 140 rounds remaining
- Duration: 8:55 AM - 12:30 PM (3h 35m)
```

**Dashboard updates:**
```
Today's Bookings (All Completed ✓)

Alpine Golf Club:
  ✓ 8:00 AM - Khun Prakit (completed 11:45 AM)
  ✓ 9:00 AM - Khun Somchai (completed 12:30 PM)
  ✓ 10:00 AM - Khun Narong (completed 1:15 PM)
```

### Step 7: Edge Case Handling - Late Cancellation

**Friday, 7:00 PM - Cancellation request**

**LINE message from Khun Napat:**
```
"Need to cancel tomorrow's booking at Alpine"
```

**Concierge opens booking:**
```
Booking #BR-2024-1247
Acme Corporation - Khun Somchai
Alpine Golf Club
Tomorrow at 9:00 AM
2 Players

Status: Confirmed
Time until booking: 14 hours

⚠️ Late Cancellation Warning
Cancelling within 48h will forfeit rounds

[Cancel Anyway] [Keep Booking]
```

**Clicks "Cancel Anyway":**
```
Confirm Cancellation

This booking is within 48 hours.
Policy: Rounds will be forfeited.

Rounds to forfeit: 2
Rounds after cancellation: 140 (unchanged)

Notify:
☑ Member (LINE message)
☑ Course (email)

Reason (optional):
[Text field]

[Go Back] [Confirm Cancellation]
```

**Confirms → System does:**
- Updates booking status: Confirmed → Cancelled (Late)
- Rounds NOT restored (policy enforcement)
- Sends LINE to member: "Booking cancelled. 2 rounds forfeited per policy."
- Emails Alpine: "Booking cancelled for tomorrow 9 AM"
- Logs in activity feed

**UX for Concierge:**
- ✅ Policy warning before action (prevents mistakes)
- ✅ Clear consequence shown (rounds forfeited)
- ✅ Automatic notifications (no manual messages)
- ✅ Audit trail (reason logged)

---

## What Makes This Workflow Efficient for Concierge

### 1. **All Context in One Place**

When request arrives, concierge sees:
- Member name, organization, LINE ID
- Rounds remaining (validates request)
- Recent booking history (knows preferences)
- Quick actions (create booking, reply)

**No tab switching, no separate CRM, no Excel lookup.**

### 2. **Fast Booking Creation**

- Most fields auto-filled from request
- Type-ahead search for courses
- Inline validation (rounds, dates)
- One-click confirmation

**Goal: < 1 minute from request to booking confirmed.**

### 3. **Automatic Notifications**

System sends:
- LINE to member (confirmation/cancellation)
- Email to course (booking details)
- Reminders to member (24h before)

**Concierge doesn't manually type LINE messages.**

### 4. **Real-time Status Tracking**

Dashboard shows:
- Today's bookings (who checked in, who's late)
- Upcoming bookings (next 7 days)
- Pending requests (need attention)
- Cancellation alerts (policy violations)

**One screen = full operational visibility.**

### 5. **Policy Enforcement**

System prevents:
- ❌ Booking with insufficient rounds
- ❌ Booking outside allowed dates
- ❌ Exceeding player quota per tier

System warns:
- ⚠️ Late cancellation (shows policy)
- ⚠️ No-show pattern (member didn't check in 3x)
- ⚠️ Rounds running low (< 20 remaining)

**Concierge doesn't memorize rules. System enforces.**

### 6. **Performance Metrics Automatic**

SLA tracking:
- Request received → booking confirmed (target: < 5 min)
- Average response time (per concierge)
- Fulfillment rate (% of requests successfully booked)
- Member satisfaction (derived from check-in rate)

**Management sees metrics without manual reporting.**

---

## Visual Diagram: Complete Booking Flow

```
CUSTOMER SIDE                    PRIME CONCIERGE                   SYSTEM/COURSE
════════════════════════════════════════════════════════════════════════════════

Thursday 2:00 PM
┌─────────────────┐
│ Khun Somchai    │
│ Opens LINE      │
│ Messages Prime  │──────────▶ ┌──────────────────┐
│"Alpine Saturday"│            │ Notification     │
│  2 players      │            │ appears on       │
└─────────────────┘            │ dashboard        │
                               │                  │
                               │ Checks rounds:   │
                               │ 142/144 ✓       │
                               │                  │
                               │ Calls Alpine:    │──────▶ Alpine staff
                               │ "9 AM slot?"     │        checks
                               │                  │◀───────"Available"
                               │                  │
                               │ Opens create     │
                               │ booking form     │
                               │ - Course: Alpine │
                               │ - Date: Nov 2    │
                               │ - Time: 9 AM     │
                               │ - Players: 2     │
                               │                  │
                               │ Clicks Confirm   │
                               └────────┬─────────┘
                                        │
                               ┌────────▼─────────┐
                               │ SYSTEM ACTIONS:  │
                               │ ✓ Create booking │
                               │ ✓ Update rounds  │
                               │   142 → 140      │
Thursday 2:05 PM               │ ✓ Send LINE msg  │──────┐
┌─────────────────┐            │ ✓ Email course   │──┐   │
│ Receives LINE:  │◀───────────└──────────────────┘  │   │
│                 │                                    │   │
│ ✓ Confirmed!    │                                    │   │
│ Alpine Sat 9 AM │                                    │   │
│ 2 players       │                                    ▼   │
│ 140 rounds left │                               Alpine  │
└─────────────────┘                               email   │
                                                   received │
                                                            │
Friday 5:00 PM                                             │
┌─────────────────┐                                        │
│ Receives:       │◀───────────────────────────────────────┘
│ 🔔 Reminder     │        (Automated cron job)
│ Tomorrow 9 AM   │
│ Alpine          │
└─────────────────┘

Saturday 8:55 AM
┌─────────────────┐
│ Arrives at      │
│ Alpine          │
│                 │
│ Opens Prime app │
│ Shows QR code   │──────────▶ Course staff        System:
│                 │            scans QR   ─────────▶ ✓ Check-in
└─────────────────┘                                   received
                               ┌──────────────────┐
                               │ Dashboard shows: │
                               │ ✓ Khun Somchai   │
                               │   checked in     │
                               │   8:55 AM        │
                               └──────────────────┘

Saturday 12:30 PM
┌─────────────────┐            ┌──────────────────┐
│ Finishes round  │            │ System:          │
│                 │            │ ✓ Auto-complete  │
│ Opens app later │            │   booking        │
│ Sees:           │◀───────────│ ✓ Deduct rounds  │
│ 140/144 rounds  │            │   142 → 140      │
│                 │            │ ✓ Update status  │
└─────────────────┘            └──────────────────┘
```

---

## Key Success Metrics

### Customer Experience
- **Time to request booking:** < 10 seconds (one LINE message)
- **Time to confirmation:** < 5 minutes (concierge SLA)
- **Time to check-in:** < 10 seconds (QR scan)
- **Active time investment:** ~20 seconds total
- **Cognitive load:** Zero (no decisions to make)

### Operational Efficiency
- **Requests per concierge:** 50-100/day (with good tooling)
- **Average booking creation time:** < 1 minute
- **Manual notifications needed:** 0 (all automated)
- **Rounds tracking accuracy:** 100% (automatic)
- **Policy violations:** 0 (system-enforced)

### Business Metrics
- **Check-in rate:** > 95% (measure member engagement)
- **Fulfillment rate:** > 98% (successfully confirmed bookings)
- **Response time:** < 5 min average (concierge SLA)
- **Late cancellations:** < 10% (minimize forfeited rounds)

---

## Next Steps: Implementing This Journey

### Phase 1: Demo (2-3 days)
Build:
1. `/console/create-booking` - Concierge booking form (1 day)
2. Enhanced dashboard - Request queue + today's bookings (1 day)
3. Mock LINE notifications - Show in UI (0.5 day)

### Phase 2: Production (8-12 weeks)
Integrate:
1. LINE Messaging API (send real notifications)
2. QR code check-in (LIFF app → backend)
3. Course partner APIs (automated availability)
4. Email notifications (booking confirmations)
5. SMS reminders (24h before)

---

**The Core Insight:**

Prime's product is **removing friction from corporate golf**. The UX should feel like having a personal assistant, not using software. The backoffice should make one concierge feel like ten through automation and perfect information.

Customer sees: Effortless.
Concierge sees: Efficient.
System does: Everything automated that can be.

