import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getLocale } from 'next-intl/server'
import { AuroraBackground } from '@/components/ui/AuroraBackground'
import { GlobalModalManager } from '@/components/modals/GlobalModalManager'
import './globals.css'

// Fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Space Grotesk as alternative to Clash Display (similar aesthetic)
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'ETHER - Premium VJ Loops Marketplace',
    template: '%s | ETHER',
  },
  description:
    'Descubra milhares de loops de vídeo de alta qualidade, criados pelos melhores motion designers do mundo. Licenciados para uso comercial.',
  keywords: [
    'VJ loops',
    'motion graphics',
    'video loops',
    'visual effects',
    'VFX',
    'motion design',
    'marketplace',
  ],
  authors: [{ name: 'ETHER' }],
  creator: 'ETHER',
  publisher: 'ETHER',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ether.io'),
  openGraph: {
    title: 'ETHER - Premium VJ Loops Marketplace',
    description:
      'Descubra milhares de loops de vídeo de alta qualidade para uso comercial.',
    url: '/',
    siteName: 'ETHER',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ETHER - Premium VJ Loops Marketplace',
    description:
      'Descubra milhares de loops de vídeo de alta qualidade para uso comercial.',
  },
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
}

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <AuroraBackground />
          <GlobalModalManager />
          <div className="relative z-10 noise-overlay">
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
