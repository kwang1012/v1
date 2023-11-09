module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['admin.kwang.cc', 'kwang1012.web.illinois.edu'],
  },
  async redirects() {
    return [
      {
        source: '/blog/:path*',
        destination: '/',
        permanent: true,
      },
    ];
  },
};
