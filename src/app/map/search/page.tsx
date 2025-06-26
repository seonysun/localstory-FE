import { Suspense } from 'react';

import MapSearch from '@/components/map/MapSearch';
import { SpinnerMessage } from '@/components/ui/common/loading/SpinnerMessage';

function page() {
  return (
    <Suspense
      fallback={
        <div>
          <SpinnerMessage />
        </div>
      }
    >
      <MapSearch />
    </Suspense>
  );
}

export default page;
