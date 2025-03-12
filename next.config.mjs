/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
  },
};

export default nextConfig;
