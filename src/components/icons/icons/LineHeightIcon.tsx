import React from 'react';

import type { IconProps } from '../type';

const LineHeightIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.5 10.8333H12.5M5.83333 14.1667L9.39309 6.3352C9.5859 5.91102 9.6823 5.69893 9.81589 5.63313C9.93197 5.57596 10.068 5.57596 10.1841 5.63313C10.3177 5.69893 10.4141 5.91102 10.6069 6.3352L14.1667 14.1667M17.5 17.5H2.5M17.5 2.5H2.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LineHeightIcon;
