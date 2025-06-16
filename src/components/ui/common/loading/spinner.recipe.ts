import { cva } from '@root/styled-system/css';

export const spinnerContainer = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    gap: '3',
  },
});

export const spinner = cva({
  base: {
    width: '36px',
    height: '36px',
    border: '4px solid',
    borderColor: 'gray.200',
    borderTopColor: 'primary',
    borderRadius: 'full',
    animation: 'spin 1s linear infinite',
  },
});

export const spinnerText = cva({
  base: {
    fontSize: '16px',
    color: 'text',
  },
});
