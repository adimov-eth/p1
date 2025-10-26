# Prime Golf Booking Flow - Visual Diagram

## Two-Sided User Story: Customer & Prime Manager

```mermaid
sequenceDiagram
    participant C as Customer<br/>(Khun Somchai)
    participant L as LINE
    participant P as Prime Concierge<br/>(Khun Ploy)
    participant S as System
    participant G as Golf Course<br/>(Alpine)

    Note over C,G: INITIATION PHASE (Thursday 2:00 PM)

    C->>L: Opens LINE app<br/>Messages: "Alpine Saturday, 2 players"
    L->>P: 🔔 New request notification

    Note over P: Views request on dashboard<br/>Sees: Acme Corp, 142 rounds left<br/>Recent history: Alpine Oct 21

    P->>G: Calls to check availability<br/>"Saturday 9 AM for 2 players?"
    G->>P: "Available, slot confirmed"

    Note over P: Opens create booking form<br/>Fills: Alpine, Nov 2, 9 AM, 2 players<br/>Validates: 142 → 140 rounds

    P->>S: Clicks "Confirm Booking"

    Note over S: SYSTEM AUTOMATION CASCADE
    S->>S: ✓ Create booking in DB<br/>✓ Update rounds: 142 → 140<br/>✓ Generate booking #BR-2024-1247
    S->>L: Send LINE notification
    L->>C: ✓ Confirmed! Sat 9 AM<br/>Alpine, 2 players<br/>140 rounds left
    S->>G: Email booking confirmation
    S->>P: Dashboard: Request completed (3 min SLA)

    Note over C,G: REMINDER PHASE (Friday 5:00 PM)

    S->>L: Automated cron job
    L->>C: 🔔 Reminder: Tomorrow 9 AM<br/>Cancel after 6 PM forfeits rounds

    Note over C,G: CHECK-IN PHASE (Saturday 8:55 AM)

    C->>C: Opens Prime LIFF app<br/>Taps "Digital Card"<br/>Shows QR code
    C->>G: Shows QR to course staff
    G->>S: Scans QR → check-in API call
    S->>P: Dashboard: ✓ Khun Somchai checked in 8:55 AM

    Note over C: Plays golf 🏌️<br/>(4 hours)

    Note over C,G: COMPLETION PHASE (Saturday 12:30 PM)

    S->>S: Auto-complete booking<br/>Status: Checked In → Completed<br/>Rounds: 140 (already deducted at check-in)

    C->>C: Opens app later<br/>Sees: 140/144 rounds<br/>Recent: ✓ Alpine Nov 2 (2 rounds)
```

---

## Detailed Flow with UI Touchpoints

### Customer Perspective (Minimal Friction)

```
┌─────────────────────────────────────────────────────────────────┐
│                    CUSTOMER JOURNEY                             │
│                   (Total Active Time: 20 seconds)               │
└─────────────────────────────────────────────────────────────────┘

Step 1: INITIATE REQUEST (10 sec)
┌──────────────────┐
│  📱 LINE App     │
│                  │
│  Prime Concierge │
│  [Type message]  │
│                  │
│  "Alpine         │
│   Saturday,      │
│   2 players"     │
│                  │
│  [Send ▶]        │
└──────────────────┘

Step 2: RECEIVE CONFIRMATION (Passive - 5 min later)
┌──────────────────┐
│  🔔 Notification │
│                  │
│  Prime Concierge │
│  ✓ Confirmed!    │
│                  │
│  Sat, Nov 2      │
│  Alpine 9:00 AM  │
│  2 players       │
│                  │
│  Rounds: 140/144 │
│  [View Details]  │
└──────────────────┘

Step 3: RECEIVE REMINDER (Passive - day before)
┌──────────────────┐
│  🔔 Notification │
│                  │
│  🏌️ Tomorrow!   │
│  9:00 AM Alpine  │
│                  │
│  Need to cancel? │
│  Reply here.     │
└──────────────────┘

Step 4: CHECK-IN (10 sec)
┌──────────────────┐
│  Prime App       │
│  Digital Card    │
│                  │
│  ┌────────────┐  │
│  │  QR CODE   │  │
│  │  ████████  │  │
│  │  ████████  │  │
│  │  ████████  │  │
│  └────────────┘  │
│                  │
│  Khun Somchai    │
│  USER_001        │
│  Acme Corp       │
└──────────────────┘
        │
        ▼
   Show to staff → ✓ Checked in

Step 5: POST-ROUND (Automatic)
┌──────────────────┐
│  Prime App       │
│  Home            │
│                  │
│  🏆 Rounds       │
│     140 / 144    │
│                  │
│  Recent:         │
│  ✓ Alpine Nov 2  │
│    2 rounds      │
│                  │
│  📅 Upcoming:    │
│    (none)        │
└──────────────────┘
```

