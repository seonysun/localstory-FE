'use client';

import { ReactNode } from 'react';
import Image from 'next/image';

import {
  cardImage,
  cardImageWrapper,
  cardWrapper,
} from '@/components/ui/common/cards/card.recipe';

import defaultThumbnail from '@images/default-thumbnail.png';

import { css } from '@root/styled-system/css';

type WideCardProps = {
  image: string;
  children: ReactNode;
};

/**
 * WideCard 컴포넌트
 *
 * @component
 * @example
 * <WideCard image="/images/default-thumbnail.png">
 *   <WideCardContent />
 * </WideCard>
 *
 * @param {string} image - 카드 우측에 표시할 이미지 경로
 * @param {ReactNode} [children] - 카드 좌측에 표시할 상세 컨텐츠
 */

function WideCard({ image, children }: WideCardProps) {
  return (
    <div className={cardWrapper()}>
      <div className={cardImageWrapper()}>
        <Image
          src={image || defaultThumbnail}
          alt="썸네일"
          fill
          className={cardImage()}
        />
      </div>
      <div
        className={css({
          flex: 1,
        })}
      >
        {children}
      </div>
    </div>
  );
}

export default WideCard;
