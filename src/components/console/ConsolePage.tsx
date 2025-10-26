import React from 'react';
import RootProvider from '@/lib/providers/RootProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import DashboardPage from './DashboardPage';

export default function ConsolePage() {
  return (
    <RootProvider>
      <ErrorBoundary>
        <DashboardPage />
      </ErrorBoundary>
    </RootProvider>
  );
}
