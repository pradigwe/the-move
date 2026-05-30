import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // DEVELOPMENT_ADDRESS: environment variable for development IP address
  allowedDevOrigins: [
    process.env.DEVELOPMENT_ADDRESS!,
    process.env.PHONE_ADDRESS!,
  ],
};

export default nextConfig;
