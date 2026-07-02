import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

export const dynamic = 'force-dynamic'

export const metadata = {
  title: { default: 'Admin Panel | Solma Care', template: '%s | Solma Care Admin' },
  description: 'Manage your Solma Care blog.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} bg-gray-50 text-gray-800 antialiased`}>
        {children}
      </body>
    </html>
  )
}
