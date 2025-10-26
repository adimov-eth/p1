export type Role = 'org_admin' | 'designated' | 'concierge' | 'partner';

export interface Organization {
  id: string;
  name: string;
  status: 'prospect' | 'invoiced' | 'active' | 'suspended';
  membershipStartAt?: string; // ISO
  membershipEndAt?: string; // ISO
  annualQuotaDefault: number; // 144
}

export interface User {
  id: string;
  orgId: string;
  role: Role;
  name: string;
  email?: string;
  phone?: string;
  lineUserId?: string;
  status: 'active' | 'inactive';
}

export interface Course {
  id: string;
  name: string;
  region?: string;
  policy?: {
    blackouts?: string[]; // ISO date ranges
    guestLimits?: { perMember: number; maxGroup: number };
    notes?: string;
  };
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface BookingPlayer {
  type: 'member' | 'guest';
  userId?: string;
  guestId?: string;
  name: string;
}

export interface Booking {
  id: string;
  orgId: string;
  courseId: string;
  courseName?: string;
  date: string; // ISO (date)
  teeTime: string; // 'HH:mm'
  status: BookingStatus;
  cancellationWindowHours: number; // 48
  players: BookingPlayer[];
}

export interface UsageSummary {
  roundsUsed: number;
  roundsRemaining: number;
  lastPlayedAt?: string;
  upcomingCount: number;
}

export interface StatementLine {
  bookingId: string;
  date: string;
  playersCount: number;
  confirmed: boolean;
}

export interface Statement {
  id: string;
  month: string; // 'YYYY-MM'
  course: { id: string; name: string };
  lines: StatementLine[];
  totals: { players: number };
  status: 'draft' | 'sent' | 'verified' | 'disputed' | 'paid';
}

export interface Invitation {
  id: string;
  bookingId: string;
  guestId: string;
  sentAt: string;
  channel: 'line' | 'link';
  status: 'sent' | 'accepted';
}

export interface Guest {
  id: string;
  name: string;
  phone?: string;
  email?: string;
}

export interface UsageEvent {
  id: string;
  bookingId: string;
  date: string; // ISO date
  playersCount: number;
  status: 'pending' | 'deducted' | 'restored';
  source: 'checkin' | 'manual' | 'cancellation';
}
