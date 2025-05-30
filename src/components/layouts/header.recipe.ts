import { cva } from '@root/styled-system/css';

export const navWrapper = cva({
  base: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    width: '100%',
    bg: 'white',
  },
});

export const headerWrapper = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingX: '4',
    height: '16',
    marginX: 'auto',
    maxWidth: '1024px',
    position: 'relative',
  },
});
export const navMenu = cva({
  base: {
    padding: '4',
    gap: '6',
    textAlign: 'center',
    position: 'absolute',
    top: '0',
    right: '0',
    bg: 'white',
    width: {
      base: '100%',
      md: 'auto',
    },
    flexDirection: {
      base: 'column',
      md: 'row',
    },
    zIndex: 999,
    transition: 'all 300ms ease-in-out',
    overflow: 'hidden',
    display: {
      base: 'none',
      md: 'flex',
    },
    opacity: {
      base: 0,
      md: 1,
    },
    transform: {
      base: 'translateY(-150%)',
      md: 'translateY(0)',
    },
    maxHeight: {
      base: '0',
      md: 'none',
    },
    pointerEvents: {
      base: 'none',
      md: 'auto',
    },
    visibility: {
      base: 'hidden',
      md: 'visible',
    },
  },
  variants: {
    isOpen: {
      true: {
        display: { base: 'flex' },
        opacity: { base: 1 },
        transform: { base: 'translateY(32%)' },
        maxHeight: { base: '500px' },
        pointerEvents: { base: 'auto' },
        visibility: { base: 'visible' },
      },
      false: {
        display: { base: 'none' },
        opacity: { base: 0 },
        transform: { base: 'translateY(-150%)' },
        maxHeight: { base: '0' },
        pointerEvents: { base: 'none' },
        visibility: { base: 'hidden' },
      },
    },
  },
});

export const dimOverlay = cva({
  base: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    bg: 'rgba(0, 0, 0, 0.4)',
    zIndex: 998,
    display: {
      base: 'block',
      md: 'none',
    },
  },
});