---

### Concierge Perspective (Maximum Efficiency)

```
┌─────────────────────────────────────────────────────────────────┐
│                   CONCIERGE WORKFLOW                            │
│              (From Request to Confirmation: < 1 min)            │
└─────────────────────────────────────────────────────────────────┘

Step 1: REQUEST RECEIVED
┌────────────────────────────────────────────────────────┐
│  Prime Concierge Dashboard                 🔔 1 New    │
├────────────────────────────────────────────────────────┤
│  Pending Requests (1)                                  │
│  ┌──────────────────────────────────────────────────┐ │
│  │ 🔔 Request #1247                    2 min ago    │ │
│  │                                                   │ │
│  │ Khun Somchai (Acme Corporation)                  │ │
│  │ "Want to play Alpine this Saturday, 2 players"   │ │
│  │                                                   │ │
│  │ Rounds: 142/144  |  Status: Active               │ │
│  │ Preferences: Morning tee times                   │ │
│  │                                                   │ │
│  │ Recent:                                          │ │
│  │ • Oct 28 - Siam Country (2 rounds)              │ │
│  │ • Oct 21 - Alpine (1 round)                     │ │
│  │                                                   │ │
│  │ [Create Booking]  [Reply via LINE]              │ │
│  └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘

Step 2: CHECK AVAILABILITY (External - 1 min)
┌────────────────────────────────────┐
│  ☎️ Call Alpine Golf Club         │
│                                    │
│  "Hi, checking availability        │
│   for Saturday Nov 2               │
│   Morning slot, 2 players"         │
│                                    │
│  → "9:00 AM available"             │
│  → "Reserved for Acme Corporation" │
└────────────────────────────────────┘

Step 3: CREATE BOOKING (Form - 30 sec)
┌────────────────────────────────────────────────────────┐
│  Create Booking                                    × │
├────────────────────────────────────────────────────────┤
│  Organization                                          │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Acme Corporation ▼                               │ │
│  └──────────────────────────────────────────────────┘ │
│  Auto-filled from request                              │
│                                                        │
│  Primary Member                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Khun Somchai ▼                                   │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  Golf Course                                           │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Alpine Golf Club ▼                               │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  Date & Time                                           │
│  ┌─────────────────┐  ┌─────────────────┐            │
│  │ Nov 2, 2024 📅  │  │ 09:00 AM ▼      │            │
│  └─────────────────┘  └─────────────────┘            │
│                                                        │
│  Players                                               │
│  ┌──────────────────────────────────────────────────┐ │
│  │ ☑ Khun Somchai (Primary Member)                 │ │
│  │ ☑ Guest (Name optional)                          │ │
│  └──────────────────────────────────────────────────┘ │
│  Total: 2 players                                      │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │ ⚡ Rounds Calculation                            │ │
│  │                                                   │ │
│  │ Current: 142 rounds                              │ │
│  │ Using:   -2 rounds                               │ │
│  │ After:   140 rounds                              │ │
│  │                                                   │ │
│  │ ✓ Sufficient rounds available                    │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  [Cancel]                    [Confirm Booking →]      │
└────────────────────────────────────────────────────────┘

Step 4: CONFIRMATION (Automatic cascade)
┌────────────────────────────────────────────────────────┐
│  ✓ Booking Created Successfully                       │
├────────────────────────────────────────────────────────┤
│  Booking #BR-2024-1247                                 │
│                                                        │
│  Acme Corporation - Khun Somchai                       │
│  Alpine Golf Club                                      │
│  Saturday, November 2 at 9:00 AM                       │
│  2 Players                                             │
│                                                        │
│  ✓ Member notified via LINE                           │
│  ✓ Course notified via email                          │
│  ✓ Rounds updated: 140 remaining                      │
│  ✓ Request #1247 marked complete                      │
│  ✓ SLA: Completed in 3 minutes                        │
│                                                        │
│  [View Booking]  [Back to Dashboard]                  │
└────────────────────────────────────────────────────────┘

Step 5: DAY OF - TRACKING
┌────────────────────────────────────────────────────────┐
│  Today's Bookings - Saturday, Nov 2                    │
├────────────────────────────────────────────────────────┤
│  Alpine Golf Club (3 bookings)                         │
│  ┌──────────────────────────────────────────────────┐ │
│  │ ✓ 8:00 AM  Khun Prakit        Checked in 7:55   │ │
│  │ ✓ 9:00 AM  Khun Somchai       Checked in 8:55   │ │
│  │ ⏱ 10:00 AM Khun Narong        Not checked in    │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  Siam Country Club (1 booking)                         │
│  ┌──────────────────────────────────────────────────┐ │
│  │ ✓ 9:30 AM  Khun Pensri        Checked in 9:25   │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  🔔 Alert: Khun Narong late (10:15 AM)                │
└────────────────────────────────────────────────────────┘

Step 6: AUTO-COMPLETION
┌────────────────────────────────────────────────────────┐
│  Booking #BR-2024-1247 - COMPLETED                     │
├────────────────────────────────────────────────────────┤
│  Khun Somchai (Acme Corporation)                       │
│  Alpine Golf Club - November 2                         │
│                                                        │
│  Timeline:                                             │
│  • Requested:  Thu 2:00 PM                            │
│  • Confirmed:  Thu 2:03 PM (3 min)                    │
│  • Checked in: Sat 8:55 AM (5 min early)              │
│  • Completed:  Sat 12:30 PM (auto)                    │
│                                                        │
│  Rounds Used: 2                                        │
│  Rounds Remaining: 140                                 │
│                                                        │
│  Status: ✓ Completed                                  │
└────────────────────────────────────────────────────────┘
```

