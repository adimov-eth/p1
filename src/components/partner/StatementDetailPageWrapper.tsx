import React from 'react';
import RootProvider from '@/lib/providers/RootProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import StatementDetailPage from './StatementDetailPage';

interface Props {
  statementId: string;
}

export default function StatementDetailPageWrapper({ statementId }: Props) {
  return (
    <RootProvider>
      <ErrorBoundary>
        <StatementDetailPage statementId={statementId} />
      </ErrorBoundary>
    </RootProvider>
  );
}
