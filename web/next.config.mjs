import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack dev persistence can fail on some machines (e.g. corrupted cache, synced folders).
  // See: https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopackPersistentCaching
  experimental: {
    turbopackFileSystemCacheForDev: false,
    // Large admin saves (e.g. hero gallery base64) — align with backend body limit.
    proxyClientMaxBodySize: "50mb",
  },
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;

