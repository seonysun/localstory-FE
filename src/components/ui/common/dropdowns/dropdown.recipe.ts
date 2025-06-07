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
    minW: '28',
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
