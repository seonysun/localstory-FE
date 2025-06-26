import { ENDPOINTS } from '@api/endpoints';
import { instance } from '@api/instance';

import type {
  BookmarkListResponse,
  BookmarkToggleResponse,
} from '@/types/bookmark';

export const bookmarkOption = {
  getBookmarks: (page?: number) => ({
    queryKey: ['bookmarks', page],
    queryFn: async () => {
      const params = page ? { page } : {};
      const res = await instance.get<BookmarkListResponse>(
        ENDPOINTS.BOOKMARK.LIST,
        { params },
      );
      return res.data;
    },
  }),

  toggleBookmark: (storyId: string, bookmarkId?: number) => ({
    mutationFn: async (isCurrentlyBookmarked: boolean) => {
      if (isCurrentlyBookmarked && bookmarkId) {
        // 북마크 삭제 - bookmark ID 사용
        await instance.delete(ENDPOINTS.BOOKMARK.DETAIL(bookmarkId));
        return { isBookmarked: false };
      }
      if (!isCurrentlyBookmarked) {
        // 북마크 추가 - story ID 사용
        const res = await instance.post<BookmarkToggleResponse>(
          ENDPOINTS.BOOKMARK.DETAIL(Number(storyId)),
          { story: Number(storyId) },
        );
        return { isBookmarked: true, bookmarkId: res.data.id };
      }
      return { isBookmarked: isCurrentlyBookmarked };
    },
  }),

  // 스토리 ID로 북마크 ID 찾기
  findBookmarkByStoryId: (storyId: string) => ({
    queryKey: ['bookmark', 'story', storyId],
    queryFn: async () => {
      const res = await instance.get<BookmarkListResponse>(
        ENDPOINTS.BOOKMARK.LIST,
      );
      const bookmark = res.data.results.find(b => String(b.story) === storyId);
      return bookmark?.id || null;
    },
  }),
};
