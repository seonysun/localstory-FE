'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { routeOption } from '@/api/options/routeOption';
import { LocationIcon } from '@/components/icons';
import { mapOverlayWrapper } from '@/components/map/map.recipe';
import { flex } from '@/components/ui/common/cards/card.recipe';
import { modalText } from '@/components/ui/common/modals/modal.recipe';
import useClickOutside from '@/hooks/useClickOutside';

function RouteList({
  setRouteOpen,
}: {
  setRouteOpen: (open: boolean) => void;
}) {
  const router = useRouter();

  const divRef = useRef<HTMLDivElement>(null);
  useClickOutside(divRef, () => setRouteOpen(false));

  const { data } = useQuery(routeOption.getRouteList());
  const routeList = data?.data ?? [];

  return (
    <div ref={divRef} className={mapOverlayWrapper({ type: 'routeList' })}>
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
              className={flex({ direction: 'row', align: 'center', gap: 'xs' })}
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
    </div>
  );
}

export default RouteList;
