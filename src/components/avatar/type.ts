export type AvatarSizeType = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type AvatarColorType =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "purple"
  | "orange"
  | "gray";

export type AvatarVariantType = "circle" | "square" | "rounded";

export interface AvatarProps {
  size?: AvatarSizeType;
  color?: AvatarColorType;
  variant?: AvatarVariantType;
  url?: string;
  name?: string;
  className?: string;
  alt?: string;
}

export interface AvatarGroupProps {
  avatars?: AvatarProps[];
  maxVisible?: number;
  size?: AvatarSizeType;
  variant?: AvatarVariantType;
}
