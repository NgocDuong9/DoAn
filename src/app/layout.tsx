import AuthProvider from '@/components/context/auth.context'
import { CartProvider } from '@/components/context/cart.context'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import 'dayjs/locale/vi'
import './globals.css'
import { NotifyProvider } from '@/components/context/notify.context'

import Layout from '@/components/custom/layout/layout'
import ProgressProvider from '@/components/loading/ProgressProvider'
import { theme } from '@/libs/theme'

import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { DatesProvider } from '@mantine/dates'
import { Notifications } from '@mantine/notifications'
import { Be_Vietnam_Pro, Inter } from 'next/font/google'
import MetaDataProvider from '@/components/context/metadata.context'
import Script from 'next/script'
import Head from 'next/head'
import { Viewport } from 'next'
import { AI } from '@/libs/chat/actions'
import { nanoid } from 'nanoid'
import ChatWithAI from '@/components/header/_components/ChatWithAI'
import { AiChatProvider } from '@/components/context/ai.chat.context'

// swipper

const inter = Inter({ subsets: ['latin'] })
const be_vn_pro = Be_Vietnam_Pro({
  subsets: ['vietnamese'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800']
})

const siteConfig = {
  name: 'TROLYoto.com',
  description:
    'TROLYoto.com - Nơi cung cấp các dịch vụ và sản phẩm xe hàng đầu. Khám phá các mẫu xe mới nhất, dịch vụ bảo dưỡng chuyên nghiệp và nhiều tiện ích khác dành cho xe của bạn.'
}

export async function generateMetadata() {
  return {
    title: siteConfig.name,
    description: siteConfig.description,
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico'
    },
    openGraph: {
      title: siteConfig.name,
      description: siteConfig.description,
      images: []
    }
  }
}

export const viewport: Viewport = {
  initialScale: 1.0,
  width: 'device-width',
  maximumScale: 1.0,
  userScalable: false
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-0TRSREVFJE"
        />
        <Script src="/js/analytics.js" />
      </head>
      <body suppressHydrationWarning className={be_vn_pro.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M5F2NL3R"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <ProgressProvider>
          <AuthProvider>
            <MetaDataProvider>
              <MantineProvider theme={theme}>
                <Notifications
                  position="top-center"
                  style={{
                    width: '280px'
                  }}
                />
                <DatesProvider
                  settings={{
                    locale: 'vi',
                    firstDayOfWeek: 0,
                    weekendDays: [0],
                    timezone: 'UTC'
                  }}
                >
                  <NotifyProvider>
                    <CartProvider>
                      {/* @ts-ignore */}
                      <AI initialAIState={{ chatId: nanoid(), messages: [] }}>
                        <AiChatProvider>
                          <Layout>{children}</Layout>
                          {/* <SpeedInsights /> */}
                        </AiChatProvider>
                      </AI>
                    </CartProvider>
                  </NotifyProvider>
                </DatesProvider>
              </MantineProvider>
            </MetaDataProvider>
          </AuthProvider>
        </ProgressProvider>
      </body>
    </html>
  )
}
