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

export const modalText = cva({
  variants: {
    flex: {
      col: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
      row: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
    },
    gap: {
      1: { gap: 1 },
    },
    text: {
      head3: { textStyle: 'headline3' },
      head4: { textStyle: 'headline4' },
      pageTitle: { textStyle: 'pageTitle' },
      sub2: { textStyle: 'subtitle2' },
      body2: { textStyle: 'body2' },
      body3: { textStyle: 'body3' },
      label1: { textStyle: 'label1' },
      label2: { textStyle: 'label2' },
      search: { fontSize: '20px', fontWeight: 600 },
    },
    align: {
      left: { textAlign: 'left' },
      center: { textAlign: 'center' },
      right: { textAlign: 'right' },
      justify: { textAlign: 'justify' },
    },
    color: {
      black: { color: 'black' },
      gray600: { color: 'gray.600' },
      gray500: { color: 'gray.500' },
      gray400: { color: 'gray.400' },
      blue500: { color: 'blue.500' },
    },
    cursor: {
      pointer: { cursor: 'pointer' },
    },
    hover: {
      on: {
        _hover: {
          transform: 'scale(1.05)',
        },
      },
    },
    clamp: {
      1: { lineClamp: 1, width: 'full' },
    },
  },
  defaultVariants: {
    align: 'center',
  },
});
