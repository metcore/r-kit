import React from "react";

import type { IconProps } from "../type";

const BoxesIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M20.13 12H18.5v4L17 15l-1.5 1v-4h-.37c1.25 0 1.87-.63 1.87-1.88V3.87C17 2.62 16.38 2 15.13 2H13.5v4L12 5l-1.5 1V2H8.88C7.63 2 7 2.62 7 3.87v6.25C7 11.37 7.63 12 8.88 12H8.5v4L7 15l-1.5 1v-4H3.88C2.63 12 2 12.62 2 13.87v6.25C2 21.37 2.63 22 3.88 22h6.25c1.25 0 1.87-.63 1.87-1.88 0 1.25.63 1.88 1.88 1.88h6.25c1.25 0 1.87-.63 1.87-1.88v-6.25c0-1.25-.62-1.87-1.87-1.87ZM12 13.87c0-1.25-.62-1.87-1.87-1.87h3.75c-1.25 0-1.88.62-1.88 1.87Z"/>
  </svg>
);

export default BoxesIcon;