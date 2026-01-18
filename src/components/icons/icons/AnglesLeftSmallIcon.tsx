import React from "react";
import type { IconProps } from "../type";


const AnglesLeftSmallIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M11.707 15.293a.999.999 0 1 1-1.414 1.414l-4-4a.999.999 0 0 1 0-1.414l4-4a.999.999 0 1 1 1.414 1.414L8.414 12l3.293 3.293ZM14.414 12l3.293-3.293a.999.999 0 1 0-1.414-1.414l-4 4a.999.999 0 0 0 0 1.414l4 4a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L14.414 12Z"/>
  </svg>
);

export default AnglesLeftSmallIcon;