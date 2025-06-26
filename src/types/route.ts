import { Marker } from '@/types/marker';

export type Route = {
  id: number;
  user: string;
  name: string;
  description: string;
  likeCount: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  markerCount: number;
  markers: RouteMarker[];
  isLiked: boolean;
};

export type RouteMarker = Marker & {
  routeMarkerId: number;
  sequence: number;
};

export type PostRoutePayload = {
  name: string;
  description: string;
  isPublic: boolean;
};

export type RouteMarkers = {
  routeMarkerId: number;
  routeId: number;
  markerId: number;
  sequence: number;
  createdAt: string;
  updatedAt: string;
  route: Route;
  marker: Marker;
};

export type PostRouteMarkerPayload = {
  route_id: number;
  marker_id: number | null;
  sequence: number;
};

export type PutRouteMarkerUpdate = {
  routeId: number;
  markers: { routeMarkerId: number; sequence: number }[];
};
