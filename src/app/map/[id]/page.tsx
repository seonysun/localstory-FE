import Image from 'next/image';
import Link from 'next/link';

import { ENDPOINTS } from '@/api/endpoints';
import { ssrFetcher } from '@/api/fetcher';
import { LocationIcon } from '@/components/icons';
import MapDetailStory from '@/components/map/MapDetailStory';
import { Button } from '@/components/ui/common/buttons/Button';
import {
  cardImageWrapper,
  flex,
  topRightAbsolute,
} from '@/components/ui/common/cards/card.recipe';
import { modalText } from '@/components/ui/common/modals/modal.recipe';
import { Likes } from '@/components/ui/common/toggles';
import { Marker } from '@/types/marker';

async function page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const data = await ssrFetcher<Marker>(ENDPOINTS.MARKER.DETAIL(id));

  if (!data) return <div>데이터를 불러올 수 없습니다.</div>;

  return (
    <div className={flex({ marginB: 'sm', gap: 'xl' })}>
      <div className={cardImageWrapper({ maxWidth: 'none', aspect: 'video' })}>
        <Image src={data.image} alt={data.markerName} fill />
        <span
          className={topRightAbsolute({ top: 3, right: 3 })}
          style={{ zIndex: 1 }}
        >
          <Likes liked={data.isLiked} />
        </span>
      </div>
      <div className={flex({ gap: 'lg' })}>
        <div className={flex({ gap: 'sm' })}>
          <p className={modalText({ text: 'head3', align: 'left' })}>
            {data.markerName}
          </p>
          <Link href={`/map/search?id=${data.id}`}>
            <p
              className={modalText({
                text: 'body2',
                flex: 'row',
                gap: 1,
                align: 'left',
                color: 'gray400',
              })}
            >
              <LocationIcon width={20} height={20} />
              <span
                className={modalText({
                  align: 'left',
                  clamp: 1,
                })}
              >
                {data.adress}
              </span>
            </p>
          </Link>
        </div>
        <p
          className={modalText({
            text: 'body3',
            align: 'justify',
            color: 'gray600',
          })}
        >
          {data.description}
        </p>
      </div>
      <MapDetailStory id={id} title={data.markerName} />
      <Link href="/story/post">
        <Button>스토리 나누러 가기</Button>
      </Link>
    </div>
  );
}

export default page;
