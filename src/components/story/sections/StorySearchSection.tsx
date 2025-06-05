'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  storyButtonGroup,
  storyInput,
} from '@components/story/sections/story.recipe';
import { Button } from '@components/ui/common/buttons/Button';

import { css } from '@root/styled-system/css';

function StorySearchSection({ keyword }: { keyword: string }) {
  const [search, setSearch] = useState(keyword);
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const params = new URLSearchParams();
    if (e.key === 'Enter' && search.trim() !== '') {
      params.set('q', search);
      setSearch('');
      router.push(`/story?${params.toString()}`);
    } else {
      params.delete('q');
      router.push(`/story?${params.toString()}`);
    }
  };

  const onResetClick = () => {
    setSearch('');
    router.replace('/story');
  };

  const onRegionClick = (region: string) => {
    const params = new URLSearchParams();
    params.set('region', region);
    setSearch('');
    router.push(`/story?${params.toString()}`);
  };

  return (
    <article className={css({ mb: 12 })}>
      <input
        type="text"
        value={search}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={storyInput()}
      />
      <div className={storyButtonGroup()}>
        <Button size="sm" color="outline" onClick={onResetClick}>
          전체 보기
        </Button>

        <Button
          size="sm"
          color="outline"
          onClick={e => onRegionClick(e.currentTarget.innerText)}
        >
          서울
        </Button>
        <Button
          size="sm"
          color="outline"
          onClick={e => onRegionClick(e.currentTarget.innerText)}
        >
          부산
        </Button>
        <Button
          size="sm"
          color="outline"
          onClick={e => onRegionClick(e.currentTarget.innerText)}
        >
          전주
        </Button>
        <Button
          size="sm"
          color="outline"
          onClick={e => onRegionClick(e.currentTarget.innerText)}
        >
          화성
        </Button>
      </div>
    </article>
  );
}

export default StorySearchSection;
