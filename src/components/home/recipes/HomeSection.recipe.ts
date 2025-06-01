import { cva } from '@root/styled-system/css';

// Hero Section
export const heroSection = cva({
  base: {
    width: '100vw',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    overflow: 'hidden',
    height: '1280px',
  },
});

export const heroImage = cva({
  base: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

export const heroText = cva({
  base: {
    position: 'absolute',
    top: '50%',
    left: '5%',
    color: 'white',
    textStyle: {
      base: 'headline4',
      md: 'headline1',
    },
  },
});

// Scroll Marker Section
export const scrollSectionWrapper = cva({
  base: {
    width: '100vw',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    background: 'white',
    borderTopLeftRadius: '4xl',
    borderTopRightRadius: '4xl',
    marginTop: '-64px',
    paddingY: '10',
  },
});

export const scrollSectionInner = cva({
  base: {
    maxWidth: '1024px',
    marginX: 'auto',
    textAlign: 'center',
    transition: 'all 0.8s ease-in-out',
  },
  variants: {
    visible: {
      true: {
        opacity: 1,
        transform: 'translateY(0)',
      },
      false: {
        opacity: 0,
        transform: 'translateY(30px)',
      },
    },
  },
});

// Subscribe Section
export const subscribeTeaserWrapper = cva({
  base: {
    textAlign: 'center',
    marginBottom: '5rem',
  },
});

export const subscribeBenefitGrid = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: '3rem',
  },
});

export const subscribeBenefitCard = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    width: '100%',
    bg: 'white',
    borderRadius: 'md',
    textAlign: 'center',
    boxShadow: 'sm',
  },
});
