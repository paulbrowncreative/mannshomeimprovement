import type { NextConfig } from "next";

/**
 * Fully static export (`out/`) for Netlify. There is no server: the estimate
 * form is handled by Netlify Forms, and HTTP headers live in public/_headers.
 */
const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,
  images: {
    // No image optimization server in a static export. Add project photos
    // pre-sized (≤2000px, WebP/JPG ~80% quality) — see README.
    unoptimized: true,
  },
};

export default nextConfig;
