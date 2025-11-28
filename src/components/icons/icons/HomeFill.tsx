import React from "react";
import type { BaseIconProps } from "../type";

const HomeFill: React.FC<BaseIconProps> = ({
  size = 24,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size + 1}
    viewBox="0 0 24 25"
    fill="none"
    className={className}
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M20.2701 9.36973L13.5881 3.87668C12.6651 3.11768 11.3341 3.11768 10.4111 3.87668L3.73003 9.36973C3.16903 9.83073 2.90203 10.5587 3.03203 11.2727L4.48711 19.2547C4.70411 20.4427 5.73909 21.3067 6.94609 21.3067H17.052C18.26 21.3067 19.295 20.4427 19.511 19.2547L20.966 11.2717C21.098 10.5597 20.8311 9.83073 20.2701 9.36973ZM14 18.0577H10C9.58605 18.0577 9.25005 17.7217 9.25005 17.3077C9.25005 16.8937 9.58605 16.5577 10 16.5577H14C14.414 16.5577 14.75 16.8937 14.75 17.3077C14.75 17.7217 14.414 18.0577 14 18.0577Z"
      fill={color}
    />
  </svg>
);

export default HomeFill;
