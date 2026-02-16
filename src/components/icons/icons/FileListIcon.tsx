import React from "react";

import type { IconProps } from "../type";

const FileListIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M19.25 8.25H17c-1.58 0-2.25-.67-2.25-2.25V3.75l4.5 4.5Zm.75 1.5V18c0 2-1 3-3 3H8c-2 0-3-1-3-3V6c0-2 1-3 3-3h5.25v3c0 2.42 1.33 3.75 3.75 3.75h3ZM9.75 16a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm0-4a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm7 4a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5H16a.75.75 0 0 0 .75-.75Zm0-4a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5H16a.75.75 0 0 0 .75-.75Z"/>
  </svg>
);

export default FileListIcon;