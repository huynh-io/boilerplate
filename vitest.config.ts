import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "app/frontend"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    include: ["app/frontend/**/*.test.ts", "app/frontend/**/*.test.tsx"],
  },
});
