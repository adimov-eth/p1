import React, { createContext, useContext, type ReactNode } from 'react';
import { enUS } from './resources';

interface LocaleContextValue {
  locale: string;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const t = (key: string): string => {
    return getNestedValue(enUS, key);
  };

  return (
    <LocaleContext.Provider value={{ locale: 'en-US', t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useTranslation must be used within LocaleProvider');
  }
  return context;
}
