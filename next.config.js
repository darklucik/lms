/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  images: {
    domains: ["utfs.io"],
  },
};

module.exports = nextConfig;