---

## System Architecture Flow

```mermaid
flowchart TD
    Start[LINE Message / Phone Call] --> Webhook[LINE Webhook Endpoint]
    Webhook --> StoreRequest[Store in Request Queue]
    StoreRequest --> NotifyConcierge[Real-time Notification to Concierge]

    NotifyConcierge --> ConciergeAction[Concierge Creates Booking via Form]

    ConciergeAction --> Validate{Validation Layer}
    Validate -->|Check Rounds| V1[142 ≥ 2 ✓]
    Validate -->|Check Date| V2[Future date ✓]
    Validate -->|Check Quota| V3[2 ≤ org limit ✓]
    V1 & V2 & V3 --> ValidPass[All Validations Pass]

    ValidPass --> DBTx[Database Transaction]
    DBTx --> Insert[INSERT booking<br/>status: confirmed]
    DBTx --> UpdateOrg[UPDATE organization<br/>rounds: 142 → 140]
    DBTx --> UpdateReq[UPDATE request<br/>status: completed]
    Insert & UpdateOrg & UpdateReq --> Commit[COMMIT]

    Commit --> Notifications[Notification Queue]
    Notifications --> LINE[LINE API<br/>Send to member]
    Notifications --> Email[Email API<br/>Send to course]
    Notifications --> WS[WebSocket<br/>Update dashboard]

    Commit --> Analytics[Analytics Events]
    Analytics --> E1[Track: booking_created]
    Analytics --> E2[Track: sla_completion_time]
    Analytics --> E3[Track: concierge_action]

    LINE & Email & WS --> CheckInDay[Day Of: Member Checks In]
    CheckInDay --> QRScan[QR Scan Event]
    QRScan --> Decode[Decode QR<br/>user_id + booking_id]
    Decode --> ValidateBooking[Validate booking exists]
    ValidateBooking --> UpdateCheckin[UPDATE booking<br/>status: checked_in]
    UpdateCheckin --> DashboardUpdate[Real-time Dashboard Update]

    UpdateCheckin --> Cron[Cron Job: Every Hour]
    Cron --> FindBookings[Find bookings:<br/>checked_in, >4h ago]
    FindBookings --> AutoComplete[UPDATE status → completed]

    ConciergeAction -.->|Edge Case| CancelRequest[Late Cancellation Request]
    CancelRequest --> CheckTime{Time until booking}
    CheckTime -->|< 48h| ShowWarning[Show Warning:<br/>Rounds forfeited]
    ShowWarning --> ConfirmCancel[Concierge Confirms]
    ConfirmCancel --> CancelDB[UPDATE booking<br/>status: cancelled_late]
    CancelDB --> NoRestore[Rounds NOT restored]
    NoRestore --> CancelNotif[Send Notifications]
    CancelNotif --> LINECancel[LINE: Rounds forfeited]
    CancelNotif --> EmailCancel[Email: Booking cancelled]

    style Start fill:#e1f5ff
    style Commit fill:#d4edda
    style Validate fill:#fff3cd
    style CheckTime fill:#fff3cd
    style AutoComplete fill:#d4edda
```

