# Data Model: Complete Auth & Frontend Migration Cleanup

## Overview

This feature does not introduce new entities or modify the database schema. The data model documents the existing entities relevant to the auth flows being verified and cleaned up.

## Entities

### User

The primary entity for authentication. Already fully migrated to Devise-JWT.

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| id | UUID | PK, auto-generated | `gen_random_uuid()` |
| email | string | UNIQUE, NOT NULL (Devise validatable) | Used as authentication identifier |
| encrypted_password | string | NOT NULL, default "" | Bcrypt-hashed via Devise |
| jti | string | UNIQUE, NOT NULL | JWT revocation identifier (JTIMatcher strategy) |
| admin | boolean | NOT NULL, default false | Admin role flag |
| custom_metadata | jsonb | nullable | Legacy field from Firebase migration; not used by auth |
| remember_created_at | datetime | nullable | Devise rememberable (not actively used with JWT) |
| reset_password_token | string | UNIQUE, nullable | Devise recoverable (out of scope for this feature) |
| reset_password_sent_at | datetime | nullable | Devise recoverable (out of scope for this feature) |
| created_at | datetime | NOT NULL | Rails timestamp |
| updated_at | datetime | NOT NULL | Rails timestamp |

**Devise Modules**: `database_authenticatable`, `registerable`, `recoverable`, `validatable`, `jwt_authenticatable`

**JWT Revocation Strategy**: `Devise::JWT::RevocationStrategies::JTIMatcher` — revokes tokens by rotating the `jti` column on the User record. When a user's `jti` changes (e.g., on sign-out or password change), all previously issued JWTs become invalid.

**Relationships**:
- Has many addresses (polymorphic via `addressable`)
- Has no direct relationship to sessions — sessions are stateless JWTs validated against `jti`

### Session (Client-Side Concept)

Sessions are not stored in the database. They exist as JWT tokens managed by the client.

| Attribute | Storage | Notes |
|-----------|---------|-------|
| accessToken | Zustand persist (localStorage) | JWT string from Authorization header |
| authenticated | Zustand persist (localStorage) | Boolean flag for UI state |

**Lifecycle**:
1. Created on successful sign-in or sign-up (JWT returned in Authorization header)
2. Validated on page reload by `Authenticator` component calling `GET /api/v1/users/me`
3. Destroyed on sign-out (`DELETE /api/v1/sign_out`) which resets the Zustand store
4. Invalidated server-side when user's `jti` rotates (token no longer matches)

## State Transitions

### Authentication State Machine

```
[Unauthenticated] --sign-up/sign-in--> [Authenticated]
[Authenticated] --sign-out--> [Unauthenticated]
[Authenticated] --page-reload--> [Validating] --token-valid--> [Authenticated]
[Authenticated] --page-reload--> [Validating] --token-invalid--> [Unauthenticated]
[Authenticated] --token-expired-mid-session--> [Unauthenticated] (on next API call failure)
```

## Schema Changes

None. The database schema is already in its target state. The `db/schema.rb` reflects the fully migrated User table with Devise columns (`encrypted_password`, `jti`, `reset_password_token`, `reset_password_sent_at`, `remember_created_at`).

## Validation Rules

| Entity | Field | Rule | Enforced By |
|--------|-------|------|-------------|
| User | email | Valid email format | Zod schema (client), Devise validatable (server) |
| User | email | Unique | Database unique index + Devise validatable |
| User | password | Minimum 6 characters | Zod schema (client), Devise validatable (server) |
| User | password_confirmation | Must match password | Zod `.refine()` (client), Devise registerable (server) |
