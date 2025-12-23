/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "p16-images-comn-sg.tokopedia-static.net",
        port: "",
        pathname: "/**", // bisa gunakan pattern untuk folder tertentu
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**", // bisa gunakan pattern untuk folder tertentu
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
