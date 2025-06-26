'use client';

import { useEffect, useState } from 'react';
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
import FileUploadButton from '@/components/ui/maps/FileUploadButton';
import { FEELINGS } from '@/constants/story';
import { PostStoryPayload, StoryImage } from '@/types/story';
import {
  getDayOptions,
  getMonthOptions,
  getToday,
  getYearOptions,
} from '@/util/date';

import { css } from '@root/styled-system/css';

type Props = {
  initialData?: PostStoryPayload['story'];
  storyId?: number;
};

function StoryPostForm({ initialData, storyId }: Props) {
  const router = useRouter();

  const renderedFeelings = FEELINGS.map(({ label: Icon, value }) => ({
    label: <Icon />,
    value,
  }));

  const [date, setDate] = useState(getToday());
  const [marker, setMarker] = useState<number | null>(
    initialData?.marker ?? null,
  );
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [content, setContent] = useState(initialData?.content ?? '');
  const [feeling, setFeeling] = useState(initialData?.emoji ?? 'smile');
  // 신규로 추가하는 이미지 (파일 객체만 관리)
  const [images, setImages] = useState<File[]>([]);
  // 기존에 등록된 이미지 (수정 시 미리보기 용도)
  const [originImages] = useState<StoryImage[]>(initialData?.storyImages ?? []);

  const postMutation = useMutation({
    ...storyOption.postStory(),
    onSuccess: res => router.push(`/story/${res.storyId}`),
  });

  const patchMutation = useMutation({
    ...storyOption.patchStory(),
    onSuccess: () => router.push(`/story/${storyId}`),
  });

  useEffect(() => {
    if (!initialData) return;
    setMarker(initialData.marker ?? null);
    setTitle(initialData.title ?? '');
    setContent(initialData.content ?? '');
    setFeeling(initialData.emoji ?? 'smile');
  }, [initialData]);

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

    if (storyId) {
      patchMutation.mutate({ ...payload, storyId });
    } else {
      postMutation.mutate(payload);
    }
  };

  return (
    <div className={flex({ gap: 'xl', marginB: 'sm' })}>
      <div className={flex({ gap: 'lg', p: 'sm', marginB: 'sm' })}>
        <p className={modalText({ text: 'head4', align: 'left' })}>
          {storyId ? '글 수정' : '글 작성'}
        </p>
        <StoryPostPlace marker={marker} setMarker={setMarker} />
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
        {/* 기존 이미지 미리보기 */}
        {originImages.length > 0 && (
          <div className={gridLayout({ columns: 3, p: 'xs', gap: 'sm' })}>
            {originImages.map((img, idx) => (
              <img
                key={img.imageId}
                src={img.imageUrl}
                alt={`업로드 이미지 ${idx + 1}`}
                style={{ width: '100%', objectFit: 'cover', borderRadius: 8 }}
              />
            ))}
          </div>
        )}
        <FileUploadButton setImages={setImages} />
        {/* 새로 업로드하는 이미지 */}
        <div className={gridLayout({ columns: 3, p: 'xs', gap: 'sm' })}>
          {images.map((file, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(file)}
              alt={`미리보기 ${idx + 1}`}
              style={{ width: '100%', objectFit: 'cover', borderRadius: 8 }}
              onLoad={e =>
                URL.revokeObjectURL((e.target as HTMLImageElement).src)
              }
            />
          ))}
        </div>
      </div>
      <Button
        onClick={onSubmit}
        color="black"
        disabled={postMutation.isPending || patchMutation.isPending}
      >
        {storyId ? '수정 완료' : '작성 완료'}
      </Button>
    </div>
  );
}

export default StoryPostForm;
