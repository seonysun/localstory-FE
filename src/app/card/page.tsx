import { Button } from '@/components/ui/common/buttons/Button';
import BenefitCard from '@/components/ui/common/cards/BenefitCard';
import SquareCard from '@/components/ui/common/cards/SquareCard';
import StoryCard from '@/components/ui/common/cards/StoryCard';
import WideCard from '@/components/ui/common/cards/WideCard';
import WideCardContent from '@/components/ui/common/cards/WideCardContent';

import { css } from '@root/styled-system/css';

function page() {
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: { base: 6, md: 10 },
        my: 3,
      })}
    >
      <WideCard image="/images/default-thumbnail.png">
        <WideCardContent
          title="온천천 카페거리"
          subtitle="2024.12.02."
          rating="0"
          footerType="feeling"
          footerText="smile"
          action={
            <Button size="xs" fullWidth={false}>
              Edit
            </Button>
          }
        />
      </WideCard>
      <WideCard image="/images/default-thumbnail.png">
        <WideCardContent
          title="송도해수욕장"
          subtitle="관광명소"
          date={false}
          rating="3.7"
          footerType="location"
          footerText="부산 기장군"
          action="♥️"
        />
      </WideCard>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 6,
        })}
      >
        <SquareCard
          image="/images/default-thumbnail.png"
          title="국제시장"
          location="부산 중구"
        />
        <SquareCard image="" title="국제시장" location="부산 중구" liked />
      </div>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 6,
        })}
      >
        <BenefitCard
          icon="book"
          title="스토리"
          content={
            <>
              <span>무제한</span>&nbsp;
              <span className={css({ color: 'primary' })}>스토리 열람</span>
            </>
          }
        />
        <BenefitCard
          icon="map"
          title="지도"
          content={
            <>
              <span>무제한</span>&nbsp;
              <span className={css({ color: 'primary' })}>지도 열람</span>
            </>
          }
        />
      </div>
      <StoryCard
        story={{
          storyId: 'sample-story',
          images: [
            '/images/story-sample.png',
            '/images/story-sample.png',
            '/images/story-sample.png',
            '/images/story-sample.png',
            '/images/story-sample.png',
          ],
          userProfile: '/images/default-userImage.png',
          title: '홍선성현형님 서울 후기',
          content: '사진찍기 좋은 명소!',
          userNickname: '홍선성현님',
          createdAt: '2020',
        }}
      />
    </div>
  );
}

export default page;
