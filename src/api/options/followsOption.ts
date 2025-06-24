import { ENDPOINTS } from '@/api/endpoints';
import { mutationFetcher } from '@/api/fetcher';

export const followsOption = {
  postFollows: () => ({
    mutationFn: ({ nickname }: { nickname?: string }) => {
      return mutationFetcher('post', ENDPOINTS.FOLLOWS.LIST, { nickname });
    },
  }),
  deleteFollows: (id: string) => ({
    mutationFn: () => {
      return mutationFetcher('delete', ENDPOINTS.FOLLOWS.DETAIL(id));
    },
  }),
};
