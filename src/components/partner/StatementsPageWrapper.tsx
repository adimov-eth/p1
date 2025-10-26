import React from 'react';
import RootProvider from '@/lib/providers/RootProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import StatementsListPage from './StatementsListPage';

export default function StatementsPageWrapper() {
  return (
    <RootProvider>
      <ErrorBoundary>
        <StatementsListPage />
      </ErrorBoundary>
    </RootProvider>
  );
}
