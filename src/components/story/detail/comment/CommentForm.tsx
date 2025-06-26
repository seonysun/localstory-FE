'use client';

import React, { useState } from 'react';
import { storyOption } from '@api/options/storyOption';
import { Button } from '@components/ui/common/buttons/Button';
import { Input } from '@components/ui/common/textfields';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { css } from '@root/styled-system/css';

import { InputMode } from '@/types/story.types';

type Props = {
  storyId: string;
  mode: 'edit' | 'reply' | 'none';
  parentId: number | null;
  targetId: number | null;
  onCancel?: () => void;
  onSuccess?: () => void;
};

function CommentForm({
  storyId,
  mode,
  parentId,
  targetId,
  onCancel,
  onSuccess,
}: Props) {
  const INITIAL_INPUT_MODE: InputMode = {
    mode,
    payload: {
      targetId: targetId ?? null,
      parent: parentId ?? null,
      content: '',
    },
  };
  const queryClient = useQueryClient();
  const [value, setValue] = useState(INITIAL_INPUT_MODE);
  const mutation = useMutation({
    ...(mode === 'edit'
      ? storyOption.patchComment(storyId, String(targetId))
      : storyOption.postComment(storyId)),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['comment', storyId] });
      if (onSuccess) onSuccess();
      toast.success('댓글이 등록되었습니다!');
    },
    onError: () => {
      toast.error('댓글 등록에 실패했습니다!');
    },
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(prev => ({
      ...prev,
      payload: {
        ...prev.payload,
        content: e.target.value,
      },
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === 'edit') {
      mutation.mutate({
        content: value.payload.content ?? '',
      });
    } else {
      mutation.mutate({
        content: value.payload.content ?? '',
        parent: value.payload.parent,
      });
    }
    setValue(INITIAL_INPUT_MODE);
  };
  return (
    <form
      onSubmit={onSubmit}
      className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 24,
        mt: 2,
      })}
    >
      <Input
        name="content"
        value={value.payload.content ?? ''}
        placeholder="댓글을 입력하세요..."
        onChange={onChange}
      />
      <Button
        type="submit"
        color="custom"
        disabled={!value.payload.content?.trim()}
        aria-label="댓글 등록"
        className={css({
          width: '20%',
          px: '20px',
          py: '18px',
          _hover: {
            bg: 'blue.50',
          },
        })}
      >
        등록
      </Button>
      {onCancel && (mode === 'edit' || mode === 'reply') && (
        <Button
          type="button"
          color="custom"
          onClick={onCancel}
          aria-label="댓글 등록 취소"
          className={css({
            width: '20%',
            px: '20px',
            py: '18px',
            _hover: {
              bg: 'blue.50',
              color: 'red',
            },
          })}
        >
          취소
        </Button>
      )}
    </form>
  );
}

export default CommentForm;
