# Research: Complete Auth & Frontend Migration Cleanup

## 1. Legacy Next.js Artifact Inventory

**Decision**: Delete all Next.js build artifacts from `public/` directory.

**Rationale**: The application has fully migrated to Vite + vite_rails. The `public/_next/` directory contains stale Next.js static output (JS chunks, CSS, build manifests) that are never served by the current Vite-based setup. The `public/*.html` and `public/*.txt` files are Next.js static exports that conflict with the SPA catch-all route. These files waste disk space, pollute search results, and risk confusing future developers.

**Artifacts identified**:
- `public/_next/` directory (entire tree: JS chunks, CSS, build manifests)
- `public/404.html` (Next.js 404 page)
- `public/admin.html`, `public/admin.txt` (Next.js exported admin page)
- `public/index.html`, `public/index.txt` (Next.js exported index page)
- `public/profile.html`, `public/profile.txt` (Next.js exported profile page)
- `public/search.html`, `public/search.txt` (Next.js exported search page)
- `public/sign-in.html`, `public/sign-in.txt` (Next.js exported sign-in page)
- `public/sign-up.html`, `public/sign-up.txt` (Next.js exported sign-up page)

**Alternatives considered**:
- Keep artifacts with a deprecation marker: Rejected because dead files with no path to removal violate YAGNI and clutter the repo.
- Add `.gitignore` entries only: Rejected because the files are already committed and tracked; they need actual deletion.

## 2. Legacy Firebase Reference Inventory

**Decision**: Remove Firebase comments from the database migration file. No code-level Firebase references exist outside of the spec documentation.

**Rationale**: The only non-spec Firebase references are comments in `db/migrate/20240828043807_create_users.rb` (lines 10-12). These comments reference Firebase documentation URLs and field names that no longer apply after the Devise migration. Removing them eliminates confusion for developers reading migration history.

**References found**:
- `db/migrate/20240828043807_create_users.rb` lines 10-12: Comments mentioning "fields omitted from firebase" and a Firebase documentation URL.
- No Firebase imports, configuration files, environment variables, or runtime code exist.

**Alternatives considered**:
- Leave comments as historical context: Rejected because they reference a provider that is no longer used and could mislead developers into thinking Firebase integration exists.

## 3. Third-Party Auth UI Verification

**Decision**: No removal needed. The sign-up form does not contain any "Sign up with Google" or other third-party auth buttons.

**Rationale**: Inspection of `app/frontend/components/auth-form.tsx` confirms the form contains only email, password, and password confirmation fields. No Google/OAuth buttons, links, or references exist in any frontend component. The spec assumption that "Sign up with Google" may reference a stale state is confirmed correct.

**Alternatives considered**: N/A — this is a verification finding, not a design decision.

## 4. Auth Flow Completeness Assessment

**Decision**: The existing auth implementation covers all spec requirements. No new auth logic needs to be built.

**Rationale**: Codebase inspection confirms:
- **Sign-up** (FR-001): `useSignUp` mutation in `auth.ts` posts to `/api/v1/sign_up`, `RegistrationsController` handles creation and returns JWT via Authorization header.
- **Client-side validation** (FR-002): `auth-form.tsx` uses Zod schemas for email format, password min length (6 chars), and password confirmation match, integrated via `react-hook-form` with `zodResolver`.
- **Sign-in** (FR-003): `useSignIn` mutation posts to `/api/v1/sign_in`, `SessionsController` authenticates and returns JWT.
- **Sign-out** (FR-004): `useSignOut` mutation deletes `/api/v1/sign_out`, resets app store and query client.
- **Session persistence** (FR-005): `Authenticator` component validates stored token on mount by calling `/api/v1/users/me`.
- **Protected route redirect** (FR-006): Routes like `profile.tsx` and `admin.tsx` need verification — the `Authenticator` component handles initial load but per-route guards should be confirmed.
- **Auth page redirect** (FR-007): Both `sign-in.tsx` and `sign-up.tsx` redirect to `/` when `authenticated` is true via `useEffect`.
- **Server error display** (FR-008): Auth mutations surface `error?.message` to `AuthForm` component.
- **No third-party auth UI** (FR-009): Confirmed — no Google/OAuth buttons exist.

**Areas requiring attention**:
- FR-006 (redirect unauthenticated users from protected routes): The `Authenticator` wrapper validates tokens but does not redirect. Individual routes like `profile.tsx` and `admin.tsx` should be verified to handle unauthenticated access. This may need minor route-level guard logic.
- Server error handling for edge cases (network failure, expired token mid-session) should be verified against the spec edge cases.

**Alternatives considered**: N/A — assessment only.

## 5. Safe Migration File Modification

**Decision**: Modify the migration file to remove Firebase comments. This is safe because the migration has already been run and the schema is tracked in `db/schema.rb`.

**Rationale**: Rails migration files are run-once artifacts. Modifying comments in an already-applied migration does not affect the database state or future migrations. The `db/schema.rb` file (which Rails uses for `db:schema:load`) does not include comments from migration files.

**Alternatives considered**:
- Create a new migration to document the cleanup: Rejected because no schema change is needed; this is purely a comment cleanup.
- Leave migration untouched: Rejected because FR-010 requires zero Firebase references in source files and comments.
