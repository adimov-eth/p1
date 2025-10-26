# Development Quick Reference Card

Keep this open during implementation. Copy-paste patterns, no searching.

---

## Commands

```bash
# Development
bun dev                      # Start dev server (http://localhost:4321)
bun build                    # Build for production
bun preview                  # Preview production build
bun astro check              # TypeScript validation (run before PRs)

# Dependencies
bun add <package>            # Add runtime dependency
bun add -d <package>         # Add dev dependency

# Shadcn
bunx shadcn@latest add <component>   # Add single component
bunx shadcn@latest add button card   # Add multiple components

# Git (if needed)
git status                   # Check current state
git add .                    # Stage all changes
git commit -m "message"      # Commit with message
```

---

## File Locations Quick Map

```
src/
├── types/
│   ├── domain.ts            # Core entities (from spec/Types.md)
│   ├── api.ts               # Request/response types (from spec/APIs.md)
│   ├── forms.ts             # Zod schemas for form validation
│   └── ui.ts                # Component prop types
├── mocks/
│   ├── state.ts             # Observable singleton + seed data
│   ├── service.ts           # Mock API implementation
│   └── util.ts              # delay(), pick(), seedRandom()
├── lib/
│   ├── providers/
│   │   ├── QueryProvider.tsx    # TanStack Query + mock sync
│   │   └── RootProvider.tsx     # Combines Query + Locale
│   ├── i18n/
│   │   └── context.tsx          # LocaleProvider + useTranslation
│   └── services/
│       └── index.ts             # API switch (mock vs real)
├── locales/
│   └── en.json              # English translations
├── components/
│   ├── ui/                  # shadcn components (auto-generated)
│   ├── layouts/
│   │   ├── AppLayout.tsx        # LIFF shell
│   │   ├── ConsoleLayout.tsx    # Console shell
│   │   └── PartnerLayout.tsx    # Partner shell
│   ├── routers/
│   │   ├── AppRouter.tsx        # React Router for /app/*
│   │   ├── ConsoleRouter.tsx    # React Router for /console/*
│   │   └── PartnerRouter.tsx    # React Router for /partner/*
│   ├── app/                 # LIFF screens (HomePage, CardPage, etc.)
│   ├── console/             # Console screens
│   ├── partner/             # Partner screens
│   └── ErrorBoundary.tsx    # Error handling
└── pages/
    ├── index.astro          # Landing page (existing)
    ├── app.astro            # LIFF entry point
    ├── console.astro        # Console entry point
    ├── partner.astro        # Partner entry point
    ├── rsvp.astro           # Public RSVP form
    └── esign/
        └── [orgId].astro    # E-sign widget
```

---

## Common Patterns

### Create New Screen (Copy-Paste Template)

```typescript
// src/components/app/ExamplePage.tsx
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/services';
import { useTranslation } from '@/lib/i18n/context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function ExamplePage() {
  const { t } = useTranslation();

  const { data, isLoading, error } = useQuery({
    queryKey: ['example'],
    queryFn: () => api.getExample(),
  });

  if (isLoading) {
    return <Skeleton className="h-64" />;
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-600">{t('common.error')}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4">
        <p className="text-gray-500">{t('common.empty')}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">{t('example.title')}</h1>
        {/* Your content here */}
      </Card>
    </div>
  );
}
```

### Add Route to Router

```typescript
// src/components/routers/AppRouter.tsx
import ExamplePage from '@/components/app/ExamplePage';

<Routes>
  {/* Existing routes */}
  <Route path="/example" element={<ExamplePage />} />
</Routes>
```

### Create Mutation (e.g., Create Booking)

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/services';
import { toast } from 'sonner';
import { useTranslation } from '@/lib/i18n/context';

function CreateBookingButton() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateBookingFormData) => api.createBooking(data),
    onSuccess: () => {
      toast.success(t('console.bookings.createSuccess'));
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (error) => {
      toast.error(t('console.bookings.createError'));
      console.error('Create booking failed:', error);
    },
  });

  return (
    <Button
      onClick={() => mutation.mutate({ /* form data */ })}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? t('common.loading') : t('console.bookings.create')}
    </Button>
  );
}
```

### Add Mock Service Function

```typescript
// src/mocks/service.ts
import { mockState } from './state';
import { delay } from './util';
import type { Booking } from '@/types/domain';

