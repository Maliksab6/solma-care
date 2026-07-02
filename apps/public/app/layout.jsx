import './globals.css'
import { Lora, DM_Sans } from 'next/font/google'
import Providers from '@/components/common/Providers'
import siteConfig from '@/lib/config'

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dmsans',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — South Asian Women's Metabolic & Hormonal Health`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `${siteConfig.name} provides evidence-based health guidance on PCOS, insulin resistance, thyroid conditions, and metabolic health — specifically for South Asian women in Pakistan and India who've been told their results are "normal."`,
  keywords: [
    "South Asian women's health",
    "PCOS South Asian women",
    "insulin resistance South Asian",
    "hormonal health blog",
    "thyroid South Asian women",
    "South Asian fertility",
    "PCOS Pakistan",
    "PCOS India",
    "metabolic health South Asian",
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ? {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  } : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_PK',
    title: `${siteConfig.name} — Your Results Were "Normal". Your Body Disagreed.`,
    description: 'Evidence-based metabolic and hormonal health guidance for South Asian women. PCOS, thyroid, insulin resistance — the diagnoses that get missed.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Hormonal health for South Asian women`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — South Asian Women's Health`,
    description: 'PCOS, insulin resistance, thyroid conditions — evidence-based guidance for South Asian women.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: siteConfig.url,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2D1B3D',
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  description: 'Evidence-based health resource for South Asian women dealing with PCOS, insulin resistance, thyroid conditions, and metabolic health in Pakistan and India.',
  founder: {
    '@type': 'Person',
    name: 'Salma Tabbsum',
  },
  sameAs: [
    'https://instagram.com/solmacare',
    'https://tiktok.com/@solmacare',
    'https://pinterest.com/solmacare',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  author: {
    '@type': 'Person',
    name: siteConfig.author,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteConfig.url}/blog?search={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lora.variable} ${dmSans.variable}`}>
      <head>
        <link rel="alternate" type="application/rss+xml" title={`${siteConfig.name} RSS Feed`} href={`${siteConfig.url}/feed.xml`} />
      </head>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
