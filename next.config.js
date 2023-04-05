/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "thumbor.forbes.com",
      },
      {
        hostname: "ipfs.pixura.io",
      },
    ],
  },
};

module.exports = nextConfig;
