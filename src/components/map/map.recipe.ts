import { cva } from '@root/styled-system/css';

export const iconWrapper = cva({
  base: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
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
      lg: { gap: 6 },
    },
    p: {
      none: { padding: 0 },
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
