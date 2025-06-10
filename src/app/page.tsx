import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { scrollSectionInner } from '@components/home/recipes/HomeSection.recipe';
import { scrollSubText } from '@components/home/recipes/text.recipe';
import HeroSection from '@components/home/sections/HeroSection';
import ScrollMarkerSection from '@components/home/sections/ScrollMarkerSection';
import SubscribeTeaserSection from '@components/home/sections/SubscribeTeaserSection';
import { Button } from '@components/ui/common/buttons/Button';

import { css } from '@root/styled-system/css';

const SearchStorySection = dynamic(
  () => import('@components/home/sections/SearchStorySection'),
  {
    loading: () => (
      <div
        className={css({
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bg: 'gray.100',
          borderRadius: 'sm',
        })}
      >
        <p>로딩 중...</p>
      </div>
    ),
    ssr: false,
  },
);

export default function Home() {
  return (
    <section>
      <HeroSection />
      <ScrollMarkerSection />
      <article className={scrollSectionInner()}>
        <div>
          <Image
            src="/images/section.png"
            alt="section"
            width={1200}
            height={500}
            loading="lazy"
            className={css({
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 'sm',
            })}
          />
        </div>
      </article>
      <Suspense fallback={<div>...로딩중 </div>}>
        <SearchStorySection />
      </Suspense>
      <SubscribeTeaserSection />
      <article>
        <div className={css({ textAlign: 'center', mb: '24' })}>
          <h1 className={scrollSubText()}>함께할 준비가 되었나요?</h1>
          <Button size="lg">구독하러 가기</Button>
        </div>
      </article>
    </section>
  );
}
