import { cva } from '@root/styled-system/css';

export const chatBotWrapper = cva({
  base: {
    position: 'fixed',
    zIndex: 10,
    bottom: '5rem',
    right: '1rem',
  },
});

export const chatBotPanel = cva({
  base: {
    backgroundColor: 'gray.50',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
    bottom: { base: '1rem', md: '5rem' },
    right: { base: '1rem', md: '1rem' },
    width: { base: 'min(calc(100vw - 2rem), 25rem)', md: '25rem' },
    height: { base: 'min(calc(100vh - 2rem), 30rem)', md: '30rem' },
    borderRadius: 'md',
    px: '1rem',
  },
});

export const chatBubble = cva({
  base: {
    p: { base: '0.75rem', md: '1rem' },
    borderRadius: '1rem',
    maxWidth: { base: '90%', md: '80%' },
    fontSize: { base: '0.875rem', md: '0.95rem' },
    wordBreak: 'break-word',
  },
  variants: {
    variant: {
      assistant: {
        bg: 'gray.100',
        color: 'black',
      },
      user: {
        bg: 'blue.400',
        color: 'white',
      },
    },
  },
});

export const chatBotDesc = cva({
  base: {
    fontSize: '0.9rem',
    mt: '0.5rem',
  },
  variants: {
    variant: {
      assistant: {
        color: 'white',
      },
      user: {
        color: 'gray.600',
      },
    },
  },
});
