import React from "react";
import type { BaseIconProps } from "../type";

const HourglassIcon: React.FC<BaseIconProps> = ({
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
      d="M13.1175 6.64508L9.01501 9L4.89001 6.64508C4.18501 6.24758 3.75 6.00001 3.75 4.69501V3.375C3.75 2.7525 4.2525 2.25 4.875 2.25H13.125C13.7475 2.25 14.25 2.7525 14.25 3.375V4.69501C14.25 6.00001 13.815 6.24758 13.1175 6.64508ZM3.75 13.305V14.625C3.75 15.2475 4.2525 15.75 4.875 15.75H13.125C13.7475 15.75 14.25 15.2475 14.25 14.625V13.305C14.25 12 13.815 11.7524 13.1175 11.3549L9.01501 9L4.89001 11.3549C4.18501 11.7524 3.75 12 3.75 13.305Z"
      fill={color}
    />
  </svg>
);

export default HourglassIcon;
