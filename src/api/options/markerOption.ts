import { queryOptions } from '@tanstack/react-query';

import { ENDPOINTS } from '@/api/endpoints';
import { mutationFetcher, queryFetcher } from '@/api/fetcher';
import { Marker } from '@/types/marker';
import { Story } from '@/types/story';

type MarkerListResponse = {
  data: Marker[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
};

type MarkerStoryResponse = {
  data: Story[];
  count: number;
};

export const markerOption = {
  getMarkerList: (params?: Record<string, any>) =>
    queryOptions<MarkerListResponse>({
      queryKey: ['marker', 'list', params],
      queryFn: () =>
        queryFetcher(ENDPOINTS.MARKER.LIST, params)().then(res => ({
          data: res.data,
          pagination: res.pagination,
        })),
    }),
  getMarkerDetail: (id: number) =>
    queryOptions<Marker>({
      queryKey: ['marker', id],
      queryFn: queryFetcher(ENDPOINTS.MARKER.DETAIL(id)),
    }),
  getMarkerStory: (id: number) =>
    queryOptions<MarkerStoryResponse>({
      queryKey: ['marker', 'story', id],
      queryFn: () =>
        queryFetcher(ENDPOINTS.STORY.MARKER(id))().then(res => ({
          data: res.results,
          count: res.count,
        })),
    }),
  postMarker: () => ({
    mutationFn: (data: any) =>
      mutationFetcher('post', ENDPOINTS.MARKER.LIST, data),
  }),
  postMarkerLike: (id: number) => ({
    mutationFn: () => mutationFetcher('post', ENDPOINTS.MARKER.LIKE.TOGGLE(id)),
  }),
};
