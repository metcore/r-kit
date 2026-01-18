import React from "react";

import type { IconProps } from "../type";

const MobileIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M16 3H8C6 3 5 4 5 6v12c0 2 1 3 3 3h8c2 0 3-1 3-3V6c0-2-1-3-3-3Zm-4 16a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1.5-12.25h-3a.75.75 0 0 1 0-1.5h3a.75.75 0 0 1 0 1.5Z"/>
  </svg>
);

export default MobileIcon;