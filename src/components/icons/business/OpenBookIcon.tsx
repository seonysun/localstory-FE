import * as React from 'react';
import { IconProps } from '@components/icons/iconProps';

const SvgOpenBook = ({
  width = 24,
  height = 24,
  fill = 'none',
  stroke,
  strokeWidth,
  ...props
}: IconProps) => (
  <svg
    {...props}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" fill="url(#pattern0_27_215)" />
    <defs>
      <pattern
        id="pattern0_27_215"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0_27_215" transform="scale(0.0111111)" />
      </pattern>
      <image
        id="image0_27_215"
        width="90"
        height="90"
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEEUlEQVR4nO2dS4hWdRiHny5qgYUahAihtIgK2hQVgqCN5aoWCS1aTpfRgQZppSmKgYIDUZK4sYIIWyjtwqYMDLpCDUVQi5LpptUsxoKB8kLDiT/8BoYPv/Od7/N87znn8/fAuzuX933mP+cG8xswxhhjjDHGGGOMuTpYDIwDfwAZMAv8BUwDU6qvgUngM+Ak8DZwENgJDAOPAg8AtwFLqB83qLcH1euwej+oWU5qtknNOj/3tFzMys3vwAE565oDOkhZNQf8BEwArwBbgSFgFf1nlc61VRIn1MtcyTMmZ10zv5Ij6k/gXWA7sE4rrVeuB+4DtgFvAT8Hz9E1WYV1HngfeA5YU6DXNdr2A+1bZe+NEp21VLpOPt2y0m8EngE+r0F/AyM6U50BtqjO1qCfvoq+F1gLPAxsBp4ERoDngRd0ozsKfAR8D5yrwfCd6px6PaXeXwZ2aKYRzbhZM6+Vg76L7oUlwGpgIzC64M4/1Yc7/+VqTuea0LlH1cvqK3jsrKXoPG4GHgH2AO8Bf5cgNh3jBLBbx07nKJtS/CwKFH25x7MNwEvAj13I/UH7bNAx+k27PpK7QqzUXb4q0a2kN8vXc/p5TdtE066fT+Uwl0XaMG/lVEXWkH5SfdHp2r+lwK9oVWQN6We+ns3bucjDf1VkDeln4SWkLemLlEUXo8izec8713EFVcUVubLo4lh0EBYdhEUHYdFBWHQQFh2ERQdh0UFYdBAWHYRFB2HRQVh0EBYdhEUHYdFBWHQQFh2ERQdh0UFYdBAWHYRFB2HRQVh0EBYdhEUHYdFBWHQQFh2ERQdh0UFYdBAWHYRFB2HRQVj0oIieVK5FimQ4DrwJHAZeBMaUbZEiGu4BlgcMVhbL1fNGzTCmmQ5rxuOa+ZQc9F10tzULfKdYh0PKyhgq8ofpBXvrhpU696h6OaHe5mPVyq5Q0VmHXI0Pgb3AY8CKEkUvVeLYNq3G6Qrma8u/FTSTtSTFpBV2BHhcsoqKXqo4niM6RkSyTV79kyf624qby1rqgiLWxnK2GdM2F2rQ78L6Jk/0rho0mA1IpejNttykKMmqm8waXlNymcvdwK81aDZraP0C3EUXz5TjCvSruvGsIXVWIbDL6JH0yHUHcL8C9p5QVOV2ZcgdAz4BTgMXazBwVlJd1CUgJcm8A7yq6+6IHGxSHHJavbcQzLUK7XtIP4xxZdn9VgNx7eqM3vjGlYM0pFDZ62goy4D1itVMEcYzFUid0bl3Kh+vzE8EteUa4E6lkL+hS0/ZYk/r2MM6VzqnAW7XK3N6Lb/Ug9j/9MFnr8K6TcGb8L4uJO/v8K3E5JBuSF8VkPxlk29edWFFhxjPJPnWqpscFBbrhvaxnhxm9Oz+VK//ksMYY4wxhoHkf8qQYu/faXohAAAAAElFTkSuQmCC"
      />
    </defs>
  </svg>
);
export default SvgOpenBook;
