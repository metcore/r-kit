import type { ReactNode } from 'react';
import type { IconNameProps } from '../icons';
import type { SelectSize } from './selectSize';

export type SelectRawValue = string | number;

export interface BaseOption {
  value: string | number | '';
  label: string;
  description?: string;
  icon?: string;
}

type EmptyObject = Record<string, never>;

export type SelectOption<Extra extends object = object> = BaseOption & Extra;

export type SelectGroup<Extra extends object = object> = {
  label: React.ReactNode;
  options: SelectOption<Extra>[];
};

interface RenderOptionState {
  selected: boolean;
}

export type SelectOnCreateValue = string | number;

type BaseSelectProps<Extra extends object = object> = {
  options?: (SelectOption<Extra> | SelectGroup<Extra>)[];
  value?:
    | SelectOption<Extra>
    | SelectOption<Extra>[]
    | SelectRawValue
    | SelectRawValue[]
    | null;
  getOptionByValue?: (value: SelectRawValue) => SelectOption<Extra> | undefined;

  isClearable?: boolean;
  /**
   * @deprecated Use `multiple` instead
   */
  isMulti?: boolean;
  multiple?: boolean;
  placeholder?: string;
  isSearchable?: boolean;
  /**
   * @deprecated Use `disabled` instead
   */
  isDisabled?: boolean;
  disabled?: boolean;
  searchPlaceholder?: string;

  renderOption?:
    | ((
        option: SelectOption<Extra>,
        state: RenderOptionState
      ) => React.ReactNode)
    | null;

  renderValue?: ((option: SelectOption<Extra>) => React.ReactNode) | null;

  className?: string;
  label?: string;
  description?: string;
  hint?: string;
  errorMessages?: string | string[];
  tooltip?: string;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  treshold?: number;

  /**
   * @deprecated Jangan make ini
   */
  trigger?: ReactNode;
  /**
   * @deprecated Jangan make ini
   */
  triggerClassName?: string;

  required?: boolean;
  isSelectOpen?: boolean;
  searchOptions?: string;

  onSearchOptions?: (value: string) => void;
  onOptionsChange?: (value: SelectOption<Extra>[]) => void;
  onOpenChange?: (value: boolean) => void;
  icon?: IconNameProps;
  creatable?: boolean;
  onCreate?: (value: SelectOnCreateValue) => void;
  loadingOnCreate?: boolean;
  size?: SelectSize;
};

type SelectPropsWithCustomRender<Extra extends object = EmptyObject> = {
  renderOptions: ({
    options,
    isLoadingMore,
  }: {
    options: SelectOption<Extra>[];
    isLoadingMore?: boolean;
  }) => React.ReactNode;

  onChange?: never;
};

type SelectPropsWithDefaultBehavior<Extra extends object = EmptyObject> = {
  renderOptions?: undefined;

  onChange?: (
    value: SelectOption<Extra> | SelectOption<Extra>[] | null
  ) => void;
};

export type SelectProps<Extra extends object = object> =
  BaseSelectProps<Extra> &
    (
      | SelectPropsWithCustomRender<Extra>
      | SelectPropsWithDefaultBehavior<Extra>
    );
