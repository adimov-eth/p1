# Quick Scaffold Guide

**This document provides starter shells to accelerate Phase 0-1 setup.**

Copy these files to get the basic structure in place, then implement functionality step by step per [todo.plan](./todo.plan).

---

## Phase 0-1 Scaffold (Copy These)

### 1. Environment File

**File:** `.env`

```bash
VITE_USE_MOCKS=true
```

---

### 2. Types Structure

**File:** `src/types/domain.ts`

```typescript
// Copy exactly from spec/Types.md
export type Role = 'org_admin' | 'designated' | 'concierge' | 'partner';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type OrgStatus = 'prospect' | 'invoiced' | 'active' | 'suspended';

export interface Organization {
  id: string;
  name: string;
  status: OrgStatus;
  membershipStartAt?: string;
  membershipEndAt?: string;
  annualQuotaDefault: number;
}

export interface User {
  id: string;
  orgId: string;
  role: Role;
  name: string;
  email?: string;
  phone?: string;
  lineUserId?: string;
  status: 'active' | 'inactive';
}

export interface Course {
  id: string;
  name: string;
  region?: string;
  policy?: {
    blackouts?: string[];
    guestLimits?: { perMember: number; maxGroup: number };
    notes?: string;
  };
}

export interface BookingPlayer {
  type: 'member' | 'guest';
  userId?: string;
  guestId?: string;
  name: string;
}

export interface Booking {
  id: string;
  orgId: string;
  courseId: string;
  courseName?: string;
  date: string;
  teeTime: string;
  status: BookingStatus;
  cancellationWindowHours: number;
  players: BookingPlayer[];
}

export interface UsageSummary {
  roundsUsed: number;
  roundsRemaining: number;
  lastPlayedAt?: string;
  upcomingCount: number;
}

export interface UsageEvent {
  id: string;
  bookingId: string;
  orgId: string;
  date: string;
  playersCount: number;
  status: 'deducted' | 'restored' | 'forfeited';
  source: 'checkin' | 'cancel_window';
}

export interface StatementLine {
  bookingId: string;
  date: string;
  playersCount: number;
  confirmed: boolean;
}

export interface Statement {
  id: string;
  month: string;
  course: { id: string; name: string };
  lines: StatementLine[];
  totals: { players: number };
  status: 'draft' | 'sent' | 'verified' | 'disputed' | 'paid';
}

export interface Guest {
  id: string;
  orgId: string;
  name: string;
  phone?: string;
}

export interface Invitation {
  id: string;
  bookingId: string;
  guestId: string;
  sentAt: string;
  channel: 'line' | 'link';
  status: 'sent' | 'accepted';
}
```

**File:** `src/types/api.ts`

```typescript
import type { UsageSummary, Booking, Statement } from './domain';

export interface AppHomeResponse {
  usageSummary: UsageSummary;
  nextBooking?: Booking;
}

export interface ListBookingsResponse {
  items: Booking[];
}

export interface CreateBookingRequest {
  orgId: string;
  courseId: string;
  date: string;
  teeTime: string;
  players: Array<{
    type: 'member' | 'guest';
    userId?: string;
    name: string;
  }>;
}

export interface ListStatementsResponse {
  items: Statement[];
}
```

**File:** `src/types/index.ts`

```typescript
export * from './domain';
export * from './api';
```

---

### 3. Mock State Singleton

**File:** `src/mocks/state.ts`

