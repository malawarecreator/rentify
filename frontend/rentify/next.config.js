/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://rentify-85260599486.us-west1.run.app/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
