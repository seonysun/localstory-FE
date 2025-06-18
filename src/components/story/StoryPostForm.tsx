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
import { useMutation } from '@tanstack/react-query';

import { storyOption } from '@/api/options/storyOption';
import { FEELINGS } from '@/constants/story';
import { PostStoryPayload } from '@/types/story';
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

  const renderedFeelings = FEELINGS.map(({ label: Icon, value }) => ({
    label: <Icon />,
    value,
  }));
  const [feeling, setFeeling] = useState('smile');

  const [marker, setMarker] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const { mutate } = useMutation({
    ...storyOption.postStory(),
    onSuccess: () => {
      router.push('/story');
    },
  });

  const onSubmit = () => {
    const payload: PostStoryPayload = {
      story: {
        marker,
        title,
        content,
        emoji: feeling,
      },
      images,
    };
    mutate(payload);
  };

  return (
    <div className={flex({ gap: 'xl', marginB: 'sm' })}>
      <div className={flex({ gap: 'lg', p: 'sm', marginB: 'sm' })}>
        <p className={modalText({ text: 'head4', align: 'left' })}>글작성</p>
        <StoryPostPlace setMarker={setMarker} />
        <div className={flex({ direction: 'row', gap: 'md' })}>
          <FilterDropdown
            options={getYearOptions()}
            selected={date.year}
            onChange={value => setDate(prev => ({ ...prev, year: value }))}
            minW="80px"
            disabled
          />
          <FilterDropdown
            options={getMonthOptions()}
            selected={date.month}
            onChange={value => setDate(prev => ({ ...prev, month: value }))}
            minW="80px"
            disabled
          />
          <FilterDropdown
            options={getDayOptions()}
            selected={date.day}
            onChange={value => setDate(prev => ({ ...prev, day: value }))}
            minW="80px"
            disabled
          />
          <FilterDropdown
            options={renderedFeelings}
            selected={feeling}
            onChange={value => setFeeling(value)}
            minW="54px"
          />
        </div>
        <Textarea
          size="lg"
          radius="md"
          placeholder="제목을 작성해보세요"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ height: '50px' }}
        />
        <Textarea
          size="lg"
          radius="md"
          placeholder="직접 다녀온 생생한 후기를 작성해보세요"
          value={content}
          onChange={e => setContent(e.target.value)}
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
      <Button onClick={onSubmit} color="black">
        작성 완료
      </Button>
    </div>
  );
}

export default StoryPostForm;
