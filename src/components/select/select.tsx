import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useCallback,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent as RMouseEvent,
} from 'react';
import { createPortal } from 'react-dom';
import type {
  SelectGroup,
  SelectOption,
  SelectProps,
  SelectRawValue,
} from './type';
import { Icon } from '../icons';
import { cn, fieldHasError } from '../../lib/utils';
import { FormField } from '../form';
import { RoundedSpinner } from '../loading';
import clsx from 'clsx';
import { Chip } from '../chip';
import { Text } from '../text';
import { Button } from '../button';
import { selectSize, type SelectSize } from './selectSize';
import { useInputGroup, useInputGroupControl } from '../input-group';

const isGroup = <Extra extends object>(
  item: SelectOption<Extra> | SelectGroup<Extra>
): item is SelectGroup<Extra> =>
  item != null && Array.isArray((item as SelectGroup<Extra>).options);

const isRawValue = (v: unknown): v is SelectRawValue =>
  typeof v === 'string' || typeof v === 'number';

const getSearchText = <Extra extends object>(
  option: SelectOption<Extra>
): string =>
  typeof option.label === 'string' ? option.label : String(option.value ?? '');

type SelectFilterOption<Extra extends object> =
  | boolean
  | ((option: SelectOption<Extra>, search: string) => boolean);

type RenderEntry<Extra extends object> =
  | {
      kind: 'group';
      label: React.ReactNode;
      items: { option: SelectOption<Extra>; index: number }[];
    }
  | { kind: 'option'; option: SelectOption<Extra>; index: number };

const MENU_MAX_HEIGHT = 320;
const MENU_GAP = 4;

const fontSizeMap = {
  single: {
    sm: 't3',
    md: 't2',
    lg: 't1',
  },
  multiple: {
    sm: 't4',
    md: 't3',
    lg: 't2',
  },
} as const;

