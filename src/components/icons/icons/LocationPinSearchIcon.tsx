import React from "react";

import type { IconProps } from "../type";

const LocationPinSearchIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M13.583 10.417a2.17 2.17 0 0 1-2.167 2.167 2.17 2.17 0 0 1-2.167-2.167 2.17 2.17 0 0 1 2.167-2.167 2.17 2.17 0 0 1 2.167 2.167ZM20.5 11c0 4.983-4.629 8.041-7.692 10.064l-.53.352a.5.5 0 0 1-.554 0l-.53-.352C8.131 19.041 3.502 15.983 3.502 11c0-4.687 3.813-8.5 8.5-8.5 4.687 0 8.498 3.813 8.498 8.5Zm-4.47 2.97-1.549-1.55a3.645 3.645 0 0 0 .603-2.003 3.672 3.672 0 0 0-3.667-3.667 3.672 3.672 0 0 0-3.667 3.667 3.671 3.671 0 0 0 3.667 3.667c.74 0 1.427-.224 2.004-.603l1.549 1.549a.748.748 0 0 0 1.06 0 .749.749 0 0 0 0-1.06Z"/>
  </svg>
);

export default LocationPinSearchIcon;