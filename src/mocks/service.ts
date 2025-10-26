import { mockState } from './state';
import type {
  AppHomeResponse,
  CheckinResponse,
  ListBookingsResponse,
  BookingDetailResponse,
  CreateBookingRequest,
  ListStatementsResponse,
  VerifyStatementRequest,
} from '@/types/api';
import type { UsageSummary, Statement } from '@/types/domain';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function calculateUsageSummary(orgId: string): UsageSummary {
  const { data } = mockState;

  const org = data.organizations.find((o) => o.id === orgId);
  const quota = org?.annualQuotaDefault || 144;

  const usedRounds = data.usageEvents
    .filter((e) => e.status === 'deducted')
    .reduce((sum, e) => sum + e.playersCount, 0);

  const upcomingBookings = data.bookings.filter(
    (b) =>
      b.orgId === orgId &&
      b.status === 'confirmed' &&
      new Date(b.date) >= new Date()
  );

  const lastEvent = data.usageEvents
    .filter((e) => e.status === 'deducted')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  return {
    roundsUsed: usedRounds,
    roundsRemaining: quota - usedRounds,
    lastPlayedAt: lastEvent?.date,
    upcomingCount: upcomingBookings.length,
  };
}

export async function getAppHome(orgId: string): Promise<AppHomeResponse> {
  await delay(300);

  const usageSummary = calculateUsageSummary(orgId);

  const nextBooking = mockState.data.bookings
    .filter(
      (b) =>
        b.orgId === orgId &&
        b.status === 'confirmed' &&
        new Date(b.date) >= new Date()
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  return {
    usageSummary,
    nextBooking,
  };
}

export async function postCheckin(bookingId: string): Promise<CheckinResponse> {
  await delay(400);

  return mockState.mutate((data) => {
    const booking = data.bookings.find((b) => b.id === bookingId);

    if (!booking) {
      throw new Error('Booking not found');
    }

    if (booking.status !== 'confirmed') {
      throw new Error('Booking not confirmed');
    }

    const usageEvent = {
      id: `USAGE_${Date.now()}`,
      bookingId,
      date: new Date().toISOString().split('T')[0],
      playersCount: booking.players.length,
      status: 'deducted' as const,
      source: 'checkin' as const,
    };

    data.usageEvents.push(usageEvent);
    booking.status = 'completed';

    return {
      usageEventId: usageEvent.id,
      success: true,
    };
  });
}

export async function listBookings(orgId: string): Promise<ListBookingsResponse> {
  await delay(250);

  const items = mockState.data.bookings
    .filter((b) => b.orgId === orgId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { items };
}

export async function getBookingDetail(bookingId: string): Promise<BookingDetailResponse> {
  await delay(300);

  const booking = mockState.data.bookings.find((b) => b.id === bookingId);

  if (!booking) {
    throw new Error('Booking not found');
  }

  const guestIds = booking.players
    .filter((p) => p.type === 'guest' && p.guestId)
    .map((p) => p.guestId!);

  const guests = mockState.data.guests.filter((g) => guestIds.includes(g.id));

  const invitations = mockState.data.invitations.filter(
    (inv) => inv.bookingId === bookingId
  );

  return {
    booking,
    guests,
    invitations,
  };
}

export async function createBooking(req: CreateBookingRequest): Promise<{ bookingId: string }> {
  await delay(500);

  return mockState.mutate((data) => {
    const course = data.courses.find((c) => c.id === req.courseId);

    const booking = {
      id: `BOOKING_${Date.now()}`,
      orgId: req.orgId,
      courseId: req.courseId,
      courseName: course?.name,
      date: req.date,
      teeTime: req.teeTime,
      status: 'confirmed' as const,
      cancellationWindowHours: 48,
      players: req.players,
    };

    data.bookings.push(booking);

    return { bookingId: booking.id };
  });
}

export async function listStatements(): Promise<ListStatementsResponse> {
  await delay(250);

  return { items: mockState.data.statements };
}

export async function getStatementDetail(statementId: string): Promise<Statement | null> {
  await delay(300);

  return mockState.data.statements.find((s) => s.id === statementId) || null;
}

export async function verifyStatement(req: VerifyStatementRequest): Promise<{ success: boolean }> {
  await delay(400);

  return mockState.mutate((data) => {
    const statement = data.statements.find((s) => s.id === req.statementId);

    if (statement) {
      statement.status = req.verified ? 'verified' : 'disputed';
    }

    return { success: true };
  });
}
