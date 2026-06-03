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
import type { SelectGroup, SelectOption, SelectProps } from './type';
import { Icon } from '../icons';
import { cn, fieldHasError } from '../../lib/utils';
import { FormField } from '../form';
import { RoundedSpinner } from '../loading';
import clsx from 'clsx';
import { Chip } from '../chip';
import { Text } from '../text';
import { Button } from '../button';
import { selectSize } from './selectSize';

const isGroup = <Extra extends object>(
  item: SelectOption<Extra> | SelectGroup<Extra>
): item is SelectGroup<Extra> =>
  item != null && Array.isArray((item as SelectGroup<Extra>).options);

const getSearchText = <Extra extends object>(
  option: SelectOption<Extra>
): string =>
  typeof option.label === 'string' ? option.label : String(option.value ?? '');

const asArray = <Extra extends object>(
  val: SelectOption<Extra> | SelectOption<Extra>[] | null
): SelectOption<Extra>[] => (Array.isArray(val) ? val : val ? [val] : []);

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
  onOptionsChange,
  required,
  isSelectOpen,
  onOpenChange,
  searchOptions,
  searchPlaceholder = 'Search...',
  icon,
  creatable = false,
  onCreate,
  loadingOnCreate = false,
  size = 'md',
  filterOption = true,
  isLoading = false,
}: SelectProps<Extra> & {
  filterOption?: SelectFilterOption<Extra>;
  isLoading?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const isMultiMode: boolean = isMulti || multiple;
  const isDisabledMode: boolean = isDisabled || disabled;

  const onOptionsChangeRef = useRef(onOptionsChange);
  const onOpenChangeRef = useRef(onOpenChange);
  useEffect(() => {
    onOptionsChangeRef.current = onOptionsChange;
    onOpenChangeRef.current = onOpenChange;
  });

  const { filteredOptions, renderEntries } = useMemo(() => {
    const flat: SelectOption<Extra>[] = [];
    const entries: RenderEntry<Extra>[] = [];
    const term = searchTerm.toLowerCase();

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
      width: rect.width,
      ...(openUp
        ? { bottom: viewportHeight - rect.top + MENU_GAP }
        : { top: rect.bottom + MENU_GAP }),
    });
  }, []);

  const isSelected = useCallback(
    (option: SelectOption<Extra>): boolean => {
      if (isMultiMode) {
        return asArray(value).some((v) => v.value === option.value);
      }
      return (value as SelectOption<Extra> | null)?.value === option.value;
    },
    [isMultiMode, value]
  );

  const handleSelect = useCallback(
    (option: SelectOption<Extra>) => {
      if (isMultiMode) {
        const arr = asArray(value);
        const exists = arr.some((v) => v.value === option.value);

        const newValue = exists
          ? arr.filter((v) => v.value !== option.value)
          : [...arr, option];

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
    [isMultiMode, value, onChange, filteredOptions]
  );

  const handleRemove = useCallback(
    (option: SelectOption<Extra>, e: RMouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (isMultiMode) {
        const arr = asArray(value);
        onChange?.(arr.filter((v) => v.value !== option.value));
      } else {
        onChange?.(null);
      }
    },
    [isMultiMode, value, onChange]
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
          setHighlightedIndex((p) =>
            p < filteredOptions.length - 1 ? p + 1 : 0
          );
          break;

        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((p) =>
            p > 0 ? p - 1 : filteredOptions.length - 1
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

  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchTerm]);

  useEffect(() => {
    optionRefs.current.length = filteredOptions.length;
  }, [filteredOptions]);

  useEffect(() => {
    const el = optionRefs.current[highlightedIndex];
    if (el) {
      el.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
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
      searchInputRef.current?.focus();
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

  useEffect(() => {
    if (searchOptions !== undefined) {
      setSearchTerm(searchOptions);
    }
  }, [searchOptions]);

  const getDisplayValue = () => {
    const isEmpty =
      value == null || (isMultiMode && asArray(value).length === 0);

    if (isEmpty) {
      return <span className="text-gray-500">{placeholder}</span>;
    }

    if (isMultiMode) {
      return (
        <div className="flex flex-wrap gap-1">
          {asArray(value).map((item) => (
            <div
              key={item.value}
              className="border-primary-200 flex items-center gap-1 rounded border bg-white px-2 py-0.5 text-xs text-gray-900"
            >
              {renderValue != null ? renderValue(item) : item.label}
              <button
                type="button"
                onClick={(e) => handleRemove(item, e)}
                className="text-primary-1000 rounded p-0.5 hover:bg-blue-200"
              >
                <Icon name="times-circle" size={14} />
              </button>
            </div>
          ))}
        </div>
      );
    }

    return renderValue != null ? (
      renderValue(value as SelectOption<Extra>)
    ) : (
      <>
        <Text variant="t2" weight="medium" className="text-gray-900">
          {(value as SelectOption<Extra>).label}
        </Text>
        <Text variant="t3" weight="regular" className="text-gray-700">
          {(value as SelectOption<Extra>).description}
        </Text>
      </>
    );
  };

  const showClearButton =
    isClearable && (isMultiMode ? asArray(value).length > 0 : value !== null);

  const hasError = fieldHasError(errorMessages);

  const renderOptionItem = (option: SelectOption<Extra>, index: number) => {
    const selected = isSelected(option);
    const highlighted = index === highlightedIndex;
    return (
      <div
        key={option.value}
        ref={(el) => {
          optionRefs.current[index] = el;
        }}
        onMouseEnter={() => setHighlightedIndex(index)}
        onClick={() => handleSelect(option)}
      >
        <Chip className="text-left" block selected={highlighted || selected}>
          <div className="flex-1">
            {renderOption != null ? (
              renderOption(option, { selected })
            ) : (
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
            )}
          </div>
        </Chip>
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
      style={{ zIndex: 9999, ...menuStyle }}
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
            value={searchTerm}
            onKeyDown={handleInputSearchKeyDown}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearchOptions?.(e.target.value);
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

  return (
    <FormField
      label={label}
      errorMessages={errorMessages}
      description={description}
      hint={hint}
      required={required}
      tooltip={tooltip}
    >
      <div
        ref={containerRef}
        className={cn('relative w-full focus-within:outline-none', className)}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        {/* Input Field */}
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
              'focus:ring-primary-300 flex cursor-pointer rounded-lg border bg-white text-gray-900 transition-all focus-within:outline-none focus:ring',
              selectSize({ size }),
              isDisabledMode && 'cursor-not-allowed bg-gray-100',
              isOpen ? 'border-primary-300 ring-0' : 'border-gray-200',
              hasError && 'border-danger-500'
            )}
            onClick={handleClickInput}
            tabIndex={isDisabledMode ? -1 : 0}
          >
            {icon && (
              <div className="flex items-center border-r border-gray-200 px-3 py-2">
                <Icon name={icon} size={22} className="text-gray-600" />
              </div>
            )}
            <div className="flex w-full flex-1 items-center justify-between px-3 py-2">
              <div className="min-w-0 flex-1 text-xs font-medium text-gray-900">
                {getDisplayValue()}
              </div>

              <div className="ml-2 flex shrink-0 items-start gap-1 self-start pt-0.5">
                {showClearButton && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="cursor-pointer rounded text-center text-gray-700"
                  >
                    <Icon name="times-circle" size={20} />
                  </button>
                )}

                <Icon
                  className="text-gray-700"
                  name={isOpen ? 'angle-up-small' : 'angle-down-small'}
                  size={20}
                />
              </div>
            </div>
          </div>
        )}

        {isOpen &&
          typeof document !== 'undefined' &&
          createPortal(menu, document.body)}
      </div>
    </FormField>
  );
}
