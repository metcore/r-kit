import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const ReceiptTextIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M17 3H7C5 3 4 4 4 6v12.621a1 1 0 0 0 1.6.8l1.359-1.019a1.501 1.501 0 0 1 1.961.139l2.019 2.019a1.5 1.5 0 0 0 2.121 0l2.019-2.019a1.5 1.5 0 0 1 1.961-.139l1.359 1.019a1 1 0 0 0 1.6-.8V6C20 4 19 3 17 3Zm-4 10.75H8a.75.75 0 0 1 0-1.5h5a.75.75 0 0 1 0 1.5Zm3-4H8a.75.75 0 0 1 0-1.5h8a.75.75 0 0 1 0 1.5Z"/>
  </svg>
);

export default ReceiptTextIcon;