---

## Data Flow Diagram

```mermaid
graph TB
    subgraph Customer
        LINE[LINE App]
    end

    subgraph Backend
        Webhook[LINE Webhook Endpoint]
        API[API Handler<br/>Validation]

        subgraph Database[PostgreSQL Database]
            Requests[(requests<br/>queue)]
            Orgs[(organizations<br/>rounds: 142)]
            Bookings[(bookings)]
            Users[(users)]
        end

        Transaction[Database Transaction<br/>• Create booking<br/>• Update org rounds -2<br/>• Mark request complete]
    end

    subgraph Concierge
        Dashboard[Concierge Dashboard<br/>Browser]
    end

    subgraph External
        LINEAPI[LINE API]
        EmailAPI[Email API]
        WS[WebSocket]
    end

    LINE -->|1. Request booking| Webhook
    Webhook -->|2. Create request| Requests
    Requests -->|3. Query| Dashboard
    Dashboard -->|4. Create booking| API
    API -->|5. Validate & Write| Transaction
    Transaction --> Bookings
    Transaction --> Orgs
    Transaction --> Requests
    Transaction -->|6. Trigger notifications| LINEAPI
    Transaction --> EmailAPI
    Transaction --> WS
    LINEAPI -->|Customer| LINE
    EmailAPI -->|Course| External
    WS -->|Real-time update| Dashboard

    style LINE fill:#e1f5ff
    style Database fill:#f0f0f0
    style Transaction fill:#d4edda
    style Dashboard fill:#fff3cd
```

---

## Booking State Diagram

```mermaid
stateDiagram-v2
    [*] --> Requested: Customer sends LINE message

    Requested --> Confirmed: Concierge creates booking
    Requested --> Cancelled: Customer cancels before confirmation

    Confirmed --> CheckedIn: Member scans QR at course
    Confirmed --> CancelledEarly: Cancel >48h before (rounds restored)
    Confirmed --> CancelledLate: Cancel <48h before (rounds forfeited)
    Confirmed --> NoShow: Didn't check in (rounds forfeited)

    CheckedIn --> Completed: Auto-complete 4h after check-in
    Completed --> [*]

    CancelledEarly --> [*]
    CancelledLate --> [*]
    NoShow --> [*]
    Cancelled --> [*]

    note right of Confirmed
        Rounds reserved
        (142 → 140)
    end note

    note right of CheckedIn
        Rounds deducted
        (already -2)
    end note

    note right of CancelledEarly
        Rounds restored
        (140 → 142)
    end note

    note right of CancelledLate
        Rounds forfeited
        (stays 140)
    end note

    note right of NoShow
        Rounds forfeited
        (stays 140)
    end note
```

---

## Key Touchpoints Summary

| Actor | Tool | Action | Time |
|-------|------|--------|------|
| **Customer** | LINE app | Send booking request | 10 sec |
| **Concierge** | Dashboard | Receive notification | Real-time |
| **Concierge** | Phone | Check course availability | 1 min |
| **Concierge** | Web form | Create booking | 30 sec |
| **System** | Database | Validate & save booking | < 1 sec |
| **System** | LINE API | Send confirmation to customer | < 1 sec |
| **System** | Email API | Send booking to course | < 1 sec |
| **System** | Dashboard | Update UI (WebSocket) | Real-time |
| **Customer** | LINE | Receive confirmation | Passive |
| **Customer** | LIFF app | View upcoming bookings | On-demand |
| **System** | Cron job | Send reminder (24h before) | Automated |
| **Customer** | LIFF app | Show QR code for check-in | 10 sec |
| **Course** | Scanner | Scan QR code | 5 sec |
| **System** | Database | Record check-in | < 1 sec |
| **Concierge** | Dashboard | See check-in status | Real-time |
| **System** | Cron job | Auto-complete booking (4h after) | Automated |

**Total Customer Active Time: ~20 seconds**
**Total Concierge Active Time: ~2 minutes** (including phone call to course)

