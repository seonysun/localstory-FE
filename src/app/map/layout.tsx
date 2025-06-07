import MapSearchBar from '@/components/map/MapSearchBar';
import PageHeader from '@/components/ui/common/pageHeader/PageHeader';

import { css } from '@root/styled-system/css';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageHeader>
        <MapSearchBar />
      </PageHeader>
      <div className={css({ width: 'full', overflow: 'auto', marginTop: 3 })}>
        {children}
      </div>
    </>
  );
}

export default layout;
