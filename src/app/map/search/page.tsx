import { Suspense } from 'react';

import MapSearch from '@/components/map/MapSearch';

function page() {
  return (
    <Suspense fallback={<div>로딩 중</div>}>
      <MapSearch />
    </Suspense>
  );
}

export default page;
