import { cva } from '@root/styled-system/css';

export const StorySection = cva({
  base: {
    mb: 12,
    position: 'relative',
  },
});

export const StoryInput = cva({
  base: {
    width: '100%',
    bg: 'gray.100',
    px: 4,
    py: 2,
    borderRadius: 'md',
  },
});

export const StoryButtonGroup = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
    mt: 8,
  },
});

export const StoryImage = cva({
  base: {
    width: '100%',
    height: '500px',
    objectFit: 'cover',
  },
});

export const StoryOverlay = cva({
  base: {
    position: 'absolute',
    top: '100px',
    left: 4,
    color: 'white',
  },
});
