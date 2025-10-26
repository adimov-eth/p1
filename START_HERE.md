# Start Here — Prime MVP Implementation

## Quick Navigation

You're about to implement an investor-ready demo for Prime Corporate Golf Club. **Read these documents in order:**

### 1. **REVIEW.md** — Critical Analysis *(15 min)*
- What Codex got right vs what's missing
- Architectural decisions with rationale
- Gaps that would block development
- Quality risks and how to mitigate

**Key takeaway:** Codex's plan is 70% there. Solid foundation but underspecified execution details.

### 2. **plan-improved.todo** — Implementation Roadmap *(10 min)*
- Phase-by-phase checklist (14 days total)
- Each task with clear deliverable
- Gate at Phase 2 (vertical slice validates architecture)
- Polish and demo prep built in (not afterthoughts)

**Key takeaway:** Don't skip the vertical slice. It catches integration issues early.

### 3. **ARCHITECTURE_GUIDE.md** — Code Examples *(30 min)*
- Observable mock state singleton (with code)
- Mock service layer with mutations
- React Router in Astro islands pattern
- Type organization strategy
- i18n implementation
- Complete check-in flow example

**Key takeaway:** Copy-paste ready patterns. No guesswork.

---

## If You Only Read One Thing

**The critical architectural insight:**

```
Mock State Singleton (observable)
    ↓
Mock Service Layer (mutations notify)
    ↓
TanStack Query (cache invalidates automatically)
    ↓
UI Updates (no manual cache management)
```

This pattern solves the hardest problem in the demo: keeping state consistent across screens when mutations happen.

**Example:** User simulates check-in → rounds decrement immediately on home page. No manual invalidation needed.

---

## Before You Start Coding

### Install Dependencies (30 min)

```bash
# Data/form libraries
bun add @tanstack/react-query react-hook-form zod zustand react-router-dom
bun add -d @types/react-router-dom

# All shadcn components (20+ at once)
bunx shadcn@latest add button card badge input label textarea select checkbox \
  dialog drawer dropdown-menu popover tooltip tabs separator skeleton toast \
  table accordion avatar progress calendar form command sonner

# Create .env
echo "VITE_USE_MOCKS=true" > .env

# Verify dev works
bun dev
```

### Key Decisions to Confirm

1. **Routing:** React Router within Astro islands (not Astro `[id].astro` pattern)
   - Why: Simpler mental model, easy SPA extraction later
   - Trade-off: No SSG for sub-routes (fine for demo)

2. **Mock State:** Observable singleton with notify pattern
   - Why: Auto-invalidates TanStack Query on mutations
   - Trade-off: More complex than simple objects (worth it)

3. **i18n:** Custom Context provider (not react-i18next library)
   - Why: Demo needs EN only, avoid dependency bloat
   - Trade-off: Less feature-rich (fine for demo scope)

4. **Error Handling:** One boundary per area + TanStack Query errors
   - Why: Graceful degradation without complexity
   - Trade-off: Not as granular as per-component (sufficient)

---

## The 14-Day Plan (High Level)

- **Days 1-3:** Foundation (types, mock state, i18n, providers)
- **Day 4:** Vertical slice (one screen end-to-end) ← **GATE**
- **Days 5-7:** LIFF screens (home, card, bookings)
- **Days 8-10:** Console (dashboard, bookings, members, courses)
- **Day 11:** Partner portal (statements)
- **Day 12:** Public (RSVP) + E-sign widget
- **Day 13:** Polish (loading/empty/error states, mobile, keyboard)
- **Day 14:** Demo prep (script, state reset, rehearsal)

**Critical:** Phase 2 (Day 4) validates architecture before going wide. If vertical slice works, everything else is just "more of the same."

---

## Success Criteria

**From PRD Acceptance Criteria:**

- ✅ A0: E-sign widget completes → org status moves to `invoiced_ready`
- ✅ A1: Admin can assign designated users (logic visible in UI)
- ✅ A2: Concierge creates booking → member sees it in LIFF
- ✅ A3: Simulated check-in → rounds decrement immediately
- ✅ A4: Cancellation within 48h = forfeited; outside = restored
- ✅ A5: Partner statement verify/flag updates state
- ✅ A6: Console dashboard shows mocked SLA metrics
- ✅ A7: All strings use i18n keys (no hardcoded text)

**Plus quality indicators:**

- No TypeScript errors (`bun astro check`)
- Loads in < 2.5s on throttled 4G
- Mobile responsive (test at 375px)
- Keyboard accessible (tab order makes sense)
- Professional polish (shadcn consistency)

---

## What Changed from Codex's Plan

### Major Additions

