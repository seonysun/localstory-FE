'use client';

import { useState } from 'react';

import { categoryTitle, gridLayout } from '@/components/map/map.recipe';
import { flex } from '@/components/ui/common/cards/card.recipe';
import SquareCard from '@/components/ui/common/cards/SquareCard';
import { MAP_VIEW_TABS } from '@/constants/map';

import { css, cx } from '@root/styled-system/css';

function MapTabs() {
  const [selectedTab, setSelectedTab] = useState('all');

  return (
    <>
      <nav
        className={flex({
          direction: 'row',
          gap: 'lg',
          marginB: 'sm',
          px: 'sm',
        })}
      >
        {MAP_VIEW_TABS.map(({ label, value }) => (
          <button
            key={value}
            type="button"
            className={categoryTitle({
              textStyle: selectedTab === value ? 'label1' : 'body2',
              active: selectedTab === value,
            })}
            onClick={() => setSelectedTab(value)}
          >
            {label}
          </button>
        ))}
      </nav>
      <div
        className={cx(
          gridLayout({ marginB: 'sm' }),
          css({
            gridTemplateColumns: {
              base: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }),
        )}
      >
        <SquareCard
          image="/images/default-thumbnail.png"
          title="국제시장"
          location="부산 중구"
        />
        <SquareCard image="" title="국제시장" location="부산 중구" liked />
        <SquareCard image="" title="국제시장" location="부산 중구" liked />
        <SquareCard image="" title="국제시장" location="부산 중구" liked />
      </div>
    </>
  );
}

export default MapTabs;
