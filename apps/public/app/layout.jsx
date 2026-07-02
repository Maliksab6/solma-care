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
  title: { default: `${siteConfig.name} — Hormonal Health for South Asian Women`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: [
    "South Asian women's health",
    "PCOS South Asian women",
    "insulin resistance South Asian",
    "hormonal health blog",
    "thyroid South Asian women",
    "South Asian fertility",
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
    title: `${siteConfig.name} — Hormonal Health for South Asian Women`,
    description: "Your results were 'normal.' Your body disagreed. Physician-reviewed hormonal and metabolic health content written for South Asian women.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Hormonal health for South Asian women`,
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — Hormonal Health for South Asian Women`,
    description: 'Physician-reviewed hormonal and metabolic health content, written for South Asian women.',
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
  description: siteConfig.description,
  founder: {
    '@type': 'Person',
    name: siteConfig.author,
  },
  sameAs: Object.values(siteConfig.social).filter(Boolean),
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
