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
  postComment: (storyId: string) => ({
    mutationFn: ({
      content,
      parent,
    }: {
      content?: string;
      parent?: number | null;
    }) => {
      return mutationFetcher('post', ENDPOINTS.COMMENT.LIST(storyId), {
        content,
        parent,
      });
    },
  }),
  deleteComment: (storyId: string, commentId: string) => ({
    mutationFn: () => {
      return mutationFetcher(
        'delete',
        ENDPOINTS.COMMENT.DETAIL(storyId, commentId),
      );
    },
  }),
  patchComment: (storyId: string, commentId: string) => ({
    mutationFn: ({
      content,
      parent,
    }: {
      content?: string;
      parent?: number | null;
    }) => {
      return mutationFetcher(
        'patch',
        ENDPOINTS.COMMENT.DETAIL(storyId, commentId),
        {
          content,
          parent,
        },
      );
    },
  }),
  postCommentLike: (storyId: string, commentId: string) => ({
    mutationFn: (newLiked: boolean) => {
      if (newLiked) {
        return mutationFetcher(
          'post',
          ENDPOINTS.COMMENTLIKE.DETAIL(storyId, commentId),
        );
      }
      return mutationFetcher(
        'delete',
        ENDPOINTS.COMMENTLIKE.DETAIL(storyId, commentId),
      );
    },
  }),
};
