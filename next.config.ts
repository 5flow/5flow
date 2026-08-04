import type { NextConfig } from 'next';

const mediaHost = process.env.WP_MEDIA_HOST || 'localhost';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/videos/product-demos/1',
        destination: 'https://www.5flowtech.com',
        permanent: true,
      },
      {
        source: '/videos/product-demos/2',
        destination: 'https://www.5flowtech.com',
        permanent: true,
      },
      {
        source: '/videos/product-demos/3',
        destination: 'https://www.5flowtech.com',
        permanent: true,
      },
      {
        source: '/videos/product-demos/4',
        destination: 'https://www.5flowtech.com',
        permanent: true,
      },
      {
        source: '/webinars/register/1',
        destination: 'https://www.5flowtech.com',
        permanent: true,
      },
      {
        source: '/webinars/register/2',
        destination: 'https://www.5flowtech.com',
        permanent: true,
      },
      {
        source: '/webinars/register/3',
        destination: 'https://www.5flowtech.com',
        permanent: true,
      },
      {
        source: '/webinars/register/4',
        destination: 'https://www.5flowtech.com',
        permanent: true,
      },
      {
        source: '/solutions/data-analytics',
        destination: 'https://www.5flowtech.com/solutions/data-analysis',
        permanent: true,
      },
      {
        source: '/guides/topic/1',
        destination: 'https://www.5flowtech.com',
        permanent: true,
      },
      {
        source: '/guides/topic/2',
        destination: 'https://www.5flowtech.com',
        permanent: true,
      },
      {
        source: '/guides/topic/3',
        destination: 'https://www.5flowtech.com',
        permanent: true,
      },
      {
        source: '/guides/topic/4',
        destination: 'https://www.5flowtech.com',
        permanent: true,
      },
      {
        source: '/case-studies/beauty',
        destination:
          'https://www.5flowtech.com/resources/case-studies/centralized-artwork-governance-driving-compliance-and-faster-market-access',
        permanent: true,
      },
      {
        source: '/case-studies/fnb',
        destination:
          'https://www.5flowtech.com/resources/case-studies/centralized-artwork-governance-driving-compliance-and-faster-market-access',
        permanent: true,
      },
      {
        source: '/case-studies/pharma',
        destination:
          'https://www.5flowtech.com/resources/case-studies/centralized-artwork-governance-driving-compliance-and-faster-market-access',
        permanent: true,
      },
      {
        source: '/case-studies/retail',
        destination:
          'https://www.5flowtech.com/resources/case-studies/centralized-artwork-governance-driving-compliance-and-faster-market-access',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: mediaHost,
      },
      {
        protocol: 'http',
        hostname: mediaHost,
      },
      new URL('https://img.youtube.com/**'),
      new URL('https://cms.5flowtech.com/**'),
    ],
  },
};

export default nextConfig;
