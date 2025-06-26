import type { StoryType } from './story.types';

export type BookmarkType = {
  id: number; // 북마크 ID
  story: number; // 스토리 ID
  storyDetail: StoryType;
};

export type BookmarkListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: BookmarkType[];
};

export type BookmarkToggleResponse = {
  id: number; // 북마크 ID
  story: number;
  storyDetail: StoryType;
};
