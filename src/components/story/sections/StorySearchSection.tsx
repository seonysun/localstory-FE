'use client';

import React from 'react';
import { Search } from '@components/ui/common/textfields';

import { css } from '@root/styled-system/css';

function StorySearchSection() {
  return (
    <article className={css({ mt: 24 })}>
      <div>
        <Search />
      </div>
    </article>
  );
}

export default StorySearchSection;
