import React from "react";

import type { IconProps } from "../type";

const PlusCircleIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm3.5 10.75h-2.75v2.75c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-2.75H8.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h2.75V8.5c0-.41.34-.75.75-.75s.75.34.75.75v2.75h2.75c.41 0 .75.34.75.75s-.34.75-.75.75Z"/>
  </svg>
);

export default PlusCircleIcon;