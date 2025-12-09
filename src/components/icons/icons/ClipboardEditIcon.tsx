import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const ClipboardEditIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="M8 5.5v-1C8 3.5 8.5 3 9.5 3h5c1 0 1.5.5 1.5 1.5v1c0 1-.5 1.5-1.5 1.5h-5C8.5 7 8 6.5 8 5.5ZM20 8v10c0 2-1 3-3 3H7c-2 0-3-1-3-3V8c0-1.742.752-2.723 2.265-2.943a.21.21 0 0 1 .235.204v.238c0 1.82 1.18 3 3 3h5c1.82 0 3-1.18 3-3v-.238a.21.21 0 0 1 .235-.204C19.248 5.277 20 6.258 20 8Zm-5.78 6.02-2.24-2.24-3.98 4V18h2.22l4-3.98Zm1.52-2.77-.99-.99a.887.887 0 0 0-1.26 0l-.81.82 2.24 2.24.82-.81c.35-.35.35-.91 0-1.26Z"/>
  </svg>
);

export default ClipboardEditIcon;