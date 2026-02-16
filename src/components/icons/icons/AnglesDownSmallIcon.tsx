import React from "react";

import type { IconProps } from "../type";

const AnglesDownSmallIcon: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path fill={color} d="M16.707 12.293a.999.999 0 0 1 0 1.414l-4 4a.997.997 0 0 1-1.414 0l-4-4a.999.999 0 1 1 1.414-1.414L12 15.586l3.293-3.293a.999.999 0 0 1 1.414 0Zm-5.414-.586a.997.997 0 0 0 1.414 0l4-4a.999.999 0 1 0-1.414-1.414L12 9.586 8.707 6.293a.999.999 0 1 0-1.414 1.414l4 4Z"/>
  </svg>
);

export default AnglesDownSmallIcon;