import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const CaretDownIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="m10.698 15.396-4.38-5.194C5.582 9.329 6.206 8 7.352 8h9.296c1.146 0 1.77 1.33 1.034 2.202l-4.38 5.194a1.706 1.706 0 0 1-2.604 0Z"/>
  </svg>
);

export default CaretDownIcon;