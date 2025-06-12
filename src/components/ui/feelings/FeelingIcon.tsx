import { FEELINGS } from '@/constants/story';

type FeelingValue = (typeof FEELINGS)[number]['value'];

function FeelingIcon({
  value,
  size,
}: {
  value: FeelingValue | undefined;
  size?: number;
}) {
  const feeling = FEELINGS.find(feeling => feeling.value === value);
  return feeling ? <feeling.label size={size} /> : null;
}

export default FeelingIcon;
