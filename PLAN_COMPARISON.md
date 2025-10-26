# Codex vs Improved Plan — Side by Side

## Quick Comparison Table

| Aspect | Codex's Plan | Improved Plan | Why It Matters |
|--------|--------------|---------------|----------------|
| **Dependencies** | Implied, not explicit | Explicit install commands with versions | Blocks development immediately if missing |
| **Routing** | "Thin Astro pages" | React Router in Astro islands | Clear implementation path, no confusion |
| **Mock State** | "In-memory services" | Observable singleton + notify pattern | UI updates automatically on mutations |
| **Vertical Slice** | Build all, test later | Phase 2 gate validates architecture | Catch integration issues early |
| **i18n Details** | "Implement t() helper" | Context provider with code example | No guesswork, copy-paste ready |
| **Error Strategy** | "Error states" mentioned | Boundaries per area + query error handling | Graceful degradation |
| **Timeline** | ~10 days (implied) | 14 days (explicit) | Realistic with polish + demo prep |
| **Demo Script** | "Step-by-step clicks" | Complete rehearsal + state reset utility | Confidence during presentation |

---

## Implementation Order Comparison

### Codex's Order

```
0. Setup
1. Types & i18n
2. Mock services
3. App shells
4. LIFF screens
5. Console screens
6. Partner screens
7. Public
8. E-Sign
9. Polish
10. Demo script
```

**Problem:** Steps 1-2 happen before any UI exists. Can't test mocks without screens. Will discover integration issues late (step 4+).

### Improved Order

```
0. Prerequisites (install all deps)
1. Foundation (types, mock state, i18n, providers)
2. Vertical Slice (one screen end-to-end) ← GATE
3. LIFF screens
4. Console screens
5. Partner screens
6. Public + E-Sign
7. Polish
8. Demo prep
```

**Benefit:** Step 2 creates complete vertical slice (Astro → React → Query → Mock → State). Validates architecture before going wide.

---

## Key Architectural Differences

### 1. Mock State Management

**Codex:**
```typescript
// Implied: functions returning data
export function getAppHome() {
  return { usageSummary: {...}, nextBooking: {...} };
}
```

**Problem:** No state persistence. Check-in can't update rounds because state is recreated each call.

**Improved:**
```typescript
// Observable singleton
export const mockState = {
  data: seedData,
  mutate(fn) {
    fn(this.data);
    this.notify(); // Triggers UI update
  },
  subscribe(listener) { ... },
};

export function postCheckin(bookingId) {
  return mockState.mutate(data => {
    // Mutation updates state
    data.usageEvents.push(newEvent);
    data.bookings.find(b => b.id === bookingId).status = 'completed';
  });
}
```

**Benefit:** State persists across calls. Mutations trigger automatic UI updates via TanStack Query invalidation.

---

### 2. Routing Implementation

**Codex:**
> "Astro pages thin; React components own logic"

**Unclear:** How to handle `/app/bookings/:id`? Astro `[id].astro`? React Router? Something else?

**Improved:**

```
src/pages/app.astro
  → <AppRouter client:only="react" />
    → React Router handles all /app/* sub-routes
```

**Benefit:** One Astro page per area. React Router for all sub-routing. No Astro dynamic route complexity.

---

### 3. TanStack Query Integration

**Codex:**
> "Add TanStack Query provider at app root"

**Missing:** How does Query sync with mock state changes?

**Improved:**

```typescript
// Auto-sync on mock state changes
function useMockStateSync() {
  const queryClient = useQueryClient();
  useEffect(() => {
    return mockState.subscribe(() => {
      queryClient.invalidateQueries();
    });
  }, [queryClient]);
}
```

**Benefit:** Check-in mutation → state update → notify → invalidate → refetch → UI updates. No manual cache management.

---

### 4. i18n Implementation

**Codex:**
> "Add src/lib/i18n/ with t() helper"

**Missing:** Which library? react-i18next? next-intl? Custom?

**Improved:**

```typescript
// Simple custom Context provider
export function LocaleProvider({ children }) {
  const t = (key, params) => {
    const value = translations[key];
    if (!value && import.meta.env.DEV) {
      console.warn(`Missing: ${key}`);
    }
    return value ?? key;
  };
  return <LocaleContext.Provider value={{ t }}>{children}</LocaleContext.Provider>;
}
```

**Benefit:** No library dependency. EN-only for demo. Missing key logging in dev.

---

## Dependency Comparison

