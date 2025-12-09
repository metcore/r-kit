import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const ArrowsExpandIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M22 3v6a1 1 0 1 1-2 0V5.414l-5.293 5.293a.997.997 0 0 1-1.414 0 .999.999 0 0 1 0-1.414L18.586 4H15a1 1 0 1 1 0-2h6a.996.996 0 0 1 1 1ZM9.293 13.293 4 18.586V15a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1h6a1 1 0 1 0 0-2H5.414l5.293-5.293a.999.999 0 1 0-1.414-1.414Z"/>
  </svg>
);

export default ArrowsExpandIcon;