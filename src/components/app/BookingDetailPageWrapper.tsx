import React from 'react';
import RootProvider from '@/lib/providers/RootProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import BookingDetailPage from './BookingDetailPage';

interface Props {
  bookingId: string;
}

export default function BookingDetailPageWrapper({ bookingId }: Props) {
  return (
    <RootProvider>
      <ErrorBoundary>
        <BookingDetailPage bookingId={bookingId} />
      </ErrorBoundary>
    </RootProvider>
  );
}
