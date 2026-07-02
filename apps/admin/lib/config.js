const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Solma Care',
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Hormonal health for South Asian women, explained properly.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
  author: process.env.NEXT_PUBLIC_AUTHOR_NAME || 'Solma Care',
  authorBio: process.env.NEXT_PUBLIC_AUTHOR_BIO || 'A researcher and writer, not a doctor.',
  logo: process.env.NEXT_PUBLIC_SITE_LOGO || '/logo.png',
  favicon: '/favicon.ico',
  social: {
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || '',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
    pinterest: process.env.NEXT_PUBLIC_PINTEREST_URL || '',
    substack: process.env.NEXT_PUBLIC_SUBSTACK_URL || '',
  },
  admin: {
    name: process.env.NEXT_PUBLIC_ADMIN_NAME || 'Admin Panel',
  },
};

module.exports = siteConfig;
