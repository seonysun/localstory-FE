'use client';

import { Button } from '@/components/ui/common/buttons/Button';

import { css } from '@root/styled-system/css';

/**
 * 디자인 시스템 스타일 가이드 및 테스트 페이지
 * @description 프로젝트 전반에서 사용하는 텍스트 스타일, 버튼 스타일, 그림자 효과 등의 시각적 참고 자료
 * @author 팀 디자인 시스템
 * @version 1.0.0
 *
 * @example
 * // 텍스트 스타일 사용법
 * <h1 className={css({ textStyle: 'headline1' })}>메인 타이틀</h1>
 * <p className={css({ textStyle: 'body1' })}>기본 본문</p>
 *
 * // 버튼 스타일 조합
 * <Button color="primary" size="lg" radius="md">확인</Button>
 *
 * // 그림자 효과 적용
 * <div className={css({ boxShadow: 'md' })}>카드 컨텐츠</div>
 */
export default function TextStylePreviewPage() {
  return (
    <div
      className={css({
        py: { base: 6, md: 10 },
        bg: 'background',
        color: 'text',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        gap: { base: 6, md: 10 },
      })}
    >
      {/**
       * 텍스트 스타일 섹션
       * @section TextStyles
       * @description 프로젝트에서 사용하는 모든 텍스트 스타일 토큰들의 시각적 가이드
       *
       * 텍스트 스타일 위계:
       * - headline1~4: 페이지/섹션 제목용 (큰 순서대로)
       * - subtitle1~3: 구분선/서브헤더용 (강조 순서대로)
       * - body1~4: 본문 텍스트용 (기본→보조→설명→최소 순서)
       * - pageTitle: 페이지 내부 타이틀 전용
       * - label1~2: 버튼/폼 라벨용
       */}
      <div
        className={css({
          display: 'flex',
          justifyContent: 'center',
          flexDirection: { base: 'column', md: 'row' }, // 모바일에서는 세로 배치
          gap: { base: 6, md: 10 },
        })}
      >
        <div>
          <p className={css({ textStyle: 'headline3', mb: 4 })}>
            📐 Text Styles
          </p>
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            })}
          >
            {/** @example <h1 className={css({ textStyle: 'headline1' })}>메인 페이지 제목</h1> */}
            <p className={css({ textStyle: 'headline1' })}>
              headline1 - 페이지 메인 타이틀
            </p>

            {/** @example <h2 className={css({ textStyle: 'headline2' })}>섹션 헤더</h2> */}
            <p className={css({ textStyle: 'headline2' })}>
              headline2 - 섹션 헤더
            </p>

            {/** @example <h3 className={css({ textStyle: 'headline3' })}>컨텐츠 제목</h3> */}
            <p className={css({ textStyle: 'headline3' })}>
              headline3 - 컨텐츠 헤더
            </p>

            {/** @example <h4 className={css({ textStyle: 'headline4' })}>하위 섹션 제목</h4> */}
            <p className={css({ textStyle: 'headline4' })}>
              headline4 - 하위 컨텐츠 타이틀
            </p>

            {/** @example <p className={css({ textStyle: 'subtitle1' })}>섹션 구분용</p> */}
            <p className={css({ textStyle: 'subtitle1' })}>
              subtitle1 - 섹션 구분용 타이틀, 서브 헤더
            </p>

            {/** @example <p className={css({ textStyle: 'subtitle2' })}>서브 타이틀 강조</p> */}
            <p className={css({ textStyle: 'subtitle2' })}>
              subtitle2 - 서브 타이틀 강조용
            </p>

            {/** @example <p className={css({ textStyle: 'subtitle3' })}>서브 타이틀 보조</p> */}
            <p className={css({ textStyle: 'subtitle3' })}>
              subtitle3 - 서브 타이틀 보조용
            </p>

            {/** @example <p className={css({ textStyle: 'body1' })}>기본 본문 텍스트</p> */}
            <p className={css({ textStyle: 'body1' })}>
              body1 - 본문 텍스트 (기본)
            </p>

            {/** @example <p className={css({ textStyle: 'body2' })}>보조 본문 텍스트</p> */}
            <p className={css({ textStyle: 'body2' })}>
              body2 - 본문 텍스트 (보조)
            </p>

            {/** @example <p className={css({ textStyle: 'body3' })}>설명 텍스트</p> */}
            <p className={css({ textStyle: 'body3' })}>
              body3 - 본문 텍스트 (설명, 캡션)
            </p>

            {/** @example <small className={css({ textStyle: 'body4' })}>작은 설명</small> */}
            <p className={css({ textStyle: 'body4' })}>
              body4 - 본문 텍스트 (최소)
            </p>

            {/** @example <h1 className={css({ textStyle: 'pageTitle' })}>페이지 제목</h1> */}
            <p className={css({ textStyle: 'pageTitle' })}>
              pageTitle - 페이지 내부 타이틀
            </p>

            {/** @example <label className={css({ textStyle: 'label1' })}>입력 라벨</label> */}
            <p className={css({ textStyle: 'label1' })}>
              label1 - 컨텐츠 타이틀, 버튼 텍스트 등
            </p>

            {/** @example <span className={css({ textStyle: 'label2' })}>버튼 텍스트</span> */}
            <p className={css({ textStyle: 'label2' })}>
              label2 - 컨텐츠 텍스트, 버튼 텍스트
            </p>
          </div>
        </div>

        <div>
          {/**
           * 컬러 토큰 섹션
           * @section ColorTokens
           * @description 텍스트에 사용할 수 있는 의미론적 컬러 토큰들
           *
           * 컬러 사용 가이드라인:
           * - text: 기본 본문 텍스트 (가장 많이 사용)
           * - primary: 브랜드 컬러, 중요한 텍스트
           * - secondary: 보조 텍스트, 덜 중요한 정보
           * - error/warning/success/info: 상태 표시용
           */}
          <p className={css({ textStyle: 'headline3', mb: 4 })}>
            📌 Text Color Tokens
          </p>
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            })}
          >
            {/** @example <p className={css({ color: 'text' })}>기본 텍스트</p> */}
            <p className={css({ color: 'text' })}>
              Default text - 기본 본문 컬러 (<code>color=&quot;text&quot;</code>
              )
            </p>

            {/** @example <p className={css({ color: 'primary' })}>브랜드 컬러</p> */}
            <p className={css({ color: 'primary' })}>
              Primary text (<code>color=&quot;primary&quot;</code>)
            </p>

            {/** @example <p className={css({ color: 'secondary' })}>보조 텍스트</p> */}
            <p className={css({ color: 'secondary' })}>
              Secondary text (<code>color=&quot;secondary&quot;</code>)
            </p>

            {/** @example <p className={css({ color: 'error' })}>에러 메시지</p> */}
            <p className={css({ color: 'error' })}>
              Error text (<code>color=&quot;error&quot;</code>)
            </p>

            {/** @example <p className={css({ color: 'warning' })}>경고 메시지</p> */}
            <p className={css({ color: 'warning' })}>
              Warning text (<code>color=&quot;warning&quot;</code>)
            </p>

            {/** @example <p className={css({ color: 'success' })}>성공 메시지</p> */}
            <p className={css({ color: 'success' })}>
              Success text (<code>color=&quot;success&quot;</code>)
            </p>

            {/** @example <p className={css({ color: 'info' })}>정보 메시지</p> */}
            <p className={css({ color: 'info' })}>
              Info text (<code>color=&quot;info&quot;</code>)
            </p>
          </div>
        </div>
      </div>

      {/**
       * 버튼 스타일 섹션
       * @section ButtonStyles
       * @description Button 컴포넌트의 다양한 스타일 조합 가이드
       * @see {@link @/components/ui/common/buttons/Button} Button 컴포넌트 소스
       *
       * Button Props 조합 가이드:
       * - size: xs, sm, md, lg, xl (기본값: md)
       * - radius: none, xs, sm, md, lg, xl, full (기본값: md)
       * - color: primary, black, outline, outlineSoft (기본값: primary)
       *
       * 사용 권장사항:
       * - primary: 주요 액션 (저장, 확인, 제출 등)
       * - black: 강조가 필요한 액션
       * - outline: 보조 액션 (취소, 뒤로가기 등)
       * - outlineSoft: 덜 중요한 보조 액션
       */}
      <div>
        <p className={css({ textStyle: 'headline3', mb: 4 })}>
          🎯 Button Styles
        </p>

        {/** Size Variants 가이드 */}
        <div>
          <p className={css({ textStyle: 'headline4', mb: 4 })}>
            📏 Size Variants
          </p>
          <div
            className={css({
              display: 'flex',
              gap: { base: 2, md: 3 },
              alignItems: 'center',
              mb: 4,
            })}
          >
            {/** @example <Button size="xs">작은 버튼</Button> */}
            <Button size="xs">XS</Button>

            {/** @example <Button size="sm">일반 버튼</Button> */}
            <Button size="sm">SM</Button>

            {/** @example <Button size="md">기본 버튼</Button> - 기본값 */}
            <Button size="md">MD</Button>

            {/** @example <Button size="lg">큰 버튼</Button> */}
            <Button size="lg">LG</Button>

            {/** @example <Button size="xl">매우 큰 버튼</Button> */}
            <Button size="xl">XL</Button>
          </div>
        </div>

        {/** Radius Variants 가이드 */}
        <div>
          <p className={css({ textStyle: 'headline4', mb: 4 })}>
            🔄 Radius Variants
          </p>
          <div
            className={css({
              display: 'flex',
              gap: { base: 2, md: 3 },
              alignItems: 'center',
              mb: 4,
            })}
          >
            {/** @example <Button radius="none">각진 버튼</Button> */}
            <Button radius="none" className={css({ height: '100px' })}>
              None
            </Button>

            {/** @example <Button radius="xs">약간 둥근 버튼</Button> */}
            <Button radius="xs" className={css({ height: '100px' })}>
              XS
            </Button>

            {/** @example <Button radius="sm">둥근 버튼</Button> */}
            <Button radius="sm" className={css({ height: '100px' })}>
              SM
            </Button>

            {/** @example <Button radius="md">기본 둥근 버튼</Button> - 기본값 */}
            <Button radius="md" className={css({ height: '100px' })}>
              MD
            </Button>

            {/** @example <Button radius="lg">많이 둥근 버튼</Button> */}
            <Button radius="lg" className={css({ height: '100px' })}>
              LG
            </Button>

            {/** @example <Button radius="xl">매우 둥근 버튼</Button> */}
            <Button radius="xl" className={css({ height: '100px' })}>
              XL
            </Button>

            {/** @example <Button radius="full">완전히 둥근 버튼</Button> */}
            <Button radius="full" className={css({ height: '100px' })}>
              Full
            </Button>
          </div>
        </div>

        {/** Color Variants 가이드 */}
        <div>
          <p className={css({ textStyle: 'headline4', mb: 4 })}>
            🎨 Color Variants (Hover Effects)
          </p>
          <div
            className={css({
              display: 'flex',
              gap: { base: 2, md: 3 },
              alignItems: 'center',
              mb: 4,
            })}
          >
            {/** @example <Button color="primary">주요 액션</Button> - 기본값 */}
            <Button color="primary">Primary</Button>

            {/** @example <Button color="black">강조 액션</Button> */}
            <Button color="black">Black</Button>

            {/** @example <Button color="outline">보조 액션</Button> */}
            <Button color="outline">Outline</Button>
          </div>
        </div>

        {/** Combined Examples - 실제 사용 케이스 */}
        <div>
          <p className={css({ textStyle: 'headline4', mb: 4 })}>
            🔗 Combined Examples
          </p>
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: { base: 2, md: 3 },
            })}
          >
            {/** @example 폼에서 사용하는 부드러운 아웃라인 버튼 */}
            <Button color="outlineSoft" radius="sm">
              Medium OutlineSoft Button with Smaill Radius
            </Button>

            <div
              className={css({
                display: 'flex',
                flexDirection: { base: 'column', md: 'row' },
                gap: 2,
                mb: 1,
              })}
            >
              {/** @example 테이블 액션용 작은 버튼 */}
              <Button color="outline" size="sm" radius="none">
                Small Square Outline
              </Button>

              {/** @example 주요 CTA용 큰 버튼 */}
              <Button color="black" size="lg" radius="lg">
                Large Black with Large Radius
              </Button>
            </div>

            {/** @example 아이콘 버튼이나 태그용 초소형 버튼 */}
            <Button
              color="primary"
              size="xs"
              radius="full"
              fullWidth={false}
              className={css({
                width: 'auto',
                mx: 'auto',
                textStyle: 'label2',
              })}
            >
              Tiny Button
            </Button>
          </div>
        </div>
      </div>

      {/**
       * Drop Shadow 섹션
       * @section DropShadow
       * @description 카드, 모달, 드롭다운 등에 사용하는 그림자 효과 가이드
       *
       * 그림자 위계 및 사용 용도:
       * - xs: 서치바, 드롭다운 등 미묘한 depth 표현
       * - sm: 타임라인 카드 등 명확한 구분 필요한 경우
       * - md: 기본 카드, 리스트 아이템 등 일반적인 용도 (가장 많이 사용)
       * - lg: 모달, 큰 카드, 토스트 등 강한 시각적 분리 필요한 경우
       *
       * @example
       * // 기본 카드
       * <div className={css({ boxShadow: 'md', p: 4, borderRadius: 'md' })}>
       *   카드 컨텐츠
       * </div>
       *
       * // 모달
       * <div className={css({ boxShadow: 'lg', p: 6, borderRadius: 'lg' })}>
       *   모달 컨텐츠
       * </div>
       */}
      <div>
        <p className={css({ textStyle: 'headline3', mb: 4 })}>
          🌚 Drop Shadow Cards
        </p>
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)' }, // 모바일: 1열, 데스크톱: 2열
            gap: 4,
          })}
        >
          {/**
           * XS Shadow 예시
           * @usage 서치바, 드롭다운, 툴팁 등
           * @example <div className={css({ boxShadow: 'xs' })}>...</div>
           */}
          <div
            className={css({
              p: { base: 4, md: 6 },
              bg: 'white',
              borderRadius: 'sm',
              boxShadow: 'xs',
            })}
          >
            <h3 className={css({ textStyle: 'subtitle2', mb: 2 })}>
              XS Shadow Card
            </h3>
            <p className={css({ textStyle: 'body2', color: 'gray.500' })}>
              Search, dropdown 등에 사용하는 부드러운 그림자입니다.
            </p>
            <div className={css({ mt: 4 })}>
              <Button color="primary" size="md" radius="sm">
                확인
              </Button>
            </div>
          </div>

          {/**
           * SM Shadow 예시
           * @usage 타임라인 카드, 프로필 카드 등
           * @example <div className={css({ boxShadow: 'sm' })}>...</div>
           */}
          <div
            className={css({
              p: { base: 4, md: 6 },
              bg: 'white',
              borderRadius: 'md',
              boxShadow: 'sm',
            })}
          >
            <h3 className={css({ textStyle: 'subtitle2', mb: 2 })}>
              SM Shadow Card
            </h3>
            <p className={css({ textStyle: 'body2', color: 'gray.500' })}>
              Timeline card 등에 사용하는 뚜렷한 그림자입니다.
            </p>
            <div
              className={css({
                mt: 4,
                display: 'flex',
                flexDirection: { base: 'column', md: 'row' },
                gap: 2,
              })}
            >
              <Button color="outlineSoft" size="sm" radius="md">
                취소
              </Button>
              <Button color="primary" size="sm" radius="md">
                확인
              </Button>
            </div>
          </div>

          {/**
           * MD Shadow 예시 (가장 많이 사용)
           * @usage 기본 카드, 리스트 아이템, 섹션 구분 등
           * @example <div className={css({ boxShadow: 'md' })}>...</div>
           */}
          <div
            className={css({
              p: { base: 4, md: 6 },
              bg: 'white',
              borderRadius: 'md',
              boxShadow: 'md',
            })}
          >
            <h3 className={css({ textStyle: 'subtitle2', mb: 2 })}>
              MD Shadow Card
            </h3>
            <p className={css({ textStyle: 'body2', color: 'gray.500' })}>
              Default card 등에 사용하는 기본 그림자입니다.
            </p>
            <div
              className={css({
                display: 'flex',
                flexDirection: { base: 'column', md: 'row' }, // 모바일에서는 세로 배치
                gap: 2,
                mt: 4,
              })}
            >
              <Button
                color="outline"
                size={{ base: 'md', md: 'lg' }}
                radius="xs"
              >
                프로필 보기
              </Button>
              <Button
                color="outline"
                size={{ base: 'md', md: 'lg' }}
                radius="xs"
              >
                여행 코스 보기
              </Button>
            </div>
          </div>

          {/**
           * LG Shadow 예시
           * @usage 모달, 큰 카드, 토스트, 사이드 패널 등
           * @example <div className={css({ boxShadow: 'lg' })}>...</div>
           */}
          <div
            className={css({
              p: { base: 4, md: 6 },
              bg: 'white',
              borderRadius: 'sm',
              boxShadow: 'lg',
            })}
          >
            <h3 className={css({ textStyle: 'subtitle2', mb: 2 })}>
              LG Effect Card
            </h3>
            <p className={css({ textStyle: 'body2', color: 'gray.500' })}>
              Big card, Modal, Toast 등에 사용하는 넓은 그림자입니다.
            </p>
            <div className={css({ mt: 4 })}>
              <Button color="black" size="sm" radius="full">
                확인
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
