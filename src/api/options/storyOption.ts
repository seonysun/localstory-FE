import { queryOptions } from '@tanstack/react-query';

import { ENDPOINTS } from '@/api/endpoints';
import { mutationFetcher, queryFetcher } from '@/api/fetcher';
import { instance } from '@/api/instance';
import { PostStoryPayload } from '@/types/story';

export const storyOption = {
  postStory: () => ({
    mutationFn: async ({ story, images }: PostStoryPayload) => {
      const storyRes = await mutationFetcher(
        'post',
        ENDPOINTS.STORY.LIST,
        story,
      );

      // const storyId = storyRes.id;
      // const formData = new FormData();
      // formData.append('story_id', storyId);
      // images.forEach(image => formData.append('image_url', image));

      // await instance.post(ENDPOINTS.STORY_IMAGE.UPLOAD, formData, {
      //   headers: {
      //     'Content-Type': undefined,
      //   },
      // });

      return storyRes;
    },
  }),
};