1. **Observable mock state pattern** (Codex had "in-memory" but no reactivity)
2. **React Router in islands** (Codex said "thin Astro pages" but didn't specify how)
3. **Vertical slice gate** (Codex would build everything before testing integration)
4. **Explicit i18n implementation** (Codex said "implement t()" with no details)
5. **Error boundaries per area** (Codex mentioned "error states" but no strategy)

### Timeline Adjustment

- Codex implied ~10 days
- Improved plan: **14 days** (adds 4 days for polish + demo prep)
- Why: Quality matters for investor demo. Rushing polish shows.

### Risk Mitigation

- **Phase 2 gate:** Catch integration issues early (saves time debugging later)
- **Explicit dependencies:** No surprises on Day 3 when libs missing
- **Demo script:** Rehearsal prevents "uh, let me find..." during demo
- **State reset utility:** Clean slate between demo runs

---

## Common Pitfalls to Avoid

### 1. Skipping the Vertical Slice

**Symptom:** Build all screens, then discover TanStack Query doesn't sync with mock state.

**Solution:** Phase 2 forces you to prove the architecture with one complete flow before committing to full build.

### 2. Hardcoding Strings

**Symptom:** Acceptance criteria A7 fails because you forgot i18n halfway through.

**Solution:** Set up `t()` helper in Phase 1. Use it from Day 1. No going back to fix later.

### 3. Manual Cache Invalidation

**Symptom:** Check-in succeeds but rounds don't update until page refresh.

**Solution:** Observable mock state + `useMockStateSync()` hook handles this automatically.

### 4. Ignoring Mobile

**Symptom:** Demo day: investor uses phone, UI breaks.

**Solution:** Phase 7 (Day 13) dedicated to mobile responsive. Test at 375px.

### 5. No Demo Rehearsal

**Symptom:** During demo, click wrong button, get 404, waste time explaining "this isn't implemented yet."

**Solution:** Phase 8 (Day 14) writes script, practices flow, catches issues before stakes are high.

---

## When You Get Stuck

### Architecture Questions

→ Read `ARCHITECTURE_GUIDE.md` — has code examples for all major patterns.

### Spec Clarifications

→ Read spec files in `spec/` directory — they're comprehensive.

### Routing Confusion

→ See Section 3 in `ARCHITECTURE_GUIDE.md` — shows exact file structure.

### State Not Updating

→ Check `mockState.notify()` is called after mutations.
→ Verify `useMockStateSync()` is in RootProvider.

### TypeScript Errors

→ Run `bun astro check` — shows exact locations.
→ Ensure types in `src/types/*` match spec/Types.md.

---

## Development Flow

### Typical Screen Implementation (30-90 min)

1. Create component file (`src/components/app/HomePage.tsx`)
2. Add route to router (`AppRouter.tsx`)
3. Implement UI using shadcn components
4. Add `useQuery` or `useMutation` hooks
5. Wire to mock service (`api.getAppHome()`)
6. Add loading/empty/error states
7. Test in browser (`bun dev`)
8. Fix TypeScript errors (`bun astro check`)
9. Test mobile viewport (DevTools responsive mode)
10. Check i18n coverage (all strings use `t()`?)

### Typical Mutation Flow (15-30 min)

1. Add mock service function (`src/mocks/service.ts`)
2. Use `mockState.mutate()` to update state
3. Return updated data
4. Create `useMutation` hook in component
5. Add `onSuccess` handler (toast + invalidate queries)
6. Add `onError` handler (toast error message)
7. Disable button during `isPending`
8. Test: mutation updates UI automatically

---

## Next Steps

1. **Read REVIEW.md** (understand the "why" behind decisions)
2. **Skim plan-improved.todo** (get mental map of phases)
3. **Bookmark ARCHITECTURE_GUIDE.md** (reference during implementation)
4. **Install dependencies** (Prerequisites section above)
5. **Start Phase 1** (create `src/types/domain.ts` from spec/Types.md)

---

## Questions to Ask Before Starting

- [ ] Do I understand the observable mock state pattern?
- [ ] Am I clear on React Router in Astro islands approach?
- [ ] Have I installed all dependencies?
- [ ] Do I know where to look when stuck? (this doc + guides)
- [ ] Am I prepared to invest 14 days for quality? (not rush in 10)

If yes to all → **you're ready to build.**

If no to any → **re-read the relevant section above** before starting.

---

## Final Note

This is an investor demo, not production code. But that doesn't mean sloppy.

**Good demo qualities:**
- Visually polished (shadcn consistency)
- Functionally complete (all acceptance criteria)
- Performant enough (< 2.5s load)
- Mobile friendly (they'll use phones)
- Rehearsed (no surprises during presentation)

**Don't over-engineer:**
- No unit tests (demo code, will rewrite for prod)
- No E2E tests (manual testing sufficient)
- No complex state machines (simple mutations fine)
- No backend (mocks with delays are realistic enough)

**The balance:** Professional quality without production complexity.

You have the spec. You have the plan. You have the patterns.

**Go build.**
