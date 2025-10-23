# Prime LINE Mini-App UAT Dashboard

Version 1.0 · October 20, 2025

## Progress Tracker

- **UAT Progress:** 0% Complete (0/9 tests) — track pass/fail status to update completion percentage.

## 3.1 Feature: Digital Membership Card & NFC Check-in

| Test ID | Scenario | Steps | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| NFC-01 | Successful Check-in | 1. Open LINE Mini-App.<br>2. Navigate to Digital Card.<br>3. Tap NFC-enabled phone on a test check-in point. | “Check-in Successful” message appears instantly; system records tee time and location. | _Tester entry_ | Pass / Fail |
| NFC-02 | Non-NFC Device | 1. Open the app on a device without NFC.<br>2. Navigate to Digital Card. | Card displays correctly and provides an on-screen QR code as backup check-in. | _Tester entry_ | Pass / Fail |

## 3.2 Feature: Member's Portal & Usage Tracking

| Test ID | Scenario | Steps | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| PORTAL-01 | View Upcoming Bookings | 1. Log in.<br>2. Open “My Bookings”.<br>3. View “Upcoming” tab. | All future bookings list correct course, date, time, and guest names. | _Tester entry_ | Pass / Fail |
| PORTAL-02 | View Past Bookings | 1. Navigate to “Past Bookings”. | All completed rounds display accurately. | _Tester entry_ | Pass / Fail |
| TRACK-01 | Round Usage Update | 1. Complete a check-in (NFC-01).<br>2. Return to main portal screen. | “Rounds Remaining” deducts the number of players who checked in. | _Tester entry_ | Pass / Fail |
| TRACK-02 | View Annual Quota | 1. View the usage tracking display. | Display clearly shows “X / 144 Rounds Used” and updates correctly. | _Tester entry_ | Pass / Fail |

## 3.3 Feature: Digital Guest Invitations

| Test ID | Scenario | Steps | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| INV-01 | Send an Invitation | 1. From an upcoming booking, select “Invite Guest”.<br>2. Choose a guest.<br>3. Tap “Send via LINE”. | Member shares a pre-formatted invitation via LINE. | _Tester entry_ | Pass / Fail |
| INV-02 | Guest Receives Invite | 1. As the guest, open the received LINE message. | Message includes course, date, time, host, and map link. | _Tester entry_ | Pass / Fail |
| INV-03 | Add a New Guest | 1. Select “Invite Guest”.<br>2. Add a new guest.<br>3. Enter the guest's name. | New guest is added to the booking and can receive an invitation. | _Tester entry_ | Pass / Fail |

## 5. UAT Sign-off

The undersigned confirm that the Prime LINE Mini-App meets the agreed acceptance criteria and that all high and medium severity issues are resolved.

- Lead Tester: ______________________________
- Beta Tester 1: _____________________________
- Beta Tester 2: _____________________________
