import { queryOptions } from '@tanstack/react-query';

import { ENDPOINTS } from '@/api/endpoints';
import { mutationFetcher, queryFetcher } from '@/api/fetcher';
import { MapDropdownValueType } from '@/constants/map';
import { Marker } from '@/types/marker';
import { Story } from '@/types/story';

type MarkerSearchParams = {
  search_term?: string;
  sort?: MapDropdownValueType;
  latitude?: number;
  longitude?: number;
  layer?: string;
};

type MarkerListResponse = {
  data: Marker[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
};

export const markerOption = {
  getMarkerList: (params?: MarkerSearchParams) =>
    queryOptions<MarkerListResponse>({
      queryKey: ['marker', 'list', params],
      queryFn: () =>
        queryFetcher(ENDPOINTS.MARKER.LIST, params)().then(res => ({
          data: res.data,
          pagination: res.pagination,
        })),
    }),
  getMarkerDetail: (id: number) => {
    return {
      queryKey: ['marker', id],
      queryFn: () => queryFetcher<Marker>(ENDPOINTS.MARKER.DETAIL(id))(),
    };
  },
  getMarkerStory: (id: number) =>
    queryOptions({
      queryKey: ['marker', 'story', id],
      queryFn: queryFetcher<Story[]>(ENDPOINTS.STORY.MARKER(id)),
    }),
  postMarkerLike: () => ({
    mutationFn: (id: number) =>
      mutationFetcher('post', ENDPOINTS.MARKER.LIKE.TOGGLE(id)),
  }),
};