```typescript
import type { Organization, User, Course, Booking, Statement, UsageEvent, Guest, Invitation } from '@/types/domain';

type Listener = () => void;
const listeners = new Set<Listener>();

interface MockData {
  organizations: Organization[];
  users: User[];
  courses: Course[];
  bookings: Booking[];
  statements: Statement[];
  usageEvents: UsageEvent[];
  guests: Guest[];
  invitations: Invitation[];
}

// Helper for dynamic dates (keeps bookings "upcoming" regardless of when demo runs)
function getUpcomingDate(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
}

function getPastDate(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
}

function createSeedData(): MockData {
  return {
    organizations: [
      {
        id: 'ORG_001',
        name: 'Prime Demo Co.',
        status: 'prospect',
        annualQuotaDefault: 144,
      },
    ],
    users: [
      {
        id: 'USER_001',
        orgId: 'ORG_001',
        role: 'org_admin',
        name: 'John Smith',
        email: 'john@primeco.demo',
        status: 'active',
      },
      {
        id: 'USER_002',
        orgId: 'ORG_001',
        role: 'designated',
        name: 'Sarah Johnson',
        lineUserId: 'LINE_USER_002',
        status: 'active',
      },
      {
        id: 'USER_003',
        orgId: 'ORG_001',
        role: 'designated',
        name: 'Michael Chen',
        lineUserId: 'LINE_USER_003',
        status: 'active',
      },
    ],
    courses: [
      {
        id: 'COURSE_001',
        name: 'Alpine Golf Club',
        region: 'Bangkok',
        policy: {
          guestLimits: { perMember: 3, maxGroup: 4 },
          notes: 'Dress code: collared shirts required',
        },
      },
      {
        id: 'COURSE_002',
        name: 'Nikanti Golf Club',
        region: 'Pattaya',
        policy: {
          guestLimits: { perMember: 3, maxGroup: 4 },
        },
      },
      {
        id: 'COURSE_003',
        name: 'Siam Country Club',
        region: 'Pattaya',
        policy: {
          guestLimits: { perMember: 2, maxGroup: 4 },
        },
      },
    ],
    bookings: [
      {
        id: 'BOOKING_001',
        orgId: 'ORG_001',
        courseId: 'COURSE_001',
        courseName: 'Alpine Golf Club',
        date: getUpcomingDate(5), // 5 days from now
        teeTime: '09:00',
        status: 'confirmed',
        cancellationWindowHours: 48,
        players: [
          { type: 'member', userId: 'USER_002', name: 'Sarah Johnson' },
          { type: 'guest', guestId: 'GUEST_001', name: 'Client A' },
        ],
      },
      {
        id: 'BOOKING_002',
        orgId: 'ORG_001',
        courseId: 'COURSE_002',
        courseName: 'Nikanti Golf Club',
        date: getUpcomingDate(10), // 10 days from now
        teeTime: '14:30',
        status: 'confirmed',
        cancellationWindowHours: 48,
        players: [
          { type: 'member', userId: 'USER_003', name: 'Michael Chen' },
        ],
      },
      {
        id: 'BOOKING_003',
        orgId: 'ORG_001',
        courseId: 'COURSE_001',
        courseName: 'Alpine Golf Club',
        date: getPastDate(15), // 15 days ago (past booking)
        teeTime: '10:00',
        status: 'completed',
        cancellationWindowHours: 48,
        players: [
          { type: 'member', userId: 'USER_002', name: 'Sarah Johnson' },
        ],
      },
    ],
    usageEvents: [
      {
        id: 'USAGE_001',
        bookingId: 'BOOKING_003',
        orgId: 'ORG_001',
        date: getPastDate(15),
        playersCount: 1,
        status: 'deducted',
        source: 'checkin',
      },
    ],
    statements: [
      {
        id: 'STMT_001',
        month: new Date().toISOString().slice(0, 7), // Current month YYYY-MM
        course: { id: 'COURSE_001', name: 'Alpine Golf Club' },
        lines: [
          {
            bookingId: 'BOOKING_003',
            date: getPastDate(15),
            playersCount: 1,
            confirmed: false,
          },
        ],
        totals: { players: 1 },
        status: 'sent',
      },
    ],
    guests: [
      { id: 'GUEST_001', orgId: 'ORG_001', name: 'Client A' },
      { id: 'GUEST_002', orgId: 'ORG_001', name: 'Partner B' },
      { id: 'GUEST_003', orgId: 'ORG_001', name: 'Partner C' },
    ],
    invitations: [],
  };
}

export const mockState = {
  data: createSeedData(),

  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  notify() {
    listeners.forEach(fn => fn());
  },

  mutate<T>(fn: (data: MockData) => T): T {
    const result = fn(this.data);
    this.notify();
    return result;
  },

  reset() {
    this.data = createSeedData();
    this.notify();
  },
};

// Dev helper
if (import.meta.env.DEV) {
  (window as any).__mockState = mockState;
}
```

**File:** `src/mocks/util.ts`

```typescript
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomDelay(): Promise<void> {
  return delay(250 + Math.random() * 350); // 250-600ms
}
```

---

### 4. Localization Setup

**File:** `src/locales/en.json`

```json
{
  "common": {
    "loading": "Loading…",
    "save": "Save",
    "cancel": "Cancel",
    "close": "Close",
    "error": "Something went wrong",
    "empty": "No items found"
  },
  "app": {
    "home": {
      "title": "Welcome",
      "roundsRemaining": "Rounds Remaining",
      "nextBooking": "Next Booking"
    },
    "card": {
      "title": "Digital Membership Card",
      "simulateCheckin": "Simulate Check-in",
      "checkinSuccess": "Check-in successful!",
      "checkinError": "Check-in failed"
    },
    "bookings": {
      "title": "My Bookings",
      "upcoming": "Upcoming",
      "past": "Past",
      "inviteGuest": "Invite Guest"
    }
  },
  "console": {
    "dashboard": {
      "title": "Concierge Dashboard"
    },
    "bookings": {
      "title": "Bookings",
      "create": "Create Booking",
      "createSuccess": "Booking created successfully",
      "createError": "Failed to create booking"
    },
    "members": {
      "profile": "Member Profile"
    }
  },
  "partner": {
    "statements": {
      "title": "Monthly Statements"
    },
    "verify": "Verify",
    "dispute": "Dispute"
  },
  "public": {
    "rsvp": {
      "title": "RSVP"
    }
  }
}
```

