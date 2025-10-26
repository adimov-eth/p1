export const enUS = {
  app: {
    home: {
      title: 'Welcome to Prime',
      roundsRemaining: 'Rounds Remaining',
      roundsUsed: 'Rounds Used',
      upcomingBookings: 'Upcoming Bookings',
      lastPlayed: 'Last Played',
      nextBooking: 'Next Booking',
      noUpcoming: 'No upcoming bookings',
    },
    card: {
      title: 'Digital Membership Card',
      checkin: 'Check In',
      checkinSuccess: 'Check-in successful!',
      checkinError: 'Check-in failed',
      simulate: 'Simulate Check-in',
      howTo: 'How to Check In:',
      step1: 'Show this QR code to the course staff',
      step2: 'They will scan it to confirm your booking',
      step3: 'Your usage will be automatically tracked',
      scanInstruction: 'Scan your QR code at the course, or simulate check-in for demo purposes.',
    },
    bookings: {
      title: 'My Bookings',
      upcoming: 'Upcoming',
      past: 'Past',
      empty: 'No bookings found',
      status: {
        pending: 'Pending',
        confirmed: 'Confirmed',
        cancelled: 'Cancelled',
        completed: 'Completed',
      },
    },
  },
  console: {
    dashboard: {
      title: 'Concierge Dashboard',
      subtitle: 'Service Level Agreement metrics and request queue',
      sla: {
        title: 'SLA Metrics',
        responseTime: 'Avg Response Time',
        fulfillmentRate: 'Fulfillment Rate',
        satisfactionScore: 'Satisfaction Score',
        period: 'Last 30 days',
        feedbackLabel: 'Member feedback',
      },
      queue: {
        title: 'Request Queue',
        empty: 'No pending requests',
        pending: 'pending',
      },
      actions: {
        manageBookings: 'Manage Bookings',
        memberProfiles: 'Member Profiles',
      },
    },
    bookings: {
      title: 'Manage Bookings',
      create: 'Create Booking',
      edit: 'Edit',
      cancel: 'Cancel',
      empty: 'No bookings',
    },
  },
  partner: {
    statements: {
      title: 'Monthly Statements',
      subtitle: 'Review and verify your monthly activity statements',
      empty: 'No statements',
      view: 'View →',
      status: {
        draft: 'Draft',
        sent: 'Sent',
        verified: 'Verified',
        disputed: 'Disputed',
        paid: 'Paid',
      },
    },
  },
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    retry: 'Retry',
    cancel: 'Cancel',
    save: 'Save',
    close: 'Close',
    verify: 'Verify',
    dispute: 'Dispute',
    backToHome: '← Back to Home',
    players: 'player',
    playersPlural: 'players',
    bookings: 'booking',
    bookingsPlural: 'bookings',
  },
};

export type Translations = typeof enUS;
