import { cva } from '@root/styled-system/css';

export const mypageContainer = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '24px',
    paddingX: '20px',
    background: 'white',
    minHeight: 'calc(100vh - 48px)',
  },
});

// 프로필 섹션
export const profileSection = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginBottom: '24px',
  },
});

export const avatarWrapper = cva({
  base: {
    position: 'relative',
    marginBottom: '16px',
  },
});

export const avatarBox = cva({
  base: {
    width: '96px',
    height: '96px',
    borderRadius: 'full',
    overflow: 'hidden',
    cursor: 'pointer',
    position: 'relative',
    border: 'none',
    padding: 0,
    backgroundColor: 'gray.50',
    _hover: {
      _after: {
        content: '""',
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      },
    },
  },
});

export const avatarImage = cva({
  base: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

export const hiddenFileInput = cva({
  base: {
    display: 'none',
  },
});

export const profileInfo = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
});

export const nicknameWrapper = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
});

export const nickname = cva({
  base: {
    textStyle: 'headline4',
    fontWeight: '600',
    color: 'text',
  },
});

export const nicknameInput = cva({
  base: {
    textStyle: 'headline4',
    fontWeight: '600',
    color: 'text',
    border: 'none',
    background: 'none',
    textAlign: 'center',
    outline: 'none',
    borderBottom: '2px solid',
    borderColor: 'primary',
    paddingBottom: '2px',
  },
});

export const email = cva({
  base: {
    textStyle: 'body3',
    color: 'gray.400',
  },
});

export const editButton = cva({
  base: {
    background: 'none',
    border: 'none',
    padding: '6px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'full',
    transition: 'all 0.2s ease',
    _hover: {
      backgroundColor: 'gray.50',
    },
  },
});

// 게시 및 팔로우 현황 섹션
export const statsBox = cva({
  base: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    paddingY: '16px',
    marginBottom: '24px',
    borderRadius: 'lg',
    backgroundColor: 'white',
    boxShadow: 'xs',
  },
});

export const statItem = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
    flex: 1,
  },
});

export const statValue = cva({
  base: {
    textStyle: 'headline4',
    fontWeight: '700',
    color: 'primary',
  },
});

export const statLabel = cva({
  base: {
    textStyle: 'body3',
    color: 'gray.400',
  },
});

// 메뉴 리스트
export const menuListContainer = cva({
  base: {
    width: '100%',
    borderRadius: 'lg',
    backgroundColor: 'white',
    boxShadow: 'sm',
    overflow: 'hidden',
  },
});

export const menuList = cva({
  base: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
});

export const menuItem = cva({
  base: {
    width: '100%',
    borderBottom: '1px solid',
    borderColor: 'gray.50',
    _last: {
      borderBottom: 'none',
    },
  },
});

export const menuButton = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '16px 20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    _hover: {
      backgroundColor: 'gray.50',
    },
    _active: {
      backgroundColor: 'gray.100',
    },
  },
});

export const menuItemLeft = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
});

export const menuItemTitle = cva({
  base: {
    textStyle: 'body2',
    color: 'text',
    fontWeight: '400',
  },
});

// 로그인 구분 배지 스타일

export const providerBadge = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '16px',
    height: '16px',
    borderRadius: 'full',
    fontSize: '10px',
    fontWeight: '700',
    marginLeft: '4px',
  },
  variants: {
    provider: {
      google: {
        backgroundColor: 'blue.100',
        color: 'blue.600',
      },
      kakao: {
        backgroundColor: 'yellow.500',
        color: 'black',
      },
    },
  },
});
