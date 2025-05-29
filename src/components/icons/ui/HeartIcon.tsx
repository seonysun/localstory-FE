import { IconProps } from '@components/icons/iconProps';

const HeartIcon = ({
  width = 24,
  height = 24,
  fill = 'none',
  stroke,
  strokeWidth,
  ...props
}: IconProps) => {
  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 16 15"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.68043 3.35625L8.21066 3.8456L7.7409 3.35625C6.44367 2.00495 4.34046 2.00495 3.04323 3.35625C1.74601 4.70755 1.74601 6.89844 3.04323 8.24974L7.27113 12.6539C7.79002 13.1944 8.63131 13.1944 9.1502 12.6539L13.3781 8.24974C14.6753 6.89844 14.6753 4.70755 13.3781 3.35625C12.0809 2.00495 9.97765 2.00495 8.68043 3.35625Z"
        stroke="#FE2352"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HeartIcon;
