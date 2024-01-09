/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.sanity.io',
            port: '',
            pathname: '/images/l7tokq15/production/**',
          },
        ],
      },
}

module.exports = nextConfig
