import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const SortDescendingCircleIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm1 14.75h-2a.75.75 0 0 1 0-1.5h2a.75.75 0 0 1 0 1.5Zm1.5-4h-5a.75.75 0 0 1 0-1.5h5a.75.75 0 0 1 0 1.5Zm1.5-4H8a.75.75 0 0 1 0-1.5h8a.75.75 0 0 1 0 1.5Z"/>
  </svg>
);

export default SortDescendingCircleIcon;