import { cva } from '@root/styled-system/css';

export const navWrapper = cva({
  base: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    width: '100%',
    bg: 'white',
    shadow: 'xs',
  },
});

export const headerWrapper = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    px: 4,
    h: 16,
    mx: 'auto',
    maxW: '1024px',
    position: 'relative',
  },
});

export const navMenu = cva({
  base: {
    p: 4,
    gap: 6,
    textAlign: 'center',
    position: 'absolute',
    top: 16,
    right: 0,
    left: 0,
    bg: 'white',
    w: 'full',
    flexDirection: 'column',
    zIndex: 999,
    overflow: 'hidden',
    shadow: 'md',
    borderTopWidth: 1,
    borderColor: 'gray.100',
    transition: 'all 0.3s ease-out',
    display: {
      base: 'flex',
      md: 'none',
    },
  },
  variants: {
    isOpen: {
      true: {
        maxHeight: '400px',
        opacity: 1,
        transform: 'translateY(0)',
      },
      false: {
        maxHeight: '0px',
        opacity: 0,
        transform: 'translateY(-8px)',
      },
    },
  },
});

export const dimOverlay = cva({
  base: {
    position: 'fixed',
    top: 0,
    left: 0,
    w: 'full',
    h: 'full',
    bg: 'black/40',
    zIndex: 998,
    transitionProperty: 'opacity',
    transitionDuration: 'normal',
    transitionTimingFunction: 'ease-out',
    display: {
      base: 'block',
      md: 'none',
    },
  },
});

export const menuItem = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    paddingY: 2,
    _hover: {
      textDecoration: 'underline',
    },
  },
});

export const menuLink = cva({
  base: {
    display: 'block',
    width: '100%',
    paddingY: 2,
  },
});
