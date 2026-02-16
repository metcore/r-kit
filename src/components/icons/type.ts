import type { iconRegistry } from "./icon-registry";

export type IconNameProps = keyof typeof iconRegistry;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export interface BaseIconProps {
  size?: number;
  color?: string;
  className?: string;
}
