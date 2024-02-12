import createJiti from "jiti";

const jiti = createJiti(new URL(import.meta.url).pathname);
jiti("./src/lib/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [{ hostname: "avatars.githubusercontent.com" }],
  },
};

export default nextConfig;