**File:** `src/lib/i18n/context.tsx`

```typescript
import { createContext, useContext, useState, ReactNode } from 'react';

type Locale = 'en' | 'th';
type TranslationParams = Record<string, string | number>;

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: TranslationParams) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

// Simplified for demo - in production, dynamically load translations
const translations: Record<string, any> = {
  en: require('@/locales/en.json'),
};

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  const t = (key: string, params?: TranslationParams): string => {
    const keys = key.split('.');
    let value: any = translations[locale];

    for (const k of keys) {
      value = value?.[k];
    }

    if (value === undefined) {
      if (import.meta.env.DEV) {
        console.warn(`Missing translation: ${key}`);
      }
      return key;
    }

    if (params && typeof value === 'string') {
      return value.replace(/\{(\w+)\}/g, (_, param) => String(params[param] ?? ''));
    }

    return String(value);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useTranslation must be used within LocaleProvider');
  return context;
}
```

---

### 5. Query Provider with Mock Sync

**File:** `src/lib/providers/QueryProvider.tsx`

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { mockState } from '@/mocks/state';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function useMockStateSync() {
  const queryClient = useQueryClient();

  useEffect(() => {
    return mockState.subscribe(() => {
      queryClient.invalidateQueries();
    });
  }, [queryClient]);
}

export function QueryProvider({ children }: { children: ReactNode }) {
  useMockStateSync();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

**File:** `src/lib/providers/RootProvider.tsx`

```typescript
import { ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';
import { LocaleProvider } from '@/lib/i18n/context';
import { Toaster } from '@/components/ui/sonner';

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <QueryProvider>
        {children}
        <Toaster />
      </QueryProvider>
    </LocaleProvider>
  );
}
```

---

### 6. Service Abstraction

**File:** `src/lib/services/index.ts`

```typescript
import * as mockService from '@/mocks/service';

const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';

// For demo, always use mocks
// In production, swap to: import * as apiClient from './apiClient'
export const api = mockService;
```

---

### 7. Basic Router Shells

**File:** `src/pages/app.astro`

```astro
---
import RootProvider from '@/lib/providers/RootProvider';
import AppRouter from '@/components/routers/AppRouter';
---

<RootProvider client:only="react">
  <AppRouter client:only="react" />
</RootProvider>
```

**File:** `src/pages/esign/[orgId].astro`

```astro
---
import RootProvider from '@/lib/providers/RootProvider';
import ESignWidget from '@/components/esign/ESignWidget';

// Access dynamic route param
const { orgId } = Astro.params;
---

<RootProvider client:only="react">
  <ESignWidget orgId={orgId} client:only="react" />
</RootProvider>
```

**Note:** Astro dynamic routes use bracket syntax `[param]` in filename. Access via `Astro.params.param` in frontmatter.

**File:** `src/components/routers/AppRouter.tsx`

```typescript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '@/components/layouts/AppLayout';

// Placeholder - implement in Phase 2
function HomePage() {
  return <div className="p-4"><h1>Home Page (TODO)</h1></div>;
}

function CardPage() {
  return <div className="p-4"><h1>Card Page (TODO)</h1></div>;
}

export default function AppRouter() {
  return (
    <BrowserRouter basename="/app">
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/card" element={<CardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
```

**File:** `src/components/layouts/AppLayout.tsx`

```typescript
import { ReactNode } from 'react';
import { useTranslation } from '@/lib/i18n/context';
import { Trophy } from 'lucide-react';

export default function AppLayout({ children }: { children: ReactNode }) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            <span className="font-bold">Prime</span>
          </div>
        </div>
      </header>
      <main className="container py-6">
        {children}
      </main>
    </div>
  );
}
```

---

## Next Steps After Scaffold

1. **Copy these files** into your project structure
2. **Run prerequisites** from Phase 0 (install deps)
3. **Verify:** `bun dev` should run without errors
4. **Navigate to** `http://localhost:4321/app` → should see placeholder
5. **Continue with Phase 1:** Implement mock service functions
6. **Phase 2:** Build actual HomePage and CardPage with functionality

**Remember:** These are scaffolds. The real work is implementing the observable mock state pattern and wiring up TanStack Query mutations.

See [todo.plan](./todo.plan) for detailed implementation steps.
