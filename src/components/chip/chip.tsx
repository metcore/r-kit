import React, { useContext } from 'react';
import { chipVariants } from './chip-variants';
import { ChipContext } from './context';
import type { ChipProps } from './type';
import { cn } from '../../lib/utils';

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
  dismissible: dismissibleProp,
  onDismiss: onDismissProp,
}) => {
  const context = useContext(ChipContext);

  // Use context values if available, otherwise use props
  const color = colorProp ?? context?.color ?? 'primary';
  const size = sizeProp ?? context?.size ?? 'md';
  const block = blockProp ?? context?.block ?? false;
  const dismissible = dismissibleProp ?? context?.dismissible ?? false;

  // Determine if selected from context or prop
  const isSelected = context
    ? value !== undefined && context.selectedValues.includes(value)
    : (selectedProp ?? false);

  const state = disabled
    ? 'disabled'
    : isSelected === true
      ? 'selected'
      : 'default';

  const handleClick = () => {
    if (disabled) return;

    if (context && value !== undefined) {
      context.toggleSelection(value);
    }

    onClick?.(value);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDismissProp !== undefined) {
      onDismissProp(value);
      return;
    }

    if (context?.onDismiss !== undefined && value !== undefined) {
      context.onDismiss(value);
    }
  };

  const dismissSizeClass =
    size === 'sm' ? 'w-2.5 h-2.5' : size === 'lg' ? 'w-4 h-4' : 'w-3 h-3';

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(chipVariants({ size, color, state, block }), className)}
    >
      {children}
      {Boolean(dismissible) && (
        <span
          role="button"
          aria-label="Hapus"
          onClick={handleDismiss}
          className={cn(
            dismissSizeClass,
            'inline-flex items-center justify-center rounded-full',
            'opacity-60 hover:opacity-100',
            'shrink-0 cursor-pointer transition-opacity',
            'ml-1.5'
          )}
        >
          <svg
            viewBox="0 0 10 10"
            fill="currentColor"
            className="h-full w-full"
          >
            <path
              d="M2 2L8 8M8 2L2 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      )}
    </button>
  );
};
