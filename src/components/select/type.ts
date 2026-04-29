import type { ReactNode } from 'react';

export interface BaseOption {
  value: string | number;
  label: string;
}

type EmptyObject = Record<string, never>;

export type SelectOption<Extra extends object = object> = BaseOption & Extra;

interface RenderOptionState {
  selected: boolean;
}

type BaseSelectProps<Extra extends object = object> = {
  options?: SelectOption<Extra>[];
  value?: SelectOption<Extra> | SelectOption<Extra>[] | null;

  isMulti?: boolean;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
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

  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  treshold?: number;

  trigger?: ReactNode;
  triggerClassName?: string;

  required?: boolean;
  isSelectOpen?: boolean;
  searchOptions?: string;

  onSearchOptions?: (value: string) => void;
  onOptionsChange?: (value: SelectOption<Extra>[]) => void;
  onOpenChange?: (value: boolean) => void;
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

  onChange: (value: SelectOption<Extra> | SelectOption<Extra>[] | null) => void;
};

export type SelectProps<Extra extends object = object> =
  BaseSelectProps<Extra> &
    (
      | SelectPropsWithCustomRender<Extra>
      | SelectPropsWithDefaultBehavior<Extra>
    );
