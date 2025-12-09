import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const TagIcon: React.FC<IconProps> = ({
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
    <path fill={color} d="m19.96 15.21-4.76 4.77c-1.37 1.36-2.78 1.36-4.14 0l-.804-.813a.3.3 0 0 1 0-.424l8.476-8.476a.3.3 0 0 1 .424 0l.803.803c1.411 1.41 1.361 2.77.001 4.14Zm-2.262-5.978-8.476 8.476a.3.3 0 0 1-.424 0L3.86 12.77A2.934 2.934 0 0 1 3 10.694V4.95A1.95 1.95 0 0 1 4.95 3h5.737c.778 0 1.524.309 2.073.86l4.938 4.948a.3.3 0 0 1 0 .424ZM8 7c0-.552-.446-1-.998-1h-.01a.996.996 0 0 0-.993 1c0 .552.452 1 1.002 1A.999.999 0 0 0 8 7Z"/>
  </svg>
);

export default TagIcon;