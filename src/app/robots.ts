import type { MetadataRoute } from 'next';

const canonicalSite = 'https://www.maravillahomesforsale.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/cdn-cgi/'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/cdn-cgi/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/cdn-cgi/'],
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: ['/cdn-cgi/'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/cdn-cgi/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: ['/cdn-cgi/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/cdn-cgi/'],
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: ['/cdn-cgi/'],
      },
      {
        userAgent: 'Bytespider',
        allow: '/',
        disallow: ['/cdn-cgi/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/cdn-cgi/'],
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/cdn-cgi/'],
      },
      {
        userAgent: 'cohere-ai',
        allow: '/',
        disallow: ['/cdn-cgi/'],
      },
      {
        userAgent: 'Meta-ExternalAgent',
        allow: '/',
        disallow: ['/cdn-cgi/'],
      },
      {
        userAgent: 'meta-externalfetcher',
        allow: '/',
        disallow: ['/cdn-cgi/'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: ['/cdn-cgi/'],
      },
      {
        userAgent: 'Claude-User',
        allow: '/',
        disallow: ['/cdn-cgi/'],
      },
      {
        userAgent: 'Claude-SearchBot',
        allow: '/',
        disallow: ['/cdn-cgi/'],
      },
      {
        userAgent: 'Amazonbot',
        allow: '/',
        disallow: ['/cdn-cgi/'],
      },
      {
        userAgent: 'YouBot',
        allow: '/',
        disallow: ['/cdn-cgi/'],
      },
      {
        userAgent: 'Diffbot',
        allow: '/',
        disallow: ['/cdn-cgi/'],
      },
    ],
    sitemap: `${canonicalSite}/sitemap.xml`,
    host: canonicalSite,
  };
}
