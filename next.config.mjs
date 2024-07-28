/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "m.media-amazon.com",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "abdus-samad-bucket-1.s3.ap-southeast-2.amazonaws.com",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
