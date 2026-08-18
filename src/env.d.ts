/// <reference types="astro/client" />

declare module "*.svelte" {
	import type { SvelteComponent } from "svelte";
	export default class Component extends SvelteComponent<Record<string, unknown>> {}
}

declare module "astro-icon/components" {
	import type { HTMLAttributes } from "astro/types";
	interface Props extends HTMLAttributes<"svg"> {
		name: string;
		size?: number;
		class?: string;
	}
	// Ambient interop: a narrower return type strips the JSX overloads from
	// every <Icon /> call site, so `any` is the honest declaration here.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export const Icon: (props: Props) => any;
}

declare module "*.astro" {
	// Ambient interop, same reason as above.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const component: any;
	export default component;
}
declare module "aos" {
	interface AosOptions {
		duration?: number;
		once?: boolean;
		offset?: number;
		easing?: string;
		delay?: number;
		disable?: boolean | string | (() => boolean);
	}
	const aos: { init: (options?: AosOptions) => void; refresh: () => void };
	export default aos;
}
