import React from 'react';

import PaymentSection from '@/app/payment/_components/PaymentSection';

export const metadata = {
  title: '상품 결제 | OZ',
  description:
    '스토리와 여행 상세 정보를 포함한 플래너 정기구독 상품을 결제하세요.',
  openGraph: {
    title: '상품 결제 | OZ',
    description:
      '스토리와 여행 상세 정보를 포함한 플래너 정기구독 상품을 결제하세요.',
    url: 'https://www.localstorymap.com/payment',
    siteName: 'OZ',
    images: [
      {
        url: '/images/mainStory.png',
        width: 1200,
        height: 630,
        alt: '플래너 결제 대표 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '상품 결제 | OZ',
    description:
      '스토리와 여행 상세 정보를 포함한 플래너 정기구독 상품을 결제하세요.',
    images: ['/images/mainStory.png'],
  },
  keywords: ['결제', '정기구독', '플래너', '여행', 'OZ', '스토리'],
};

function Page() {
  return <PaymentSection />;
}

export default Page;
