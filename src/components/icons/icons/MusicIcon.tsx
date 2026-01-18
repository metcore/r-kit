import React from "react";

import type { IconProps } from "../type";

const MusicIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M19.5 4.54v10.969l-.002.008a3.002 3.002 0 0 1-2.998 2.984c-1.654 0-3-1.346-3-3s1.346-3 3-3a2.98 2.98 0 0 1 2 .78V8.14l-10 2.8v7.56c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3a2.98 2.98 0 0 1 2 .78V7.158c0-1.237.631-2.067 1.824-2.402l7.636-2.14c.752-.21 1.392-.138 1.852.21.457.348.688.924.688 1.714Z"/>
  </svg>
);

export default MusicIcon;