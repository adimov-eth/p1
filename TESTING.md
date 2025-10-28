# Testing the Prime Demo

## Before Testing Any Flow

**Always reset localStorage first.** Run the commands below in the browser console while the demo is open (`http://localhost:4321`):

```javascript
localStorage.clear();
location.reload();
```

## Why This Matters

The demo uses `mockState` with `localStorage` persistence. Interacting with flows such as check-in or booking creation mutates that state, which can make analytics read as `0` or `Infinity`. Clearing storage restores the seeded fixtures so every reviewer starts from the same baseline.

## Expected Fresh State Values

After a reset you should see:

- Organizations: 1 active (Acme Corporation)
- Members: 2 total, 2 active
- Bookings: 3 total (2 upcoming, 1 completed)
- Quota: 144 rounds remaining
- Statements: 1 statement in `sent` status

If numbers differ, reset storage again before proceeding.

## Analytics Page Expected Values

From a fresh state the analytics cards should display:

- Total bookings: `3`
- Confirmation rate: `33%`
- Active members: `2` (100%)
- Average players per booking: `1.3`
- Active organizations: `1`
- Average quota utilization: `≈2.8%`

Any mismatch here is almost always stale `localStorage`. Clear it and reload before filing a bug.
