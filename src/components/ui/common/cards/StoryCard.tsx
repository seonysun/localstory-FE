'use client';

import Image from 'next/image';

import {
  cardImage,
  cardWrapper,
  flex,
  gridImageWrapper,
  subText,
  titleText,
} from '@/components/ui/common/cards/card.recipe';

import defaultUserProfile from '@images/default-userImage.png';

import { css, cx } from '@root/styled-system/css';

type StoryCardProps = {
  images?: string[];
  userProfile?: string;
  title?: string;
  content?: string;
};

/**
 * StoryCard 컴포넌트
 *
 * @component
 * @example
 * <StoryCard
 *   images={[
 *     '/images/story-sample.png',
 *   ]}
 *   userProfile="/images/default-userImage.png"
 *   title="홍선성현형님 서울 후기"
 *   content="사진찍기 좋은 명소!"
 * />
 *
 * @param {string[]} [images] - 카드 상단에 표시할 이미지 리스트 (최대 5개까지 렌더링)
 * @param {string} [userProfile] - 프로필 이미지 경로 (없으면 기본 이미지 표시)
 * @param {string} [title] - 카드 제목 텍스트
 * @param {string} [content] - 카드 설명 텍스트
 */

function StoryCard({ images, userProfile, title, content }: StoryCardProps) {
  const imageCount = images?.length ?? 0;
  const layout = String(Math.min(imageCount, 5));

  return (
    <div
      className={cardWrapper({
        position: 'relative',
        direction: 'col',
        align: 'start',
        gap: 'none',
        p: 'none',
        radius: 'sm',
      })}
    >
      <div
        className={gridImageWrapper({
          layout: layout as '1' | '2' | '3' | '4' | '5',
        })}
      >
        {images?.slice(0, 5).map((src, i) => (
          <div
            key={i}
            className={css({
              position: 'relative',
              ...(i === 0 && layout === '5' ? { gridRow: 'span 2' } : {}),
            })}
          >
            <Image
              src={src}
              alt={`스토리 이미지 ${i + 1}`}
              fill
              className={cardImage()}
            />
          </div>
        ))}
      </div>
      <div
        className={css({
          position: 'absolute',
          top: '175px',
          left: 4,
          w: '48px',
          h: '48px',
          borderRadius: 'full',
          overflow: 'hidden',
        })}
      >
        <Image src={userProfile || defaultUserProfile} alt="프로필" fill />
      </div>
      <div className={cx(css({ mt: 2 }), flex({ gap: 'md', p: 'lg' }))}>
        <p className={titleText({ color: 'gray600' })}>{title}</p>
        <p className={subText({ textStyle: 'label2', color: 'black' })}>
          {content}
        </p>
        <p className={subText()}>#부산 #여행</p>
      </div>
    </div>
  );
}

export default StoryCard;
