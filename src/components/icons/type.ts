import type { iconRegistry } from "./icon-registry";

export type IconNameProps = keyof typeof iconRegistry;
export interface IconProps {
  name: IconNameProps;
  size?: number;
  color?: string;
  className?: string;
}

export interface BaseIconProps {
  size?: number;
  color?: string;
  className?: string;
}
