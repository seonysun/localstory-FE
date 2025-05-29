import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './styled-system/**/*.{ts,js}'],

  // Files to exclude
  exclude: [],
  outdir: 'styled-system',

  // Useful for theme customization
  theme: {
    extend: {
      breakpoints: {
        base: '0px',
        md: '768px',
      },

      tokens: {
        colors: {
          blue: {
            50: { value: '#EBF3FF' },
            100: { value: '#D6E4FF' },
            300: { value: '#85AFFF' },
            400: { value: '#4F8CFF' },
            500: { value: '#1746FF', description: '메인 컬러 (blue)' },
            600: { value: '#003ACC' },
            700: { value: '#002E99' },
          },
          yellow: {
            500: { value: '#FEE500', description: '메인 컬러 (yellow)' },
          },
          gray: {
            100: { value: '#E6E6E6', description: 'Gray 100' },
            200: { value: '#C9C9C9', description: 'Gray 200' },
            300: { value: '#A2A2A2', description: 'Gray 300' },
            400: { value: '#707070', description: 'Gray 400' },
            500: { value: '#545454', description: 'Gray 500' },
            600: { value: '#484848', description: 'Gray 600' },
            700: { value: '#3A3A3A', description: 'Gray 700' },
            800: { value: '#1A1A1A', description: 'Gray 800' },
          },
          black: { value: '#000000', description: 'Black' },
          white: { value: '#FFFFFF', description: 'White' },
          textDefault: {
            value: '#1B1E28',
            description: '기본 본문 텍스트 컬러 (블랙보다 부드러운 톤)',
          },
        },

        radii: {
          none: { value: '0px' },
          xs: { value: '4px' },
          sm: { value: '8px', description: '버튼, textarea' },
          md: { value: '12px' },
          lg: { value: '16px', description: '카드, 썸네일, 모달' },
          xl: { value: '30px', description: 'Map Detail' },
          full: { value: '9999px' },
        },

        shadows: {
          xs: {
            value: '0 4px 6px rgba(0, 0, 0, 0.05)',
            description: '작은 그림자 - Search, dropdown 등',
          },
          sm: {
            value: '0 4px 6px rgba(0, 0, 0, 0.20)',
            description: '뚜렷한 그림자 - Timeline card 등',
          },
          md: {
            value: '0 6px 16px rgba(0, 0, 0, 0.20)',
            description: '기본 그림자 - Default card 등',
          },
          lg: {
            value: '0 8px 20px rgba(0, 0, 0, 0.20)',
            description: '큰 그림자 - Big card, Modal, Toast 등',
          },
        },
      },

      semanticTokens: {
        colors: {
          background: {
            value: {
              base: '{colors.white}',
              _dark: '{colors.gray.800}',
            },
          },
          text: {
            value: {
              base: '{colors.textDefault}',
              _dark: '{colors.white}',
            },
          },
          primary: {
            value: {
              base: '{colors.blue.500}',
              _dark: '{colors.blue.500}',
            },
            description: '주요 버튼, 링크 등에 사용하는 메인 컬러',
          },
          onPrimary: {
            value: {
              base: '{colors.white}',
              _dark: '{colors.white}',
            },
            description: 'primary 배경 위에 사용하는 텍스트/아이콘 컬러',
          },
          secondary: {
            value: {
              base: '{colors.yellow.500}',
              _dark: '{colors.yellow.500}',
            },
            description: '보조 포인트 요소에 사용하는 컬러',
          },
          onSecondary: {
            value: {
              base: '{colors.black}',
              _dark: '{colors.black}',
            },
            description: 'secondary 배경 위에 사용하는 텍스트/아이콘 컬러',
          },
          error: {
            value: {
              base: '#FF3B3B',
              _dark: '#FF3B3B',
            },
            description: '에러, 경고 등에 사용하는 상태 컬러',
          },
          warning: {
            value: {
              base: '#FFCC00',
              _dark: '#FFCC00',
            },
            description: '주의, 알림 등 경고 상황에 사용하는 컬러',
          },
          success: {
            value: {
              base: '#06C270',
              _dark: '#06C270',
            },
            description: '성공, 완료 상태에 사용하는 컬러',
          },
          info: {
            value: {
              base: '#0063F7',
              _dark: '#0063F7',
            },
            description: '정보 전달용 아이콘 등에 사용하는 컬러',
          },

          titleBorder: {
            value: {
              base: '#E6E6E6',
              _dark: '#E6E6E6',
            },
            description: '페이지 타이틀 구분선 컬러',
          },
          primaryHover: {
            value: {
              base: '{colors.blue.600}',
              _dark: '{colors.blue.400}',
            },
          },
        },
      },

      textStyles: {
        headline1: {
          description: 'h1 스타일 - 페이지 메인 타이틀',
          value: {
            fontSize: '40px',
            lineHeight: '48px',
            fontWeight: '700',
          },
        },
        headline2: {
          description: 'h2 스타일 - 섹션 헤더',
          value: {
            fontSize: '32px',
            lineHeight: '36px',
            fontWeight: '700',
          },
        },
        headline3: {
          description: 'h3 스타일 - 컨텐츠 헤더',
          value: {
            fontSize: '24px',
            lineHeight: '36px',
            fontWeight: '700',
          },
        },
        headline4: {
          description: 'h4 스타일 - 하위 컨텐츠 타이틀',
          value: {
            fontSize: '20px',
            lineHeight: '36px',
            fontWeight: '700',
          },
        },
        subtitle1: {
          description: 'h4 스타일 - 섹션 구분용 타이틀, 서브 헤더',
          value: {
            fontSize: '24px',
            lineHeight: '32px',
            fontWeight: '500',
          },
        },
        subtitle2: {
          description: 'h4 스타일 - 서브 타이틀 강조용',
          value: {
            fontSize: '20px',
            lineHeight: '24px',
            fontWeight: '500',
          },
        },
        subtitle3: {
          description: 'h4 스타일 - 서브 타이틀 보조용',
          value: {
            fontSize: '20px',
            lineHeight: '24px',
            fontWeight: '400',
          },
        },
        body1: {
          description: '본문 텍스트 (기본)',
          value: {
            fontSize: '18px',
            lineHeight: '20px',
            fontWeight: '400',
          },
        },
        body2: {
          description: '본문 텍스트 (보조)',
          value: {
            fontSize: '16px',
            lineHeight: '20px',
            fontWeight: '400',
          },
        },
        body3: {
          description: '본문 텍스트 (설명, 캡션)',
          value: {
            fontSize: '14px',
            lineHeight: '18px',
            fontWeight: '300',
          },
        },
        body4: {
          description: '본문 텍스트 (최소)',
          value: {
            fontSize: '12px',
            lineHeight: '16px',
            fontWeight: '300',
          },
        },
        pageTitle: {
          description: '페이지 내부 타이틀',
          value: {
            fontSize: '18px',
            lineHeight: '22px',
            fontWeight: '600',
          },
        },
        label1: {
          description: '컨텐츠 타이틀, 버튼 텍스트 등 강조용',
          value: {
            fontSize: '16px',
            lineHeight: '20px',
            fontWeight: '600',
          },
        },
        label2: {
          description: '컨텐츠 텍스트, 버튼 텍스트 등 보조용',
          value: {
            fontSize: '14px',
            lineHeight: '16px',
            fontWeight: '600',
          },
        },
      },
    },
  },
});
