/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.dog.ceo'],
    unoptimized: true,
  },
  publicRuntimeConfig: {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKER,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    AppId: process.env.APP_ID,
  }
}

module.exports = nextConfig
