import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Beget hosting (Apache/PHP)
  output: "export",
  images: {
    unoptimized: true, // Required for static export
  },
  // Отключаем trailing slash для совместимости с Apache
  trailingSlash: true,
  // Optimize CSS for production
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
