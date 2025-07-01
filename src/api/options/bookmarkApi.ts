import { ENDPOINTS } from '@/api/endpoints';
import { mutationFetcher, queryFetcher } from '@/api/fetcher';
import { BookmarkType } from '@/types/bookmark';

// 북마크 목록 조회 - API가 배열을 직접 반환하는 경우
export const getBookmarks = (page: number = 1) => {
  return queryFetcher<BookmarkType[]>( // 배열로 변경
    `${ENDPOINTS.BOOKMARK.LIST}?page=${page}`,
  );
};

export const addBookmark = async (storyId: number): Promise<BookmarkType> => {
  return mutationFetcher<BookmarkType>('post', ENDPOINTS.BOOKMARK.LIST, {
    story: storyId,
  });
};

export const deleteBookmark = async (bookmarkId: number): Promise<void> => {
  return mutationFetcher('delete', ENDPOINTS.BOOKMARK.DETAIL(bookmarkId));
};
