'use client';

import { ReactNode } from 'react';

import { CalendarIcon, LocationIcon } from '@/components/icons';
import {
  cardWrapper,
  flex,
  subText,
  titleText,
  topRightAbsolute,
} from '@/components/ui/common/cards/card.recipe';
import FeelingIcon from '@/components/ui/feelings/FeelingIcon';
import StarRating from '@/components/ui/ratings/StarRating';
import { feelings } from '@/constants/story';

type WideCardContentProps = {
  title: string;
  subtitle?: string;
  date?: boolean;
  rating?: number | string;
  footerType?: 'feeling' | 'location';
  footerText?: string;
  action?: ReactNode;
  onClick?: () => void;
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
 * @param {string} [footerText] - 하단 설명 텍스트, 'feeling'일 경우 감정값(smile, angry 등)
 * @param {ReactNode} [action] - 우측 상단에 표시할 추가 액션 요소 (예: 좋아요 버튼)
 */

function WideCardContent({
  title,
  subtitle,
  date = false,
  rating,
  footerType,
  footerText,
  action,
  onClick,
}: WideCardContentProps) {
  const renderFooterIcon = (type?: 'feeling' | 'location', value?: string) => {
    if (!type || !value) return null;

    if (type === 'feeling') return <FeelingIcon value={value} />;
    if (type === 'location')
      return (
        <LocationIcon width={20} height={20} fill="#A5A7B5" strokeWidth={0.2} />
      );

    return null;
  };

  return (
    <div
      className={cardWrapper({
        position: 'static',
        direction: 'col',
        align: 'start',
        p: 'xs',
        shadow: 'none',
      })}
      onClick={onClick}
    >
      <p className={titleText()}>{title}</p>
      <div className={topRightAbsolute({ top: 3, right: 3 })}>{action}</div>
      {subtitle && (
        <div className={subText()}>
          {date && <CalendarIcon />}
          <span>{subtitle}</span>
        </div>
      )}
      {rating && (
        <div className={flex({ direction: 'row', align: 'center', gap: 'sm' })}>
          <StarRating value={Number(rating)} />
          <span className={subText()}>{rating}</span>
        </div>
      )}
      {footerText && (
        <div className={flex({ direction: 'row', align: 'center', gap: 'xs' })}>
          {renderFooterIcon(footerType, footerText)}
          <span className={subText({ color: 'muted', clamp: 1 })}>
            {footerType === 'feeling'
              ? (feelings.find(f => f.value === footerText)?.description ??
                footerText)
              : footerText}
          </span>
        </div>
      )}
    </div>
  );
}

export default WideCardContent;
