import type { Metadata } from 'next';
import Footer from '@components/layouts/footer';
import Header from '@components/layouts/Header';

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
    <html lang="ko" className={css({ minWidth: '320px' })}>
      <body
        className={css({
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        })}
      >
        <Header />
        <main
          className={css({
            flexGrow: 1,
            width: '100%',
            maxWidth: '1024px',
            mx: 'auto',
            px: '16px',
          })}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
