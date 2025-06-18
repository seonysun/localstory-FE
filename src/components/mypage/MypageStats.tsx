import { statItem, statLabel, statsBox, statValue } from './mypage.recipe';

export default function MypageStats() {
  const data = [
    { label: '게시물', value: 360 },
    { label: '팔로워', value: 238 },
    { label: '팔로우', value: 473 },
  ];

  return (
    <div className={statsBox()}>
      {data.map(d => (
        <div key={d.label} className={statItem()}>
          <div className={statLabel()}>{d.label}</div>
          <div className={statValue()}>{d.value}</div>
        </div>
      ))}
    </div>
  );
}
