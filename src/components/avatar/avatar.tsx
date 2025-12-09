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
  const avatarClasses = cn(AvatarVariants({ size, color, variant }), className);

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
