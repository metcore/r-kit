import React from "react";
import { cn } from "../../lib/utils";

function Hero({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "to-primary-100 w-full rounded-xl bg-linear-to-t from-white p-12",
        className,
      )}
      {...props}
    />
  );
}

export { Hero };
