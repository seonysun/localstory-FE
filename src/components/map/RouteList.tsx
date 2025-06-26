'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { routeOption } from '@/api/options/routeOption';
import { LocationIcon } from '@/components/icons';
import { mapOverlayWrapper } from '@/components/map/map.recipe';
import { flex } from '@/components/ui/common/cards/card.recipe';
import { Spinner } from '@/components/ui/common/loading/Spinner';
import { modalText } from '@/components/ui/common/modals/modal.recipe';
import useClickOutside from '@/hooks/useClickOutside';

import { css } from '@root/styled-system/css';

function RouteList({
  setRouteOpen,
}: {
  setRouteOpen: (open: boolean) => void;
}) {
  const router = useRouter();

  const divRef = useRef<HTMLDivElement>(null);
  useClickOutside(divRef, () => setRouteOpen(false));

  const { data, isLoading } = useQuery(routeOption.getRouteList());
  const routeList = data?.data ?? [];

  return (
    <div ref={divRef} className={mapOverlayWrapper({ type: 'routeList' })}>
      {isLoading ? (
        <div
          className={css({
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          })}
        >
          <Spinner />
          <p>로딩중</p>
        </div>
      ) : (
        <div className={flex({ gap: 'md' })}>
          {routeList.map(route => (
            <button
              key={route.id}
              type="button"
              onClick={() => {
                router.push(`/map/search?route=${route.id}`);
              }}
            >
              <p
                className={flex({
                  direction: 'row',
                  align: 'center',
                  gap: 'xs',
                })}
              >
                <LocationIcon />
                <span
                  className={modalText({
                    text: 'body3',
                    align: 'left',
                    clamp: 1,
                  })}
                >
                  {route.name}
                </span>
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default RouteList;
