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
import BenefitCard from '@components/ui/common/cards/BenefitCard';

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
          <BenefitCard
            title="스토리"
            icon="book"
            content={
              <>
                <span>무제한</span>&nbsp;
                <span className={css({ color: 'primary' })}>스토리 열람</span>
              </>
            }
          />
          <BenefitCard
            title="지도"
            icon="map"
            content={
              <>
                <span>무제한</span>&nbsp;
                <span className={css({ color: 'primary' })}>지도 열람</span>
              </>
            }
          />
        </div>
      </div>
    </article>
  );
}

export default SubscribeTeaserSection;
