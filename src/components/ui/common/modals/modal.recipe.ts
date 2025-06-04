import { cva } from '@root/styled-system/css';

export const modalWrapper = cva({
  base: {
    position: 'fixed',
    inset: 0,
    zIndex: '50',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});

export const modalContent = cva({
  base: {
    display: 'flex',
    bg: 'white',
    width: '335px',
    height: '260px',
  },
  variants: {
    direction: {
      row: { flexDirection: 'row' },
      col: { flexDirection: 'column' },
    },
    align: {
      start: { alignItems: 'flex-start' },
      center: { alignItems: 'center' },
      end: { alignItems: 'flex-end' },
    },
    justify: {
      between: { justifyContent: 'space-between' },
      center: { justifyContent: 'center' },
    },
    gap: {
      none: { gap: '0' },
    },
    p: {
      none: { p: '0' },
      lg: { p: '6' },
    },
    radius: {
      none: { borderRadius: 'none' },
      lg: { borderRadius: 'lg' },
    },
    shadow: {
      none: { boxShadow: 'none' },
      xs: { boxShadow: 'xs' },
    },
  },
  defaultVariants: {
    direction: 'col',
    align: 'center',
    justify: 'between',
    gap: 'none',
    p: 'lg',
    radius: 'lg',
    shadow: 'xs',
  },
});

export const modalTitle = cva({
  base: {
    textStyle: 'pageTitle',
  },
  variants: {
    align: {
      left: { textAlign: 'left' },
      center: { textAlign: 'center' },
      right: { textAlign: 'right' },
    },
    color: {
      black: { color: 'black' },
      gray600: { color: 'gray.600' },
    },
  },
  defaultVariants: {
    align: 'center',
    color: 'black',
  },
});

export const modalText = cva({
  base: {
    textStyle: 'body3',
  },
  variants: {
    align: {
      left: { textAlign: 'left' },
      center: { textAlign: 'center' },
      right: { textAlign: 'right' },
    },
    color: {
      black: { color: 'black' },
      gray400: { color: 'gray.400' },
    },
  },
  defaultVariants: {
    align: 'center',
    color: 'gray400',
  },
});
