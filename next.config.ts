import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed output: "export" to enable API routes for Vercel
  images: {
    unoptimized: false, // Enable image optimization on Vercel
  },
};

export default nextConfig;
