import { ENDPOINTS } from '@/api/endpoints';
import { mutationFetcher } from '@/api/fetcher';
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
  postLikeStory: (storyId: string) => ({
    mutationFn: (liked: boolean) => {
      if (liked) {
        return mutationFetcher('post', ENDPOINTS.STORYLIKE.LIKE(storyId), {});
      }
      return mutationFetcher('delete', ENDPOINTS.STORYLIKE.LIKE(storyId), {});
    },
  }),
};
