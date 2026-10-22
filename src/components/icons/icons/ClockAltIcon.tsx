import React from 'react';

import type { IconProps } from '../type';

const ClockAltIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12.75 12C12.75 12.414 12.414 12.75 12 12.75C11.586 12.75 11.25 12.414 11.25 12V7C11.25 6.586 11.586 6.25 12 6.25C12.414 6.25 12.75 6.586 12.75 7V12Z"
      fill={color}
    />
  </svg>
);

export default ClockAltIcon;
