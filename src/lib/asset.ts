// Prefixes a public/ asset path with the deploy base path (e.g. "/atlas-drama"
// on GitHub Pages, "" everywhere else) so images/videos/fonts resolve correctly
// whether the site is served from root or a project subpath.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path) return path;
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
