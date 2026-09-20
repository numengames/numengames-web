import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "node",
		include: ["src/**/*.test.ts", "tests/**/*.test.ts", "worker/**/*.test.ts", "scripts/**/*.test.mjs"],
		// Coverage of the logic, printed with every `pnpm test` and in the CI
		// job summary. Pages (.astro) are not measured: no tool does that well;
		// what a visitor sees is checked by the contrast test and the build.
		// No `thresholds` on purpose: while STD-015 is draft the guard sees and
		// does not bite (ENG-067). The threshold arrives when the register goes
		// active, pinned to the value measured then — a ratchet, not a target.
		coverage: {
			enabled: true,
			provider: "v8",
			include: ["src/lib/**", "worker/**", "scripts/**"],
			exclude: ["**/*.test.*", "**/*.d.ts"],
			reporter: ["text", "text-summary", "lcov"],
			reportsDirectory: ".coverage",
		},
	},
});
