import { queryOptions } from '@tanstack/react-query';

import { ENDPOINTS } from '@/api/endpoints';
import { mutationFetcher, queryFetcher } from '@/api/fetcher';
import { instance } from '@/api/instance';
import { PostStoryPayload, StoryImage } from '@/types/story';

type StoryImageResponse = {
  data: StoryImage[];
  count: number;
};

export const storyOption = {
  getStoryImage: (id: number) =>
    queryOptions<StoryImageResponse>({
      queryKey: ['story', 'image', id],
      queryFn: () =>
        queryFetcher(ENDPOINTS.STORY_IMAGE.LIST(id))().then(res => ({
          data: res.results,
          count: res.count,
        })),
    }),
  postStory: () => ({
    mutationFn: async ({ story, images }: PostStoryPayload) => {
      const storyRes = await mutationFetcher(
        'post',
        ENDPOINTS.STORY.LIST,
        story,
      );

      const formData = new FormData();

      const { storyId } = storyRes;
      formData.append('story_id', storyId);
      images.forEach(image => formData.append('image_file', image));

      await instance.post(ENDPOINTS.STORY_IMAGE.UPLOAD(storyId), formData, {
        headers: {
          'Content-Type': undefined,
        },
      });

      return storyRes;
    },
  }),
  postLikeStory: (storyId: string) => ({
    mutationFn: (isLiked: boolean) => {
      if (isLiked) {
        return mutationFetcher('post', ENDPOINTS.STORYLIKE.LIKE(storyId), {});
      }
      return mutationFetcher('delete', ENDPOINTS.STORYLIKE.LIKE(storyId), {});
    },
  }),
};
