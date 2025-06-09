'use client';

import { useEffect, useState } from 'react';

import { CloseIcon, LocationIcon } from '@/components/icons';
import { flex, flexBetween } from '@/components/ui/common/cards/card.recipe';
import { border } from '@/components/ui/common/dropdowns/dropdown.recipe';
import { modalText } from '@/components/ui/common/modals/modal.recipe';
import { Search } from '@/components/ui/common/textfields';
import { searchPlace } from '@/mocks/searchPlace';

import { css, cx } from '@root/styled-system/css';

function StoryPostPlace() {
  const [search, setSearch] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!search) {
      setSuggestions([]);
      return;
    }

    const data = searchPlace;
    setSuggestions(data);
  }, [search]);

  return (
    <div>
      {selectedPlace ? (
        <div className={cx(flexBetween(), border({ p: 2 }))}>
          <p className={flex({ direction: 'row', align: 'center', gap: 'xs' })}>
            <LocationIcon width={20} height={20} />
            {selectedPlace}
          </p>
          <button type="button" onClick={() => setSelectedPlace(null)}>
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
          {suggestions.length > 0 && (
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
              {suggestions.map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedPlace(item);
                    setSearch('');
                    setSuggestions([]);
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
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default StoryPostPlace;
