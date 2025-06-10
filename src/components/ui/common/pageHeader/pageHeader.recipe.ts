import { cva } from '@root/styled-system/css';

export const Wrapper = cva({
  base: {
    display: {
      base: 'flex',
      md: 'none',
    },
    alignItems: 'center',
    height: '48px',
    position: 'relative',
  },
});

export const BackButton = cva({
  base: {
    display: {
      base: 'block',
      md: 'none',
    },
    bg: 'gray.100',
    cursor: 'pointer',
    padding: 2,
    borderRadius: 'full',
  },
});

export const Title = cva({
  base: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
    textStyle: 'pageTitle',
  },
});
