import React from "react";
import { cn } from "../../lib/utils";

function Hero({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full rounded-xl bg-linear-to-t from-white to-primary-100 p-12",
        className
      )}
      {...props}
    />
  );
}

export { Hero };
