import { queryOptions } from '@tanstack/react-query';

import { ENDPOINTS } from '@/api/endpoints';
import { mutationFetcher, queryFetcher } from '@/api/fetcher';
import {
  PostRouteMarkerPayload,
  PostRoutePayload,
  PutRouteMarkerUpdate,
  Route,
  RouteMarkers,
} from '@/types/route';

type RouteListResponse = {
  data: Route[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
};

type RouteDetailResponse = {
  data: Route;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
};

export const routeOption = {
  getRouteList: (params?: Record<string, any>) =>
    queryOptions<RouteListResponse>({
      queryKey: ['route', 'list', params],
      queryFn: () =>
        queryFetcher(ENDPOINTS.ROUTE.LIST, params)().then(res => ({
          data: res.data,
          pagination: res.pagination,
        })),
    }),
  getRouteDetail: (id: number) => {
    return {
      queryKey: ['route', id],
      queryFn: () =>
        queryFetcher<RouteDetailResponse>(ENDPOINTS.ROUTE.DETAIL(id))(),
    };
  },
  postRoute: () => ({
    mutationFn: async (data: PostRoutePayload) => {
      const routeRes = await mutationFetcher(
        'post',
        ENDPOINTS.ROUTE.LIST,
        data,
      );

      return routeRes;
    },
  }),
  putRoute: (id: number) => ({
    mutationFn: () => mutationFetcher('put', ENDPOINTS.ROUTE.DETAIL(id)),
  }),
  deleteRoute: (id: number) => ({
    mutationFn: () => mutationFetcher('delete', ENDPOINTS.ROUTE.DETAIL(id)),
  }),
  postRouteLike: (id: number) => ({
    mutationFn: () => mutationFetcher('post', ENDPOINTS.ROUTE.LIKE.TOGGLE(id)),
  }),
  getRouteMarkersList: () =>
    queryOptions({
      queryKey: ['routemarkers', 'list'],
      queryFn: () => queryFetcher<RouteMarkers[]>(ENDPOINTS.ROUTEMARKER.LIST),
    }),
  postRouteMarkers: () => ({
    mutationFn: async (data: PostRouteMarkerPayload) => {
      const routeRes = await mutationFetcher(
        'post',
        ENDPOINTS.ROUTEMARKER.LIST,
        data,
      );

      return routeRes;
    },
  }),
  putRouteMarkers: (id: number) => ({
    mutationFn: () => mutationFetcher('put', ENDPOINTS.ROUTEMARKER.DETAIL(id)),
  }),
  deleteRouteMarkers: (id: number) => ({
    mutationFn: () =>
      mutationFetcher('delete', ENDPOINTS.ROUTEMARKER.DETAIL(id)),
  }),
  putRouteMarkersUpdate: () => ({
    mutationFn: (data: PutRouteMarkerUpdate) =>
      mutationFetcher('put', ENDPOINTS.ROUTEMARKER.UPDATE, data),
  }),
};
