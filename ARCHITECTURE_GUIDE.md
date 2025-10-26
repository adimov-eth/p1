# Architecture Implementation Guide

This document provides concrete code examples for the architectural patterns recommended in REVIEW.md.

## 1. Observable Mock State Singleton

**Purpose:** Single source of truth for all demo data with automatic UI updates.

**File:** `src/mocks/state.ts`

```typescript
import type { Organization, User, Course, Booking, Statement, UsageEvent } from '@/types/domain';

// Listener pattern for reactivity
type Listener = () => void;
const listeners = new Set<Listener>();

// Seed data structure
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

// Factory for deterministic seed data
function createSeedData(): MockData {
  return {
    organizations: [
      {
        id: 'ORG_001',
        name: 'Prime Demo Co.',
        status: 'prospect', // Will change to invoiced_ready after e-sign
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
          blackouts: ['2025-01-01', '2025-12-31'], // ISO dates
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
        date: '2025-11-05', // Upcoming (adjust based on current date)
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
        date: '2025-11-10',
        teeTime: '14:30',
        status: 'confirmed',
        cancellationWindowHours: 48,
        players: [
          { type: 'member', userId: 'USER_003', name: 'Michael Chen' },
          { type: 'guest', guestId: 'GUEST_002', name: 'Partner B' },
          { type: 'guest', guestId: 'GUEST_003', name: 'Partner C' },
        ],
      },
      {
        id: 'BOOKING_003',
        orgId: 'ORG_001',
        courseId: 'COURSE_001',
        courseName: 'Alpine Golf Club',
        date: '2025-10-15', // Past (completed)
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
        date: '2025-10-15',
        playersCount: 1,
        status: 'deducted',
        source: 'checkin',
      },
    ],
    statements: [
      {
        id: 'STMT_001',
        month: '2025-10',
        course: { id: 'COURSE_001', name: 'Alpine Golf Club' },
        lines: [
          {
            bookingId: 'BOOKING_003',
            date: '2025-10-15',
            playersCount: 1,
            confirmed: false, // Not yet verified by partner
          },
        ],
        totals: { players: 1 },
        status: 'sent',
      },
    ],
    guests: [],
    invitations: [],
  };
}

// Singleton state
export const mockState = {
  data: createSeedData(),

  // Observable pattern
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  notify() {
    listeners.forEach(fn => fn());
  },

  // Mutation helper (ensures notify)
  mutate(fn: (data: MockData) => void) {
    fn(this.data);
    this.notify();
  },

  // Reset to seed (for demo rehearsal)
  reset() {
    this.data = createSeedData();
    this.notify();
  },
};

// Development helper (expose on window in dev)
if (import.meta.env.DEV) {
  (window as any).__mockState = mockState;
}
```

**Usage in components:**

```typescript
// TanStack Query integration
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { mockState } from '@/mocks/state';

export function useMockStateSync() {
  const queryClient = useQueryClient();

  useEffect(() => {
    return mockState.subscribe(() => {
      // Invalidate all queries when mock state changes
      queryClient.invalidateQueries();
    });
  }, [queryClient]);
}

// Use in RootProvider
export function RootProvider({ children }: { children: React.ReactNode }) {
  useMockStateSync(); // Auto-sync mock state with queries

  return (
    <QueryClientProvider>
      <LocaleProvider>
        {children}
      </LocaleProvider>
    </QueryClientProvider>
  );
}
```

## 2. Mock Service Layer

**Purpose:** Implement API contracts with mutations that update observable state.

**File:** `src/mocks/service.ts`

