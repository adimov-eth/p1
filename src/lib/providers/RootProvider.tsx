import React, { type ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';
import { LocaleProvider } from '../i18n/context';
import { Toaster } from '@/components/ui/sonner';

export default function RootProvider({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <QueryProvider>
        {children}
        <Toaster />
      </QueryProvider>
    </LocaleProvider>
  );
}
