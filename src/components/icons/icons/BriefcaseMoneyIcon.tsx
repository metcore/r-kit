import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const BriefcaseMoneyIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M18 6h-1.25V4.5c0-.96-.79-1.75-1.75-1.75H9c-.96 0-1.75.79-1.75 1.75V6H6C4 6 3 7 3 9v9c0 2 1 3 3 3h12c2 0 3-1 3-3V9c0-2-1-3-3-3ZM6 14.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm6 2a3 3 0 1 1 0-6 3 3 0 0 1 0 6ZM8.75 6V4.5c0-.14.11-.25.25-.25h6c.14 0 .25.11.25.25V6h-6.5ZM18 14.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
  </svg>
);

export default BriefcaseMoneyIcon;