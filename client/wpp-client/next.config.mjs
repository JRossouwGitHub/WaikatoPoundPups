/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost", "picsum.photos"],
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/index",
      },
    ];
  },
};

export default nextConfig;
