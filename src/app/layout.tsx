import type { Metadata } from 'next';

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
    <html lang="ko">
      <body>
        <div
          className={css({
            minWidth: '320px',
            px: '16px',
            md: {
              px: '24px',
              maxWidth: '1024px',
              marginX: 'auto',
            },
          })}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
