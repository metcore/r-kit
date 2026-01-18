import React from "react";

import type { IconProps } from "../type";

const PercentCircleIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2ZM9.25 8a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm5.5 8a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm1.78-7.47-8 8a.748.748 0 0 1-1.06 0 .75.75 0 0 1 0-1.061l8-8a.75.75 0 1 1 1.06 1.061Z"/>
  </svg>
);

export default PercentCircleIcon;