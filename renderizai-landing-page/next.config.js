/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [ process.env.HOSTH, "storage.googleapis.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
  env: {
    HOST: process.env.HOST,
    PORTA: process.env.PORTA
  }
};

module.exports = nextConfig;
