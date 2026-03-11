import React from "react";

import type { IconProps } from "../type";

const EnvelopeIcon: React.FC<IconProps> = ({
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
      d="M13.5 3.75H4.5C3 3.75 2.25 4.5 2.25 6V12.75C2.25 14.25 3 15 4.5 15H13.5C15 15 15.75 14.25 15.75 12.75V6C15.75 4.5 15 3.75 13.5 3.75ZM13.4557 7.2045L9.77179 9.8835C9.54079 10.0515 9.27 10.1355 9 10.1355C8.73 10.1355 8.45846 10.0515 8.22821 9.88425L4.54431 7.2045C4.29306 7.02225 4.23753 6.66975 4.42053 6.4185C4.60278 6.168 4.95292 6.111 5.20642 6.29475L8.8905 8.97375C8.9565 9.021 9.04423 9.02175 9.11023 8.97375L12.7943 6.29475C13.0471 6.111 13.398 6.168 13.5802 6.4185C13.7632 6.6705 13.7069 7.02225 13.4557 7.2045Z"
      fill={color}
    />
  </svg>
);

export default EnvelopeIcon;
