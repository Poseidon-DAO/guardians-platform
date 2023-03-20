/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["cdn.mos.cms.futurecdn.net", "thumbor.forbes.com"],
  },
};

module.exports = nextConfig;
