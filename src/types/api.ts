import type { UsageSummary, Booking, Statement, Guest, Invitation } from './domain';

export interface AppHomeResponse {
  usageSummary: UsageSummary;
  nextBooking?: Booking;
}

export interface ListBookingsResponse {
  items: Booking[];
}

export interface BookingDetailResponse {
  booking: Booking;
  guests: Guest[];
  invitations: Invitation[];
}

export interface CheckinRequest {
  bookingId: string;
}

export interface CheckinResponse {
  usageEventId: string;
  success: boolean;
}

export interface CreateBookingRequest {
  orgId: string;
  courseId: string;
  date: string;
  teeTime: string;
  players: { type: 'member' | 'guest'; userId?: string; name: string }[];
}

export interface InviteGuestRequest {
  bookingId: string;
  guestId: string;
  channel: 'line' | 'link';
}

export interface ListStatementsResponse {
  items: Statement[];
}

export interface VerifyStatementRequest {
  statementId: string;
  verified: boolean;
  notes?: string;
}
