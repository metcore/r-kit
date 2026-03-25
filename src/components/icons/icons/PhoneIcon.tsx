import React from 'react';

import type { IconProps } from '../type';

const PhoneIcon: React.FC<IconProps> = ({
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
      d="M14.6874 11.8115L16.8899 13.1249C17.3449 13.3965 17.5798 13.9249 17.4757 14.4449C17.0498 16.5774 14.9083 17.944 12.8108 17.3682C7.86159 16.0099 3.99566 12.1557 2.63233 7.19571C2.05566 5.09738 3.42075 2.95403 5.55408 2.52736L5.56812 2.52487C6.08895 2.4207 6.61992 2.65653 6.89075 3.11403L8.19324 5.31321C8.65657 6.09571 8.42645 7.10319 7.66895 7.60653L6.28487 8.52737C7.26154 10.8665 9.12816 12.7407 11.4607 13.7157L12.3898 12.3282C12.8973 11.5724 13.9057 11.3457 14.6874 11.8115Z"
      fill={color}
    />
  </svg>
);

export default PhoneIcon;