export function Select<Extra extends object = object>({
  options = [],
  value = null,
  onChange,
  isMulti = false,
  multiple = false,
  placeholder = 'Select...',
  isSearchable = true,
  isClearable = true,
  isDisabled = false,
  disabled = false,
  renderOption = null,
  renderValue = null,
  className,
  label,
  description,
  hint,
  tooltip,
  errorMessages,
  isLoadingMore,
  onLoadMore,
  treshold = 0,
  trigger,
  triggerClassName,
  renderOptions,
  onSearchOptions,
  onSearch,
  onOptionsChange,
  required,
  isSelectOpen,
  onOpenChange,
  searchOptions,
  searchValue,
  searchPlaceholder = 'Search...',
  icon,
  creatable = false,
  onCreate,
  loadingOnCreate = false,
  size = 'md',
  filterOption = true,
  isLoading = false,
  getOptionByValue,
}: SelectProps<Extra> & {
  filterOption?: SelectFilterOption<Extra>;
  isLoading?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({
    position: 'fixed',
    top: -9999,
    left: -9999,
    visibility: 'hidden',
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const listContainerRef = useRef<HTMLDivElement>(null);

  const isMultiMode: boolean = isMulti || multiple;
  const isDisabledMode: boolean = isDisabled || disabled;
  const isSearchControlled =
    searchOptions !== undefined || searchValue !== undefined;

  const effectiveSearchTerm = isSearchControlled
    ? searchOptions !== undefined && searchOptions !== null
      ? searchOptions
      : searchValue !== undefined && searchValue !== null
        ? searchValue
        : ''
    : searchTerm;

  const group = useInputGroup();
  const inControl = useInputGroupControl();
  const inGroup = group !== null;

  const onOptionsChangeRef = useRef(onOptionsChange);
  const onOpenChangeRef = useRef(onOpenChange);
  useEffect(() => {
    onOptionsChangeRef.current = onOptionsChange;
    onOpenChangeRef.current = onOpenChange;
  });

  useEffect(() => {
    const el = menuRef.current;
    if (!isOpen || !el) return;

    const stop = (e: Event) => e.stopPropagation();
    el.addEventListener('wheel', stop, { passive: false });
    el.addEventListener('touchmove', stop, { passive: false });

    return () => {
      el.removeEventListener('wheel', stop);
      el.removeEventListener('touchmove', stop);
    };
  }, [isOpen]);

  const { filteredOptions, renderEntries } = useMemo(() => {
    const flat: SelectOption<Extra>[] = [];
    const entries: RenderEntry<Extra>[] = [];
    const term = effectiveSearchTerm.toLowerCase();

    const matches = (o: SelectOption<Extra>) => {
      if (filterOption === false) return true;
      if (typeof filterOption === 'function')
        return filterOption(o, searchTerm);
      return getSearchText(o).toLowerCase().includes(term);
    };

    for (const item of options as (
      | SelectOption<Extra>
      | SelectGroup<Extra>
    )[]) {
      if (isGroup(item)) {
        const matched = item.options.filter(matches);
        if (matched.length === 0) continue;

        const items = matched.map((option) => {
          const index = flat.length;
          flat.push(option);
          return { option, index };
        });

        entries.push({ kind: 'group', label: item.label, items });
      } else {
        if (!matches(item)) continue;
        const index = flat.length;
        flat.push(item);
        entries.push({ kind: 'option', option: item, index });
      }
    }

    return { filteredOptions: flat, renderEntries: entries };
  }, [options, searchTerm, filterOption]);

  const flatOptions = useMemo(() => {
    const flat: SelectOption<Extra>[] = [];
    for (const item of options as (
      | SelectOption<Extra>
      | SelectGroup<Extra>
    )[]) {
      if (isGroup(item)) flat.push(...item.options);
      else flat.push(item);
    }
    return flat;
  }, [options]);

  const toOption = useCallback(
    (v: SelectOption<Extra> | SelectRawValue): SelectOption<Extra> => {
      if (!isRawValue(v)) return v;
      return (
        getOptionByValue?.(v) ??
        flatOptions.find((o) => o.value === v) ??
        ({ value: v, label: String(v) } as SelectOption<Extra>)
      );
    },
    [flatOptions, getOptionByValue]
  );

  const selectedOptions = useMemo<SelectOption<Extra>[]>(() => {
    if (
      value == null ||
      value === '' ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return [];
    }
    const arr = (Array.isArray(value) ? value : [value]) as (
      | SelectOption<Extra>
      | SelectRawValue
    )[];
    return arr.map(toOption);
  }, [value, toOption]);

  const handleScroll = useCallback(() => {
    const el = listContainerRef.current;
    if (!el || Boolean(isLoadingMore)) return;

    const isAtBottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight - treshold;

    if (isAtBottom) {
      onLoadMore?.();
    }
  }, [isLoadingMore, onLoadMore, treshold]);

  const updateMenuPosition = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    const openUp = spaceBelow < MENU_MAX_HEIGHT && spaceAbove > spaceBelow;

    setMenuStyle({
      position: 'fixed',
      left: rect.left,
      ...(openUp
        ? { bottom: viewportHeight - rect.top + MENU_GAP }
        : { top: rect.bottom + MENU_GAP }),
    });
  }, []);

  const isSelected = useCallback(
    (option: SelectOption<Extra>): boolean =>
      selectedOptions.some((o) => o.value === option.value),
    [selectedOptions]
  );

  const handleSelect = useCallback(
    (option: SelectOption<Extra>) => {
      if (isMultiMode) {
        const exists = selectedOptions.some((v) => v.value === option.value);
        const newValue = exists
          ? selectedOptions.filter((v) => v.value !== option.value)
          : [...selectedOptions, option];
        onChange?.(newValue);
        const idx = filteredOptions.findIndex((o) => o.value === option.value);
        setHighlightedIndex(idx);
        containerRef.current?.focus();
        return;
      }
      onChange?.(option);
      setIsOpen(false);
      setSearchTerm('');
    },
    [isMultiMode, selectedOptions, onChange, filteredOptions]
  );

  const handleRemove = useCallback(
    (option: SelectOption<Extra>, e: RMouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (isMultiMode) {
        onChange?.(selectedOptions.filter((v) => v.value !== option.value));
      } else {
        onChange?.(null);
      }
    },
    [isMultiMode, selectedOptions, onChange]
  );

  const handleClear = useCallback(
    (e: RMouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onChange?.(isMultiMode ? [] : null);
    },
    [isMultiMode, onChange]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (!isOpen) {
        if (['Enter', ' ', 'ArrowDown'].includes(e.key)) {
          e.preventDefault();
          setIsOpen(true);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex(() =>
            highlightedIndex < filteredOptions.length - 1
              ? highlightedIndex + 1
              : 0
          );
          break;

        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex(() =>
            highlightedIndex > 0
              ? highlightedIndex - 1
              : filteredOptions.length - 1
          );
          break;

        case 'Enter': {
          e.preventDefault();
          const opt = filteredOptions[highlightedIndex];
          if (opt !== undefined) handleSelect(opt);
          break;
        }

        case 'Escape':
          setIsOpen(false);
          setSearchTerm('');
          break;

        default:
          break;
      }
    },
    [isOpen, filteredOptions, highlightedIndex, handleSelect]
  );
  function getFontSize(size: SelectSize, multiple?: boolean) {
    const currentSize = size ?? 'md';

    return multiple == true
      ? fontSizeMap.multiple[currentSize]
      : fontSizeMap.single[currentSize];
  }
  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchTerm]);

  useEffect(() => {
    optionRefs.current.length = filteredOptions.length;
  }, [filteredOptions]);

  useEffect(() => {
    const el = optionRefs.current[highlightedIndex];
    const container = listContainerRef.current;
    if (!el || !container) return;
    const elRect = el.getBoundingClientRect();
    const cRect = container.getBoundingClientRect();
    if (elRect.top < cRect.top) {
      container.scrollTop -= cRect.top - elRect.top;
    } else if (elRect.bottom > cRect.bottom) {
      container.scrollTop += elRect.bottom - cRect.bottom;
    }
  }, [highlightedIndex]);

  useLayoutEffect(() => {
    if (!isOpen) return;

    updateMenuPosition();
    window.addEventListener('resize', updateMenuPosition);
    window.addEventListener('scroll', updateMenuPosition, true);

    return () => {
      window.removeEventListener('resize', updateMenuPosition);
      window.removeEventListener('scroll', updateMenuPosition, true);
    };
  }, [isOpen, updateMenuPosition]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;

      if (containerRef.current?.contains(target) === true) return;
      if (menuRef.current?.contains(target) === true) return;

      setIsOpen(false);
      setSearchTerm('');
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && isSearchable) {
      searchInputRef.current?.focus({ preventScroll: true });
    }
  }, [isOpen, isSearchable]);

  useEffect(() => {
    onOptionsChangeRef.current?.(filteredOptions);
  }, [filteredOptions]);

  useEffect(() => {
    if (isSelectOpen !== undefined) {
      setIsOpen(isSelectOpen);
    }
  }, [isSelectOpen]);

  useEffect(() => {
    onOpenChangeRef.current?.(isOpen);
  }, [isOpen]);

  const getDisplayValue = () => {
    if (selectedOptions.length === 0) {
      return (
        <span
          className={cn(
            'text-gray-800',
            isDisabledMode && value != null && 'text-gray-600',
            isDisabledMode && 'text-gray-500'
          )}
        >
          {placeholder}
        </span>
      );
    }
    if (isMultiMode) {
      return (
        <div className="flex flex-wrap gap-1">
          {selectedOptions.map((item) => (
            <div
              key={item.value}
              className={cn(
                'border-primary-200 py-0.2 flex items-center gap-1 rounded border bg-white px-1 text-xs text-gray-900',
                isDisabledMode && 'border-gray-500 bg-gray-300'
              )}
            >
              {renderValue != null ? (
                renderValue(item)
              ) : (
                <Text variant={getFontSize(size, multiple)}>{item.label}</Text>
              )}
              {isDisabledMode == false && (
                <button
                  type="button"
                  onClick={(e) => handleRemove(item, e)}
                  className="text-primary-1000 rounded p-0.5 hover:bg-blue-200"
                >
                  <Icon name="times-circle" size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      );
    }
    const selected = selectedOptions[0];
    return renderValue != null ? (
      renderValue(selected)
    ) : (
      <>
        <Text
          variant={getFontSize(size, multiple)}
          weight="semibold"
          className={cn('text-gray-900', isDisabledMode && 'text-gray-600')}
        >
          {selected.label}
        </Text>
        <Text variant="t3" weight="regular" className="text-gray-700">
          {selected.description}
        </Text>
      </>
    );
  };

  const showClearButton = isClearable && selectedOptions.length > 0;
  const hasError = fieldHasError(errorMessages);

  const renderOptionItem = (option: SelectOption<Extra>, index: number) => {
    const selected = isSelected(option);
    const highlighted = index === highlightedIndex;
    return (
      <div
        key={`${option.value} - ${index}`}
        ref={(el) => {
          optionRefs.current[index] = el;
        }}
        onMouseEnter={() => setHighlightedIndex(index)}
        onClick={() => handleSelect(option)}
      >
        {renderOption != null ? (
          renderOption(option, { selected })
        ) : (
          <Chip className="text-left" block selected={highlighted || selected}>
            <div className="flex-1">
              <>
                <div className="flex items-center gap-2">
                  {option?.icon != undefined && <Icon name="user" size={12} />}
                  <Text variant="t2" weight="medium" className="text-gray-900">
                    {option.label}
                  </Text>
                </div>
                <Text variant="t3" weight="regular" className="text-gray-700">
                  {option.description}
                </Text>
              </>
            </div>
          </Chip>
        )}
      </div>
    );
  };

  const handleClickInput = () => {
    if (isDisabledMode) return;
    setIsOpen((prev) => !prev);
  };

  const handleOnCreate = () => {
    onCreate?.(searchTerm);
  };

  const handleInputSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onCreate?.(searchTerm);
    }
  };

  const renderCreatable = () => {
    return (
      <Button
        block
        variant="outline"
        className="gap-2"
        disabled={loadingOnCreate}
        onClick={handleOnCreate}
      >
        {loadingOnCreate ? (
          <RoundedSpinner size={20} color="primary" />
        ) : (
          <Icon name="plus" size={12} />
        )}
        <Text variant="t2">
          Create {label} {searchTerm}
        </Text>
      </Button>
    );
  };

  const menu = (
    <div
      ref={menuRef}
      data-select-menu=""
      style={{ zIndex: 9999, pointerEvents: 'auto', ...menuStyle }}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex max-h-80 min-w-40 flex-col items-stretch gap-2 overflow-hidden rounded-lg border border-gray-200 bg-white p-2'
      )}
    >
      {isSearchable && (
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2.5">
          <Icon name="search" size={20} className="shrink-0 text-gray-400" />
          <input
            ref={searchInputRef}
            type="text"
            disabled={loadingOnCreate}
            onKeyDown={handleInputSearchKeyDown}
            value={effectiveSearchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearchOptions?.(e.target.value);
              onSearch?.(e.target.value);
            }}
            placeholder={searchPlaceholder}
            className="min-w-0 flex-1 truncate bg-transparent text-sm outline-none"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div
        className="max-h-62.5 space-y-2 overflow-y-auto focus:outline-none"
        ref={listContainerRef}
        onScroll={onLoadMore !== undefined ? handleScroll : undefined}
      >
        {renderOptions === undefined && (
          <>
            {filteredOptions.length === 0 ? (
              <>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <RoundedSpinner size={20} color="primary" />
                  </div>
                ) : creatable ? (
                  renderCreatable()
                ) : (
                  <div className="px-3 py-8 text-center text-sm text-gray-500">
                    No options found
                  </div>
                )}
              </>
            ) : (
              renderEntries.map((entry, i) =>
                entry.kind === 'group' ? (
                  <div key={`grp-${i}`} className="space-y-2">
                    <Text
                      variant="t2"
                      weight="semibold"
                      className="text-gray-900"
                    >
                      {entry.label}
                    </Text>
                    {entry.items.map(({ option, index }) =>
                      renderOptionItem(option, index)
                    )}
                  </div>
                ) : (
                  renderOptionItem(entry.option, entry.index)
                )
              )
            )}
            {onLoadMore !== undefined && (
              <div
                className={clsx(
                  'flex h-5 items-center justify-center py-2 duration-300'
                )}
              >
                {isLoadingMore === true && (
                  <RoundedSpinner size={20} color="primary" />
                )}
              </div>
            )}
          </>
        )}

        {renderOptions !== undefined &&
          renderOptions({
            options: filteredOptions,
            isLoadingMore,
          })}
      </div>
    </div>
  );

  const content = (
    <div
      ref={containerRef}
      className={cn(
        'focus-within:outline-none',
        inGroup
          ? cn('min-w-0 items-center bg-transparent', inControl && 'flex-1')
          : 'relative w-full',
        className
      )}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {trigger !== undefined && (
        <div
          aria-selected={isOpen}
          onClick={handleClickInput}
          tabIndex={isDisabledMode ? -1 : 0}
          className={triggerClassName}
        >
          {trigger}
        </div>
      )}

      {trigger === undefined && (
        <div
          aria-selected={isOpen}
          className={cn(
            'flex cursor-pointer text-gray-900 transition-all focus-within:outline-none',
            inGroup
              ? cn('h-full items-center bg-transparent', inControl && 'w-full')
              : cn(
                  'focus:ring-primary-300 rounded-lg border bg-white focus:ring',
                  selectSize({ size }),
                  isOpen ? 'border-primary-300 ring-0' : 'border-gray-200',
                  hasError && 'border-danger-500'
                ),
            isDisabledMode && 'cursor-not-allowed bg-gray-100'
          )}
          onClick={handleClickInput}
          tabIndex={isDisabledMode ? -1 : 0}
        >
          {icon && (
            <div className="flex items-center border-r border-gray-200 px-3 py-2">
              <Icon name={icon} size={22} className="text-gray-600" />
            </div>
          )}

          <div
            className={cn(
              'flex items-center justify-between px-3 py-1.5',
              (!inGroup || inControl) && 'w-full flex-1'
            )}
          >
            <div className="min-w-0 flex-1 text-xs font-medium text-gray-900">
              {getDisplayValue()}
            </div>

            <div className="ml-2 flex shrink-0 items-start gap-1 self-start">
              {showClearButton && isDisabledMode == false && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="cursor-pointer items-center rounded text-center text-gray-700"
                >
                  <Icon name="times-circle" size={15} />
                </button>
              )}

              <Icon
                className="text-gray-700"
                name={isOpen ? 'angle-up-small' : 'angle-down-small'}
                size={15}
              />
            </div>
          </div>
        </div>
      )}

      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(menu, document.body)}
    </div>
  );

  if (inGroup) {
    return content;
  }

  return (
    <FormField
      label={label}
      errorMessages={errorMessages}
      description={description}
      hint={hint}
      required={required}
      size={size}
      tooltip={tooltip}
    >
      {content}
    </FormField>
  );
}
