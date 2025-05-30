import { cva } from '@root/styled-system/css';

export const Wrapper = cva({
  base: {
    display: {
      base: 'flex',
      md: 'none',
    },
    alignItems: 'center',
    height: '48px',
    paddingX: '16px',
  },
});

export const BackButton = cva({
  base: {
    display: {
      base: 'block',
      md: 'none',
    },
    bg: 'gray.100',
    padding: '4px',
    borderRadius: 'full',
    cursor: 'pointer',
    position: 'absolute',
    left: '16px',
  },
});

export const Title = cva({
  base: {
    marginX: 'auto',
    textAlign: 'center',
    textStyle: 'pageTitle',
  },
});
