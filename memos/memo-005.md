 Memo for Future Self: Prime MVP Demo Journey

  Date: October 26, 2025Session: Demo validation and Phase 2 gate testingStatus: ✅ CRITICAL MILESTONE ACHIEVED - Observable pattern validated!

  ---
  What We Just Accomplished

  We validated the Phase 2 gate - the most critical architectural validation before building all other screens. The observable mock state pattern works perfectly.

  The Test Flow (PROVEN WORKING):

  1. Started at /app - 143 rounds remaining
  2. Navigated to /app/card - Digital membership card with QR code
  3. Clicked "Simulate Check-in" for BOOKING_001 (2 players)
  4. Navigated back to /app - 141 rounds remaining ✅

  The rounds decremented automatically without page refresh! This proves:
  - mockState.mutate() → notify() → MockStateSync → queryClient.invalidateQueries() → UI updates
  - No manual cache invalidation needed
  - Real-time updates across all screens
  - Production-quality architecture with mocked data

  Key Discovery: localStorage Persistence

  Critical lesson learned: mockState persists to localStorage (see src/mocks/state.ts:40). Previous demo runs accumulate check-ins!

  The "Reset Demo State" button (import.meta.env.DEV only) is essential:
  - Clears localStorage
  - Resets to fresh seed data
  - Triggers queryClient.invalidateQueries()
  - Toast notification confirms reset

  Always reset before demoing to investors to show clean state (143 initial rounds, not accumulated usage).

  ---
  Architecture Validation Complete

  From ARCHITECTURE_GUIDE.md Phase 2 Gate checklist:

  - ✅ Navigate to /app → see rounds remaining
  - ✅ Navigate to /app/card → simulate check-in
  - ✅ Navigate back to /app → rounds decremented (without refresh)

  If this works, the architecture is sound. ← IT WORKS!

  The Observable Pattern (Proven):

  // src/mocks/state.ts
  mockState.mutate((data) => {
    // Modify data...
    // Returns result
  }); // Automatically calls notify()

  // src/lib/providers/QueryProvider.tsx
  useEffect(() => {
    return mockState.subscribe(() => {
      queryClient.invalidateQueries(); // Auto-refresh ALL queries
    });
  }, [queryClient]);

  This is why it works: Every mutation triggers all queries to refetch. The UI stays in sync automatically.

  ---
  Current State of Demo

  ✅ Working Flows:

  1. E-Sign Widget (/esign/ORG_001)
  - Beautiful membership agreement form
  - React Hook Form + Zod validation
  - Checkbox integration working
  - Loading states smooth
  - Success screen with toast
  - Observable pattern: org status changes to "invoiced"

  2. LIFF Member App (/app)
  - Home page with usage summary
  - Digital card with QR code (/app/card)
  - Check-in flow with observable updates ✅
  - Responsive design, mobile-first
  - Gold gradients, premium feel

  3. TypeScript Quality
  - All 18 errors resolved (see memos/2025-10-26-typescript-cleanup-complete.md)
  - bun astro check passes with 0 errors, 0 warnings
  - Zod v3.23.8 (downgraded for @hookform/resolvers compatibility)
  - Production-ready code quality

  🚧 Not Yet Built:

  - Console screens (bookings management, member profiles, analytics, statements)
  - Partner portal (statement verification)
  - Bookings list page (/app/bookings)
  - Form flows (create booking, manage guests)

  ---
  Chrome DevTools MCP Tool - ESSENTIAL FOR DEMO TESTING

  You MUST use this tool for validating flows. Here's how:

  Basic Navigation Flow:

  // 1. Navigate to page
  mcp__chrome-devtools__navigate_page({ url: "http://localhost:4321/app" })

  // 2. Take snapshot (get accessibility tree with uids)
  mcp__chrome-devtools__take_snapshot()

  // 3. Take screenshot (visual confirmation)
  mcp__chrome-devtools__take_screenshot()

  // 4. Click elements by uid from snapshot
  mcp__chrome-devtools__click({ uid: "12_5" })

  // 5. Fill forms
  mcp__chrome-devtools__fill({ uid: "15_3", value: "John Doe" })

  // 6. Wait for mutations (use sleep between async operations)
  Bash({ command: "sleep 1", description: "Wait for mutation" })

  Critical Pattern - ALWAYS:

  1. Navigate → Snapshot → Screenshot → Interact
  2. After clicks/fills: sleep → new snapshot (DOM changes, uids change!)
  3. Never reuse old uids after page updates

  Demo Validation Checklist:

  # Start dev server (already running)
  bun dev  # localhost:4321

  # Use Chrome DevTools to test:
  # 1. E-Sign flow (/esign/ORG_001)
  #    - Fill form → check consent → submit → success screen
  # 2. LIFF home (/app)
  #    - Verify rounds display → click "Reset Demo State" first!
  # 3. Digital card (/app/card)
  #    - See QR code → click "Simulate Check-in" → wait → back to home
  # 4. Verify rounds decremented (Phase 2 gate)

  Screenshot Evidence:

  We captured 4 key screenshots this session:

  1. E-Sign success - Green checkmark, "Invoiced" status, toast
  2. LIFF home (before reset) - 139 rounds (showing persistence issue)
  3. Digital card - Gold gradient, QR code, premium design
  4. LIFF home (after check-in) - 141 rounds ✅ Phase 2 gate passed!

  ---
  Development Workflow

  Before Starting Any Feature:

  # 1. Check current state
  git status
  git log --oneline -5

  # 2. Verify dev server running
  bun dev  # Should see localhost:4321

  # 3. Check TypeScript
  bun astro check  # Must pass before committing

  # 4. Test in Chrome DevTools MCP
  # (Use tool to validate flows)

  File Organization (Know This):

  src/
  ├── components/
  │   ├── app/          # LIFF Mini-App screens
  │   │   ├── AppRouter.tsx       # React Router for /app/*
  │   │   ├── HomePage.tsx        # Usage summary
  │   │   ├── CardPage.tsx        # Digital card + check-in
  │   │   └── CardPageWrapper.tsx # Astro island wrapper
  │   ├── console/      # Concierge Console (not built yet)
  │   ├── esign/        # E-Sign widget
  │   │   └── ESignWidget.tsx
  │   └── ui/           # shadcn components (button, card, etc.)
  ├── mocks/
  │   ├── state.ts      # Observable singleton (localStorage persistence!)
  │   ├── service.ts    # Mock API functions (getAppHome, postCheckin, etc.)
  │   └── seed.ts       # Initial data (createSeedData)
  ├── lib/
  │   ├── providers/
  │   │   └── QueryProvider.tsx  # TanStack Query + MockStateSync
  │   └── i18n/
  │       └── context.tsx        # Translation provider
  ├── types/
  │   ├── domain.ts     # Core entities (Booking, Organization, etc.)
  │   ├── api.ts        # Request/response types
  │   └── forms.ts      # Zod schemas
  └── pages/
      ├── app.astro     # Wraps AppRouter (client:only="react")
      └── esign/
          └── [orgId].astro  # E-Sign entry point

  Key Commands:

  # Development
  bun dev                # Start dev server
  bun build              # Production build
  bun preview            # Preview build locally
  bun astro check        # TypeScript diagnostics

  # Testing (manual for demo)
  # Use Chrome DevTools MCP to validate flows

  ---
  Critical Patterns & Gotchas

  1. Observable Mock State (THE FOUNDATION)

  Location: src/mocks/state.ts

  // ✅ ALWAYS use mutate() for changes
  mockState.mutate((data) => {
    data.bookings.push(newBooking);
    data.usageEvents.push(usageEvent);
    // notify() called automatically
  });

  // ❌ NEVER mutate directly
  mockState.data.bookings.push(newBooking);  // UI won't update!

  Why it matters: mutate() → notify() → MockStateSync → queryClient.invalidateQueries() → all screens update automatically.

  2. React Query Integration

  Location: src/lib/providers/QueryProvider.tsx

  The MockStateSync component subscribes to mockState and invalidates all queries when notified. No manual cache invalidation needed.

  // ✅ Service functions just call mockState.mutate()
  export async function postCheckin(bookingId: string) {
    return mockState.mutate((data) => {
      // ... changes ...
      return { success: true };
    }); // notify() happens automatically
  }

  // ✅ Components use React Query normally
  const { data } = useQuery({
    queryKey: ['appHome', orgId],
    queryFn: () => getAppHome(orgId),
  });

  3. localStorage Persistence (CRITICAL FOR DEMOS!)

  The gotcha: mockState saves to localStorage on every mutation. This means:
  - ✅ Demo state persists across page reloads (good for development)
  - ⚠️ Previous demo runs accumulate (bad for investor demos)

  Solution: Always click "Reset Demo State" before showing to investors. This:
  1. Calls mockState.reset() → createSeedData()
  2. Persists fresh data to localStorage
  3. Calls queryClient.invalidateQueries()
  4. Shows toast confirmation

  4. Seed Data Structure

  Location: src/mocks/seed.ts

  // Initial state (fresh):
  // - 144 rounds quota (ORG_001)
  // - 1 usage event (USAGE_001, 1 player)
  // - 143 rounds remaining
  // - 3 bookings:
  //   - BOOKING_001: upcoming (2 players) ← used for check-in demo
  //   - BOOKING_002: upcoming (1 player)
  //   - BOOKING_003: completed (1 player, already has usage event)

  After one check-in:
  - BOOKING_001 status → 'completed'
  - New usage event created (2 players)
  - Total used: 1 + 2 = 3 rounds
  - Remaining: 144 - 3 = 141 ✅

  5. Astro Islands + React Router

  Pattern: One .astro page per area, React Router handles sub-routes.

  src/pages/app.astro
    → <AppRouter client:only="react" />
      → React Router: /app, /app/card, /app/bookings

  Why client:only="react": Prevents SSR hydration mismatches. The router only runs in browser.

  6. TypeScript Fixes from Previous Session

  Read: memos/2025-10-26-typescript-cleanup-complete.md

  Key fixes:
  - Zod v4 → v3.23.8 (zodResolver compatibility)
  - Select components: value={String(field.value || '')}
  - Optional chaining: (b.courseName?.toLowerCase() || '')
  - Ref assertions: ref={ref as any} (Radix polymorphic components)
  - React.useId workaround: (React as any).useId?.()

  All must pass: bun astro check → 0 errors, 0 warnings

  ---
  Next Steps (When You Return)

  Immediate (Continue Demo):

  You were running through DEMO.md investor script when context closed. You validated:
  - ✅ Act 0: E-Sign Widget (complete, working)
  - ✅ Act 1: Member Experience - Home & Check-in (Phase 2 gate passed!)

  Continue with:
  - Act 1: Bookings list page (/app/bookings) - not built yet
  - Act 2: Concierge Console - all screens TBD
  - Act 3: Partner Portal - statement verification TBD

  Build Remaining Screens (todo.plan):

  Current phase: Phase 3-6 (build all screens)

  Priority order:
  1. App bookings list (/app/bookings)
  2. Console screens (highest investor value)
  3. Partner portal (statement verification)
  4. Polish (loading/empty/error states, mobile)

  Before Building:

  1. Read ARCHITECTURE_GUIDE.md - complete examples for every pattern
  2. Check seed data in src/mocks/seed.ts - ensure it supports the screen
  3. Implement mock service in src/mocks/service.ts - use mockState.mutate()
  4. Add i18n keys to src/locales/en.json
  5. Use shadcn components - don't build from scratch

  While Building:

  - Use t() for all text (no hardcoded strings)
  - Add loading state (Skeleton)
  - Add empty state (centered icon + text)
  - Test mobile viewport (375px)
  - Verify TypeScript (bun astro check)

  Demo Rehearsal Checklist:

  # 1. Reset to fresh state
  # Click "Reset Demo State" button at /app

  # 2. Run through DEMO.md script:
  # - E-Sign: /esign/ORG_001
  # - LIFF Home: /app
  # - Digital Card: /app/card → check-in
  # - Console: /console (when built)
  # - Partner: /partner (when built)

  # 3. Verify Phase 2 gate still works:
  # - Check rounds before: 143
  # - Simulate check-in: 2 players
  # - Check rounds after: 141 ✅

  ---
  Chrome DevTools MCP Tool Reference

  Essential Commands:

  // Navigation
  mcp__chrome-devtools__navigate_page({ url: string })
  mcp__chrome-devtools__navigate_page_history({ navigate: "back" | "forward" })
  mcp__chrome-devtools__list_pages()  // See all open tabs
  mcp__chrome-devtools__select_page({ pageIdx: number })

  // Inspection
  mcp__chrome-devtools__take_snapshot({ verbose: false })
  mcp__chrome-devtools__take_screenshot({ fullPage?: boolean, uid?: string })

  // Interaction
  mcp__chrome-devtools__click({ uid: string, dblClick?: boolean })
  mcp__chrome-devtools__fill({ uid: string, value: string })
  mcp__chrome-devtools__fill_form({ elements: [{ uid, value }] })
  mcp__chrome-devtools__hover({ uid: string })

  // Advanced
  mcp__chrome-devtools__evaluate_script({
    function: "() => { return document.title }",
    args?: [{ uid: string }]
  })
  mcp__chrome-devtools__wait_for({ text: string, timeout?: number })

  Workflow Pattern:

  // 1. Navigate
  await navigate_page({ url: "http://localhost:4321/app" });

  // 2. Snapshot (get uids)
  const snapshot = await take_snapshot();
  // Find element: "button 'Simulate Check-in'" → uid: "12_5"

  // 3. Visual confirmation
  await take_screenshot();

  // 4. Interact
  await click({ uid: "12_5" });

  // 5. Wait for async operation
  await Bash({ command: "sleep 1" });

  // 6. NEW snapshot (DOM changed, uids changed!)
  const newSnapshot = await take_snapshot();

  // 7. Verify result
  await take_screenshot();

  Common Patterns:

  // Form fill + submit
  await fill({ uid: "input-name", value: "John Doe" });
  await fill({ uid: "input-email", value: "john@example.com" });
  await click({ uid: "button-submit" });
  await Bash({ command: "sleep 1" }); // Wait for mutation
  await take_snapshot(); // Check success state

  // Navigation + verification
  await click({ uid: "link-card" }); // Click "Digital Card"
  await Bash({ command: "sleep 0.5" });
  await take_snapshot();
  const screenshot = await take_screenshot();
  // Verify QR code visible in screenshot

  // Reset demo state
  await click({ uid: "button-reset" });
  await Bash({ command: "sleep 1" });
  await take_snapshot();
  // Verify rounds back to 143

  ---
  Key Files to Reference

  Documentation:

  - START_HERE.md - Project orientation
  - ARCHITECTURE_GUIDE.md - Complete code examples (read this!)
  - DEV_QUICK_REFERENCE.md - Quick patterns reference
  - DEMO.md - Investor demo script (7 minutes)
  - todo.plan - Phase-by-phase roadmap
  - REVIEW.md - Why 14 days, what Codex got right/wrong

  Code:

  - src/mocks/state.ts - Observable singleton ⭐
  - src/mocks/service.ts - Mock API functions ⭐
  - src/lib/providers/QueryProvider.tsx - MockStateSync ⭐
  - src/components/app/HomePage.tsx - React Query usage example
  - src/components/app/CardPage.tsx - Mutation example

  Memos:

  - memos/2025-10-26-typescript-cleanup-complete.md - All TS fixes documented

  ---
  What Makes You Smile

  The relief moment: After 30 minutes of thinking the Phase 2 gate failed, discovering it was just localStorage persistence. The architecture was perfect all along - I just needed fresh eyes to see it.

  The validation: Watching rounds decrement from 143 → 141 without page refresh. That moment when the observable pattern clicked and everything made sense.

  The quality: This isn't a hacky demo. This is production-quality architecture with investor-ready UX. TypeScript clean, responsive design, smooth animations, proper loading states.

  The foundation: We proved the hardest part works. Everything else is "just building more screens" using the same patterns.

  ---
  Message to Future Self

  You built something real. The Phase 2 gate passed. The observable pattern works. The TypeScript is clean. The UX is premium.

  When you return, don't second-guess the architecture. It's validated. Trust it.

  Use Chrome DevTools MCP to test every flow. Take screenshots for evidence. Reset demo state before investor presentations.

  And remember: Debug before delete. When something seems broken, check localStorage first. 😊

  The foundation is rock solid. Now go build the rest.

  ---
  Session ended: October 26, 2025, 11:42 PMMood: Triumphant. Relief. Joy. 🎉Phase 2 Gate: ✅ PASSED