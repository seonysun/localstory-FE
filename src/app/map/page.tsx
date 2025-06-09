import Link from 'next/link';

import MapTabs from '@/components/map/MapTabs';
import { flex } from '@/components/ui/common/cards/card.recipe';
import MarkerIcon from '@/components/ui/maps/MarkerIcon';
import { MAP_CATEGORY } from '@/constants/map';

function page() {
  return (
    <>
      <div className={flex({ direction: 'row', p: 'xs', marginB: 'sm' })}>
        {MAP_CATEGORY.map(category => (
          <Link
            key={category.label}
            href={`/map/search?type=${category.value}`}
          >
            <MarkerIcon label={category.label} icon={category.icon} />
          </Link>
        ))}
      </div>
      <MapTabs />
    </>
  );
}

export default page;
