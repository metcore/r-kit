import React from "react";

import type { IconProps } from "../type";

const CaretUpIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="m13.302 8.604 4.38 5.194c.736.873.112 2.202-1.034 2.202H7.352c-1.146 0-1.77-1.33-1.034-2.202l4.38-5.194a1.706 1.706 0 0 1 2.604 0Z"/>
  </svg>
);

export default CaretUpIcon;