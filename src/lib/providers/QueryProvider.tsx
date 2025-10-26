import React, { useEffect, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { mockState } from '@/mocks/state';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function MockStateSync() {
  const queryClient = useQueryClient();

  useEffect(() => {
    return mockState.subscribe(() => {
      queryClient.invalidateQueries(); // Auto-refresh all queries
    });
  }, [queryClient]);

  return null;
}

export function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MockStateSync />
      {children}
    </QueryClientProvider>
  );
}
