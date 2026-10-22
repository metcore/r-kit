import React from 'react';

import type { IconProps } from '../type';

const FaceIdIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M4.00056 7.99973V5.99973C4.00056 5.46929 4.21128 4.96058 4.58635 4.58551C4.96142 4.21044 5.47013 3.99973 6.00057 3.99973H8.00057"
      stroke={color}
      strokeWidth="1.37143"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.00056 15.9998V17.9998C4.00056 18.5302 4.21128 19.0389 4.58635 19.414C4.96142 19.789 5.47013 19.9998 6.00057 19.9998H8.00057"
      stroke={color}
      strokeWidth="1.37143"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.0006 3.99973H18.0006C18.531 3.99973 19.0397 4.21044 19.4148 4.58551C19.7898 4.96058 20.0006 5.46929 20.0006 5.99973V7.99973"
      stroke={color}
      strokeWidth="1.37143"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.0006 19.9998H18.0006C18.531 19.9998 19.0397 19.789 19.4148 19.414C19.7898 19.0389 20.0006 18.5302 20.0006 17.9998V15.9998"
      stroke={color}
      strokeWidth="1.37143"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.00029 9.99976H9.01011"
      stroke={color}
      strokeWidth="1.37143"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.0003 9.99976H15.0101"
      stroke={color}
      strokeWidth="1.37143"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.50084 14.9999C9.82672 15.3325 10.2157 15.5967 10.645 15.7771C11.0742 15.9575 11.5352 16.0504 12.0008 16.0504C12.4665 16.0504 12.9274 15.9575 13.3567 15.7771C13.786 15.5967 14.175 15.3325 14.5008 14.9999"
      stroke={color}
      strokeWidth="1.37143"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default FaceIdIcon;
