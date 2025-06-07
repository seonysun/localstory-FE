import { cva } from '@root/styled-system/css';

// 댓글 입력 영역 공통 스타일
export const inputWrapperStyle = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    width: '100%',
    mb: 8,
  },
});

export const inputBoxStyle = cva({
  base: {
    width: '90%',
    border: '1px solid',
    borderColor: 'gray.300',
    borderRadius: 'sm',
    px: 3,
    py: 2,
  },
});

export const buttonWrapperStyle = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    gap: 2,
  },
});

export const replyInputStyle = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    width: '100%',
    mb: 8,
  },
});

export const replyButtonStyle = cva({
  base: {
    width: '5%',
    minWidth: '64px',
    whiteSpace: 'nowrap',
  },
});

// 댓글 목록 영역
export const commentListWrapperStyle = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    mb: 24,
  },
});

// 유저 정보 표시 영역
export const userInfoWrapperStyle = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    mb: 8,
  },
});
