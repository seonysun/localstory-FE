import { ComponentType } from 'react';

import { CoffeeIcon, FoodIcon, MapLocationIcon } from '@/components/icons';

type MapCategory = {
  label: string;
  path: string;
  icon: ComponentType<any>;
}[];

export const MAP_CATEGORY: MapCategory = [
  { label: '관광명소', path: '/', icon: MapLocationIcon },
  { label: '로컬맛집', path: '/', icon: FoodIcon },
  { label: '카페', path: '/', icon: CoffeeIcon },
];

export const MAP_VIEW_TABS = [
  { label: '전체', value: 'all', path: '/' },
  { label: '인기', value: 'popular', path: '/' },
];
