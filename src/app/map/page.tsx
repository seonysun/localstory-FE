import { categoryTitle, iconWrapper } from '@/components/map/map.recipe';
import MapTabs from '@/components/map/MapTabs';
import { flex } from '@/components/ui/common/cards/card.recipe';
import { MAP_CATEGORY } from '@/constants/map';

function page() {
  return (
    <>
      <div className={flex({ direction: 'row', p: 'xs', marginB: 'sm' })}>
        {MAP_CATEGORY.map(category => (
          <div className={flex({ width: 'auto', align: 'center' })}>
            <div
              className={iconWrapper({
                size: 'lg',
                radius: 'full',
                border: 'black',
                margin: 'xs',
              })}
            >
              <category.icon />
            </div>
            <p className={categoryTitle()}>{category.label}</p>
          </div>
        ))}
      </div>
      <MapTabs />
    </>
  );
}

export default page;
