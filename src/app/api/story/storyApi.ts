import { ENDPOINTS } from '@/api/endpoints';
import { queryFetcher } from '@/api/fetcher';
import { Story } from '@/types/story';

export const getMyStories = (page: number = 1) => {
  return queryFetcher<{ results: Story[]; next?: string | null }>(
    ENDPOINTS.STORY.ME,
    { page },
  );
};
