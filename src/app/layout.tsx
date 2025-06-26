import type { Metadata } from 'next';
import Script from 'next/script';
import ChatBotModal from '@components/chatBot/ChatBotModal';
import Footer from '@components/layouts/footer';
import Header from '@components/layouts/Header';
import ScrollToTopButton from '@components/layouts/ScrollToTopButton';

import Providers from '@/providers';
import AuthInitializer from '@/providers/AuthInitializer';
import ThemeInitializer from '@/providers/ThemeInitializer';

// import GlobalAuthGuard from '@/providers/GlobalAuthGuard';
import '@styles/globals.css';
import { css } from '@root/styled-system/css';

export const metadata: Metadata = {
  title: 'Local Story Map',
  description: '여행에 필요한 모든 정보',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={css({ minWidth: '320px', mt: 5, mb: 3 })}>
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
              marginTop: '3rem',
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
          {/* </GlobalAuthGuard> */}
        </Providers>
        <Script src="https://cdn.iamport.kr/v1/iamport.js" />
      </body>
    </html>
  );
}
