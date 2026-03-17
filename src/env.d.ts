/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "*.svelte" {
  import type { SvelteComponent } from "svelte";
  export default class Component extends SvelteComponent<any> {}
}

declare module "astro-icon/components" {
  import type { HTMLAttributes } from "astro/types";
  interface Props extends HTMLAttributes<"svg"> {
    name: string;
    size?: number;
    class?: string;
  }
  export const Icon: (props: Props) => any;
}

declare module "*.astro" {
  const component: any;
  export default component;
}