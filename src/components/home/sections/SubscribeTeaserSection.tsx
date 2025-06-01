import React from 'react';
import {
  subscribeBenefitCard,
  subscribeBenefitGrid,
  subscribeTeaserWrapper,
} from '@components/home/recipes/HomeSection.recipe';
import {
  scrollDescription,
  scrollSubText,
} from '@components/home/recipes/text.recipe';
import { BookIcon, HomeMarkerIcon } from '@components/icons';

import { css } from '@root/styled-system/css';

function SubscribeTeaserSection() {
  return (
    <article className={subscribeTeaserWrapper()}>
      <div>
        <h1 className={scrollSubText()}>
          지금 시작해요 <br /> 여러분의 이야기를
        </h1>
        <h2 className={scrollDescription()}>구독하면 이런 혜택이 있어요</h2>
      </div>
      <div className={subscribeBenefitGrid()}>
        <div className={subscribeBenefitCard()}>
          <div className={css({ marginTop: '1rem' })}>
            <BookIcon width={30} height={30} />
          </div>
          <p>스토리</p>
          <p className={css({ color: 'gray.700', marginBottom: '1rem' })}>
            무제한{' '}
            <span
              className={css({
                color: 'blue',
              })}
            >
              스토리 열람
            </span>
          </p>
        </div>
        <div className={subscribeBenefitCard()}>
          <div className={css({ marginTop: '1rem' })}>
            <HomeMarkerIcon width={30} height={30} />
          </div>
          <p>지도</p>
          <p className={css({ color: 'gray.700', marginBottom: '1rem' })}>
            무제한{' '}
            <span
              className={css({
                color: 'blue',
              })}
            >
              지도 열람
            </span>
          </p>
        </div>
      </div>
    </article>
  );
}

export default SubscribeTeaserSection;
