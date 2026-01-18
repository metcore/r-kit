import React from "react";

import type { IconProps } from "../type";

const DesktopIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M21 14c0 2-1 3-3 3h-4v3.25h2.5c.41 0 .75.34.75.75s-.34.75-.75.75h-9c-.41 0-.75-.34-.75-.75s.34-.75.75-.75H10V17H6c-2 0-3-1-3-3a.25.25 0 0 1 .25-.25h17.5A.25.25 0 0 1 21 14ZM18 3H6C4 3 3 4 3 6v6c0 .138.112.25.25.25h17.5A.25.25 0 0 0 21 12V6c0-2-1-3-3-3Z"/>
  </svg>
);

export default DesktopIcon;