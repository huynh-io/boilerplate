# Boilerplate

A full-stack monorepo combining a Rails 8.1 JSON API with a React 19 single-page application. Authentication is handled by Devise + JWT, the frontend is bundled by Vite, and both are served from the same origin in development and production.

## Tech Stack

| Layer          | Technology                                                       |
| -------------- | ---------------------------------------------------------------- |
| Backend        | Ruby 3.4.8, Rails 8.1, PostgreSQL (UUID PKs), Puma              |
| Auth           | Devise, devise-jwt (JTI revocation), Pundit                     |
| Background     | Sidekiq, Redis                                                   |
| Frontend       | React 19, TypeScript 5.9, Vite 6                                |
| Routing        | TanStack Router (file-based)                                     |
| Server state   | TanStack Query                                                   |
| Client state   | Zustand (persisted to localStorage)                              |
| Forms          | React Hook Form + Zod                                            |
| UI             | shadcn/ui, Tailwind CSS v4                                       |
| HTTP client    | fetch API with custom case converter                             |

## Setup

Prerequisites: Ruby 3.4.8, Node 18+, PostgreSQL, Redis.

```sh
bin/setup
```

The script will:

1. Prompt for an app name
2. Generate a `.env` file
3. Install Ruby and Node dependencies
4. Create the database config from a template
5. Generate Rails credentials for dev and test
6. Run migrations

## Development

```sh
bin/dev
```

This starts three processes via Overmind (or Foreman):

| Process | Command                      | Purpose                     |
| ------- | ---------------------------- | --------------------------- |
| api     | `bundle exec rails s -p 3000`| Rails API server            |
| vite    | `bin/vite dev`               | Vite dev server with HMR    |
| worker  | `bundle exec sidekiq`        | Background job processor    |

Vite proxies API requests to Rails in development so both servers share the same origin.

## Architecture

### Backend

Rails runs as a JSON API. Controllers live under `Api::V1` and render responses through JBuilder views.

```
app/
  controllers/
    api/v1/            # Versioned API endpoints
      admin/           # Admin-only resources (Pundit-gated)
    users/             # Devise session + registration overrides
  models/              # ActiveRecord models (UUID primary keys)
  services/            # Service objects (.call pattern)
  policies/            # Pundit authorization policies
  views/api/           # JBuilder JSON templates
```

Key API routes:

```
POST   /api/v1/sign_in             # Returns JWT in Authorization header
POST   /api/v1/sign_up             # User registration
DELETE /api/v1/sign_out             # Revokes JWT
GET    /api/v1/users/me             # Current user profile
GET    /api/v1/search               # Public catalog search
GET    /api/v1/admin/suppliers      # Admin: list suppliers (paginated)
POST   /api/v1/admin/suppliers      # Admin: create supplier
PATCH  /api/v1/admin/suppliers/:id  # Admin: update supplier
```

Pagination uses Pagy, which injects `X-Total-Count`, `X-Page-Number`, and `X-Per-Page` response headers.

### Frontend

The React SPA lives in `app/frontend/` and is built by Vite via the `vite_rails` gem.

```
app/frontend/
  entrypoints/
    application.tsx    # App entry point (mounts router)
    application.css    # Tailwind + theme variables
  routes/              # File-based routing (TanStack Router)
    __root.tsx         # Root layout: providers, header, error boundary
    index.tsx          # Home
    sign-in.tsx        # Sign in form
    sign-up.tsx        # Sign up form
    search.tsx         # Public search
    profile.tsx        # Authenticated user profile
    admin.tsx          # Admin panel
  lib/
    api-store/         # API client (fetch) + TanStack Query hooks
    app-store/         # Zustand store (slices for auth, UI state)
  components/
    authenticator.tsx  # Token validation guard
    header.tsx         # Responsive nav bar
    ui/                # shadcn/ui primitives
```

### Backend-Frontend Communication

All communication happens over JSON. The two key conventions that make this seamless:

1. **Case conversion** -- Rails sends `snake_case`, the frontend expects `camelCase`. A custom case converter (`lib/api-store/case-converter.ts`) transforms keys automatically on every request and response.

2. **JWT auth via headers** -- Tokens travel in the `Authorization` header, never in cookies.

#### Authentication flow

```
┌──────────┐         POST /api/v1/sign_in         ┌──────────┐
│          │  ──────────────────────────────────►   │          │
│  React   │  { user: { email, password } }        │  Rails   │
│   SPA    │                                       │   API    │
│          │  ◄──────────────────────────────────   │          │
└──────────┘  Authorization: Bearer eyJ...         └──────────┘
      │
      ▼
  Zustand store
  ┌─────────────────────────┐
  │ accessToken: "eyJ..."   │ ──► persisted to localStorage
  │ authenticated: true     │
  └─────────────────────────┘
      │
      ▼
  apiClient reads token from store
  and attaches Authorization header
  to every subsequent request
```

On app load, the `Authenticator` component validates the stored token by calling `GET /api/v1/users/me`. If the token is expired or revoked, the store resets and the user is redirected to `/sign-in`.

On any `401` response (outside of auth endpoints), the API client clears the store and redirects to `/sign-in`.

#### Request lifecycle

```
React component
  └─► TanStack Query hook (e.g. useGetAdminSuppliers)
        └─► apiClient.get / .post / .patch / .delete
              ├─ Attach Bearer token from Zustand store
              ├─ decamelizeKeys: camelCase → snake_case (request body)
              ├─ fetch()
              └─► Rails controller
                    ├─ Devise JWT: authenticate from Bearer token
                    ├─ Pundit: authorize action
                    ├─ Service object: business logic
                    └─► JBuilder view: render JSON (snake_case)
                          └─► fetch response
                                ├─ camelizeKeys: snake_case → camelCase
                                ├─ 401 guard: reset store + redirect (non-auth endpoints)
                                └─► TanStack Query cache
                                      └─► React re-renders
```

## Testing

```sh
# Backend
bundle exec rspec

# Frontend
npx vitest run
```

## Environment Variables

| Variable                | Purpose                                    |
| ----------------------- | ------------------------------------------ |
| `APP_NAME`              | Application name (used for DB names, etc.) |
| `DEVISE_JWT_SECRET_KEY` | JWT signing key (defaults to Rails secret) |
| `DATABASE_URL`          | Production database connection string      |

## Production

The production `Procfile` runs two processes:

```
web:    bundle exec puma -C config/puma.rb
worker: bundle exec sidekiq
```

Vite builds the frontend to `public/vite/` at deploy time. Rails serves these static assets and handles API requests.
