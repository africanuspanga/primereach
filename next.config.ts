import type { NextConfig } from "next";

// Two build targets from one codebase:
//   • Default (Model B) — `next build`: dynamic/ISR hosting on a Node server.
//     Server Actions, API routes, admin panel and on-demand revalidation all work.
//   • Static  (Model A) — `npm run build:static` sets BUILD_TARGET=static and
//     emits a self-contained `out/` folder for static-only hosts. The admin
//     panel and API routes are excluded from that build (they need a server);
//     see scripts/build-static.mjs.
const isStatic = process.env.BUILD_TARGET === "static";

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  // Emit `out/` with an HTML file per route for static-only hosting.
  ...(isStatic ? { output: "export" as const } : {}),

  images: isStatic
    ? // No Node server to optimise images — serve Supabase URLs as-is.
      { unoptimized: true }
    : {
        // Re-enable image optimisation when a Node server is available.
        remotePatterns: supabaseHost
          ? [
              {
                protocol: "https",
                hostname: supabaseHost,
                pathname: "/storage/v1/object/public/**",
              },
            ]
          : [],
      },

  // Emit directory-style routes for clean URLs.
  trailingSlash: true,

  // Hide the on-screen Next.js dev indicator badge.
  devIndicators: false,
};

export default nextConfig;
