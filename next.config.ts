import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export → outputs a fully static site to ./out that can be
  // hosted on any static host (Render Static Site, Netlify, GitHub Pages, S3…).
  output: "export",

  // Static export has no image optimization server, so images are served as-is.
  // (Consider compressing the source photos — some are 15–20MB.)
  images: { unoptimized: true },

  // Emit directory-style routes (e.g. /about/index.html) so static hosts serve
  // clean URLs reliably without extra rewrite rules.
  trailingSlash: true,
};

export default nextConfig;
