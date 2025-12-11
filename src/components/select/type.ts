export interface BaseOption {
  value: string | number;
  label: string;
}

export type SelectOption<T = unknown> = BaseOption & T;

interface RenderOptionState {
  selected: boolean;
}

export interface SelectProps {
  /** Array of options to display in the select */
  options?: SelectOption[];

  /** Current selected value(s) - single option for normal select, array for multi */
  value?: SelectOption | SelectOption[] | null;

  /** Callback function when selection changes */
  onChange: (value: SelectOption | SelectOption[] | null) => void;

  /** Enable multiple selection mode */
  isMulti?: boolean;

  /** Placeholder text when no value is selected */
  placeholder?: string;

  /** Enable search/filter functionality */
  isSearchable?: boolean;

  /** Show clear button to reset selection */
  isClearable?: boolean;

  /** Disable the entire select component */
  isDisabled?: boolean;

  /** Custom render function for option items in dropdown */
  renderOption?:
    | ((option: SelectOption, state: RenderOptionState) => React.ReactNode)
    | null;

  /** Custom render function for selected value display */
  renderValue?: ((option: SelectOption) => React.ReactNode) | null;

  /** Additional CSS classes for the container */
  className?: string;

  label?: string;
  description?: string;
  hint?: string;
  errorMessages?: string | string[];
}
