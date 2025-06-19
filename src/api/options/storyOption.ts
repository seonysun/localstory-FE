import { ENDPOINTS } from '@/api/endpoints';
import { mutationFetcher } from '@/api/fetcher';
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
    mutationFn: (liked: boolean) => {
      if (liked) {
        return mutationFetcher('post', ENDPOINTS.STORYLIKE.LIKE(storyId), {});
      }
      return mutationFetcher('delete', ENDPOINTS.STORYLIKE.LIKE(storyId), {});
    },
  }),
};
