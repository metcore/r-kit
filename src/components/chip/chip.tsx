import React, { useContext } from "react";
import { chipVariants } from "./chip-variants";
import { ChipContext } from "./context";
import type { ChipProps } from "./type";
import { cn } from "../../lib/utils";

export const Chip: React.FC<ChipProps> = ({
  value,
  selected: selectedProp,
  disabled = false,
  onClick,
  children,
  color: colorProp,
  size: sizeProp,
  block: blockProp,
  className,
}) => {
  const context = useContext(ChipContext);

  // Use context values if available, otherwise use props
  const color = colorProp ?? context?.color ?? "primary";
  const size = sizeProp ?? context?.size ?? "md";
  const block = blockProp ?? context?.block ?? false;

  // Determine if selected from context or prop
  const isSelected = context
    ? value !== undefined && context.selectedValues.includes(value)
    : selectedProp ?? false;

  const state = disabled ? "disabled" : isSelected ? "selected" : "default";

  const handleClick = () => {
    if (disabled) return;

    if (context && value !== undefined) {
      context.toggleSelection(value);
    }

    onClick?.(value);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(chipVariants({ size, color, state, block }), className)}
    >
      {children}
    </button>
  );
};
