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
};

const withNextIntl = require("next-intl/plugin")("./i18n.ts");

module.exports = withNextIntl({
  // deine anderen Configs (images, output etc.)
});

export default nextConfig;
