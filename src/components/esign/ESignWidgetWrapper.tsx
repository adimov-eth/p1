import React from 'react';
import RootProvider from '@/lib/providers/RootProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import ESignWidget from './ESignWidget';

interface ESignWidgetWrapperProps {
  orgId: string;
}

export default function ESignWidgetWrapper({ orgId }: ESignWidgetWrapperProps) {
  return (
    <RootProvider>
      <ErrorBoundary>
        <ESignWidget orgId={orgId} />
      </ErrorBoundary>
    </RootProvider>
  );
}
