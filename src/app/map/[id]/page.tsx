import Image from 'next/image';

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
import { mapDetail } from '@/mocks/mapDetail';

function page() {
  const data = mapDetail;

  return (
    <div className={flex({ marginB: 'sm', gap: 'xl' })}>
      <div className={cardImageWrapper({ maxWidth: 'none', aspect: 'wide' })}>
        <Image src={data.image} alt={data.title} fill />
        <span
          className={topRightAbsolute({ top: 3, right: 3 })}
          style={{ zIndex: 1 }}
        >
          <Likes liked={data.liked} />
        </span>
      </div>
      <div className={flex({ gap: 'md' })}>
        <p className={modalText({ text: 'head3', align: 'left' })}>
          {data.title}
        </p>
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
          {data.location}
        </p>
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
      <MapDetailStory title={data.title} images={data.storyImg} />
      <Button>스토리 나누러 가기</Button>
    </div>
  );
}

export default page;
