import React from 'react';
import { IconProps } from '@components/icons/iconProps';

function PaymentIcon({
  width = 24,
  height = 24,
  fill = 'none',
  stroke,
  strokeWidth,
  ...props
}: IconProps) {
  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 91 91"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.540039"
        y="0.22998"
        width="90"
        height="90"
        fill="url(#pattern0_874_483)"
      />
      <defs>
        <pattern
          id="pattern0_874_483"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_874_483" transform="scale(0.0111111)" />
        </pattern>
        <image
          id="image0_874_483"
          width="90"
          height="90"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAABYUlEQVR4nO2cO04DMQAFpyLcAY5Iwi35VMBREPRGlixEF2zkPC87I7nPjiYv2hQGERERERERERERETnDNXAPPAOfQPFQmosn4AQc/lrRLfCmWM7F9dpcDZesZLpkD5Vd58KZoMvBcUR03WRF0+XgcUT0h6LpDa0668aaGXKgaC4Tj6JZVLSIiIiIiMiy+F8HvoKXhUOwaBRNukKLJi/O6WBHGz2bssEz5SFnUzZ4pjzkbMoGzy4esixwFI2iSVdo0eTFOR3kpbrRKJp0cRZNXpLTQV6gG81axxcWFE26QosmL87pIC/VjUbRpIuzaPKSnA7yAt1o1jq+sKBo0hVaNHlxTgd5qW40iiZdnEWTl+R08I832otR6Jb8PiLaq364zFU/pwW+hmVj525E9KFdMZb+8GUj5wW4YpB6aZ6y+ZXkm1HJP8s+tv3xB5JvudXFQ5uL4ZJFRERERERERERE2AdfrAsUQb/Eab0AAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
}

export default PaymentIcon;
