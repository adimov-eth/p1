import React from 'react';
import RootProvider from '@/lib/providers/RootProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import CardPage from './CardPage';

export default function CardPageWrapper() {
  return (
    <RootProvider>
      <ErrorBoundary>
        <CardPage />
      </ErrorBoundary>
    </RootProvider>
  );
}
