'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { gridLayout } from '@components/map/map.recipe';
import StoryPostPlace from '@components/story/sections/StoryPostPlace';
import { Button } from '@components/ui/common/buttons/Button';
import { flex } from '@components/ui/common/cards/card.recipe';
import FilterDropdown from '@components/ui/common/dropdowns/FilterDropdown';
import { modalText } from '@components/ui/common/modals/modal.recipe';
import { Textarea } from '@components/ui/common/textfields';

import {
  getDayOptions,
  getMonthOptions,
  getToday,
  getYearOptions,
} from '@/util/date';

import { css } from '@root/styled-system/css';

function StoryPostForm() {
  const router = useRouter();

  const [date, setDate] = useState(getToday());

  return (
    <div className={flex({ gap: 'xl', marginB: 'sm' })}>
      <div className={flex({ gap: 'lg', p: 'sm', marginB: 'sm' })}>
        <p className={modalText({ text: 'head4', align: 'left' })}>글작성</p>
        <StoryPostPlace />
        <div className={flex({ direction: 'row', gap: 'md' })}>
          <FilterDropdown
            options={getYearOptions()}
            selected={date.year}
            onChange={value => setDate(prev => ({ ...prev, year: value }))}
          />
          <FilterDropdown
            options={getMonthOptions()}
            selected={date.month}
            onChange={value => setDate(prev => ({ ...prev, month: value }))}
          />
          <FilterDropdown
            options={getDayOptions()}
            selected={date.day}
            onChange={value => setDate(prev => ({ ...prev, day: value }))}
          />
        </div>
        <Textarea
          size="lg"
          radius="md"
          placeholder="제목을 작성해보세요"
          style={{ height: '50px' }}
        />
        <Textarea
          size="lg"
          radius="md"
          placeholder="직접 다녀온 생생한 후기를 작성해보세요"
          className={css({
            minH: {
              base: '150px',
              md: '250px',
            },
            fontWeight: '400',
          })}
        />
        <Button color="outline" size="sm">
          이미지/동영상 첨부
        </Button>
        <div className={gridLayout({ columns: 4, p: 'xs', gap: 'sm' })}>
          이미지 미리보기 영역
        </div>
      </div>
      <Button onClick={() => router.push(`/story`)} color="black">
        작성 완료
      </Button>
    </div>
  );
}

export default StoryPostForm;
