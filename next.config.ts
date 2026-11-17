import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the old static-site URLs working (search engines, Stripe review, saved links).
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/terms.html", destination: "/terms", permanent: true },
      { source: "/refund.html", destination: "/refunds", permanent: true },
      { source: "/refund", destination: "/refunds", permanent: true },
      { source: "/privacy.html", destination: "/privacy", permanent: true },
    ];
  },
};

export default nextConfig;
