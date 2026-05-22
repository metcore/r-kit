import React, { useState, useEffect, useRef } from 'react';
import { ChipContext } from './context';
import { Chip } from './chip';
import type {
  ChipArrayProps,
  ChipValue,
  ChipContextValue,
  ChipOption,
} from './type';

const normalizeSelected = (val: ChipValue | ChipValue[]): ChipValue[] =>
  Array.isArray(val) ? val : val != null ? [val] : [];

export const ChipGroup: React.FC<ChipArrayProps> = ({
  options: optionsProp,
  selected = [],
  onSelect,
  direction = 'horizontal',
  color = 'primary',
  multiple = false,
  scrollable = true,
  block = false,
  size = 'md',
  footer,
  header,
  children,
  className,
  dismissible = false,
  reorderable = false,
  onDismiss,
  onReorder,
}) => {
  const isHorizontal = direction === 'horizontal';

  const [internalSelected, setInternalSelected] = useState<ChipValue[]>(
    normalizeSelected(selected)
  );

  const [internalOptions, setInternalOptions] = useState<ChipOption[]>(
    optionsProp ?? []
  );

  useEffect(() => {
    if (optionsProp !== undefined) setInternalOptions(optionsProp);
  }, [optionsProp]);

  useEffect(() => {
    const newSelected = normalizeSelected(selected);
    setInternalSelected((prev) =>
      JSON.stringify(newSelected) !== JSON.stringify(prev) ? newSelected : prev
    );
  }, [selected]);

  const toggleSelection = (value: ChipValue) => {
    let newSelected: ChipValue[];

    if (multiple) {
      newSelected = internalSelected.includes(value)
        ? internalSelected.filter((v) => v !== value)
        : [...internalSelected, value];
    } else {
      newSelected = internalSelected.includes(value) ? [] : [value];
    }

    setInternalSelected(newSelected);
    onSelect?.(newSelected);
  };

  const handleDismiss = (value: ChipValue) => {
    setInternalOptions((prev) => prev.filter((o) => o.value !== value));
    setInternalSelected((prev) => {
      const newSelected = prev.filter((v) => v !== value);
      if (newSelected.length !== prev.length) {
        onSelect?.(newSelected);
      }
      return newSelected;
    });
    onDismiss?.(value);
  };

  const dragIndex = useRef<number | null>(null);

  const handleDragStart = (index: number) => {
    dragIndex.current = index;
  };

  const handleDrop = (dropIndex: number) => {
    if (dragIndex.current === null || dragIndex.current === dropIndex) return;
    const newOptions = [...internalOptions];
    const [moved] = newOptions.splice(dragIndex.current, 1);
    if (moved === undefined) {
      dragIndex.current = null;
      return;
    }
    newOptions.splice(dropIndex, 0, moved);
    setInternalOptions(newOptions);
    onReorder?.(newOptions);
    dragIndex.current = null;
  };

  const containerClasses = [
    'flex gap-2',
    isHorizontal ? 'flex-row flex-wrap' : 'flex-col',
    block ? 'items-stretch' : 'items-start',
    scrollable && isHorizontal ? 'overflow-x-auto' : '',
    scrollable && !isHorizontal ? 'overflow-y-auto' : '',
    className ?? '',
  ].join(' ');

  const contextValue: ChipContextValue = {
    selectedValues: internalSelected,
    toggleSelection,
    color,
    size,
    block,
    dismissible,
    onDismiss: optionsProp !== undefined ? handleDismiss : onDismiss,
  };

  const renderChip = (option: ChipOption, index: number) => (
    <div
      key={String(option.value)}
      draggable={reorderable}
      onDragStart={() => handleDragStart(index)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => handleDrop(index)}
      className={reorderable ? 'cursor-grab active:cursor-grabbing' : ''}
    >
      <Chip value={option.value} disabled={option.disabled}>
        {option.icon !== undefined && option.icon !== null && (
          <span className="mr-1">{option.icon}</span>
        )}
        <span>{option.label}</span>
      </Chip>
    </div>
  );

  return (
    <div className="w-full">
      {header !== undefined && <div className="mb-2">{header}</div>}

      <ChipContext.Provider value={contextValue}>
        <div className={containerClasses}>
          {optionsProp !== undefined
            ? internalOptions.map((option, index) => renderChip(option, index))
            : children}
        </div>
      </ChipContext.Provider>

      {footer !== undefined && <div className="mt-2">{footer}</div>}
    </div>
  );
};
