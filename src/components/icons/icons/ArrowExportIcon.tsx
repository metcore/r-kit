import React from "react";

import type { IconProps } from "../type";

const ArrowExportIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M21 4v5a1 1 0 1 1-2 0V6.414l-7.293 7.293a.997.997 0 0 1-1.414 0 .999.999 0 0 1 0-1.414L17.586 5H15a1 1 0 1 1 0-2h5a.996.996 0 0 1 1 1Zm-1 8a1 1 0 0 0-1 1v4c0 1.439-.561 2-2 2H7c-1.439 0-2-.561-2-2V7c0-1.439.561-2 2-2h4a1 1 0 1 0 0-2H7C4.458 3 3 4.458 3 7v10c0 2.542 1.458 4 4 4h10c2.542 0 4-1.458 4-4v-4a1 1 0 0 0-1-1Z"/>
  </svg>
);

export default ArrowExportIcon;