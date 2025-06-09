import { IconProps } from '@components/icons/iconProps';

const Grinning = ({ size = 20, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 72 73"
    {...props}
  >
    <g clipPath="url(#grinning_svg__a)">
      <path
        fill="#DA9DFF"
        d="M72 36.746c0 19.882-16.118 36-36 36-19.88 0-36-16.118-36-36 0-19.88 16.12-36 36-36 19.882 0 36 16.12 36 36"
      />
      <path
        fill="#000"
        d="M23 36.746c2.761 0 5-4.925 5-11s-2.239-11-5-11-5 4.925-5 11 2.239 11 5 11M49 36.746c2.761 0 5-4.925 5-11s-2.239-11-5-11-5 4.925-5 11 2.239 11 5 11M36 44.746c-7.246 0-12.054-.844-18-2-1.358-.262-4 0-4 4 0 8 9.19 18 22 18 12.808 0 22-10 22-18 0-4-2.642-4.264-4-4-5.946 1.156-10.754 2-18 2"
      />
      <path fill="#fff" d="M18 46.746s6 2 18 2 18-2 18-2-4 8-18 8-18-8-18-8" />
    </g>
    <defs>
      <clipPath id="grinning_svg__a">
        <path fill="#fff" d="M0 .746h72v72H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default Grinning;
