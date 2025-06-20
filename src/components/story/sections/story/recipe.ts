import { cva } from '@root/styled-system/css';

// style
export const storySection = cva({
  base: {
    mb: 12,
    position: 'relative',
  },
});

export const storyInput = cva({
  base: {
    width: '100%',
    bg: 'gray.100',
    px: 4,
    py: 2,
    borderRadius: 'md',
  },
});

export const storyButtonGroup = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
    mt: 8,
  },
});

export const storyImage = cva({
  base: {
    width: '100%',
    height: '500px',
    objectFit: 'cover',
  },
});

export const storyOverlay = cva({
  base: {
    position: 'absolute',
    top: '100px',
    left: 4,
    color: 'white',
  },
});

export const searchWrapper = cva({
  base: {
    width: '100%',
    position: 'absolute',
    top: 12,
    zIndex: 100,
    bgColor: 'white',
    maxHeight: '200px',
    overflowY: 'auto',
  },
});
