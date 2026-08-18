/**
 * Type-check ratchet.
 *
 * `astro check` reports a number of pre-existing errors in this repository
 * (see TODO.md -> "Type debt"). Clearing them is a product decision, not a
 * mechanical one: most are `class="..."` attributes passed to Svelte
 * components that only read `className`, so those classes are silently
 * dropped today. Activating them would change the rendered layout; deleting
 * them would throw away the author's intent. Either way it is its own change.
 *
 * Until then the check is not prose: the build fails if the error count goes
 * UP, and fails just as loudly if it goes DOWN without lowering the baseline.
 * The only way for the number to move is deliberately.
 */
import { spawnSync } from "node:child_process";

const BASELINE = 31;

const result = spawnSync("astro check", { encoding: "utf8", shell: true });

const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
process.stdout.write(output);

// Strip ANSI colour codes before parsing the summary line.
// eslint-disable-next-line no-control-regex
const plain = output.replace(/\u001b\[[0-9;]*m/g, "");
const match = plain.match(/-\s*(\d+)\s+errors?/);

if (!match) {
	console.error("\ntype-check: could not read the error count from `astro check`.");
	process.exit(1);
}

const errors = Number(match[1]);

if (errors > BASELINE) {
	console.error(`\ntype-check: ${errors} errors, baseline is ${BASELINE}. ` + `This change adds ${errors - BASELINE}. Fix them — the baseline only goes down.`);
	process.exit(1);
}

if (errors < BASELINE) {
	console.error(`\ntype-check: ${errors} errors, baseline is ${BASELINE}. ` + `Lower BASELINE to ${errors} in scripts/type-check.mjs and commit it.`);
	process.exit(1);
}

console.log(`\ntype-check: ${errors} known errors, baseline holds.`);
