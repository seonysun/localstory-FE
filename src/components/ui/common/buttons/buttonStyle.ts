import { cva } from '@root/styled-system/css';

export const buttonStyle = cva({
  base: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    textDecoration: 'none',
    userSelect: 'none',
    py: '8px',
    px: '16px',
    textStyle: 'label1',
    borderRadius: 'full',
    transition: 'all 0.2s ease-in-out',
    '&:disabled': {
      opacity: '0.5',
      cursor: 'not-allowed',
      pointerEvents: 'none',
      '&:hover': {
        backgroundColor: 'inherit',
        transform: 'none',
        boxShadow: 'none',
      },
    },
  },
  variants: {
    color: {
      primary: {
        backgroundColor: 'primary',
        color: 'onPrimary',
        '&:hover': {
          backgroundColor: 'primaryHover',
        },
        '&:active': {
          backgroundColor: 'blue.700',
        },
        '&:focus': {
          // boxShadow: 'sm',
        },
      },
      black: {
        backgroundColor: 'black',
        color: 'white',
        '&:hover': {
          backgroundColor: 'gray.800',
          transform: 'translateY(-1px)',
        },
        '&:active': {
          backgroundColor: 'black',
          transform: 'translateY(0)',
        },
        '&:focus': {
          boxShadow: 'sm',
        },
      },
      outline: {
        borderWidth: '1px',
        borderColor: 'gray.700',
        borderStyle: 'solid',
        backgroundColor: 'background',
        color: 'text',
        '&:hover': {
          backgroundColor: 'black',
          color: 'white',
          borderColor: 'gray.700',
          transform: 'translateY(-1px)',
        },
        '&:active': {
          backgroundColor: 'gray.800',
          transform: 'translateY(0)',
        },
        '&:focus': {
          boxShadow: 'sm',
        },
      },
      outlineSoft: {
        borderWidth: '1px',
        borderColor: 'blue.300',
        borderStyle: 'solid',
        backgroundColor: 'white',
        color: 'blue.600',
        '&:hover': {
          backgroundColor: 'blue.50',
          borderColor: 'blue.300',
        },
        '&:active': {
          backgroundColor: 'blue.100',
          borderColor: 'blue.400',
          color: 'blue.600',
        },
      },
      custom: {},
    },
    size: {
      xs: {
        // py: '4px',
        px: '8px',
        textStyle: 'body4',
        minH: '26px',
      },
      sm: {
        // py: '8px',
        px: '12px',
        textStyle: 'label2',
        minH: '32px',
      },
      md: {
        // py: '12px',
        px: '16px',
        textStyle: 'label1',
        minH: '40px',
      },
      lg: {
        // py: '14px',
        px: '24px',
        textStyle: 'subtitle2',
        minH: '48px',
      },
      xl: {
        // py: '16px',
        px: '32px',
        textStyle: 'subtitle1',
        minH: '54px',
      },
    },
    radius: {
      none: { borderRadius: 'none' },
      xs: { borderRadius: '2px' },
      sm: { borderRadius: 'sm' },
      md: { borderRadius: 'md' },
      lg: { borderRadius: 'lg' },
      xl: { borderRadius: 'xl' },
      full: { borderRadius: 'full' },
    },
    fullWidth: {
      true: { width: '100%' },
    },
    disabled: {
      true: {
        opacity: '0.5',
        cursor: 'not-allowed',
        pointerEvents: 'none',
        '&:hover': {
          backgroundColor: 'inherit',
          transform: 'none',
          boxShadow: 'none',
        },
      },
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
    radius: 'sm',
    fullWidth: true,
  },
});
