import React from "react";

import type { IconProps } from "../type";

const ArrowTurnDownLeftIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M22 6v5c0 2.206-1.794 4-4 4H5.414l2.293 2.293a.999.999 0 1 1-1.414 1.414l-3.999-3.999a1 1 0 0 1 0-1.416l3.999-3.999a.999.999 0 1 1 1.414 1.414L5.414 13H18c1.103 0 2-.897 2-2V6a1 1 0 1 1 2 0Z"/>
  </svg>
);

export default ArrowTurnDownLeftIcon;