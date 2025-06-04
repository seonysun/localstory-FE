import { cva } from '@root/styled-system/css';

export const cardWrapper = cva({
  base: {
    display: 'flex',
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
    gap: {
      none: { gap: '0' },
      xs: { gap: '1' },
      sm: { gap: '2' },
      md: { gap: '3' },
      lg: { gap: '4' },
    },
    p: {
      none: { p: '0' },
      xs: { p: '2' },
      sm: { p: '3' },
      md: { p: '4' },
      lg: { p: '6' },
    },
    radius: {
      none: { borderRadius: 'none' },
      sm: { borderRadius: 'sm' },
      md: { borderRadius: 'md' },
      lg: { borderRadius: 'lg' },
      full: { borderRadius: 'full' },
    },
    shadow: {
      none: { boxShadow: 'none' },
      sm: { boxShadow: 'sm' },
      md: { boxShadow: 'md' },
      lg: { boxShadow: 'lg' },
    },
  },
  defaultVariants: {
    direction: 'row',
    align: 'center',
    gap: 'md',
    p: 'sm',
    radius: 'lg',
    shadow: 'md',
  },
});

export const flexBetween = cva({
  base: {
    display: 'flex',
    width: 'full',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export const flex = cva({
  base: {
    display: 'flex',
    width: 'full',
  },
  variants: {
    direction: {
      row: { flexDirection: 'row' },
      col: { flexDirection: 'column' },
    },
    align: { center: { alignItems: 'center' } },
    gap: {
      none: { gap: '0' },
      xs: { gap: '1' },
      sm: { gap: '1.5' },
      md: { gap: '2' },
      lg: { gap: '4' },
      xl: { gap: '6' },
    },
    p: {
      none: { p: '0' },
      xs: { p: '1' },
      sm: { p: '2' },
      md: { p: '4' },
      lg: { p: '6' },
    },
    px: { lg: { px: '10' } },
  },
  defaultVariants: {
    direction: 'col',
    gap: 'none',
    p: 'none',
  },
});

export const titleText = cva({
  base: {
    textStyle: 'label1',
    lineClamp: 1,
    width: 'full',
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
    align: 'left',
    color: 'black',
  },
});

export const subText = cva({
  base: {
    display: 'flex',
  },
  variants: {
    color: {
      default: { color: 'gray.600' },
      muted: { color: 'gray.400' },
      black: { color: 'textDefault' },
    },
    align: {
      start: { alignItems: 'flex-start' },
      center: { alignItems: 'center' },
      end: { alignItems: 'flex-end' },
    },
    gap: {
      none: { gap: '0' },
      xs: { gap: '0.5' },
      sm: { gap: '1' },
      md: { gap: '1.5' },
      lg: { gap: '2' },
    },
    textStyle: {
      body3: { textStyle: 'body3' },
      body4: { textStyle: 'body4' },
      label1: { textStyle: 'label1' },
      label2: { textStyle: 'label2' },
    },
  },
  defaultVariants: {
    color: 'default',
    align: 'center',
    gap: 'sm',
    textStyle: 'body3',
  },
});

export const cardImageWrapper = cva({
  base: {
    position: 'relative',
    width: 'full',
    overflow: 'hidden',
  },
  variants: {
    aspect: {
      square: { aspectRatio: '1' },
      wide: { aspectRatio: '3/2' },
      video: { aspectRatio: '16/9' },
    },
    maxWidth: {
      none: {},
      sm: { maxWidth: '100px' },
      md: { maxWidth: '150px' },
      lg: { maxWidth: '200px' },
    },
    radius: {
      none: { borderRadius: 'none' },
      sm: { borderRadius: 'sm' },
      md: { borderRadius: 'md' },
      lg: { borderRadius: 'lg' },
      full: { borderRadius: 'full' },
    },
  },
  defaultVariants: {
    aspect: 'square',
    maxWidth: 'md',
    radius: 'lg',
  },
});

export const cardImage = cva({
  base: {
    objectFit: 'cover',
  },
});

export const gridImageWrapper = cva({
  base: {
    display: 'grid',
    width: '100%',
    height: '200px',
    overflow: 'hidden',
  },
  variants: {
    layout: {
      '1': {
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr',
      },
      '2': {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      '3': {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
      '4': {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
      },
      '5': {
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: 'repeat(2, 1fr)',
      },
    },
  },
});

export const topRightAbsolute = cva({
  base: {
    position: 'absolute',
    top: '1',
    right: '1',
  },
});