### Codex Listed (Vague)

- "shadcn configured (3.5.0). If missing components, add with bunx shadcn..."
- "TanStack Query"
- "RHF + Zod"
- "minimal Zustand"

**Problem:** Which shadcn components? What versions? When to install?

### Improved Plan (Explicit)

```bash
# Exact command, run once
bun add @tanstack/react-query react-hook-form zod zustand react-router-dom
bun add -d @types/react-router-dom

# All 20+ shadcn components at once
bunx shadcn@latest add button card badge input label textarea select checkbox \
  dialog drawer dropdown-menu popover tooltip tabs separator skeleton toast \
  table accordion avatar progress calendar form command sonner
```

**Benefit:** Copy-paste, no guesswork. Blocks removed before Day 1.

---

## Timeline Reality Check

### Codex Implied Timeline

- Step 0: 0.5 day
- Steps 1-2: 1 day
- Steps 3-8: 7 days (1 day per area)
- Step 9: 0.5 day
- Step 10: 0.5 day

**Total: ~10 days**

**Optimistic assumptions:**
- No integration issues (unlikely without vertical slice)
- Polish is quick (usually underestimated)
- Demo script writes itself (nope)

### Improved Timeline

- Phase 0 (Prerequisites): 1 day
- Phase 1 (Foundation): 2 days
- Phase 2 (Vertical Slice): 1 day ← **catches issues early**
- Phases 3-6 (Screens): 6 days
- Phase 7 (Polish): 1 day ← **dedicated, not afterthought**
- Phase 8 (Demo Prep): 1 day ← **rehearsal matters**

**Total: 14 days**

**Realistic assumptions:**
- Integration issues found at Phase 2 gate (fixable before going wide)
- Polish takes time (loading/empty/error states across 15+ screens)
- Demo script needs rehearsal (prevents surprises)

**Trade-off:** 4 extra days for quality. Worth it for investor demo.

---

## What Codex Got Right

**Don't discount these:**

1. **Correct tech stack** (Astro + React + Tailwind + shadcn 3.5.0)
2. **Mock-first development** (no real backends for demo)
3. **Adherence to spec** (DTOs, APIs, acceptance criteria)
4. **Right libraries** (TanStack Query, RHF, Zod)
5. **Appropriate scope** (no LINE auth, no payments, no partner APIs)
6. **i18n as first-class** (not bolted on later)

**The foundation is solid.** The improved plan addresses execution gaps, not fundamental strategy.

---

## Critical Additions in Improved Plan

### 1. **Vertical Slice Gate (Phase 2)**

**What:** Build one complete screen end-to-end before building everything.

**Why:** Proves architecture works. Catches issues like:
- TanStack Query not syncing with mock state
- Astro/React integration problems
- Type mismatches between DTOs and UI
- i18n helper issues

**When to skip:** Never. This saves time, not wastes it.

---

### 2. **Observable Mock State**

**What:** Singleton with subscribe/notify pattern.

**Why:** Without this, mutations won't trigger UI updates. You'd manually invalidate queries everywhere (error-prone).

**When to skip:** If you want to manually manage cache (you don't).

---

### 3. **Explicit Error Strategy**

**What:** Error boundaries per area + TanStack Query onError handlers.

**Why:** Demo will crash on first error without boundaries. Looks unprofessional.

**When to skip:** If demo environment is 100% controlled (it's not).

---

### 4. **Demo Rehearsal (Phase 8)**

**What:** Full day dedicated to script writing, state reset, practice.

**Why:** First impressions matter. Fumbling during demo wastes investor time.

**When to skip:** If demo doesn't matter (it does).

---

## Decision Matrix: When to Use Which Plan

| Use Codex's Plan If... | Use Improved Plan If... |
|-------------------------|-------------------------|
| You're prototyping alone | You're building for investors |
| Time is more constrained than quality | Quality matters for funding |
| You're experienced with this stack | You're learning or want guidance |
| Integration is proven elsewhere | This is new architecture |
| Demo script doesn't matter | Presentation quality matters |

**For this project:** Improved plan recommended. Investor demo needs quality.

---

## Bottom Line

**Codex's plan:** 70% complete. Gets you started but leaves execution gaps.

**Improved plan:** 95% complete. Fills gaps with concrete patterns and realistic timeline.

**Effort difference:** 4 extra days. Quality improvement: significant.

**Recommendation:** Start with improved plan. Adjust if constraints change.
