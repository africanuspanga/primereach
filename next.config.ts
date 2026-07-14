import type { NextConfig } from "next";

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  // Dynamic/ISR hosting (Model B). Remove static export to enable server
  // features: Server Actions, API routes, middleware, and on-demand revalidation.
  // output: "export",

  // Re-enable image optimisation now that a Node server is available.
  images: {
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
