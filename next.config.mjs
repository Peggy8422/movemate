/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads/**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_DEV_BASE_URL: process.env.NEXT_PUBLIC_DEV_BASE_URL || "http://localhost:3000",
    NEXT_PUBLIC_API_BASE_URL: "https://946a-35-212-196-54.ngrok-free.app",
  },
};

export default nextConfig;
