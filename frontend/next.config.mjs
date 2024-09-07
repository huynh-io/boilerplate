/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "../public",
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
