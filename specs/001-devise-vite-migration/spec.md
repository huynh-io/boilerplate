# Feature Specification: Complete Auth & Frontend Migration Cleanup

**Feature Branch**: `001-devise-vite-migration`
**Created**: 2026-03-31
**Status**: Draft
**Input**: User description: "Complete migration from Firebase auth + Next.js to Devise-JWT + Vite React + TanStack Router. The frontend still shows 'Sign up with Google' on /sign-up and still has references to Next.js. The goal is to: 1. Replace Firebase auth with Devise + devise-jwt (Rails-managed auth) 2. Replace Next.js with Vite + React + TanStack Router (bridged via vite_rails gem + vite-plugin-rails npm package) 3. Add Zod + React Hook Form for form handling 4. Keep existing stack: PostgreSQL, Sidekiq, strong_migrations, RuboCop, RSpec, Jbuilder, Pundit, Pagy, TanStack Query, Zustand, Tailwind v4, shadcn/ui"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - New User Signs Up with Email and Password (Priority: P1)

A visitor navigates to the sign-up page and creates an account using their email address and a password. The form validates inputs in real time (email format, password strength, password confirmation match). On successful registration the user is automatically signed in and redirected to the home page. No references to third-party identity providers (e.g., "Sign up with Google") appear anywhere in the interface.

**Why this priority**: Account creation is the gateway to the entire application. Without a clean, working sign-up flow the product is unusable. This is also where the most visible legacy UI remnants (Google sign-up button) exist.

**Independent Test**: Can be fully tested by visiting /sign-up, filling in valid credentials, submitting the form, and confirming the user lands on the authenticated home page with a valid session.

**Acceptance Scenarios**:

1. **Given** a visitor is on the sign-up page, **When** they enter a valid email, a password of at least 6 characters, and a matching confirmation, **Then** the system creates the account, signs the user in, and redirects to the home page.
2. **Given** a visitor is on the sign-up page, **When** they enter mismatched passwords, **Then** the form displays an inline validation error before submission.
3. **Given** a visitor is on the sign-up page, **When** they enter an email that is already registered, **Then** the system displays a clear error message indicating the email is taken.
4. **Given** any page in the application, **When** the user inspects the interface, **Then** no "Sign up with Google," "Sign in with Google," or any other third-party auth option is visible.

---

### User Story 2 - Existing User Signs In and Signs Out (Priority: P1)

A registered user navigates to the sign-in page, enters their email and password, and gains access to authenticated areas of the application. They can later sign out, which clears their session and returns them to an unauthenticated state.

**Why this priority**: Sign-in and sign-out are equally critical to sign-up. Together they form the complete authentication lifecycle that every other feature depends on.

**Independent Test**: Can be fully tested by signing in with known credentials, verifying access to a protected page, signing out, and confirming the protected page is no longer accessible.

**Acceptance Scenarios**:

1. **Given** a registered user is on the sign-in page, **When** they enter valid credentials, **Then** they are authenticated and redirected to the home page.
2. **Given** a registered user is on the sign-in page, **When** they enter an incorrect password, **Then** the system displays "Invalid email or password."
3. **Given** an authenticated user, **When** they click sign out, **Then** their session is cleared, they are redirected to the sign-in page, and they can no longer access protected pages.

---

### User Story 3 - Session Persistence Across Page Reloads (Priority: P2)

An authenticated user refreshes the page or navigates away and returns. The system silently validates their stored credentials and restores them to an authenticated state without requiring them to sign in again, as long as their session has not expired or been revoked.

**Why this priority**: Without session persistence, users would need to sign in on every page load, making the application unusable in practice. This is critical for user experience but depends on Stories 1 and 2 being functional first.

**Independent Test**: Can be fully tested by signing in, refreshing the browser, and confirming the user is still authenticated and can access protected content.

**Acceptance Scenarios**:

1. **Given** an authenticated user, **When** they reload the page, **Then** the system validates the stored token and restores the authenticated state without showing a sign-in form.
2. **Given** a user whose session token has been revoked (e.g., admin action or password change), **When** they reload the page, **Then** the system clears the stale token and redirects to the sign-in page.

---

### User Story 4 - Remove All Legacy Artifacts (Priority: P2)

A developer inspecting the codebase finds no references to Firebase (the previous authentication provider) or Next.js (the previous frontend framework). All leftover build artifacts, configuration files, comments, and dead code from the prior stack have been removed. The application builds and runs cleanly with only the current stack.

**Why this priority**: Legacy artifacts create confusion for future developers, increase bundle size, and risk accidental reactivation of deprecated code paths. Cleanup is essential for long-term maintainability.

**Independent Test**: Can be fully tested by searching the codebase for references to the legacy provider and legacy framework, confirming zero results, and verifying the application builds and all tests pass.

**Acceptance Scenarios**:

1. **Given** the codebase, **When** a developer searches for references to Firebase (the previous identity provider), **Then** zero results are returned across all source files, comments, and configuration.
2. **Given** the codebase, **When** a developer searches for references to Next.js (the previous frontend framework), **Then** zero results are returned across all source files, build artifacts, and configuration.
3. **Given** the project, **When** a developer runs the build, linter, type checker, and test suite, **Then** all pass with zero errors.

---

### User Story 5 - Form Validation Provides Immediate Feedback (Priority: P3)

A user filling in the sign-up or sign-in form sees real-time validation feedback as they interact with fields. Required fields that are empty or invalid show descriptive error messages. The form cannot be submitted until client-side validation passes.

**Why this priority**: Good form validation reduces failed submissions and improves user confidence. It builds on the core auth flows (Stories 1-2) and polishes the experience.

**Independent Test**: Can be fully tested by interacting with form fields (leaving them blank, entering invalid formats, entering short passwords) and verifying appropriate error messages appear before the form is submitted.

