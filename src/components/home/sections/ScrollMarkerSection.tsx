'use client';

import React from 'react';
import {
  scrollSectionInner,
  scrollSectionWrapper,
} from '@components/home/recipes/HomeSection.recipe';
import {
  scrollDescription,
  scrollMainText,
  scrollSubText,
} from '@components/home/recipes/text.recipe';
import { useScrollReveal } from '@components/home/useScrollReveal';

import { css } from '@root/styled-system/css';

function ScrollMarkerSection() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <article className={scrollSectionWrapper()}>
      <div ref={ref} className={scrollSectionInner({ visible: isVisible })}>
        <div>
          <h1 className={scrollMainText()}>마커 표시 ・ 북마크</h1>
          <h1 className={scrollSubText()}>
            숨은 로컬 맛집 <br /> 찾기가 더 간편해졌어요
          </h1>
          <h2 className={css({ textStyle: 'headline3' })}>
            여행을 하눈에, 그리고 한 번에!
          </h2>
          <p className={scrollDescription()}>
            다른 곳에서는 없던 현지인 로컬 명소를 <br />
            1LLo1LLo에서는 가능해요.
            <br />
            여행 전이든 여행 중이든 내가 가고싶은 <br />
            곳을 확인해보세요
          </p>
        </div>
      </div>
    </article>
  );
}

export default ScrollMarkerSection;
