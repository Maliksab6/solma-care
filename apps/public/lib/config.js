const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Solma Care',
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Hormonal health for South Asian women, explained properly. Physician-reviewed articles on PCOS, insulin resistance, thyroid, fertility, and the conditions doctors keep calling normal.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  author: process.env.NEXT_PUBLIC_AUTHOR_NAME || 'Solma Care',
  authorBio: process.env.NEXT_PUBLIC_AUTHOR_BIO || 'A researcher and writer, not a doctor. Every article is reviewed by a licensed physician before publication.',
  logo: process.env.NEXT_PUBLIC_SITE_LOGO || '/logo.png',
  favicon: '/favicon.ico',
  social: {
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || '',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/solmacare',
    pinterest: process.env.NEXT_PUBLIC_PINTEREST_URL || 'https://pinterest.com/solmacare',
    substack: process.env.NEXT_PUBLIC_SUBSTACK_URL || 'https://solmacare.substack.com',
  },
  admin: {
    name: process.env.NEXT_PUBLIC_ADMIN_NAME || 'Admin Panel',
  },
};

module.exports = siteConfig;
