import React from "react";

import type { IconProps } from "../type";

const StandingsIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M18.546 9.545a2.455 2.455 0 0 0-2.308 1.637h-3.42V9.545a2.462 2.462 0 0 0-2.454-2.454H7.762a2.455 2.455 0 0 0-2.307-1.636A2.462 2.462 0 0 0 3 7.909a2.462 2.462 0 0 0 2.455 2.455 2.455 2.455 0 0 0 2.307-1.637h2.602a.82.82 0 0 1 .818.818v4.91a.82.82 0 0 1-.818.818H7.762a2.455 2.455 0 0 0-2.307-1.637A2.462 2.462 0 0 0 3 16.091a2.462 2.462 0 0 0 2.455 2.454 2.455 2.455 0 0 0 2.307-1.636h2.602a2.462 2.462 0 0 0 2.454-2.454v-1.637h3.42a2.455 2.455 0 0 0 2.308 1.636A2.462 2.462 0 0 0 21 12a2.462 2.462 0 0 0-2.454-2.455Z"/>
  </svg>
);

export default StandingsIcon;