export async function createBooking(data: CreateBookingRequest): Promise<Booking> {
  await delay(500); // Simulate network

  return mockState.mutate(state => {
    const booking: Booking = {
      id: `BOOKING_${Date.now()}`,
      orgId: data.orgId,
      courseId: data.courseId,
      courseName: state.courses.find(c => c.id === data.courseId)?.name ?? '',
      date: data.date,
      teeTime: data.teeTime,
      status: 'confirmed',
      cancellationWindowHours: 48,
      players: data.players,
    };

    state.bookings.push(booking);

    return booking; // Return value becomes mutation result
  });
}
```

### Form with React Hook Form + Zod

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const schema = z.object({
  name: z.string().min(1, 'Name required'),
  email: z.string().email('Invalid email'),
});

type FormData = z.infer<typeof schema>;

function ExampleForm({ onSubmit }: { onSubmit: (data: FormData) => void }) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '' },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

### Dialog Pattern

```typescript
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

function ExampleDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogHeader>
        {/* Dialog content */}
        <Button onClick={() => setOpen(false)}>Close</Button>
      </DialogContent>
    </Dialog>
  );
}
```

### Table Pattern

```typescript
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

function ExampleTable({ items }: { items: Booking[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Course</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(item => (
          <TableRow key={item.id}>
            <TableCell>{item.courseName}</TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell>{item.teeTime}</TableCell>
            <TableCell>{item.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### Tabs Pattern

```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function ExampleTabs() {
  return (
    <Tabs defaultValue="upcoming">
      <TabsList>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="past">Past</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming">
        {/* Upcoming content */}
      </TabsContent>
      <TabsContent value="past">
        {/* Past content */}
      </TabsContent>
    </Tabs>
  );
}
```

### Empty State Pattern

```typescript
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarX } from 'lucide-react';

function EmptyState({ title, description, actionLabel, onAction }: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <Card className="p-12 text-center">
      <CalendarX className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </Card>
  );
}
```

### Loading Skeleton Pattern

```typescript
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

function PageSkeleton() {
  return (
    <div className="p-4 space-y-4">
      <Skeleton className="h-8 w-64" /> {/* Title */}
      <Card className="p-6">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </Card>
    </div>
  );
}
```

---

## i18n Key Naming Convention

```json
{
  "common": {
    "loading": "Loading…",
    "save": "Save",
    "cancel": "Cancel",
    "error": "Something went wrong"
  },
  "app": {
    "home.title": "Welcome",
    "home.roundsRemaining": "Rounds remaining",
    "card.checkin": "Check in",
    "bookings.upcoming": "Upcoming"
  },
  "console": {
    "dashboard.title": "Dashboard",
    "bookings.create": "Create Booking"
  }
}
```

**Usage:**
```typescript
const { t } = useTranslation();
<h1>{t('app.home.title')}</h1>
```

---

## Type Imports

```typescript
// Domain types
import type { Organization, User, Booking, Course, Statement } from '@/types/domain';

// API types
import type { AppHomeResponse, ListBookingsResponse } from '@/types/api';

// Form schemas
import { createBookingSchema } from '@/types/forms';
import type { CreateBookingFormData } from '@/types/forms';
```

---

## Common Errors & Solutions

### Error: `Cannot find module '@/...'`

**Cause:** Path alias not working.

**Fix:** Check `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Error: `useQuery is not a function`

**Cause:** TanStack Query not installed or not imported.

**Fix:**
```bash
bun add @tanstack/react-query
```

### Error: Mock state changes don't update UI

**Cause:** `useMockStateSync()` not in RootProvider.

**Fix:** Add to `src/lib/providers/RootProvider.tsx`:
```typescript
export function RootProvider({ children }) {
  useMockStateSync(); // Add this line

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### Error: TypeScript complains about shadcn components

**Cause:** Component not installed.

**Fix:**
```bash
bunx shadcn@latest add <component-name>
```

### Error: `t is not a function`

**Cause:** Not using `useTranslation` hook.

**Fix:**
```typescript
import { useTranslation } from '@/lib/i18n/context';

function Component() {
  const { t } = useTranslation(); // Add this
  return <h1>{t('key')}</h1>;
}
```

---

## Dev Workflow Checklist

### Before Starting New Screen

- [ ] Seed data exists in `mockState.data` for this screen?
- [ ] Mock service function implemented?
- [ ] i18n keys added to `en.json`?
- [ ] Types defined in `src/types/*`?

### While Building Screen

- [ ] Import shadcn components (not building from scratch)
- [ ] Use `t()` for all visible text (no hardcoded strings)
- [ ] Add loading state (Skeleton)
- [ ] Add empty state (EmptyState component)
- [ ] Add error handling (try-catch or error prop)
- [ ] Test mobile viewport (375px)

### Before Committing Screen

- [ ] `bun astro check` passes (no TS errors)
- [ ] Screen works in browser (no console errors)
- [ ] All text uses i18n keys
- [ ] Loading/empty/error states work
- [ ] Mobile responsive (test at 375px)
- [ ] Keyboard accessible (tab order makes sense)

---

## Performance Quick Checks

```typescript
// Check bundle size
bun build
ls -lh dist/_astro/*.js

// Check load time (DevTools Network tab)
// Throttle to Fast 3G
// Target: < 2.5s for initial load

// Check query cache
// React DevTools → TanStack Query tab
// Verify queries are cached and invalidating correctly
```

---

## Demo Day Quick Fixes

### Reset Mock State

```typescript
// In browser console:
window.__mockState.reset();
```

Or add button to console (dev only):

```typescript
{import.meta.env.DEV && (
  <Button onClick={() => mockState.reset()}>Reset Demo</Button>
)}
```

### Force Query Refetch

```typescript
// In browser console:
queryClient.invalidateQueries();
```

### Check Current Mock State

```typescript
// In browser console:
console.log(window.__mockState.data);
```

---

## Astro vs React: When to Use What

| Use Astro (.astro files) | Use React (.tsx files) |
|--------------------------|------------------------|
| Static content (landing page) | Interactive UI (forms, buttons) |
| Layout shells (minimal logic) | Data fetching (TanStack Query) |
| Entry points (/app, /console) | Dynamic routing (React Router) |
| Server-side rendering (if needed) | Client-side state (useState, etc.) |

**Rule of thumb:** If it has interactivity, use React. If it's just wrapping, use Astro.

---

## Git Commit Message Convention (Optional)

```
feat: Add booking detail page
fix: Check-in mutation not updating rounds
refactor: Extract booking form to component
style: Update button styling
docs: Add demo script
chore: Install shadcn dialog component
```

---

## Useful VS Code Extensions (Optional)

- Astro (astro-build.astro-vscode)
- Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)
- Error Lens (usernamehw.errorlens)
- ESLint (dbaeumer.vscode-eslint)

---

## Browser DevTools Tips

### React DevTools

- Components tab → find component → inspect props/state
- Profiler tab → record interaction → see what re-renders

### TanStack Query DevTools

- Install: `bun add @tanstack/react-query-devtools`
- Add to RootProvider:
  ```typescript
  import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
  <QueryClientProvider>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  ```

### Network Tab

- Throttling → Fast 3G (test performance)
- Disable cache (test real load times)
- Filter: Fetch/XHR (should be empty in demo, all mocks)

---

## Questions During Development?

1. **Architecture pattern:** Check `ARCHITECTURE_GUIDE.md`
2. **Spec clarification:** Read `spec/` directory files
3. **Routing confusion:** See Section 3 in `ARCHITECTURE_GUIDE.md`
4. **State not updating:** Verify `mockState.notify()` called
5. **TypeScript errors:** Run `bun astro check` for exact locations

---

## Emergency Debugging

### Nothing renders

1. Check browser console for errors
2. Check `bun dev` terminal for build errors
3. Verify component imported correctly
4. Check route exists in router

### Query not fetching

1. Check `queryKey` is unique
2. Check `queryFn` is async function
3. Check mock service function exists
4. Check `api` export in `src/lib/services/index.ts`

### Mutation not working

1. Check `mutationFn` returns Promise
2. Check `onSuccess` handler exists
3. Check `mockState.notify()` called
4. Check TanStack Query DevTools for mutation status

### Styles not applying

1. Check Tailwind class names (typos?)
2. Check global.css imported in layout
3. Check component uses `cn()` for conditional classes
4. Restart dev server (sometimes CSS cache issues)

---

**Keep this tab open. Copy patterns. Build fast. Ship quality.**
