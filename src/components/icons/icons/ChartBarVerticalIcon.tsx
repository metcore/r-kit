import React from "react";

import type { IconProps } from "../type";

const ChartBarVerticalIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M21 21H4.5C2.958 21 2 20.042 2 18.5V4a1 1 0 0 1 2 0v14.5c0 .449.051.5.5.5H21a1 1 0 0 1 0 2ZM8 16v-3a1 1 0 0 0-2 0v3a1 1 0 0 0 2 0Zm3 1a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1Zm4 0a1 1 0 0 1-1-1v-5a1 1 0 0 1 2 0v5a1 1 0 0 1-1 1Zm4 0a1 1 0 0 1-1-1V5a1 1 0 0 1 2 0v11a1 1 0 0 1-1 1Z"/>
  </svg>
);

export default ChartBarVerticalIcon;