export type Marker = {
  id: number;
  markerName: string;
  adress: string;
  description: string;
  image: string;
  latitude: number;
  longitude: number;
  created_at: string;
  layer: 'tour' | 'food' | 'infra' | string;
  likeCount: number;
};
