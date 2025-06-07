import { categoryTitle, iconWrapper } from '@/components/map/map.recipe';
import MapTabs from '@/components/map/MapTabs';
import { flex } from '@/components/ui/common/cards/card.recipe';
import { MAP_CATEGORY } from '@/constants/map';

import { css, cx } from '@root/styled-system/css';

function page() {
  return (
    <>
      <div className={flex({ direction: 'row', p: 'xs', marginB: 'sm' })}>
        {MAP_CATEGORY.map(category => (
          <div
            key={category.label}
            className={cx(
              flex({ width: 'auto', align: 'center' }),
              css({ cursor: 'pointer' }),
            )}
          >
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
