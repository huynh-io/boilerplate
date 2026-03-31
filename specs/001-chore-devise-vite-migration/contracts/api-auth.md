# API Contract: Authentication Endpoints

These endpoints are already implemented via Devise-JWT. This contract documents the existing interface that the frontend consumes. No changes are required.

## POST /api/v1/sign_up

Create a new user account.

**Request**:
```json
{
  "user": {
    "email": "user@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }
}
```

**Success Response** (201 Created):
```
Headers:
  Authorization: Bearer <jwt_token>

Body:
{
  "id": "uuid-string",
  "email": "user@example.com",
  "admin": false
}
```

**Validation Error Response** (422 Unprocessable Content):
```json
{
  "errors": [
    "Email has already been taken",
    "Password is too short (minimum is 6 characters)"
  ]
}
```

## POST /api/v1/sign_in

Authenticate an existing user.

**Request**:
```json
{
  "user": {
    "email": "user@example.com",
    "password": "password123"
  }
}
```

**Success Response** (200 OK):
```
Headers:
  Authorization: Bearer <jwt_token>

Body:
{
  "id": "uuid-string",
  "email": "user@example.com",
  "admin": false
}
```

**Authentication Failure Response** (401 Unauthorized):
```json
{
  "error": "Invalid Email or password."
}
```

## DELETE /api/v1/sign_out

End the current session (revoke JWT).

**Request**:
```
Headers:
  Authorization: Bearer <jwt_token>
```

**Success Response** (204 No Content):
```
(empty body)
```

## GET /api/v1/users/me

Validate the current session and retrieve user info. Used by the Authenticator component on page reload.

**Request**:
```
Headers:
  Authorization: Bearer <jwt_token>
```

**Success Response** (200 OK):
```json
{
  "id": "uuid-string",
  "email": "user@example.com",
  "admin": false
}
```

**Unauthorized Response** (401 Unauthorized):
```json
{
  "error": "You need to sign in or sign up before continuing."
}
```

## Client-Side Token Flow

1. On sign-in or sign-up success, the frontend extracts the JWT from the `Authorization` response header (stripping the `Bearer ` prefix).
2. The token is stored in Zustand's persisted state (`accessToken` field in localStorage under key `app-store`).
3. All subsequent API requests include the token via an Axios request interceptor that sets `Authorization: Bearer <token>`.
4. On page reload, the `Authenticator` component sends `GET /api/v1/users/me` to validate the stored token.
5. On sign-out, the frontend calls `DELETE /api/v1/sign_out`, then resets the Zustand store (clearing `accessToken` and `authenticated`).