**Acceptance Scenarios**:

1. **Given** a user on the sign-up page, **When** they submit the form with an empty email field, **Then** an inline error appears indicating email is required.
2. **Given** a user on the sign-up page, **When** they enter a password shorter than 6 characters, **Then** an inline error appears indicating the minimum length requirement.
3. **Given** a user on the sign-in page, **When** they enter an invalid email format, **Then** an inline error appears indicating the email is invalid.

---

### Edge Cases

- What happens when a user tries to access the sign-up or sign-in page while already authenticated? They should be redirected to the home page.
- What happens when the server is unreachable during form submission? The user should see a user-friendly error message indicating the action could not be completed.
- What happens when a user's token expires mid-session (without a page reload)? Protected API calls should fail gracefully, and the user should be redirected to sign in.
- What happens when the user navigates directly to a protected route while unauthenticated? They should be redirected to the sign-in page.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow new users to create accounts using email and password via the sign-up page.
- **FR-002**: System MUST validate email format, password minimum length (6 characters), and password confirmation match on the client side before form submission.
- **FR-003**: System MUST authenticate existing users via email and password on the sign-in page and establish a secure session.
- **FR-004**: System MUST allow authenticated users to sign out, clearing their session completely.
- **FR-005**: System MUST persist authentication state across page reloads by validating the stored session token against the server on application startup.
- **FR-006**: System MUST redirect unauthenticated users away from protected routes to the sign-in page.
- **FR-007**: System MUST redirect already-authenticated users away from sign-in and sign-up pages to the home page.
- **FR-008**: System MUST display server-side validation errors (e.g., duplicate email, invalid credentials) to the user in a clear, human-readable format.
- **FR-009**: System MUST NOT display any third-party authentication options (e.g., "Sign up with Google") anywhere in the user interface.
- **FR-010**: The codebase MUST NOT contain any references to Firebase (the previous authentication provider) in source files, comments, or configuration.
- **FR-011**: The codebase MUST NOT contain any build artifacts, static files, or references to Next.js (the previous frontend framework).
- **FR-012**: The application MUST build, pass linting, pass type checking, and pass all tests with zero errors after migration cleanup is complete.

### Non-Functional Requirements

- **NFR-001**: JWT tokens MUST be transmitted only over HTTPS in production environments to prevent interception in transit.
- **NFR-002**: Token lifetime and revocation MUST be managed server-side by the Devise-JWT revocation strategy. No additional client-side token encryption or httpOnly cookie migration is required.
- **NFR-003**: JWT tokens are stored in localStorage via Zustand persist middleware. This storage mechanism is an accepted trade-off for this application scope.

### Key Entities

- **User**: Represents a person with an account. Key attributes include email (unique identifier), encrypted password, admin status, and a session revocation identifier. Relationships: a user may have addresses and other domain data.
- **Session**: Represents an active authentication session. Tied to a single user. Can be revoked by the server (e.g., on password change). Stored client-side as a token.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can complete account creation (sign-up) in under 60 seconds.
- **SC-002**: Users can sign in with valid credentials in under 30 seconds.
- **SC-003**: 100% of sign-up and sign-in form validation errors are displayed inline before the form is submitted to the server.
- **SC-004**: Zero references to Firebase (the previous authentication provider) or Next.js (the previous frontend framework) exist in the codebase after cleanup.
- **SC-005**: All existing tests, linting rules, and type checks pass with zero errors after the migration is complete.
- **SC-006**: Page reloads for authenticated users restore the session without requiring re-authentication in under 2 seconds.
- **SC-007**: The application's initial page load does not serve any static assets from Next.js's build output (e.g., `public/_next/`).

## Clarifications

### Session 2026-03-31

- Q: What security properties are required for client-side JWT token storage (XSS mitigation, transport security, token lifetime)? → A: JWT tokens are stored in localStorage via Zustand persist middleware. This is an accepted trade-off for this application scope. HTTPS is required in production to prevent token interception in transit. Token lifetime and revocation are managed server-side by Devise-JWT's revocation strategy (already implemented). No additional client-side encryption or httpOnly cookie migration is in scope for this feature.
- Q: Terminology consistency — should the spec explicitly name "Firebase" and "Next.js" instead of using vague references like "previous authentication provider" and "previous frontend framework"? → A: Yes. All requirements, acceptance scenarios, and success criteria now explicitly name Firebase and Next.js so implementers know exactly which legacy references to search for and remove.

## Assumptions

- The backend migration to the current authentication system (Devise + devise-jwt) is already complete, including the User model, session and registration controllers, JWT token issuance, and revocation strategy. No backend auth changes are needed.
- The frontend migration to Vite + React + TanStack Router is already substantially complete, including the router setup, route definitions, auth API hooks, and the Authenticator component. The remaining work is primarily cleanup.
- The sign-up form currently does NOT show "Sign up with Google" based on the codebase inspection. The user's description may reference a stale state. This spec treats FR-009 as a verification requirement: confirm no such UI exists, and if found, remove it.
- The form handling stack (Zod + React Hook Form) is already integrated in the auth-form component. No new form library integration is needed.
- Legacy Next.js build artifacts exist in `public/_next/` and must be deleted. A Firebase comment exists in a database migration file and should be cleaned up.
- The application uses JWT tokens stored on the client side (via Zustand persisted state) for session management. No cookie-based session mechanism is needed.
- Password reset ("forgot password") functionality is out of scope for this feature. The Devise recoverable module is configured but the frontend flow is not part of this migration cleanup.
- Mobile-responsive design for auth forms follows whatever responsive behavior the existing shadcn/ui Card component provides. No special mobile layout work is in scope.
- All existing domain features (search, profile, admin, addresses, suppliers) should continue working unchanged after cleanup.
