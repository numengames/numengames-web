/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "*.svelte" {
  import type { SvelteComponent } from "svelte";
  export default class Component extends SvelteComponent<any> {}
}