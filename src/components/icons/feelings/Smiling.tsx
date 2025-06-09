import { IconProps } from '@components/icons/iconProps';

const Smiling = ({ size = 20, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 72 73"
    {...props}
  >
    <g clipPath="url(#smiling_svg__a)">
      <path
        fill="#DA9DFF"
        d="M36 72.416c19.882 0 36-16.118 36-36s-16.118-36-36-36-36 16.118-36 36 16.118 36 36 36"
      />
      <path
        fill="#000"
        d="M21.03 47.658c.09.358 2.336 8.758 14.97 8.758 12.636 0 14.88-8.4 14.97-8.758a.998.998 0 0 0-1.1-1.23 1 1 0 0 0-.574.276c-.038.038-3.908 3.712-13.296 3.712s-13.26-3.674-13.296-3.71a1.004 1.004 0 0 0-1.196-.162 1 1 0 0 0-.478 1.114M24 34.416c2.762 0 5-3.134 5-7s-2.238-7-5-7-5 3.134-5 7 2.239 7 5 7M48 34.416c2.761 0 5-3.134 5-7s-2.239-7-5-7-5 3.134-5 7 2.239 7 5 7"
      />
    </g>
    <defs>
      <clipPath id="smiling_svg__a">
        <path fill="#fff" d="M0 .416h72v72H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default Smiling;
