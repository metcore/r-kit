import React from "react";
import { iconRegistry } from "./icon-registry";
import type { IconProps } from "./type";

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "currentColor",
  className,
}) => {
  const Component = iconRegistry[name];

  if (!Component) {
    return null;
  }

  return <Component size={size} color={color} className={className} />;
};

export default Icon;
