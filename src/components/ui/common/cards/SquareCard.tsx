'use client';

import { ReactNode } from 'react';
import Image from 'next/image';

import { LocationIcon } from '@/components/icons';
import {
  cardImage,
  cardImageWrapper,
  cardWrapper,
  flex,
  subText,
  titleText,
  topRightAbsolute,
} from '@/components/ui/common/cards/card.recipe';

import defaultThumbnail from '@images/default-thumbnail.png';

type SquareCardProps = {
  image: string;
  liked?: boolean;
  title?: string;
  location?: string;
  custom?: boolean;
  children?: ReactNode;
};

/**
 * SquareCard 컴포넌트
 *
 * @component
 * @example
 * <SquareCard image="/images/default-thumbnail.png" title="국제시장" location="부산 중구" />
 *
 * @example
 * <SquareCard image="/images/default-thumbnail.png" custom>
 *   <div>내가 원하는 콘텐츠</div>
 * </SquareCard>
 *
 * @param {string} image - 카드 상단에 표시할 이미지 경로
 * @param {boolean} [liked=false] - 좋아요 여부 (좋아요 버튼 컴포넌트에 전달)
 * @param {string} [title] - 기본 제목 (custom이 false일 경우 사용)
 * @param {string} [location] - 기본 위치 설명 (custom이 false일 경우 사용)
 * @param {boolean} [custom=false] - true일 경우 children 기반 사용자 정의 콘텐츠 사용
 * @param {ReactNode} [children] - custom이 true일 경우 렌더링할 사용자 정의 콘텐츠
 */

function SquareCard({
  image,
  liked = false,
  title,
  location,
  custom = false,
  children,
}: SquareCardProps) {
  return (
    <div
      className={cardWrapper({
        direction: 'col',
        align: 'start',
        gap: 'sm',
      })}
    >
      <div className={cardImageWrapper({ maxWidth: 'none' })}>
        <Image
          src={image || defaultThumbnail}
          alt={title || '카드이미지'}
          fill
          className={cardImage()}
        />
        <span className={topRightAbsolute()}>{liked ? '❤️' : '🤍'}</span>
      </div>
      {custom ? (
        children
      ) : (
        <div className={flex({ gap: 'sm' })}>
          <p className={titleText()}>{title}</p>
          <p className={subText()}>
            <LocationIcon width={16} height={16} />
            <span className={subText({ color: 'muted' })}>{location}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default SquareCard;
