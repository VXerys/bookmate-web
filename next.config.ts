import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // AGENTS.md is rendered by the SDD adapters (`npm run adapters:sync`); next dev must not append to it.
  agentRules: false,
  // Hides the floating Next.js badge in development; compile and runtime errors still show.
  devIndicators: false,
  cacheComponents: true,
  // Baseline security headers (F-010 FR-001). A CSP is not set yet: Next's inline RSC payload scripts need nonces,
  // which would make every page dynamic; revisit with the deploy decision.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
