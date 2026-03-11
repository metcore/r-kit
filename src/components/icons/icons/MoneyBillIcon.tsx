import React from "react";

import type { IconProps } from "../type";

const MoneyBillIcon: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.5 3.75H4.5C3 3.75 2.25 4.5 2.25 6V12C2.25 13.5 3 14.25 4.5 14.25H13.5C15 14.25 15.75 13.5 15.75 12V6C15.75 4.5 15 3.75 13.5 3.75ZM4.5 9.75C4.0875 9.75 3.75 9.4125 3.75 9C3.75 8.5875 4.0875 8.25 4.5 8.25C4.9125 8.25 5.25 8.5875 5.25 9C5.25 9.4125 4.9125 9.75 4.5 9.75ZM9 11.25C7.755 11.25 6.75 10.245 6.75 9C6.75 7.755 7.755 6.75 9 6.75C10.245 6.75 11.25 7.755 11.25 9C11.25 10.245 10.245 11.25 9 11.25ZM13.5 9.75C13.0875 9.75 12.75 9.4125 12.75 9C12.75 8.5875 13.0875 8.25 13.5 8.25C13.9125 8.25 14.25 8.5875 14.25 9C14.25 9.4125 13.9125 9.75 13.5 9.75Z"
      fill={color}
    />
  </svg>
);

export default MoneyBillIcon;
