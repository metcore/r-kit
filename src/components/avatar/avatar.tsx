import React from "react";
import { AvatarVariants } from "./avatar-variants";
import type { AvatarProps } from "./type";
import { cn } from "../../lib/utils";

export const Avatar: React.FC<AvatarProps> = ({
  url,
  name = "",
  size = "md",
  color = "gray",
  variant = "circle",
  className,
  alt,
  ...props
}) => {
  const initials = getInitials(name);
  const bgColor = stringToColor(initials);

  const avatarClasses = cn(
    AvatarVariants({ size, color, variant }),
    className,
    bgColor,
  );

  return url ? (
    <AvatarImage
      url={url}
      className={avatarClasses}
      alt={alt || name}
      {...props}
    />
  ) : (
    <AvatarFallback name={name} className={avatarClasses} {...props} />
  );
};

const AvatarImage = ({
  url,
  className,
  alt = "avatar",
}: {
  url: string;
  className?: string;
  alt?: string;
}) => {
  return (
    <img
      src={url}
      alt={alt}
      className={cn("h-full w-full object-cover", className)}
    />
  );
};

const AvatarFallback = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  const initials = name
    ? name
        .split(" ")
        .filter((word) => word.length > 0)
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join("")
    : "?";

  return (
    <div className={className}>
      <span>{initials}</span>
    </div>
  );
};

const AVATAR_COLORS = [
  "bg-danger-500",
  "bg-warning-500",
  "bg-orange-500",
  "bg-success-500",
  "bg-primary-500",
  "bg-info-500",
  "bg-purple-500",
  "bg-gray-900",
  "bg-info-900",
  "bg-primary-1000",
];

const stringToColor = (str: string) => {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

const getInitials = (name: string) => {
  if (!name) return "?";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
};
