import { CategoryValueType, MAP_CATEGORY } from '@/constants/map';

export function isValidCategory(
  value: string | null,
): value is CategoryValueType {
  return MAP_CATEGORY.some(c => c.value === value);
}
