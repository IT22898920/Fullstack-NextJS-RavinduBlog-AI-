/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["i.ibb.co"]
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "course.zinotrustacademy.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
