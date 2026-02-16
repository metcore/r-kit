import React from "react";

import type { IconProps } from "../type";

const RoadIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M20.94 16.96 18.593 6.352C18.289 4.978 17.285 4 15.878 4h-2.827a.3.3 0 0 0-.3.3V7c0 .41-.34.75-.75.75s-.75-.34-.75-.75V4.3a.3.3 0 0 0-.3-.3H8.124c-1.407 0-2.411.978-2.715 2.352L3.062 16.96A2.5 2.5 0 0 0 5.503 20h5.449a.3.3 0 0 0 .3-.3V17c0-.41.34-.75.75-.75s.75.34.75.75v2.7a.3.3 0 0 0 .3.3h5.449a2.5 2.5 0 0 0 2.439-3.04Zm-8.19-3.46a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 1.5 0v3Z"/>
  </svg>
);

export default RoadIcon;