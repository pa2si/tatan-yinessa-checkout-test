'use client';

import Loading from '@/components/Loading';

export function loading() {
  return (
    <div className="flex flex-col items-center justify-center h-svh w-svw text-2xl">
      <Loading />
    </div>
  );
}
export default loading;
