import { cva } from '@root/styled-system/css';

export const dropdownButton = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: '2',
    borderRadius: 'md',
    borderWidth: '1px',
    borderColor: 'gray.300',
    bg: 'white',
    cursor: 'pointer',
    fontSize: 'sm',
    color: 'gray.600',
    minW: '24',
  },
});

export const dropdownList = cva({
  base: {
    position: 'absolute',
    mt: '1',
    bg: 'white',
    borderRadius: 'md',
    borderWidth: '1px',
    borderColor: 'gray.200',
    zIndex: '10',
    w: 'full',
    boxShadow: 'sm',
    maxHeight: '130px',
    overflowY: 'auto',
  },
});

export const dropdownItem = cva({
  base: {
    px: '2',
    py: '1.5',
    borderRadius: 'md',
    fontSize: 'sm',
    color: 'gray.400',
    cursor: 'pointer',
    _hover: {
      bg: 'gray.50',
    },
  },
});

export const border = cva({
  variants: {
    color: {
      gray100: { borderColor: 'gray.100' },
      gray300: { borderColor: 'gray.300' },
    },
    width: {
      1: { borderWidth: '1px' },
      2: { borderWidth: '2px' },
    },
    style: {
      solid: { borderStyle: 'solid' },
    },
    radius: {
      md: { borderRadius: 'md' },
    },
    p: {
      none: { padding: 'none' },
      2: { padding: '2' },
    },
  },
  defaultVariants: {
    color: 'gray300',
    width: 1,
    style: 'solid',
    radius: 'md',
    p: 'none',
  },
});
