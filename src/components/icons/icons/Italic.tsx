import React from "react";
import type { BaseIconProps } from "../type";

const Italic: React.FC<BaseIconProps> = ({
  size = 24,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 16"
    fill="none"
    className={className}
  >
    <path
      d="M12.8334 1.41016H5.33341M8.66675 14.7435H1.16675M9.50008 1.41016L4.50008 14.7435"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

export default Italic;
