import React from "react";

import type { IconProps } from "../type";

const CreditCardIcon: React.FC<IconProps> = ({
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
      d="M15.75 6V6.9375H2.25V6C2.25 4.5 3 3.75 4.5 3.75H13.5C15 3.75 15.75 4.5 15.75 6ZM15.75 8.0625V12C15.75 13.5 15 14.25 13.5 14.25H4.5C3 14.25 2.25 13.5 2.25 12V8.0625H15.75ZM8.0625 11.25C8.0625 10.9395 7.8105 10.6875 7.5 10.6875H5.25C4.9395 10.6875 4.6875 10.9395 4.6875 11.25C4.6875 11.5605 4.9395 11.8125 5.25 11.8125H7.5C7.8105 11.8125 8.0625 11.5605 8.0625 11.25Z"
      fill={color}
    />
  </svg>
);

export default CreditCardIcon;
