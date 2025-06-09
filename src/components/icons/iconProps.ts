import type { SVGProps } from 'react';

/**
 * 아이콘 컴포넌트 공통 Props입니다.
 *
 * ✅ 주의사항:
 * - 현재 프로젝트의 아이콘은 디자이너 없이 자동 추출된 SVG이며,
 *   아이콘마다 `fill`, `stroke`, `color` 처리 방식이 다릅니다.
 * - 일부 아이콘은 `color`만 주면 스타일이 적용되지만,
 *   일부는 `fill` 또는 `stroke`를 직접 전달해야 색상이 적용됩니다.
 *
 * 💡 사용 전 프리뷰 페이지에서 확인하거나 실제 렌더링 결과를 검토하세요.
 */
/**
 * 아이콘 컴포넌트 공통 Props입니다.
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;

  /** 아이콘의 가로 크기 (기본값: 24) */
  width?: number;

  /** 아이콘의 세로 크기 (기본값: 24) */
  height?: number;

  /** 선 굵기 */
  strokeWidth?: number;

  /** 채우기 색상 (일부 아이콘에 적용됨) */
  fill?: string;

  /** 아이콘의 색상. `fill="currentColor"`일 경우 적용됨 */
  color?: string;
}
