import { cva } from '@root/styled-system/css';

export const scrollMainText = cva({
  base: {
    color: 'blue.500',
    textStyle: 'body2',
  },
});

export const scrollSubText = cva({
  base: {
    color: 'black',
    textStyle: 'headline2',
    lineHeight: '1.5',
    marginTop: '3rem',
    marginBottom: '3rem',
  },
});

export const scrollDescription = cva({
  base: {
    textStyle: 'body1',
    color: 'gray.500',
    marginTop: '3rem',
    lineHeight: '1.5',
  },
});
