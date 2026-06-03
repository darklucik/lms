/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  images: {
    domains: ["utfs.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "public.blob.vercel-storage.com",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@vercel/blob"],
  },
};

module.exports = nextConfig;
