import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    // Real-water campaign tests are CPU-heavy. Avoid worker contention causing
    // otherwise passing simulations to exceed the unchanged per-test budget.
    maxWorkers: 2,
  },
});
