import { cva } from '@root/styled-system/css';

export const chatBotWrapper = cva({
  base: {
    position: 'fixed',
    zIndex: 10,
    bottom: '5rem',
    right: '4rem',
  },
});

export const chatBotPanel = cva({
  base: {
    backgroundColor: 'gray.50',
    width: '25rem',
    height: '30rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export const chatBubble = cva({
  base: {
    p: '1rem',
    borderRadius: '1rem',
    maxWidth: '80%',
    fontSize: '0.95rem',
  },
  variants: {
    variant: {
      bot: {
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
      bot: {
        color: 'white',
      },
      user: {
        color: 'gray.600',
      },
    },
  },
});

export const chatInputWrapper = cva({
  base: {
    display: 'flex',
    gap: '1rem',
    p: '1rem',
    borderTop: '1px solid',
    borderColor: 'gray.200',
    bg: 'white',
  },
});
