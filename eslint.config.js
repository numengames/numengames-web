// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: AGPL-3.0-only
//
// eslint flat config — the same shape as nwos-deploy's, minus React (this
// site has no islands). Every rule is an error, never a warning: when the
// lint step starts to bite, a warning would pass unread.
//
// Until the tree is formatted and clean, the CI step that runs this
// REPORTS (see .github/workflows/ci.yml, step "Lint"): findings go to the
// job summary and the step exits 0. Fix findings in the file they name;
// never silence a rule here to make the run green.
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";

export default [
	{
		// src/env.d.ts is Astro's own scaffold (triple-slash reference to the
		// generated types); it is not ours to restyle.
		ignores: ["dist/**", ".astro/**", ".wrangler/**", "node_modules/**", "public/**", "src/env.d.ts"],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	...astro.configs.recommended,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
		},
		rules: {
			// SRE-003 (STD-015): structured logs, never console noise in shipped code.
			"no-console": "error",
			"no-debugger": "error",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],
		},
	},
	{
		// Build and CI scripts talk to the terminal: console is their output.
		files: ["scripts/**/*.mjs", "scripts/**/*.js", "worker/**/*.js"],
		rules: { "no-console": "off" },
	},
	{
		files: ["tests/**/*.ts", "**/*.test.ts", "**/*.test.mjs", "vitest.config.ts"],
		rules: { "@typescript-eslint/no-unused-vars": "off" },
	},
];
