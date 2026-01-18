import React from "react";

import type { IconProps } from "../type";

const ArrowRightSmallIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="m20.706 12.708-3.999 4a.997.997 0 0 1-1.414 0 .999.999 0 0 1 0-1.415L17.586 13H4a1 1 0 1 1 0-2h13.586l-2.293-2.293a.999.999 0 1 1 1.414-1.414l4 3.999a1 1 0 0 1 0 1.416Z"/>
  </svg>
);

export default ArrowRightSmallIcon;