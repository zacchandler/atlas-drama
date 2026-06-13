import NextLink from "next/link";
import type { ComponentProps } from "react";

/**
 * next/link with prefetch disabled by default. On a static export (GitHub Pages)
 * the RSC prefetch payloads (__next.*.txt) aren't served, so prefetch only
 * produces harmless 404s in the console. Full navigation still works.
 * An explicit `prefetch` prop still overrides this default.
 */
export default function Link(props: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={false} {...props} />;
}
