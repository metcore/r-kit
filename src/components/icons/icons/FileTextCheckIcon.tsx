import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const FileTextCheckIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M12.75 5V2.75l4.5 4.5H15c-1.58 0-2.25-.67-2.25-2.25Zm-.01 14.6c.06.2-.08.4-.28.4H6c-2 0-3-1-3-3V5c0-2 1-3 3-3h5.25v3c0 2.42 1.33 3.75 3.75 3.75h3v3.46c0 .16-.13.29-.29.3-2.89.15-5.21 2.56-5.21 5.49 0 .56.08 1.1.24 1.6Zm-.99-4.6a.75.75 0 0 0-.75-.75H7a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 .75-.75ZM14 11.75a.75.75 0 0 0 0-1.5H7a.75.75 0 0 0 0 1.5h7ZM22 18a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-2.396-1.187a.5.5 0 0 0-.707 0l-1.313 1.313-.479-.48a.5.5 0 0 0-.707.707l.833.833a.5.5 0 0 0 .708 0l1.667-1.667a.501.501 0 0 0-.002-.706Z"/>
  </svg>
);

export default FileTextCheckIcon;