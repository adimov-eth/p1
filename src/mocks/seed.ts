import type {
  Organization,
  User,
  Course,
  Booking,
  Guest,
  UsageEvent,
  Statement,
  Invitation,
} from '@/types/domain';

// Helper for dynamic dates (keeps bookings "upcoming" regardless of when demo runs)
function getUpcomingDate(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
}

function getPastDate(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
}

export interface MockData {
  organizations: Organization[];
  users: User[];
  courses: Course[];
  bookings: Booking[];
  guests: Guest[];
  usageEvents: UsageEvent[];
  statements: Statement[];
  invitations: Invitation[];
}

export function createSeedData(): MockData {
  return {
    organizations: [
      {
        id: 'ORG_001',
        name: 'Acme Corporation',
        status: 'active',
        membershipStartAt: '2025-01-01T00:00:00Z',
        membershipEndAt: '2025-12-31T23:59:59Z',
        annualQuotaDefault: 144,
      },
    ],

    users: [
      {
        id: 'USER_001',
        orgId: 'ORG_001',
        role: 'org_admin',
        name: 'John Smith',
        email: 'john@acme.com',
        phone: '+66812345678',
        lineUserId: 'U1234567890abcdef',
        status: 'active',
      },
      {
        id: 'USER_002',
        orgId: 'ORG_001',
        role: 'designated',
        name: 'Jane Doe',
        email: 'jane@acme.com',
        lineUserId: 'U2234567890abcdef',
        status: 'active',
      },
    ],

    courses: [
      {
        id: 'COURSE_001',
        name: 'Alpine Golf Club',
        region: 'Khao Yai',
        policy: {
          guestLimits: { perMember: 3, maxGroup: 4 },
          notes: 'Dress code: collared shirts required',
        },
      },
      {
        id: 'COURSE_002',
        name: 'Siam Country Club',
        region: 'Pattaya',
        policy: {
          guestLimits: { perMember: 3, maxGroup: 4 },
          blackouts: ['2025-12-24', '2025-12-25', '2026-01-01'],
        },
      },
    ],

    bookings: [
      {
        id: 'BOOKING_001',
        orgId: 'ORG_001',
        courseId: 'COURSE_001',
        courseName: 'Alpine Golf Club',
        date: getUpcomingDate(5),
        teeTime: '09:00',
        status: 'confirmed',
        cancellationWindowHours: 48,
        players: [
          { type: 'member', userId: 'USER_001', name: 'John Smith' },
          { type: 'guest', guestId: 'GUEST_001', name: 'Bob Wilson' },
        ],
      },
      {
        id: 'BOOKING_002',
        orgId: 'ORG_001',
        courseId: 'COURSE_002',
        courseName: 'Siam Country Club',
        date: getUpcomingDate(12),
        teeTime: '14:00',
        status: 'confirmed',
        cancellationWindowHours: 48,
        players: [
          { type: 'member', userId: 'USER_002', name: 'Jane Doe' },
        ],
      },
      {
        id: 'BOOKING_003',
        orgId: 'ORG_001',
        courseId: 'COURSE_001',
        courseName: 'Alpine Golf Club',
        date: getPastDate(15),
        teeTime: '10:30',
        status: 'completed',
        cancellationWindowHours: 48,
        players: [
          { type: 'member', userId: 'USER_001', name: 'John Smith' },
        ],
      },
    ],

    guests: [
      {
        id: 'GUEST_001',
        name: 'Bob Wilson',
        phone: '+66823456789',
        email: 'bob@example.com',
      },
    ],

    usageEvents: [
      {
        id: 'USAGE_001',
        bookingId: 'BOOKING_003',
        date: getPastDate(15),
        playersCount: 1,
        status: 'deducted',
        source: 'checkin',
      },
    ],

    statements: [
      {
        id: 'STMT_001',
        month: new Date().toISOString().slice(0, 7), // Current month YYYY-MM
        course: { id: 'COURSE_001', name: 'Alpine Golf Club' },
        lines: [
          {
            bookingId: 'BOOKING_003',
            date: getPastDate(15),
            playersCount: 1,
            confirmed: true,
          },
        ],
        totals: { players: 1 },
        status: 'sent',
      },
    ],

    invitations: [
      {
        id: 'INV_001',
        bookingId: 'BOOKING_001',
        guestId: 'GUEST_001',
        sentAt: new Date().toISOString(),
        channel: 'line',
        status: 'accepted',
      },
    ],
  };
}
