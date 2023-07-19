module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['lsalab.cs.nthu.edu.tw', 'admin.kwang.cc'],
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
