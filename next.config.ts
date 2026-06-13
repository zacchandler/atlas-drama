import type { NextConfig } from "next";

// GitHub Pages serves a project repo at /<repo> — set GH_PAGES=true in CI to
// build a static export under that base path. Local dev/build stay at root.
const isPages = process.env.GH_PAGES === "true";
const basePath = isPages ? "/atlas-drama" : "";

const nextConfig: NextConfig = {
  ...(isPages ? { output: "export" as const } : {}),
  basePath: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
  // Pin the workspace root to this project (multiple lockfiles exist on the machine).
  turbopack: { root: __dirname },
  // Exposed to the client so asset() can prefix public/ files (images, videos, fonts).
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
