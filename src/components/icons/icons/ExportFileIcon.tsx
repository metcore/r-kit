import React from "react";

import type { IconProps } from "../type";

const ExportFileIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M20.555 11.722v5.6a2.264 2.264 0 0 1-2.333 2.177H5.778a2.263 2.263 0 0 1-2.333-2.177v-5.6a.778.778 0 0 1 1.556 0v5.6a.723.723 0 0 0 .777.622h12.444a.723.723 0 0 0 .777-.622v-5.6a.778.778 0 0 1 1.556 0Zm-9.107 3.663a.78.78 0 0 0 .498.226h.147a.778.778 0 0 0 .42-.187l.04-.039 2.426-2.419a.779.779 0 0 0-.254-1.273.78.78 0 0 0-.85.169l-1.097 1.097V6.278a.778.778 0 1 0-1.556 0v6.68l-1.096-1.104a.778.778 0 0 0-1.33.552.777.777 0 0 0 .225.553l2.427 2.426Z"/>
  </svg>
);

export default ExportFileIcon;