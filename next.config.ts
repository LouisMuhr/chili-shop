/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  output: "standalone",
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
};

export default nextConfig;