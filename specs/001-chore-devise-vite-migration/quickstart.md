# Quickstart: Complete Auth & Frontend Migration Cleanup

## Prerequisites

- Ruby 3.4.8
- Node.js (compatible with package.json engines)
- PostgreSQL running locally
- Redis running locally (for Sidekiq, not required for auth testing)

## Setup

```bash
# Install dependencies
bundle install
npm install

# Setup database
bin/rails db:create db:migrate db:seed
```

## Development

```bash
# Start both Rails API and Vite dev server (with HMR)
# Option 1: Using foreman/overmind with Procfile.dev
foreman start -f Procfile.dev

# Option 2: Run in separate terminals
bundle exec rails s -p 3000   # Terminal 1: Rails API
bin/vite dev                    # Terminal 2: Vite dev server
```

The app will be available at `http://localhost:3000`.

## Key Files for This Feature

### Backend (already complete, verification only)
- `app/models/user.rb` — Devise JWT user model
- `app/controllers/users/sessions_controller.rb` — Sign-in/sign-out
- `app/controllers/users/registrations_controller.rb` — Sign-up
- `config/routes.rb` — Devise routes at `/api/v1/`
- `config/initializers/devise.rb` — Devise configuration

### Frontend (cleanup and verification)
- `app/frontend/components/auth-form.tsx` — Auth form with Zod + RHF validation
- `app/frontend/components/authenticator.tsx` — Session validation on page load
- `app/frontend/routes/sign-up.tsx` — Sign-up page route
- `app/frontend/routes/sign-in.tsx` — Sign-in page route
- `app/frontend/lib/api-store/auth.ts` — Auth mutation hooks
- `app/frontend/lib/app-store/slices/authentication-slice.ts` — Auth state

### Legacy artifacts to remove
- `public/_next/` — Entire Next.js build output directory
- `public/*.html` — Next.js exported HTML pages (404, admin, index, profile, search, sign-in, sign-up)
- `public/*.txt` — Next.js exported text files (admin, index, profile, search, sign-in, sign-up)
- `db/migrate/20240828043807_create_users.rb` — Firebase comments on lines 10-12

## Quality Gates

```bash
# Backend
bundle exec rspec                  # Run all specs
bundle exec rubocop                # Run linter

# Frontend
npm run lint                       # ESLint
npx tsc --noEmit                   # TypeScript type check
npm run build                      # Vite production build
```

## Manual Verification

1. Visit `/sign-up` — confirm no "Sign up with Google" button, form validates email/password/confirmation
2. Create account — confirm redirect to home page
3. Sign out — confirm redirect to sign-in
4. Visit `/sign-in` — sign in with created credentials
5. Refresh page — confirm session persists (no re-auth required)
6. Sign out — confirm session cleared
7. Visit `/profile` while unauthenticated — confirm redirect to sign-in
8. Confirm `public/_next/` directory no longer exists
9. Search codebase for "firebase" and "next.js" — confirm zero results outside spec docs
