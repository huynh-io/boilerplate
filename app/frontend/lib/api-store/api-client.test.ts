import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { apiClient } from "./api-client";
import { useAppStore, resetAppStore } from "@/lib/app-store";

// Track calls to resetAppStore by spying on the module
vi.mock("@/lib/app-store", async () => {
  const actual =
    await vi.importActual<typeof import("@/lib/app-store")>("@/lib/app-store");
  return {
    ...actual,
    resetAppStore: vi.fn(actual.resetAppStore),
  };
});

// Mock window.location for redirect detection
const originalLocation = window.location;

function buildFetchResponse(
  status: number,
  body: unknown = {},
  headers: Record<string, string> = {}
): Response {
  return {
    status,
    ok: status >= 200 && status < 300,
    json: () => Promise.resolve(body),
    headers: new Headers(headers),
  } as Response;
}

const mockFetch = vi.fn<typeof globalThis.fetch>();

beforeEach(() => {
  vi.clearAllMocks();

  globalThis.fetch = mockFetch;

  // Reset Zustand store to a known authenticated state
  useAppStore.setState({ authenticated: true, accessToken: "test-token" });

  // Mock window.location so we can detect redirects
  Object.defineProperty(window, "location", {
    writable: true,
    value: { ...originalLocation, href: "http://localhost:3000/profile" },
  });
});

afterEach(() => {
  Object.defineProperty(window, "location", {
    writable: true,
    value: originalLocation,
  });
});

describe("fetch-based API client", () => {
  describe("request headers", () => {
    it("attaches Authorization header from app store", async () => {
      mockFetch.mockResolvedValue(buildFetchResponse(200, { ok: true }));

      await apiClient.get("/api/v1/users/me");

      expect(mockFetch).toHaveBeenCalledWith(
        "/api/v1/users/me",
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: "Bearer test-token",
            "Content-Type": "application/json",
          }),
        })
      );
    });
  });

  describe("case conversion", () => {
    it("converts response body keys from snake_case to camelCase", async () => {
      mockFetch.mockResolvedValue(
        buildFetchResponse(200, { user_name: "John", access_token: "abc" })
      );

      const response = await apiClient.get("/api/v1/users/me");

      expect(response.data).toEqual({
        userName: "John",
        accessToken: "abc",
      });
    });

    it("converts request body keys from camelCase to snake_case", async () => {
      mockFetch.mockResolvedValue(buildFetchResponse(200, {}));

      await apiClient.post("/api/v1/users", {
        firstName: "John",
        lastName: "Doe",
      });

      const callArgs = mockFetch.mock.calls[0];
      const body = JSON.parse(callArgs[1]?.body as string);
      expect(body).toEqual({ first_name: "John", last_name: "Doe" });
    });
  });

  describe("5xx error handling", () => {
    it("throws HttpError on 500 responses", async () => {
      mockFetch.mockResolvedValue(
        buildFetchResponse(500, { error: "internal" })
      );

      await expect(apiClient.get("/api/v1/users/me")).rejects.toThrow(
        "HTTP Error 500"
      );
    });
  });

  describe("401 response interceptor", () => {
    describe("when a protected API call returns 401", () => {
      it("calls resetAppStore to clear authentication state", async () => {
        mockFetch.mockResolvedValue(buildFetchResponse(401));

        await apiClient.get("/api/v1/users/me");

        expect(resetAppStore).toHaveBeenCalled();
      });

      it("redirects the user to the sign-in page", async () => {
        mockFetch.mockResolvedValue(buildFetchResponse(401));

        await apiClient.get("/api/v1/users/me");

        expect(window.location.href).toContain("/sign-in");
      });
    });

    describe("when a sign-in request returns 401", () => {
      it("does NOT call resetAppStore (passes through to mutation handler)", async () => {
        mockFetch.mockResolvedValue(buildFetchResponse(401));

        await apiClient.post("/api/v1/sign_in", {
          user: { email: "test@example.com", password: "wrong" },
        });

        expect(resetAppStore).not.toHaveBeenCalled();
      });
    });

    describe("when a sign-up request returns 401", () => {
      it("does NOT call resetAppStore (passes through to mutation handler)", async () => {
        mockFetch.mockResolvedValue(buildFetchResponse(401));

        await apiClient.post("/api/v1/sign_up", {
          user: {
            email: "test@example.com",
            password: "password",
            password_confirmation: "password",
          },
        });

        expect(resetAppStore).not.toHaveBeenCalled();
      });
    });

    describe("when a protected API call returns a non-401 status", () => {
      it("does NOT call resetAppStore for a 200 response", async () => {
        mockFetch.mockResolvedValue(buildFetchResponse(200));

        await apiClient.get("/api/v1/users/me");

        expect(resetAppStore).not.toHaveBeenCalled();
      });

      it("does NOT call resetAppStore for a 403 response", async () => {
        mockFetch.mockResolvedValue(buildFetchResponse(403));

        await apiClient.get("/api/v1/admin/settings");

        expect(resetAppStore).not.toHaveBeenCalled();
      });

      it("does NOT call resetAppStore for a 422 response", async () => {
        mockFetch.mockResolvedValue(buildFetchResponse(422));

        await apiClient.post("/api/v1/users", {});

        expect(resetAppStore).not.toHaveBeenCalled();
      });
    });
  });
});
