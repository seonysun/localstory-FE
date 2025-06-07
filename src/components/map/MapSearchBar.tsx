'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { GpsLocationIcon } from '@/components/icons';
import { iconWrapper } from '@/components/map/map.recipe';
import { Search } from '@/components/ui/common/textfields';

import { css } from '@root/styled-system/css';

function MapSearchBar() {
  const router = useRouter();

  const [query, setQuery] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/map/search?query=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <>
      <div
        className={css({
          flex: 1,
          marginLeft: 10,
          paddingX: 3,
          textAlign: 'center',
        })}
      >
        <form onSubmit={onSubmit}>
          <Search
            placeholder="Search"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </form>
      </div>
      <div className={iconWrapper()}>
        <GpsLocationIcon fill="#707070" />
      </div>
    </>
  );
}

export default MapSearchBar;
