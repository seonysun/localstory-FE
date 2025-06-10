'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { flex, flexBetween } from '@/components/ui/common/cards/card.recipe';
import WideCard from '@/components/ui/common/cards/WideCard';
import WideCardContent from '@/components/ui/common/cards/WideCardContent';
import FilterDropdown from '@/components/ui/common/dropdowns/FilterDropdown';
import { modalText } from '@/components/ui/common/modals/modal.recipe';
import { Likes } from '@/components/ui/common/toggles';
import { MAP_DROPDOWN_OPTIONS } from '@/constants/map';
import { locationList } from '@/mocks/mapDetail';

function MapResults({ query }: { query: string }) {
  const router = useRouter();

  const [selected, setSelected] = useState(MAP_DROPDOWN_OPTIONS[0].value);
  const data = locationList;

  return (
    <div className={flex({ p: 'md', marginB: 'sm' })}>
      {query.trim() === '' || data.length < 1 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <div className={flex({ gap: 'lg' })}>
          <div className={flexBetween()}>
            <span className={modalText({ text: 'search' })}>{query}</span>
            <div>
              <FilterDropdown
                options={MAP_DROPDOWN_OPTIONS}
                selected={selected}
                onChange={value => setSelected(value)}
              />
            </div>
          </div>
          <div className={flex({ gap: 'lg' })}>
            {data.map(place => (
              <WideCard key={place.id} image={place.image}>
                <WideCardContent
                  title={place.title}
                  subtitle={place.type}
                  date={false}
                  rating={place.rating}
                  footerType="location"
                  footerText={place.location}
                  action={<Likes liked={place.liked} />}
                  onClick={() => router.push(`/map/${place.id}`)}
                />
              </WideCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MapResults;
