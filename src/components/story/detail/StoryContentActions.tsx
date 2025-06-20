'use client';

import React from 'react';
import { Button } from '@components/ui/common/buttons/Button';

import { css } from '@root/styled-system/css';

function StoryContentActions() {
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        ml: 'auto',
      })}
    >
      <Button size="sm" color="outlineSoft">
        팔로우
      </Button>
      <Button size="sm" color="outlineSoft">
        글수정
      </Button>
      <Button size="sm" color="outlineSoft">
        글삭제
      </Button>
    </div>
  );
}

export default StoryContentActions;
