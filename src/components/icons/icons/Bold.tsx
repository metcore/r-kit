import React from "react";
import type { BaseIconProps } from "../type";

const Bold: React.FC<BaseIconProps> = ({
  size = 24,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 13 16"
    fill="none"
    className={className}
  >
    <path
      d="M1 8.07682H7.66667C9.50762 8.07682 11 6.58444 11 4.74349C11 2.90254 9.50762 1.41016 7.66667 1.41016H1V8.07682ZM1 8.07682H8.5C10.3409 8.07682 11.8333 9.56921 11.8333 11.4102C11.8333 13.2511 10.3409 14.7435 8.5 14.7435H1V8.07682Z"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default Bold;
