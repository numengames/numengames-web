/**
 * Types for the long-form page copy that lives as markdown in
 * `src/pages/content/**`.
 *
 * The frontmatter of those files is free-form content data: every page
 * declares its own sections, and the components that render them validate
 * what they consume. Typing it precisely would mean duplicating the whole
 * content model in TypeScript and updating it on every copy change, so the
 * boundary is deliberately loose — and it is loose *here only*, once, instead
 * of as a scattered `any` in every page.
 */

/** A free-form block of content data coming from markdown frontmatter. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- documented boundary, see above
export type ContentData = Record<string, any>;

/** A markdown module as returned by `import.meta.glob(..., { eager: true })`. */
export interface ContentModule {
	frontmatter: ContentData & { title: string };
	Content?: unknown;
	url?: string;
}
