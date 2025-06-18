import { queryOptions } from '@tanstack/react-query';

import { ENDPOINTS } from '@/api/endpoints';
import { mutationFetcher, queryFetcher } from '@/api/fetcher';
import { Marker } from '@/types/marker';

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
  getMarkerList: (params?: Record<string, any>) =>
    queryOptions<MarkerListResponse>({
      queryKey: ['marker', 'list', params],
      queryFn: () =>
        queryFetcher(ENDPOINTS.MARKER.LIST, params)().then(res => ({
          data: res.data,
          pagination: res.pagination,
        })),
    }),
  postMarker: () => ({
    mutationFn: (data: any) =>
      mutationFetcher('post', ENDPOINTS.MARKER.LIST, data),
  }),
};
