# Implementation Plan: Complete Auth & Frontend Migration Cleanup

**Branch**: `001-devise-vite-migration` | **Date**: 2026-03-31 | **Spec**: `specs/001-devise-vite-migration/spec.md`
**Input**: Feature specification from `/specs/001-devise-vite-migration/spec.md`

## Summary

Complete the migration from Firebase auth + Next.js to Devise-JWT + Vite React + TanStack Router by removing all legacy artifacts and verifying the auth flows (sign-up, sign-in, sign-out, session persistence) work end-to-end. The backend migration is already complete (Devise-JWT, User model, session/registration controllers). The frontend migration is substantially complete (Vite, TanStack Router, Zod + React Hook Form auth forms). The remaining work is primarily cleanup of legacy Next.js build artifacts and Firebase references, plus verification that the auth UI has no third-party provider remnants.

## Technical Context

**Language/Version**: Ruby 3.4.8 / Rails 8.1 (backend), TypeScript 5.9 / React 19 (frontend)
**Primary Dependencies**: Devise + devise-jwt, Vite + vite_rails + vite-plugin-rails, TanStack Router, TanStack Query, Zustand, Zod, React Hook Form, shadcn/ui, Tailwind v4
**Storage**: PostgreSQL (UUID primary keys)
**Testing**: RSpec (backend), ESLint (frontend linting), TypeScript compiler (type checking)
**Target Platform**: Web application (Rails API backend + Vite React SPA frontend)
**Project Type**: Web application (monorepo: Rails backend serving Vite-built React SPA)
**Performance Goals**: Sign-up < 60s, Sign-in < 30s, Session restore on reload < 2s
**Constraints**: JWT in localStorage (accepted trade-off), HTTPS in production, no cookie-based sessions
**Scale/Scope**: Single-user auth flows, 7 frontend routes, 5 domain models

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Readability First | PASS | Cleanup work removes confusing legacy code; no new complex logic introduced |
| II. Functional Design | PASS | Auth hooks (useSignIn, useSignUp, useSignOut) already follow input/output pattern via TanStack Query mutations |
| III. Maintainability Over Cleverness | PASS | Removing dead code and legacy artifacts directly improves maintainability |
| IV. Best Practices | PASS | Using Devise conventions for auth, TanStack Router file-based routing, Zod for validation |
| V. Simplicity (KISS & YAGNI) | PASS | No new abstractions needed; work is primarily deletion and verification |
| Test-First Development | PASS | Cleanup verification tests can be written first; auth flow tests exist or will be added before changes |
| Quality Gates | PASS | All tests, linting, and type checking must pass post-cleanup |
| Process Cleanup | PASS | No long-running processes needed for cleanup tasks |

No constitution violations. No complexity tracking entries needed.

## Project Structure

### Documentation (this feature)

```text
specs/001-devise-vite-migration/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── api-auth.md      # Auth endpoint contracts
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
# Rails backend (API-only for auth + domain resources)
app/
├── controllers/
│   ├── users/
│   │   ├── sessions_controller.rb      # Devise JWT sign-in/sign-out
│   │   └── registrations_controller.rb # Devise JWT sign-up
│   ├── api/v1/                         # Domain API endpoints
│   ├── authorized_controller.rb        # Base controller requiring auth
│   └── pages_controller.rb             # SPA catch-all
├── models/
│   └── user.rb                         # Devise JWT user model
├── policies/                           # Pundit authorization
├── services/                           # Business logic
└── views/                              # Jbuilder JSON templates

# Vite React frontend (served by Rails via vite_rails)
app/frontend/
├── entrypoints/
│   └── application.tsx                 # React app bootstrap
├── routes/
│   ├── __root.tsx                      # Root layout (Authenticator, Header)
│   ├── index.tsx                       # Home page
│   ├── sign-in.tsx                     # Sign-in page
│   ├── sign-up.tsx                     # Sign-up page
│   ├── profile.tsx                     # Protected profile page
│   ├── search.tsx                      # Search page
│   └── admin.tsx                       # Admin page
├── components/
│   ├── auth-form.tsx                   # Shared auth form (Zod + RHF)
│   ├── authenticator.tsx               # Session validation on load
│   ├── header.tsx                      # Navigation header
│   └── ui/                             # shadcn/ui primitives
├── lib/
│   ├── api-store/                      # TanStack Query hooks + Axios client
│   │   ├── api-client.ts              # Axios instance with JWT interceptor
│   │   └── auth.ts                    # useSignIn, useSignUp, useSignOut
│   └── app-store/                      # Zustand state management
│       ├── app-store.ts               # Store with persist middleware
│       └── slices/
│           └── authentication-slice.ts # Auth state (authenticated, accessToken)
└── routeTree.gen.ts                    # TanStack Router generated tree

# Test suites
spec/
├── requests/api/v1/                    # Backend request specs
├── models/                             # Model specs
├── services/                           # Service specs
├── factories/                          # FactoryBot factories
└── support/                            # Shared contexts and helpers

# Legacy artifacts to remove
public/_next/                           # Next.js build output (entire directory)
public/*.html                           # Next.js exported HTML pages
public/*.txt                            # Next.js exported text files
db/migrate/20240828043807_create_users.rb  # Contains Firebase comments to clean
```

**Structure Decision**: Monorepo with Rails backend at root and React frontend under `app/frontend/`, bridged by vite_rails gem. This is the existing structure and requires no changes.

## Complexity Tracking

No constitution violations to justify.
