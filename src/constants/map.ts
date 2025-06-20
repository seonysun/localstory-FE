import { ComponentType } from 'react';

import { FoodIcon, MapLocationIcon, TravelIcon } from '@/components/icons';

type MapCategory = {
  label: string;
  value: string;
  icon: ComponentType<any>;
}[];

export const MAP_CATEGORY: MapCategory = [
  { label: '관광명소', value: 'tour', icon: TravelIcon },
  { label: '로컬맛집', value: 'food', icon: FoodIcon },
  { label: '인프라', value: 'infra', icon: MapLocationIcon },
] as const;

export type CategoryValueType = (typeof MAP_CATEGORY)[number]['value'];

export const MAP_VIEW_TABS = [
  { label: '전체', value: 'all', path: '/' },
  { label: '인기', value: 'popular', path: '/' },
];

export const MAP_DROPDOWN_OPTIONS = [
  { label: '최신 등록순', value: 'latest' },
  { label: '인기순', value: 'popular' },
  { label: '거리순', value: 'distance' },
];
