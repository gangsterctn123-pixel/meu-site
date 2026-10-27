import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // O repositório tem outro projeto na raiz; fixa a raiz deste app.
  turbopack: { root: path.resolve(".") },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
};

export default nextConfig;
