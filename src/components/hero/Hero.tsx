import React from "react";
import { cn } from "../../lib/utils";

export const Hero: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "w-full rounded-xl bg-linear-to-t from-white to-primary-100 p-12",
        className
      )}
      {...props}
    />
  );
};
