import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const AngleDownSmallIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M12 15a.997.997 0 0 1-.707-.293l-4-4a.999.999 0 1 1 1.414-1.414L12 12.586l3.293-3.293a.999.999 0 1 1 1.414 1.414l-4 4A.997.997 0 0 1 12 15Z"/>
  </svg>
);

export default AngleDownSmallIcon;