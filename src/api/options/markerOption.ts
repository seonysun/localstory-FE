import { queryOptions } from '@tanstack/react-query';

import { ENDPOINTS } from '@/api/endpoints';
import { mutationFetcher, queryFetcher } from '@/api/fetcher';

export const markerOption = {
  getMarkerList: () =>
    queryOptions({
      queryKey: ['marker', 'list'],
      queryFn: queryFetcher(ENDPOINTS.MARKER.LIST),
    }),
  postMarker: () => ({
    mutationFn: (data: any) =>
      mutationFetcher('post', ENDPOINTS.MARKER.LIST, data),
  }),
};