```typescript
import { mockState } from './state';
import { delay } from './util';
import type { AppHomeResponse, ListBookingsResponse } from '@/types/api';
import type { Booking, UsageEvent, Statement } from '@/types/domain';

// Helper: calculate usage summary
function calculateUsageSummary(orgId: string) {
  const events = mockState.data.usageEvents.filter(e => e.orgId === orgId);
  const deducted = events.filter(e => e.status === 'deducted').length;
  const restored = events.filter(e => e.status === 'restored').length;

  const org = mockState.data.organizations.find(o => o.id === orgId);
  const quota = org?.annualQuotaDefault ?? 144;
  const used = deducted - restored;
  const remaining = quota - used;

  const upcomingBookings = mockState.data.bookings.filter(
    b => b.orgId === orgId && b.status === 'confirmed' && new Date(b.date) > new Date()
  );

  return {
    roundsUsed: used,
    roundsRemaining: remaining,
    lastPlayedAt: events[events.length - 1]?.date,
    upcomingCount: upcomingBookings.length,
  };
}

// LIFF endpoints
export async function getAppHome(orgId: string): Promise<AppHomeResponse> {
  await delay(300);

  const usageSummary = calculateUsageSummary(orgId);

  const nextBooking = mockState.data.bookings
    .filter(b => b.orgId === orgId && b.status === 'confirmed' && new Date(b.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  return { usageSummary, nextBooking };
}

export async function listBookings(orgId: string, status: 'upcoming' | 'past'): Promise<ListBookingsResponse> {
  await delay(250);

  const now = new Date();
  const items = mockState.data.bookings.filter(b => {
    if (b.orgId !== orgId) return false;
    const bookingDate = new Date(b.date);
    return status === 'upcoming'
      ? bookingDate >= now && b.status === 'confirmed'
      : bookingDate < now || b.status === 'completed';
  });

  return { items };
}

export async function getBooking(id: string): Promise<Booking> {
  await delay(200);

  const booking = mockState.data.bookings.find(b => b.id === id);
  if (!booking) throw new Error('Booking not found');

  return booking;
}

export async function postCheckin(
  bookingId: string,
  playerIds: string[] = [],
  method: 'nfc' | 'qr' = 'qr'
): Promise<{ usageEventId: string }> {
  await delay(400);

  return mockState.mutate(data => {
    const booking = data.bookings.find(b => b.id === bookingId);
    if (!booking) throw new Error('Booking not found');

    // Create usage event
    const usageEvent: UsageEvent = {
      id: `USAGE_${Date.now()}`,
      bookingId,
      orgId: booking.orgId,
      date: new Date().toISOString().split('T')[0],
      playersCount: booking.players.length,
      status: 'deducted',
      source: 'checkin',
    };

    data.usageEvents.push(usageEvent);

    // Update booking status
    booking.status = 'completed';

    return { usageEventId: usageEvent.id };
  });
}

// Console endpoints
export async function createBooking(payload: {
  orgId: string;
  courseId: string;
  date: string;
  teeTime: string;
  players: Array<{ type: 'member' | 'guest'; userId?: string; name: string }>;
}): Promise<Booking> {
  await delay(500);

  return mockState.mutate(data => {
    const course = data.courses.find(c => c.id === payload.courseId);

    const booking: Booking = {
      id: `BOOKING_${Date.now()}`,
      orgId: payload.orgId,
      courseId: payload.courseId,
      courseName: course?.name ?? 'Unknown Course',
      date: payload.date,
      teeTime: payload.teeTime,
      status: 'confirmed',
      cancellationWindowHours: 48,
      players: payload.players,
    };

    data.bookings.push(booking);

    return booking;
  });
}

export async function cancelBooking(id: string): Promise<Booking> {
  await delay(350);

  return mockState.mutate(data => {
    const booking = data.bookings.find(b => b.id === id);
    if (!booking) throw new Error('Booking not found');

    const bookingDate = new Date(booking.date);
    const now = new Date();
    const hoursUntil = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    booking.status = 'cancelled';

    // 48h cancellation policy
    if (hoursUntil < booking.cancellationWindowHours) {
      // Forfeit: deduct rounds
      const usageEvent: UsageEvent = {
        id: `USAGE_${Date.now()}`,
        bookingId: id,
        orgId: booking.orgId,
        date: new Date().toISOString().split('T')[0],
        playersCount: booking.players.length,
        status: 'forfeited',
        source: 'cancel_window',
      };
      data.usageEvents.push(usageEvent);
    } else {
      // Restore: no deduction
      const usageEvent: UsageEvent = {
        id: `USAGE_${Date.now()}`,
        bookingId: id,
        orgId: booking.orgId,
        date: new Date().toISOString().split('T')[0],
        playersCount: booking.players.length,
        status: 'restored',
        source: 'cancel_window',
      };
      data.usageEvents.push(usageEvent);
    }

    return booking;
  });
}

// Partner endpoints
export async function verifyStatement(id: string, lines: string[]): Promise<Statement> {
  await delay(400);

  return mockState.mutate(data => {
    const statement = data.statements.find(s => s.id === id);
    if (!statement) throw new Error('Statement not found');

    // Mark specified lines as confirmed
    statement.lines.forEach(line => {
      if (lines.includes(line.bookingId)) {
        line.confirmed = true;
      }
    });

    statement.status = 'verified';

    return statement;
  });
}

export async function disputeStatement(id: string, reason: string, lines: string[]): Promise<Statement> {
  await delay(400);

  return mockState.mutate(data => {
    const statement = data.statements.find(s => s.id === id);
    if (!statement) throw new Error('Statement not found');

    statement.status = 'disputed';
    // In real app, would create dispute record with reason + lines

    return statement;
  });
}

// E-sign endpoint
export async function completeESign(
  orgId: string,
  signerInfo: { name: string; title: string; email: string; signatureHash: string }
): Promise<{ agreementId: string; status: 'signed' }> {
  await delay(600);

  return mockState.mutate(data => {
    const org = data.organizations.find(o => o.id === orgId);
    if (!org) throw new Error('Organization not found');

    // Move org to invoiced_ready status
    org.status = 'invoiced';

    return {
      agreementId: `AGR_${Date.now()}`,
      status: 'signed' as const,
    };
  });
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

export function seedRandom(seed: number) {
  // Simple seeded random for deterministic data (optional)
  let state = seed;
  return function() {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}
```

