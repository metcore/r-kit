import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const FolderOpenIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M18.98 9.54H7.72c-1.63 0-3.14.88-3.94 2.3L2 15.04V8c0-2 1-3 3-3h3l2 2h6c1.84 0 2.83.85 2.98 2.54Zm1.512 1.503-1.512-.001-11.267-.006a3 3 0 0 0-2.624 1.537L2.185 17.78a1.476 1.476 0 0 0-.185.713A1.494 1.494 0 0 0 3.496 20h12.781a3.002 3.002 0 0 0 2.622-1.536l2.904-5.201c.555-.995-.167-2.22-1.311-2.22Z"/>
  </svg>
);

export default FolderOpenIcon;