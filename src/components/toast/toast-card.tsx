import clsx from "clsx";
import { Icon } from "../icons";
import { Text } from "../text";
import { ToastVariants } from "./toast-variants";
import type { ColorVariant, ToastProps } from "./type";
import { Button } from "../button";

export default function ToastCard({
  color = "secondary",
  description = "Toast Description",
  title = "Toast TItle",
  icon,
  actionLabel = "Click Me!",
  onClickAction,
  onClose,
  iconSize = 20,
  variant,
}: ToastProps) {
  const invertColor = (color: ColorVariant) => {
    if (color === "primary" && variant !== "outline") return "secondary";
    if (color === "secondary" && variant !== "outline") return "primary";

    if (color === "primary" && variant === "outline") return "primary";
    if (color === "secondary" && variant === "outline") return "secondary";

    return color;
  };
  return (
    <div
      className={clsx(
        "flex max-w-81.75 min-w-81.75 items-center justify-between rounded-lg px-3 py-2 shadow-[0px_2px_10px_0px_#6B728033]",
        variant === "outline" && "border border-gray-500",

        variant === "outline" &&
          color !== "primary" &&
          color !== "secondary" &&
          "bg-white!",

        variant === "outline" && color === "primary" && "bg-white",
        variant === "outline" && color === "secondary" && "bg-primary-1000!",
        ToastVariants({ bg: color }),
      )}
    >
      <div className="flex items-center gap-2">
        {icon && (
          <Icon
            name={icon}
            size={iconSize}
            className={clsx(
              variant === "outline" &&
                color === "primary" &&
                "text-primary-1000!",

              variant === "outline" && color === "secondary" && "text-white!",
              ToastVariants({ text: color }),
            )}
          />
        )}
        <div
          className={clsx(
            "flex flex-col",
            variant === "outline" &&
              color === "primary" &&
              "text-primary-1000!",

            variant === "outline" && color === "secondary" && "text-white!",
            ToastVariants({ text: color }),
          )}
        >
          <Text as={"h3"} value={title} variant="t2" weight="semibold" />
          <Text as="small" value={description} variant="t3" weight="medium" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {onClickAction && (
          <Button
            color={invertColor(color)}
            size={"sm"}
            onClick={onClickAction}
          >
            {actionLabel}
          </Button>
        )}
        <button className="cursor-pointer" onClick={onClose}>
          <Icon
            name="times"
            size={20}
            className={clsx(
              ToastVariants({ text: color }),
              variant === "outline" &&
                color === "primary" &&
                "text-primary-1000!",

              variant === "outline" && color === "secondary" && "text-white!",
            )}
          />
        </button>
      </div>
    </div>
  );
}
