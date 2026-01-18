import React from "react";

import type { IconProps } from "../type";

const ClosedCaptioningIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M18 4H6C4 4 3 5 3 7v10c0 2 1 3 3 3h12c2 0 3-1 3-3V7c0-2-1-3-3-3Zm-9.25 9.75c.552 0 1-.449 1-1h1.5c0 1.378-1.121 2.5-2.5 2.5a2.503 2.503 0 0 1-2.5-2.5v-1.5c0-1.378 1.121-2.5 2.5-2.5s2.5 1.122 2.5 2.5h-1.5a1.001 1.001 0 0 0-2 0v1.5c0 .551.448 1 1 1Zm6.5 0c.552 0 1-.449 1-1h1.5c0 1.378-1.121 2.5-2.5 2.5a2.503 2.503 0 0 1-2.5-2.5v-1.5c0-1.378 1.121-2.5 2.5-2.5s2.5 1.122 2.5 2.5h-1.5a1.001 1.001 0 0 0-2 0v1.5c0 .551.448 1 1 1Z"/>
  </svg>
);

export default ClosedCaptioningIcon;