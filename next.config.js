/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    domains: ['placehold.co',"bukzdjainbkqkqqfnbnz.supabase.co"],
  },
  experimental: {
    serverActions: true,
  },
  output: "standalone"
};

module.exports = nextConfig;
