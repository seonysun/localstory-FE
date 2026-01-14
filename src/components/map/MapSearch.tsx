'use client';

import { useSearchParams } from 'next/navigation';

import MapResults from '@/components/map/MapResults';
import MapViewContainer from '@/components/map/MapViewContainer';

function MapSearch() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  if (query) {
    return <MapResults query={query} />;
  }

  return <MapViewContainer />;
}

export default MapSearch;
