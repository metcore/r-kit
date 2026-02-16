import React from "react";

import type { IconProps } from "../type";

const LocationPinUserIcon: React.FC<IconProps> = ({
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
    <path fill={color} fill-rule="evenodd" d="M12.808 21.064C15.871 19.041 20.5 15.983 20.5 11c0-4.687-3.811-8.5-8.498-8.5-4.687 0-8.5 3.813-8.5 8.5 0 4.983 4.629 8.041 7.692 10.064l.53.352a.5.5 0 0 0 .554 0l.53-.352Zm-1.913-10.8H13c2.137 0 2.895 1.564 2.895 2.904 0 1.198-.638 1.832-1.844 1.832H9.844C8.637 15 8 14.366 8 13.168c0-1.34.758-2.905 2.895-2.905ZM11.952 5a2.107 2.107 0 0 0-2.105 2.105c0 1.161.944 2.106 2.105 2.106a2.107 2.107 0 0 0 2.105-2.106A2.107 2.107 0 0 0 11.952 5Z" clip-rule="evenodd"/>
  </svg>
);

export default LocationPinUserIcon;