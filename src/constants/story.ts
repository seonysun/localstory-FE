import { ComponentType } from 'react';

import {
  Angry,
  Frowning,
  Grinning,
  Neutral,
  Smiling,
} from '@/components/icons/feelings';
import { IconProps } from '@/components/icons/iconProps';

type FeelingIcons = {
  label: ComponentType<IconProps>;
  value: string;
  description: string;
}[];

export const feelings: FeelingIcons = [
  { label: Smiling, value: 'smile', description: '좋았어요.' },
  { label: Grinning, value: 'grinning', description: '즐거운 추억!' },
  { label: Neutral, value: 'neutral', description: '무난무난쓰.' },
  { label: Frowning, value: 'frown', description: '조금 별로.' },
  { label: Angry, value: 'angry', description: '맘에 안 듦.' },
];
