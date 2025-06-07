'use client';

import { useSearchParams } from 'next/navigation';

import MapResults from '@/components/map/MapResults';

function MapSearch() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  return <div>{query ? <MapResults query={query} /> : <div>지도</div>}</div>;
}

export default MapSearch;
