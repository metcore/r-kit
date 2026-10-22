import React from 'react';

import type { IconProps } from '../type';

const MoreVerticalIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12.02 6C10.916 6 10.015 5.104 10.015 4C10.015 2.896 10.905 2 12.01 2H12.02C13.124 2 14.02 2.896 14.02 4C14.02 5.104 13.125 6 12.02 6ZM14.02 12C14.02 10.896 13.124 10 12.02 10H12.01C10.906 10 10.015 10.896 10.015 12C10.015 13.104 10.915 14 12.02 14C13.125 14 14.02 13.104 14.02 12ZM14.02 20C14.02 18.896 13.124 18 12.02 18H12.01C10.906 18 10.015 18.896 10.015 20C10.015 21.104 10.915 22 12.02 22C13.125 22 14.02 21.104 14.02 20Z"
      fill={color}
    />
  </svg>
);

export default MoreVerticalIcon;
