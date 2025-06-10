'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { GpsLocationIcon } from '@/components/icons';
import { iconWrapper } from '@/components/map/map.recipe';
import { Search } from '@/components/ui/common/textfields';

import { css } from '@root/styled-system/css';

type SearchBarProps = {
  basePath?: string;
  placeholder?: string;
};

function SearchBar({
  basePath = 'map',
  placeholder = 'Search',
}: SearchBarProps) {
  const router = useRouter();

  const [query, setQuery] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(
        `/${basePath}/search?query=${encodeURIComponent(query.trim())}`,
      );
      setQuery('');
    }
  };

  return (
    <div
      className={css({
        flex: 1,
        display: 'flex',
        justifyContent: { base: 'center', md: 'flex-start' },
        alignItems: 'center',
        gap: { base: '6%', md: 4 },
        paddingLeft: { base: '6%', md: 2 },
        textAlign: 'center',
      })}
    >
      <form
        onSubmit={onSubmit}
        className={css({
          flex: 1,
          maxWidth: { base: '100%', md: '350px' },
        })}
      >
        <Search
          placeholder={placeholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </form>
      {basePath === 'map' && (
        <div
          className={iconWrapper()}
          onClick={() => router.push('/map/search')}
        >
          <GpsLocationIcon fill="#707070" />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
