import React from 'react';

import { css } from '@root/styled-system/css';

const shimmerClass = css({
  animation: 'shimmer 1.5s infinite linear',
  background: 'linear-gradient(90deg, #f2f2f2 25%, #e0e0e0 50%, #f2f2f2 75%)',
  backgroundSize: '200% 100%',
});

// keyframes 직접 추가
const style = `
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;

function StoryDetailSkeleton() {
  return (
    <>
      <style>{style}</style>
      <article>
        <div
          className={[
            css({
              width: '100%',
              aspectRatio: '4 / 5',
              borderRadius: 8,
              mb: 10,
            }),
            shimmerClass,
          ].join(' ')}
        />
        <div className={css({ mb: 6 })}>
          <div
            className={[
              css({ width: '18%', height: 8, borderRadius: 2, mb: 4 }),
              shimmerClass,
            ].join(' ')}
          />
          <div
            className={[
              css({ width: '28%', height: 10, borderRadius: 2, mb: 4 }),
              shimmerClass,
            ].join(' ')}
          />
          <div
            className={[
              css({ width: '60%', height: 10, borderRadius: 2 }),
              shimmerClass,
            ].join(' ')}
          />
        </div>
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            mb: 6,
          })}
        >
          <div
            className={[
              css({ width: 24, height: 24, borderRadius: '50%' }),
              shimmerClass,
            ].join(' ')}
          />
          <div
            className={[
              css({ width: 28, height: 10, borderRadius: 2 }),
              shimmerClass,
            ].join(' ')}
          />
        </div>
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            mb: 6,
          })}
        >
          <div
            className={[
              css({ width: 12, height: 12, borderRadius: '50%' }),
              shimmerClass,
            ].join(' ')}
          />
          <div
            className={[
              css({ width: 10, height: 8, borderRadius: 2 }),
              shimmerClass,
            ].join(' ')}
          />
          <div
            className={[
              css({ width: 12, height: 12, borderRadius: '50%' }),
              shimmerClass,
            ].join(' ')}
          />
          <div
            className={[
              css({ width: 10, height: 8, borderRadius: 2 }),
              shimmerClass,
            ].join(' ')}
          />
        </div>
        <div
          className={[
            css({ width: '100%', height: 12, borderRadius: 2 }),
            shimmerClass,
          ].join(' ')}
        />
      </article>
    </>
  );
}

export default StoryDetailSkeleton;
