import type { Metadata } from 'next'
import { IBM_Plex_Sans_Thai } from 'next/font/google'
import './globals.css'

import { APP_CONFIG } from '@/config/app'

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  variable: '--font-ibm-thai',
  subsets: ['latin', 'thai'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: APP_CONFIG.name,
  description: APP_CONFIG.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibmPlexSansThai.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
