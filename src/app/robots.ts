import type { MetadataRoute } from 'next';

const canonicalSite = 'https://www.maravillahomesforsale.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/_next/static/', '/cdn-cgi/'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/_next/static/', '/cdn-cgi/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/_next/static/', '/cdn-cgi/'],
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: ['/_next/static/', '/cdn-cgi/'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/_next/static/', '/cdn-cgi/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: ['/_next/static/', '/cdn-cgi/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/_next/static/', '/cdn-cgi/'],
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: ['/_next/static/', '/cdn-cgi/'],
      },
      {
        userAgent: 'Bytespider',
        allow: '/',
        disallow: ['/_next/static/', '/cdn-cgi/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/_next/static/', '/cdn-cgi/'],
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/_next/static/', '/cdn-cgi/'],
      },
      {
        userAgent: 'cohere-ai',
        allow: '/',
        disallow: ['/_next/static/', '/cdn-cgi/'],
      },
      {
        userAgent: 'Meta-ExternalAgent',
        allow: '/',
        disallow: ['/_next/static/', '/cdn-cgi/'],
      },
      {
        userAgent: 'meta-externalfetcher',
        allow: '/',
        disallow: ['/_next/static/', '/cdn-cgi/'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: ['/_next/static/', '/cdn-cgi/'],
      },
      {
        userAgent: 'Claude-User',
        allow: '/',
        disallow: ['/_next/static/', '/cdn-cgi/'],
      },
      {
        userAgent: 'Claude-SearchBot',
        allow: '/',
        disallow: ['/_next/static/', '/cdn-cgi/'],
      },
      {
        userAgent: 'Amazonbot',
        allow: '/',
        disallow: ['/_next/static/', '/cdn-cgi/'],
      },
      {
        userAgent: 'YouBot',
        allow: '/',
        disallow: ['/_next/static/', '/cdn-cgi/'],
      },
      {
        userAgent: 'Diffbot',
        allow: '/',
        disallow: ['/_next/static/', '/cdn-cgi/'],
      },
    ],
    sitemap: `${canonicalSite}/sitemap.xml`,
    host: canonicalSite,
  };
}
