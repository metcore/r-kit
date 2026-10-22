import React from 'react';

import type { IconProps } from '../type';

const LocationArrowIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M20.894 4.534L13.436 20.3831C13.014 21.2801 11.705 21.174 11.433 20.221L10.343 16.4051C9.96305 15.0761 8.92504 14.038 7.59604 13.658L3.78006 12.5682C2.82706 12.2962 2.72101 10.987 3.61801 10.565L19.467 3.107C20.376 2.678 21.322 3.624 20.894 4.534Z"
      fill={color}
    />
  </svg>
);

export default LocationArrowIcon;
