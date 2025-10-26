import React from 'react';
import RootProvider from '@/lib/providers/RootProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import BookingsPage from './BookingsPage';

export default function BookingsPageWrapper() {
  return (
    <RootProvider>
      <ErrorBoundary>
        <BookingsPage />
      </ErrorBoundary>
    </RootProvider>
  );
}
