'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { storyButtonGroup } from '@components/story/sections/story.recipe';
import { Button } from '@components/ui/common/buttons/Button';
import { Search } from '@components/ui/common/textfields';

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

  const onSortClick = (sortValue: string) => {
    const params = new URLSearchParams();
    params.set('sort', sortValue);
    setSearch('');
    router.push(`/story?${params.toString()}`);
  };

  return (
    <article className={css({ mb: 12 })}>
      <Search
        value={search}
        placeholder="게시물을 검색해보세요"
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <div className={storyButtonGroup()}>
        <Button size="sm" color="outline" onClick={onResetClick}>
          전체 보기
        </Button>
        <Button
          size="sm"
          color="outline"
          onClick={() => onSortClick('popular')}
        >
          인기순
        </Button>
        <Button size="sm" color="outline" onClick={() => onSortClick('latest')}>
          최신순
        </Button>
      </div>
    </article>
  );
}

export default StorySearchSection;
