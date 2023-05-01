/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.dog.ceo'],
    unoptimized: true,
  }
}

module.exports = nextConfig
