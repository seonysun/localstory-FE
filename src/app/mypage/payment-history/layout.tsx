import PageHeader from '@/components/ui/common/pageHeader/PageHeader';

import { css } from '@root/styled-system/css';

export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={css({ mt: 12 })}>
      <PageHeader title="결제 내역" />
      <div>{children}</div>
    </div>
  );
}
