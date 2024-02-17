import "./src/lib/env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "r2.khmer.codes" },
    ],
  },
};

export default nextConfig;
