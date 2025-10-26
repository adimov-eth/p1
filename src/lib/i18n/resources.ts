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
      sla: {
        title: 'SLA Metrics',
        responseTime: 'Avg Response Time',
        fulfillmentRate: 'Fulfillment Rate',
        satisfactionScore: 'Satisfaction Score',
      },
      queue: {
        title: 'Request Queue',
        empty: 'No pending requests',
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
      empty: 'No statements',
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
  },
};

export type Translations = typeof enUS;
