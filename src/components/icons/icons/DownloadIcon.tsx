import React from "react";

import type { IconProps } from "../type";

const DownloadIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M21 13v5c0 2-1 3-3 3H6c-2 0-3-1-3-3v-5c0-2 1-3 3-3h5.25v4.189l-1.72-1.72a.75.75 0 0 0-1.061 1.061l3 3a.749.749 0 0 0 .818.162.749.749 0 0 0 .244-.162l3-3a.75.75 0 1 0-1.061-1.061l-1.72 1.72V10H18c2 0 3 1 3 3ZM12.75 3a.75.75 0 0 0-1.5 0v7h1.5V3Z"/>
  </svg>
);

export default DownloadIcon;