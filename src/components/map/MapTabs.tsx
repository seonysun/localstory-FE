'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { markerOption } from '@/api/options/markerOption';
import { categoryTitle, gridLayout } from '@/components/map/map.recipe';
import { flex } from '@/components/ui/common/cards/card.recipe';
import SquareCard from '@/components/ui/common/cards/SquareCard';
import { MAP_VIEW_TABS } from '@/constants/map';

import { css, cx } from '@root/styled-system/css';

function MapTabs() {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState('all');

  const { data } = useQuery(
    markerOption.getMarkerList({
      sort: selectedTab === 'all' ? 'latest' : selectedTab,
    }),
  );
  const locationList = data?.data ?? [];

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
              cursor: 'pointer',
              hover: 'on',
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
        {locationList.map(place => (
          <SquareCard
            key={place.id}
            id={place.id}
            image={place.image}
            title={place.markerName}
            location={place.adress}
            liked={place.isLiked}
            onClick={() => router.push(`/map/${place.id}`)}
          />
        ))}
      </div>
    </>
  );
}

export default MapTabs;