## 3. Routing Architecture

**Pattern:** React Router within Astro islands (not Astro dynamic routes).

**File:** `src/pages/app.astro`

```astro
---
import RootProvider from '@/lib/providers/RootProvider';
import AppRouter from '@/components/routers/AppRouter';
---

<RootProvider>
  <AppRouter client:only="react" />
</RootProvider>
```

**File:** `src/components/routers/AppRouter.tsx`

```typescript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '@/components/layouts/AppLayout';
import HomePage from '@/components/app/HomePage';
import CardPage from '@/components/app/CardPage';
import BookingsPage from '@/components/app/BookingsPage';
import BookingDetailPage from '@/components/app/BookingDetailPage';
import NotFoundPage from '@/components/app/NotFoundPage';

export default function AppRouter() {
  return (
    <BrowserRouter basename="/app">
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/card" element={<CardPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/bookings/:id" element={<BookingDetailPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
```

**Why this works:**
- Astro serves `/app` route → renders `app.astro`
- `app.astro` hydrates `<AppRouter client:only />` as React island
- React Router handles all sub-routes (`/app/card`, `/app/bookings/:id`)
- No Astro dynamic route complexity
- Easy to extract into standalone SPA later

## 4. Type Organization

**File:** `src/types/domain.ts`

```typescript
// Core domain entities (from spec/Types.md)
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

// ... rest from spec/Types.md
```

**File:** `src/types/api.ts`

```typescript
// API request/response types (from spec/APIs.md)
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
```

**File:** `src/types/forms.ts`

```typescript
import { z } from 'zod';

// Zod schemas for form validation
export const createBookingSchema = z.object({
  orgId: z.string().min(1, 'Organization required'),
  courseId: z.string().min(1, 'Course required'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  teeTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
  players: z.array(z.object({
    type: z.enum(['member', 'guest']),
    userId: z.string().optional(),
    name: z.string().min(1, 'Name required'),
  })).min(1, 'At least one player required'),
});

export type CreateBookingFormData = z.infer<typeof createBookingSchema>;
```

