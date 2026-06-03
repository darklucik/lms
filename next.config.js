/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["utfs.io"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.chunkFilename = "static/chunks/[name]-[contenthash].js";
    }
    return config;
  },
};

module.exports = nextConfig;
