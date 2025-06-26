import SearchBar from '@/components/map/SearchBar';
import PageHeader from '@/components/ui/common/pageHeader/PageHeader';

import { css } from '@root/styled-system/css';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageHeader>
        <SearchBar />
      </PageHeader>
      <div
        className={css({ display: { base: 'none', md: 'flex' }, marginTop: 3 })}
      >
        <SearchBar />
      </div>
      <div className={css({ width: 'full', overflow: 'auto', marginTop: 3 })}>
        {children}
      </div>
    </>
  );
}

export default layout;
