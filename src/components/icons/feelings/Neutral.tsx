import { IconProps } from '@components/icons/iconProps';

const Neutral = ({ size = 20, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 72 73"
    {...props}
  >
    <g clipPath="url(#neutral_svg__a)">
      <path
        fill="#DA9DFF"
        d="M72 36.416c0 19.882-16.118 36-36 36-19.88 0-36-16.118-36-36 0-19.88 16.12-36 36-36 19.882 0 36 16.12 36 36"
      />
      <path
        fill="#000"
        d="M23 40.416c2.761 0 5-3.134 5-7s-2.239-7-5-7-5 3.134-5 7 2.239 7 5 7M49 40.416c2.761 0 5-3.134 5-7s-2.239-7-5-7-5 3.134-5 7 2.239 7 5 7M50 52.416H22a2 2 0 1 1 0-4h28a2 2 0 0 1 0 4"
      />
    </g>
    <defs>
      <clipPath id="neutral_svg__a">
        <path fill="#fff" d="M0 .416h72v72H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default Neutral;
