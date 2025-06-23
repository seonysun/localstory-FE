'use client';

import { Suspense } from 'react';

import UserPageContent from './_components/UserPageContent';

export const dynamic = 'force-dynamic';

function Page() {
  return (
    <Suspense fallback={<div>로딩중</div>}>
      <UserPageContent />
    </Suspense>
  );
}
export default Page;
