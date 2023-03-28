import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,
    setupFiles: ["./src/setupTests.ts"],
    threads: true,
    testTimeout: 20000,
  }
});