## 5. i18n Implementation

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

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  const t = (key: string, params?: TranslationParams): string => {
    // Load translations dynamically (for demo, just EN)
    const translations = import.meta.env.DEV
      ? require('@/locales/en.json')
      : {}; // Lazy load in production

    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      value = value?.[k];
    }

    if (value === undefined) {
      if (import.meta.env.DEV) {
        console.warn(`Missing translation: ${key}`);
      }
      return key; // Fallback to key
    }

    // Simple parameter interpolation
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

**Usage:**

```typescript
import { useTranslation } from '@/lib/i18n/context';

function HomePage() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('app.home.title')}</h1>
      <p>{t('app.home.roundsRemaining')}: {remaining}</p>
    </div>
  );
}
```

## 6. Query Client Setup

**File:** `src/lib/providers/QueryProvider.tsx`

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect } from 'react';
import { mockState } from '@/mocks/state';
import { useQueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes (demo: reduce server load)
      retry: false, // No retries in demo
      refetchOnWindowFocus: false, // Disable in demo
    },
  },
});

// Sync TanStack Query with mock state changes
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

## 7. Complete Example: Check-in Flow

**Component:** `src/components/app/CardPage.tsx`

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/services';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/lib/i18n/context';
import { toast } from 'sonner';
import { useState } from 'react';

export default function CardPage() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [bookingId] = useState('BOOKING_001'); // In real app: get from context or query

  const checkinMutation = useMutation({
    mutationFn: () => api.postCheckin(bookingId, [], 'qr'),
    onSuccess: () => {
      toast.success(t('app.card.checkinSuccess'));
      queryClient.invalidateQueries({ queryKey: ['appHome'] });
    },
    onError: (error) => {
      toast.error(t('app.card.checkinError'));
      console.error('Check-in failed:', error);
    },
  });

  return (
    <div className="p-4">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">{t('app.card.title')}</h1>

        {/* QR Code placeholder */}
        <div className="bg-gray-100 h-64 flex items-center justify-center mb-4">
          <p className="text-gray-500">QR Code: {bookingId}</p>
        </div>

        <Button
          onClick={() => checkinMutation.mutate()}
          disabled={checkinMutation.isPending}
          className="w-full"
        >
          {checkinMutation.isPending
            ? t('common.loading')
            : t('app.card.simulateCheckin')
          }
        </Button>

        {checkinMutation.isSuccess && (
          <p className="text-green-600 mt-2 text-center">
            ✓ {t('app.card.checkinSuccess')}
          </p>
        )}
      </Card>
    </div>
  );
}
```

**What happens:**
1. User clicks "Simulate Check-in"
2. `checkinMutation.mutate()` calls `api.postCheckin()`
3. Mock service creates `UsageEvent`, updates booking status
4. `mockState.notify()` triggers invalidation via `useMockStateSync()`
5. `appHome` query refetches automatically
6. Rounds remaining updates in HomePage

**No manual cache updates needed.** The observable state pattern handles it automatically.

## 8. Error Boundary

**File:** `src/components/ErrorBoundary.tsx`

```typescript
import { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="p-6 max-w-md">
            <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">
              {this.state.error?.message ?? 'An unexpected error occurred'}
            </p>
            <Button onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**Usage in routers:**

```typescript
export default function AppRouter() {
  return (
    <BrowserRouter basename="/app">
      <ErrorBoundary>
        <AppLayout>
          <Routes>{/* ... */}</Routes>
        </AppLayout>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
```

## Summary

These patterns provide:

1. **Single source of truth:** Mock state singleton
2. **Automatic reactivity:** Observable pattern + TanStack Query sync
3. **Clear routing:** React Router in Astro islands
4. **Type safety:** Organized type structure (domain, API, forms, UI)
5. **i18n ready:** Simple context-based translations
6. **Error resilience:** Boundaries + mutation error handling
7. **Demo-friendly:** State reset, deterministic IDs, artificial delays

All pieces work together: mutation → state update → notify → invalidate → refetch → UI update.

No manual cache management. No prop drilling. Clean separation of concerns.
