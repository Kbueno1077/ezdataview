/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack: (config, {}) => {
    config.resolve.alias["@"] = path.join(__dirname, "src");
    return config;
  },
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lottie.host",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
