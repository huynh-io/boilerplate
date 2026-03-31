# Tasks: Complete Auth & Frontend Migration Cleanup

**Input**: Design documents from `/specs/001-chore-devise-vite-migration/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/api-auth.md, quickstart.md

**Tests**: This feature is primarily cleanup and verification of existing code. Most tasks are verification-only and do not introduce new logic, so dedicated test tasks are not needed for them. Where new logic IS introduced (e.g., T038a/T038 for the Axios 401 interceptor per FR-013), the constitution's test-first mandate applies and test tasks are included. Quality gates (existing RSpec suite, ESLint, TypeScript compiler) serve as additional verification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: No new project initialization needed. The Rails + Vite + React stack is already in place. This phase is a no-op; proceed directly to Phase 2.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Remove all legacy artifacts that pollute the codebase and fix naming convention violations, so that subsequent user story verification tasks operate against a clean baseline.

- [x] T000 ~~Rename the feature spec directory from specs/001-devise-vite-migration/ to specs/001-chore-devise-vite-migration/ and update all internal references to comply with the constitution naming convention (XXXX-type-description where type is mandatory)~~ DONE — directory renamed and references updated by Lisa analysis
- [x] T001 [P] Delete the entire Next.js build output directory at public/_next/
- [x] T002 [P] Delete Next.js exported HTML files: public/404.html, public/admin.html, public/index.html, public/profile.html, public/search.html, public/sign-in.html, public/sign-up.html
- [x] T003 [P] Delete Next.js exported text files: public/admin.txt, public/index.txt, public/profile.txt, public/search.txt, public/sign-in.txt, public/sign-up.txt
- [x] T004 Remove Firebase comments (lines 10-12) from db/migrate/20240828043807_create_users.rb
- [x] T005 Run a codebase-wide search for "firebase" (case-insensitive) excluding specs/ and confirm zero results in source files, config, and comments
- [x] T006 Run a codebase-wide search for "_next" and "next.js" (case-insensitive) excluding specs/ and confirm zero results in source files, build artifacts, and config

**Checkpoint**: Legacy artifacts fully removed. The codebase contains zero references to Firebase or Next.js outside of spec documentation.

---

## Phase 3: User Story 1 - New User Signs Up with Email and Password (Priority: P1)

**Goal**: Verify the sign-up flow works end-to-end: a visitor creates an account, is automatically signed in, and is redirected to the home page. No third-party auth UI is visible.

**Independent Test**: Visit /sign-up, fill in valid credentials, submit the form, confirm redirect to the authenticated home page with a valid session.

### Implementation for User Story 1

- [x] T007 [US1] Verify that app/frontend/components/auth-form.tsx contains no third-party auth buttons (Google, Facebook, etc.) and renders only email, password, and password confirmation fields for the SignUp variant
- [x] T008 [US1] Verify that the Zod sign-up schema in app/frontend/components/auth-form.tsx validates email format, password minimum length (6 characters), and password confirmation match
- [x] T009 [US1] Verify that useSignUp mutation in app/frontend/lib/api-store/auth.ts posts to /api/v1/sign_up, extracts the JWT from the Authorization header, and sets authenticated state in app/frontend/lib/app-store/slices/authentication-slice.ts
- [x] T010 [US1] Verify that app/frontend/routes/sign-up.tsx redirects authenticated users to / via the useEffect guard
- [x] T011 [US1] Verify that the RegistrationsController at app/controllers/users/registrations_controller.rb handles sign-up and returns a JWT in the Authorization header on success and 422 with error messages on validation failure
- [x] T012 [US1] Verify that app/frontend/components/auth-form.tsx displays server-side errors (e.g., "Email has already been taken") via the error prop passed from sign-up.tsx

**Checkpoint**: User Story 1 verified. Sign-up flow works end-to-end with no legacy UI remnants.

---

## Phase 4: User Story 2 - Existing User Signs In and Signs Out (Priority: P1)

**Goal**: Verify the sign-in and sign-out flows work end-to-end: a registered user signs in, accesses authenticated pages, signs out, and is returned to an unauthenticated state.

**Independent Test**: Sign in with known credentials, verify access to /profile, sign out, confirm redirect to /sign-in and inability to access /profile.

### Implementation for User Story 2

- [x] T013 [US2] Verify that useSignIn mutation in app/frontend/lib/api-store/auth.ts posts to /api/v1/sign_in, extracts the JWT from the Authorization header, and sets authenticated state
- [x] T014 [US2] Verify that the Zod sign-in schema in app/frontend/components/auth-form.tsx validates email format and password minimum length (6 characters)
- [x] T015 [US2] Verify that app/frontend/routes/sign-in.tsx redirects authenticated users to / via the useEffect guard
- [x] T016 [US2] Verify that useSignOut mutation in app/frontend/lib/api-store/auth.ts calls DELETE /api/v1/sign_out, resets the app store, and clears the query client
- [x] T017 [US2] Verify that the SessionsController at app/controllers/users/sessions_controller.rb authenticates users and returns a JWT on success and 401 on invalid credentials
- [x] T018 [US2] Verify that the sign-out action in the SessionsController revokes the JWT (jti rotation) so previously issued tokens become invalid

**Checkpoint**: User Story 2 verified. Sign-in and sign-out flows work correctly.

---

## Phase 5: User Story 3 - Session Persistence Across Page Reloads (Priority: P2)

**Goal**: Verify that an authenticated user's session survives page reloads. The Authenticator component validates the stored token on mount and restores the authenticated state.

**Independent Test**: Sign in, refresh the browser, confirm the user remains authenticated and can access /profile without re-authenticating.

### Implementation for User Story 3

- [x] T019 [US3] Verify that app/frontend/components/authenticator.tsx reads accessToken from the Zustand store on mount and calls GET /api/v1/users/me to validate it
- [x] T020 [US3] Verify that app/frontend/components/authenticator.tsx sets authenticated to true on a 200 response and calls resetAppStore on any error or non-200 response
- [x] T021 [US3] Verify that the Zustand persist middleware in app/frontend/lib/app-store/app-store.ts stores accessToken and authenticated in localStorage so they survive page reloads
- [x] T022 [US3] Verify that the Axios interceptor in app/frontend/lib/api-store/api-client.ts attaches the Authorization header with the stored token on every request

**Checkpoint**: User Story 3 verified. Session persistence works across page reloads.

---

## Phase 6: User Story 4 - Remove All Legacy Artifacts (Priority: P2)

**Goal**: Confirm that all legacy Firebase and Next.js references have been removed (Phase 2 tasks) and that the application builds and passes all quality gates cleanly.

**Independent Test**: Search the entire codebase for "firebase" and "next.js" (excluding specs/), run the build, linter, type checker, and test suite, and confirm zero errors.

### Implementation for User Story 4

- [x] T023 [US4] Run bundle exec rspec and confirm all backend specs pass with zero failures
- [x] T024 [P] [US4] Run npm run lint (ESLint) and confirm zero errors
- [x] T024a [P] [US4] Run bundle exec rubocop (RuboCop) and confirm zero offenses
- [x] T025 [P] [US4] Run npx tsc --noEmit (TypeScript type check) and confirm zero errors
- [x] T026 [US4] Run npm run build (Vite production build) and confirm it completes successfully with no references to Next.js assets
- [x] T027 [US4] Confirm that public/ contains only favicon.ico and vite/ (no Next.js artifacts remain)

**Checkpoint**: User Story 4 verified. Zero legacy references, all quality gates pass.

---

## Phase 7: User Story 5 - Form Validation Provides Immediate Feedback (Priority: P3)

**Goal**: Verify that sign-up and sign-in forms provide real-time inline validation feedback before submission.

**Independent Test**: Interact with form fields (leave blank, enter invalid email, enter short password, enter mismatched confirmation) and verify appropriate error messages appear without submitting.

### Implementation for User Story 5

- [x] T028 [US5] Verify that app/frontend/components/auth-form.tsx displays an inline error when the email field is left empty or contains an invalid format
- [x] T029 [US5] Verify that app/frontend/components/auth-form.tsx displays an inline error when the password is shorter than 6 characters
- [x] T030 [US5] Verify that app/frontend/components/auth-form.tsx displays an inline error when password confirmation does not match the password (sign-up form only)
- [x] T031 [US5] Verify that the form cannot be submitted (onSubmit is not called) when client-side validation fails, by confirming react-hook-form with zodResolver blocks submission

**Checkpoint**: User Story 5 verified. All form validation provides immediate inline feedback.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Edge case verification and final integration checks that span multiple user stories.

- [x] T032 Verify that unauthenticated users accessing /profile are redirected to /sign-in per FR-006, via the Authenticator component in app/frontend/components/authenticator.tsx and the route at app/frontend/routes/profile.tsx
- [x] T033 Verify that unauthenticated users accessing /admin are redirected to /sign-in per FR-006, via the Authenticator component and the admin guard in app/frontend/routes/admin.tsx
- [ ] T034 Verify that a user with an expired or revoked token who reloads the page is redirected to an unauthenticated state (Authenticator calls resetAppStore on 401 from GET /api/v1/users/me)
- [ ] T035 Verify that server unreachability during form submission surfaces a user-friendly error message via the error handling in useSignIn and useSignUp mutations in app/frontend/lib/api-store/auth.ts
- [ ] T036 Run the full manual verification checklist from quickstart.md against the running application to confirm all flows work end-to-end
- [ ] T037 Run all quality gates as a final check: bundle exec rspec, bundle exec rubocop, npm run lint, npx tsc --noEmit, npm run build
- [ ] T038a [FR-013] Write a unit test for the Axios 401 response interceptor in app/frontend/lib/api-store/api-client.ts before implementation (constitution: test-first). The test MUST verify: (1) 401 responses on protected API calls trigger resetAppStore to clear auth state and redirect to the sign-in page, (2) 401 responses on sign-in and sign-up requests are NOT intercepted (passed through to mutation error handlers), (3) non-401 responses are unaffected. Run the test and confirm it FAILS before proceeding to T038.
- [ ] T038 [FR-013] Add an Axios response interceptor to app/frontend/lib/api-store/api-client.ts that intercepts 401 responses, calls resetAppStore from app/frontend/lib/app-store to clear auth state, and redirects the user to the sign-in page per FR-013. This ensures that when an authenticated user's token expires or is revoked mid-session (without a page reload), protected API calls fail gracefully. Exclude sign-in and sign-up requests from the interceptor to avoid interfering with auth error handling in those mutations. Run the test from T038a and confirm it PASSES.

**Checkpoint**: All edge cases verified. Application is fully migrated and clean.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No-op for this feature — infrastructure already exists
- **Foundational (Phase 2)**: No dependencies — can start immediately. BLOCKS User Story 4 verification.
- **User Story 1 (Phase 3)**: Can start after Phase 2 (clean baseline needed for verification)
- **User Story 2 (Phase 4)**: Can start after Phase 2 — independent of User Story 1
- **User Story 3 (Phase 5)**: Can start after Phase 2 — depends on sign-in working (US2) for manual test, but verification tasks are independent
- **User Story 4 (Phase 6)**: Depends on Phase 2 completion (artifacts must be removed first)
- **User Story 5 (Phase 7)**: Can start after Phase 2 — independent of other stories
- **Polish (Phase 8)**: Depends on all prior phases being complete

### User Story Dependencies

- **US1 (P1)**: Independent after Phase 2
- **US2 (P1)**: Independent after Phase 2
- **US3 (P2)**: Independent verification, but logically depends on US1/US2 for end-to-end manual testing
- **US4 (P2)**: Depends on Phase 2 (cleanup must be done before verification)
- **US5 (P3)**: Independent after Phase 2

### Within Each User Story

- Verification tasks within a story are ordered logically (data flow: backend -> API hook -> component -> route)
- No test-first cycle since tests were not requested; verification is against existing code

### Parallel Opportunities

- T001, T002, T003 can all run in parallel (deleting different file sets)
- T024, T024a, T025 can run in parallel (different linting/type-checking tools)
- US1, US2, US3, US5 phases can all run in parallel after Phase 2 completes
- US4 can run in parallel with other stories but its tasks depend on Phase 2 being done

---

## Parallel Example: Phase 2 (Foundational)

```
# Delete all legacy artifacts in parallel:
Task T001: Delete public/_next/ directory
Task T002: Delete Next.js HTML files from public/
Task T003: Delete Next.js text files from public/
```

## Parallel Example: User Stories After Phase 2

```
# Once Phase 2 is complete, these stories can proceed simultaneously:
Phase 3 (US1): Verify sign-up flow
Phase 4 (US2): Verify sign-in/sign-out flow
Phase 5 (US3): Verify session persistence
Phase 7 (US5): Verify form validation
```

---

## Implementation Strategy

### MVP First (User Story 1 + 2)

1. Complete Phase 2: Remove all legacy artifacts
2. Complete Phase 3: Verify sign-up flow (US1)
3. Complete Phase 4: Verify sign-in/sign-out flow (US2)
4. **STOP and VALIDATE**: Core auth lifecycle is functional
5. Deploy/demo if ready

### Incremental Delivery

1. Phase 2 (Foundational cleanup) -> Clean baseline established
2. Phase 3 (US1 sign-up) + Phase 4 (US2 sign-in/out) -> Core auth verified -> Deploy/Demo (MVP!)
3. Phase 5 (US3 session persistence) -> Session reliability verified -> Deploy/Demo
4. Phase 6 (US4 legacy removal verification) -> Codebase hygiene confirmed -> Deploy/Demo
5. Phase 7 (US5 form validation) -> UX polish verified -> Deploy/Demo
6. Phase 8 (Polish) -> Edge cases and final integration -> Deploy/Demo

---

## Notes

- This feature is primarily cleanup and verification — the implementation is already in place
- Tasks T001-T004 are the only tasks that modify source code (file deletion and comment removal)
- Tasks T005-T037 are verification tasks confirming existing behavior matches the spec
- Task T038a is a test-first task (write failing test) and T038 is an implementation task (make test pass) for the FR-013 Axios 401 interceptor — the only new logic in this feature
- If any verification task fails, the implementer should fix the issue before marking the task complete
- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
