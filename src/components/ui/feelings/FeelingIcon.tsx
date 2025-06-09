import { feelings } from '@/constants/story';

type FeelingValue = (typeof feelings)[number]['value'];

function FeelingIcon({
  value,
  size,
}: {
  value: FeelingValue | undefined;
  size?: number;
}) {
  const feeling = feelings.find(feeling => feeling.value === value);
  return feeling ? <feeling.label size={size} /> : null;
}

export default FeelingIcon;
