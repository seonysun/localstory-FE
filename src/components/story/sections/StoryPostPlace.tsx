'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { markerOption } from '@/api/options/markerOption';
import { CloseIcon, LocationIcon } from '@/components/icons';
import { flex, flexBetween } from '@/components/ui/common/cards/card.recipe';
import { border } from '@/components/ui/common/dropdowns/dropdown.recipe';
import { modalText } from '@/components/ui/common/modals/modal.recipe';
import { Search } from '@/components/ui/common/textfields';

import { css, cx } from '@root/styled-system/css';

function StoryPostPlace({
  setMarker,
}: {
  setMarker: (id: number | null) => void;
}) {
  const [search, setSearch] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

  const { queryKey, queryFn } = markerOption.getMarkerList({
    search_term: search,
  });
  const { data: suggestions } = useQuery({
    queryKey,
    queryFn,
    enabled: !!search,
  });

  return (
    <div>
      {selectedPlace ? (
        <div className={cx(flexBetween(), border({ p: 2 }))}>
          <p className={flex({ direction: 'row', align: 'center', gap: 'xs' })}>
            <LocationIcon width={20} height={20} />
            {selectedPlace}
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
            <div
              className={cx(
                border({ color: 'gray100' }),
                css({
                  width: '100%',
                  position: 'absolute',
                  top: 12,
                  zIndex: 100,
                  bgColor: 'white',
                }),
              )}
            >
              {suggestions.length > 0 ? (
                suggestions.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setSelectedPlace(item);
                      setSearch('');
                      setMarker(1);
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
                    <span className={modalText({ color: 'gray500' })}>
                      {item}
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
