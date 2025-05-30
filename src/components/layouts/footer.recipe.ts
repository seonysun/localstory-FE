import { cva } from '@root/styled-system/css';

export const Wrapper = cva({
  base: {
    display: 'flex',
    flexDirection: { base: 'column', md: 'row' },
    justifyContent: 'space-between',
    alignItems: { base: 'stretch', md: 'center' },
    gap: '4',
    px: '8',
    py: '6',
    bg: 'gray.100',
    width: '100%',
    maxWidth: '1024px',
    mx: 'auto',
  },
});

export const LogoSection = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1',
    color: 'text',
    textStyle: 'label1',
    width: '100%',
    textAlign: 'center',
  },
});

export const ContactSection = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '2',
    color: 'text',
    textStyle: 'body2',
    width: '100%',
    textAlign: 'left',
  },
});

export const ContactItem = cva({
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '4',
    mb: '2',
    width: '100%',
    color: 'text',
  },
});

export const MenuSection = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '2',
    mb: '2',
    width: '100%',
    textStyle: 'body2',
    color: 'text',
    textAlign: 'left',
  },
});
