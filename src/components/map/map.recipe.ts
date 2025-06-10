import { cva } from '@root/styled-system/css';

export const iconWrapper = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    _hover: {
      opacity: 0.8,
      transform: 'scale(1.05)',
    },
  },
  variants: {
    size: {
      sm: { width: '8', height: '8', padding: '1' },
      md: { width: '10', height: '10', padding: '2' },
      lg: { width: '14', height: '14', padding: '2' },
    },
    border: {
      none: { borderWidth: '0' },
      gray: { borderWidth: '1px', borderColor: 'gray.200' },
      black: { borderWidth: '2px', borderColor: 'black' },
    },
    bg: {
      black: { backgroundColor: 'black' },
      white: { backgroundColor: 'white' },
    },
    radius: {
      md: { borderRadius: 'md' },
      full: { borderRadius: 'full' },
    },
    shadow: {
      none: { boxShadow: 'none' },
      xs: { boxShadow: 'xs' },
    },
    margin: {
      xs: { margin: 1.5 },
    },
  },
  defaultVariants: {
    size: 'md',
    border: 'gray',
    radius: 'md',
    shadow: 'xs',
  },
});

export const categoryTitle = cva({
  variants: {
    textStyle: {
      body2: { textStyle: 'body2' },
      body3: { textStyle: 'body3' },
      body4: { textStyle: 'body4' },
      label1: { textStyle: 'label1' },
      label2: { textStyle: 'label2' },
    },
    active: {
      true: { color: 'black' },
      false: { color: 'gray.300' },
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
  },
  defaultVariants: {
    textStyle: 'body3',
  },
});

export const gridLayout = cva({
  base: {
    display: 'grid',
  },
  variants: {
    columns: {
      1: { gridTemplateColumns: 'repeat(1, 1fr)' },
      2: { gridTemplateColumns: 'repeat(2, 1fr)' },
      3: { gridTemplateColumns: 'repeat(3, 1fr)' },
      4: { gridTemplateColumns: 'repeat(4, 1fr)' },
    },
    gap: {
      none: { gap: 0 },
      sm: { gap: 2 },
      lg: { gap: 6 },
    },
    p: {
      none: { padding: 0 },
      xs: { padding: 1 },
      sm: { padding: 2 },
    },
    marginB: {
      sm: { marginBottom: 3 },
    },
  },
  defaultVariants: {
    columns: 2,
    gap: 'lg',
    p: 'sm',
  },
});

export const mapOverlayWrapper = cva({
  base: {
    position: 'absolute',
  },
  variants: {
    zindex: {
      10: { zIndex: 10 },
    },
    type: {
      category: {
        display: 'flex',
        padding: '1',
        borderRadius: 'md',
        top: '1',
        left: '1',
        backgroundColor: 'white',
      },
      card: {
        bottom: '2',
        left: '2.5%',
        w: '95%',
      },
    },
  },
  defaultVariants: {
    type: 'category',
    zindex: 10,
  },
});
