// Flat config. The build is the authority (Principle 1), so every rule here is an
// error, never a warning: a warning is prose.
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import svelte from "eslint-plugin-svelte";

/** Rules that apply to every language we ship, whatever the file extension. */
const houseRules = {
	// SRE-03: structured logs, never console noise in shipped code.
	"no-console": "error",
	"no-debugger": "error",
	// Unused is an error, except for the conventional `_` placeholder that
	// only exists to fill a positional slot.
	"@typescript-eslint/no-unused-vars": [
		"error",
		{
			argsIgnorePattern: "^_",
			varsIgnorePattern: "^_",
			caughtErrorsIgnorePattern: "^_",
		},
	],
};

export default [
	{
		ignores: ["dist/**", ".astro/**", ".wrangler/**", "node_modules/**", "public/**"],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	...astro.configs.recommended,
	...svelte.configs.recommended,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
		},
		rules: houseRules,
	},
	{
		// Svelte components carry <script lang="ts">: the svelte parser needs the
		// TypeScript parser underneath or every type annotation is a parse error.
		files: ["**/*.svelte"],
		languageOptions: {
			parserOptions: { parser: tseslint.parser, extraFileExtensions: [".svelte"] },
		},
	},
	{
		// CLI scripts talk to the terminal: console is their output channel,
		// not stray logging in shipped code.
		files: ["scripts/**/*.mjs", "scripts/**/*.js"],
		rules: { "no-console": "off" },
	},
	{
		// Tests may assert on unused bindings and use node globals freely.
		files: ["**/*.test.{ts,js}", "vitest.config.ts"],
		rules: { "@typescript-eslint/no-unused-vars": "off" },
	},
];
