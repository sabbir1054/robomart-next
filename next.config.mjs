/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "robomartbd.com",
        port: "",
        pathname: "/uploads/*",
      },
      {
        protocol: "https",
        hostname: "robomartbd.com",
        port: "",
        pathname: "/uploads/*",
      },
      {
        protocol: "http",
        hostname: "robomartbd.com",
        port: "",
        pathname: "/uploads/All_Product_Additional_Photo/*",
      },
      {
        protocol: "https",
        hostname: "robomartbd.com",
        port: "",
        pathname: "/uploads/All_Product_Additional_Photo/*",
      },
      {
        protocol: "http",
        hostname: "robomartbd.com",
        port: "",
        pathname: "/uploads/OurSupplier/*",
      },
      {
        protocol: "https",
        hostname: "robomartbd.com",
        port: "",
        pathname: "/uploads/OurSupplier/*",
      },
      {
        protocol: "http",
        hostname: "robomartbd.com",
        port: "",
        pathname: "/uploads/OurClient/*",
      },
      {
        protocol: "https",
        hostname: "robomartbd.com",
        port: "",
        pathname: "/uploads/OurClient/*",
      },
    ],
  },
};

export default nextConfig;
