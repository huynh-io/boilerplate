import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { AxiosHeaders } from "axios";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
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

beforeEach(() => {
  vi.clearAllMocks();

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

/**
 * Helper to build a minimal AxiosResponse for interceptor testing.
 */
function buildAxiosResponse(
  status: number,
  url: string,
  data: unknown = {}
): AxiosResponse {
  const headers = new AxiosHeaders();
  const config: InternalAxiosRequestConfig = {
    url,
    headers: new AxiosHeaders(),
  };

  return { status, data, headers, config, statusText: "" };
}

describe("Axios 401 response interceptor", () => {
  describe("when a protected API call returns 401", () => {
    it("calls resetAppStore to clear authentication state", async () => {
      // Stub the adapter so the request never hits the network
      const adapter = vi.fn().mockResolvedValue(
        buildAxiosResponse(401, "/api/v1/users/me")
      );
      apiClient.defaults.adapter = adapter;

      await apiClient.get("/api/v1/users/me");

      expect(resetAppStore).toHaveBeenCalled();
    });

    it("redirects the user to the sign-in page", async () => {
      const adapter = vi.fn().mockResolvedValue(
        buildAxiosResponse(401, "/api/v1/users/me")
      );
      apiClient.defaults.adapter = adapter;

      await apiClient.get("/api/v1/users/me");

      expect(window.location.href).toContain("/sign-in");
    });
  });

  describe("when a sign-in request returns 401", () => {
    it("does NOT call resetAppStore (passes through to mutation handler)", async () => {
      const adapter = vi.fn().mockResolvedValue(
        buildAxiosResponse(401, "/api/v1/sign_in")
      );
      apiClient.defaults.adapter = adapter;

      await apiClient.post("/api/v1/sign_in", {
        user: { email: "test@example.com", password: "wrong" },
      });

      expect(resetAppStore).not.toHaveBeenCalled();
    });
  });

  describe("when a sign-up request returns 401", () => {
    it("does NOT call resetAppStore (passes through to mutation handler)", async () => {
      const adapter = vi.fn().mockResolvedValue(
        buildAxiosResponse(401, "/api/v1/sign_up")
      );
      apiClient.defaults.adapter = adapter;

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
      const adapter = vi.fn().mockResolvedValue(
        buildAxiosResponse(200, "/api/v1/users/me")
      );
      apiClient.defaults.adapter = adapter;

      await apiClient.get("/api/v1/users/me");

      expect(resetAppStore).not.toHaveBeenCalled();
    });

    it("does NOT call resetAppStore for a 403 response", async () => {
      const adapter = vi.fn().mockResolvedValue(
        buildAxiosResponse(403, "/api/v1/admin/settings")
      );
      apiClient.defaults.adapter = adapter;

      await apiClient.get("/api/v1/admin/settings");

      expect(resetAppStore).not.toHaveBeenCalled();
    });

    it("does NOT call resetAppStore for a 422 response", async () => {
      const adapter = vi.fn().mockResolvedValue(
        buildAxiosResponse(422, "/api/v1/users")
      );
      apiClient.defaults.adapter = adapter;

      await apiClient.post("/api/v1/users", {});

      expect(resetAppStore).not.toHaveBeenCalled();
    });
  });
});
