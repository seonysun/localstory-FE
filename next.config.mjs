/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'k.kakaocdn.net',
      },
      {
        protocol: 'https',
        hostname: 't1.kakaocdn.net',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'localstorymap.com',
      },
      {
        protocol: 'https',
        hostname: 'localstorymap.kr.object.ncloudstorage.com',
      },
      {
        protocol: 'https',
        hostname: 'localstorymap-static.kr.object.ncloudstorage.com',
      },
      {
        protocol: 'https',
        hostname: 'kr.object.ncloudstorage.com',
      },
      {
        protocol: 'https',
        hostname: 'img1.kakaocdn.net',
      },
    ],
  },
};

export default nextConfig;
