import React, { useState, useEffect } from "react";
import { ChipContext } from "./context";
import { Chip } from "./chip";
import type { ChipArrayProps, ChipValue, ChipContextValue } from "./type";

export const ChipGroup: React.FC<ChipArrayProps> = ({
  options,
  selected = [],
  onSelect,
  direction = "horizontal",
  color = "primary",
  multiple = false,
  scrollable = true,
  block = false,
  size = "md",
  footer,
  header,
  children,
  className,
}) => {
  const isHorizontal = direction === "horizontal";

  const normalizeSelected = (val: ChipValue | ChipValue[]): ChipValue[] =>
    Array.isArray(val) ? val : val ? [val] : [];

  const [internalSelected, setInternalSelected] = useState<ChipValue[]>(
    normalizeSelected(selected)
  );

  useEffect(() => {
    const newSelected = normalizeSelected(selected);
    if (JSON.stringify(newSelected) !== JSON.stringify(internalSelected)) {
      setInternalSelected(newSelected);
    }
  }, [selected, internalSelected]);

  const toggleSelection = (value: ChipValue) => {
    let newSelected: ChipValue[];

    if (multiple || (!multiple && internalSelected.length === 0)) {
      newSelected = internalSelected.includes(value)
        ? internalSelected.filter((v) => v !== value)
        : [...internalSelected, value];
    } else {
      newSelected = [value];
    }

    setInternalSelected(newSelected);
    onSelect?.(newSelected);
  };

  const containerClasses = `
    flex gap-2
    ${isHorizontal ? "flex-row flex-wrap" : "flex-col"}
    ${block ? "items-stretch" : "items-start"}
    ${scrollable && isHorizontal ? "overflow-x-auto" : ""}
    ${scrollable && !isHorizontal ? "overflow-y-auto" : ""}
    ${className || ""}
  `;

  const contextValue: ChipContextValue = {
    selectedValues: internalSelected,
    toggleSelection,
    color,
    size,
    block,
  };

  return (
    <div className="w-full">
      {header && <div className="mb-2">{header}</div>}

      <ChipContext.Provider value={contextValue}>
        <div className={containerClasses}>
          {options
            ? options.map((option) => (
                <Chip
                  key={String(option.value)}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.icon && <span className="mr-2">{option.icon}</span>}
                  <span>{option.label}</span>
                </Chip>
              ))
            : children}
        </div>
      </ChipContext.Provider>

      {footer && <div className="mt-2">{footer}</div>}
    </div>
  );
};
