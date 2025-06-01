import { StarIcon } from '@/components/icons';

import { flex } from '@root/styled-system/patterns';

type StarRatingProps = {
  value: number;
  max?: number;
};

function StarRating({ value, max = 5 }: StarRatingProps) {
  return (
    <div className={flex({ gap: 'xs' })}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.floor(value);
        return (
          <span key={i}>
            <StarIcon
              fill={filled ? '#FFD336' : '#DEDEDE'}
              width={16}
              height={16}
            />
          </span>
        );
      })}
    </div>
  );
}

export default StarRating;
