import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const ArrowUpSmallIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M16.707 8.707a.997.997 0 0 1-1.414 0L13 6.414V20a1 1 0 1 1-2 0V6.414L8.707 8.707a.999.999 0 1 1-1.414-1.414l3.999-3.999a1 1 0 0 1 1.416 0l4 3.999a.999.999 0 0 1 0 1.414Z"/>
  </svg>
);

export default ArrowUpSmallIcon;