'use client';

import { ReactNode } from 'react';

import { CalendarIcon, LocationIcon } from '@/components/icons';
import {
  cardWrapper,
  flexBetween,
  subText,
  titleText,
} from '@/components/ui/common/cards/card.recipe';
import StarRating from '@/components/ui/common/ratings/StarRating';

type WideCardContentProps = {
  title: string;
  subtitle?: string;
  date?: boolean;
  rating?: number | string;
  footerType?: 'feeling' | 'location';
  footerText?: string;
  action?: ReactNode;
};

/**
 * WideCardContent 컴포넌트
 *
 * @component
 * @example
 * <WideCardContent
 *   title="부산 국제시장"
 *   subtitle="2025.06.30"
 *   rating={4.8}
 *   footerType="location"
 *   footerText="부산광역시 중구 어쩌구"
 *   action={<HeartButton />}
 * />
 *
 * @param {string} title - 카드 상단의 제목 텍스트
 * @param {string} [subtitle] - 날짜 혹은 부가 설명 등 카드 중간 설명 텍스트
 * @param {boolean} [date=true] - 캘린더 아이콘을 subtitle 앞에 표시할지 여부
 * @param {number|string} [rating] - 평점 숫자. 별점과 함께 출력됨
 * @param {'feeling' | 'location'} [footerType] - 하단 아이콘 종류
 * @param {string} [footerText] - 하단 설명 텍스트
 * @param {ReactNode} [action] - 우측 상단에 표시할 추가 액션 요소 (예: 좋아요 버튼)
 */

function WideCardContent({
  title,
  subtitle,
  date = true,
  rating,
  footerType,
  footerText,
  action,
}: WideCardContentProps) {
  const ICON_MAP = {
    feeling: '😀',
    location: (
      <LocationIcon width={20} height={20} fill="#A5A7B5" strokeWidth={0.2} />
    ),
  } as const;

  const icon = footerType ? ICON_MAP[footerType] : null;

  return (
    <div
      className={cardWrapper({
        direction: 'col',
        align: 'start',
        p: 'xs',
        shadow: 'none',
      })}
    >
      <div className={flexBetween()}>
        <span className={titleText()}>{title}</span>
        {action}
      </div>
      <p className={subText()}>
        {date && <CalendarIcon />}
        <span>{subtitle}</span>
      </p>
      {rating && (
        <div className={subText({ gap: 'md' })}>
          <StarRating value={Number(rating)} />
          <span>{rating}</span>
        </div>
      )}
      {footerText && (
        <p className={subText({ color: 'muted' })}>
          {icon}
          <span>{footerText}</span>
        </p>
      )}
    </div>
  );
}

export default WideCardContent;
