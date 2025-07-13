import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import { Header } from '@/components/layout'
import ThemeProvider from '@/providers/ThemeProvider'
import './globals.css'

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'XRPL Wiz',
  description: 'The All-in-One Ops Deck for XRPL'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
