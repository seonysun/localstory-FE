'use client';

import React from 'react';
import { Search } from '@components/ui/common/textfields';

import { css } from '@root/styled-system/css';

function StorySearchSection() {
  return (
    <article className={css({ mt: 24 })}>
      <div>
        <Search placeholder="유저 이름을 검색해주세요..." />
      </div>
    </article>
  );
}

export default StorySearchSection;
