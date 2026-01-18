import React from "react";

import type { IconProps } from "../type";

const MoneyBillSendIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M18 4H6C4 4 3 5 3 7v8c0 2 1 3 3 3h7.74c.17 0 .31-.14.31-.31 0-.04-.01-.08-.02-.12a5.002 5.002 0 0 1 6.57-5.31c.2.06.4-.07.4-.28V7c0-2-1-3-3-3ZM6 11.999a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12 14a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm9.53 3.53a.748.748 0 0 1-1.06 0l-.72-.72V20a.75.75 0 0 1-1.5 0v-3.189l-.72.72a.75.75 0 1 1-1.061-1.061l2-2a.75.75 0 0 1 1.061 0l2 2a.749.749 0 0 1 0 1.06Z"/>
  </svg>
);

export default MoneyBillSendIcon;