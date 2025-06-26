import type { Metadata } from 'next';
import Script from 'next/script';
import ChatBotModal from '@components/chatBot/ChatBotModal';
import Footer from '@components/layouts/footer';
import Header from '@components/layouts/Header';
import ScrollToTopButton from '@components/layouts/ScrollToTopButton';
import { Toaster } from 'sonner';

import Providers from '@/providers';
import AuthInitializer from '@/providers/AuthInitializer';
import ThemeInitializer from '@/providers/ThemeInitializer';

// import GlobalAuthGuard from '@/providers/GlobalAuthGuard';
import '@styles/globals.css';
import { css } from '@root/styled-system/css';

export const metadata: Metadata = {
  title: 'Local Story Map',
  description:
    '여행에 필요한 모든 정보, 현지인 로컬 명소, 스토리, 지도, 구독 혜택까지! 1LLo1LLo에서 여행을 한눈에, 그리고 한 번에!',
  keywords: [
    '여행',
    '스토리',
    '지도',
    '로컬',
    '맛집',
    '구독',
    'Local Story Map',
    '1LLo1LLo',
  ],
  authors: [{ name: '1LLo1LLo', url: 'https://www.localstorymap.com/' }],
  openGraph: {
    title: 'Local Story Map',
    description:
      '여행에 필요한 모든 정보, 현지인 로컬 명소, 스토리, 지도, 구독 혜택까지! 1LLo1LLo에서 여행을 한눈에, 그리고 한 번에!',
    url: 'https://www.localstorymap.com/',
    siteName: 'Local Story Map',
    images: [
      {
        url: '/images/hero.png',
        width: 1200,
        height: 630,
        alt: 'Local Story Map 대표 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Local Story Map',
    description:
      '여행에 필요한 모든 정보, 현지인 로컬 명소, 스토리, 지도, 구독 혜택까지! 1LLo1LLo에서 여행을 한눈에, 그리고 한 번에!',
    images: ['/images/hero.png'],
    creator: '@localstorymap',
  },
  metadataBase: new URL('https://www.localstorymap.com/'),
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={css({ minWidth: '320px' })}>
      <body
        className={css({
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        })}
      >
        <Providers>
          <AuthInitializer />
          <ThemeInitializer />
          {/* <GlobalAuthGuard> */}
          <Header />
          <main
            className={css({
              flexGrow: 1,
              width: '100%',
              maxWidth: '1024px',
              marginTop: '64px',
              mx: 'auto',
              px: '16px',
              md: {
                px: '24px',
              },
            })}
          >
            {children}
          </main>
          <ScrollToTopButton />
          <ChatBotModal />
          <Footer />
          <Toaster
            richColors
            position="top-left"
            toastOptions={{
              duration: 1000,
            }}
          />
          {/* </GlobalAuthGuard> */}
        </Providers>
        <Script src="https://cdn.iamport.kr/v1/iamport.js" />
      </body>
    </html>
  );
}
