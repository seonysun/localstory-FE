'use client';

import { useState } from 'react';
import { searchWrapper } from '@components/story/sections/story/recipe';
import { useQuery } from '@tanstack/react-query';

import { markerOption } from '@/api/options/markerOption';
import { CloseIcon, LocationIcon } from '@/components/icons';
import { flex, flexBetween } from '@/components/ui/common/cards/card.recipe';
import { border } from '@/components/ui/common/dropdowns/dropdown.recipe';
import { modalText } from '@/components/ui/common/modals/modal.recipe';
import { Search } from '@/components/ui/common/textfields';
import useDebounce from '@/hooks/useDebounce';
import { Marker } from '@/types/marker';

import { css, cx } from '@root/styled-system/css';

function StoryPostPlace({
  setMarker,
}: {
  setMarker: (id: number | null) => void;
}) {
  const [search, setSearch] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<Marker | null>(null);

  const debouncedSearch = useDebounce(search, 300);
  const { queryKey, queryFn } = markerOption.getMarkerList({
    search_term: debouncedSearch,
  });
  const { data } = useQuery({
    queryKey,
    queryFn,
    enabled: !!debouncedSearch,
  });
  const suggestions = data?.data;

  return (
    <div>
      {selectedPlace ? (
        <div className={cx(flexBetween(), border({ p: 2 }))}>
          <p className={flex({ direction: 'row', align: 'center', gap: 'xs' })}>
            <LocationIcon width={20} height={20} />
            {selectedPlace.markerName}
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedPlace(null);
              setMarker(null);
            }}
          >
            <CloseIcon width={20} height={20} />
          </button>
        </div>
      ) : (
        <div className={css({ position: 'relative' })}>
          <Search
            radius="md"
            placeholder="위치를 지정해주세요"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {suggestions && (
            <div className={cx(border({ color: 'gray100' }), searchWrapper())}>
              {suggestions.length > 0 ? (
                suggestions.map((item, i) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedPlace(item);
                      setSearch('');
                      setMarker(item.id);
                    }}
                    className={cx(
                      flex({
                        direction: 'row',
                        align: 'center',
                        gap: 'xs',
                        p: 'sm',
                      }),
                      css({
                        cursor: 'pointer',
                        _hover: {
                          bg: 'gray.50',
                        },
                      }),
                    )}
                  >
                    <LocationIcon width={20} height={20} />
                    <span
                      className={modalText({
                        color: 'gray500',
                        align: 'left',
                        clamp: 1,
                      })}
                    >
                      {item.markerName}
                    </span>
                  </div>
                ))
              ) : (
                <div style={{ padding: 10 }}>검색 결과가 없습니다.</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default StoryPostPlace;
