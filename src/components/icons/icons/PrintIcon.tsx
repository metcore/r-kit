import React from "react";

import type { IconProps } from "../type";

const PrintIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M18 7h-.25V5a.747.747 0 0 0-.22-.53l-2-2a.749.749 0 0 0-.53-.22H8c-.965 0-1.75.785-1.75 1.75v3H6c-2 0-3 1-3 3v5.5c0 .83.67 1.5 1.5 1.5h1.75v3c0 .96.79 1.75 1.75 1.75h8c.96 0 1.75-.79 1.75-1.75v-3h1.75c.83 0 1.5-.67 1.5-1.5V10c0-2-1-3-3-3ZM7.75 4A.25.25 0 0 1 8 3.75h6.689l1.561 1.561V7h-8.5V4Zm8.5 16c0 .14-.11.25-.25.25H8c-.14 0-.25-.11-.25-.25v-4.25h8.5V20Zm.75-8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
  </svg>
);

export default PrintIcon;