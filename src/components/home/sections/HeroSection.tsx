import React from 'react';
import Image from 'next/image';
import {
  heroImage,
  heroSection,
  heroText,
} from '@components/home/recipes/HomeSection.recipe';

function HeroSection() {
  return (
    <article className={heroSection()}>
      <Image
        src="/images/hero.jpg"
        alt="hero"
        width={1200}
        height={500}
        className={heroImage()}
      />
      <p className={heroText()}>
        계획부터 추천까지, 여행이 쉬워지는 <br />
        나를 아는 여행
      </p>
    </article>
  );
}

export default HeroSection;
