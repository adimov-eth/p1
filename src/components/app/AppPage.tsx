import React from 'react';
import RootProvider from '@/lib/providers/RootProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import HomePage from './HomePage';

export default function AppPage() {
  return (
    <RootProvider>
      <ErrorBoundary>
        <HomePage />
      </ErrorBoundary>
    </RootProvider>
  );
}
