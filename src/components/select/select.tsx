import React, {
  useState,
  useRef,
  useEffect,
  type KeyboardEvent,
  type MouseEvent as RMouseEvent,
} from "react";
import type { SelectOption, SelectProps } from "./type";
import { Icon } from "../icons";
import { cn, fieldHasError } from "../../lib/utils";
import { FormField } from "../form";

export const Select: React.FC<SelectProps> = ({
  options = [],
  value = null,
  onChange,
  isMulti = false,
  placeholder = "Select...",
  isSearchable = true,
  isClearable = true,
  isDisabled = false,
  renderOption = null,
  renderValue = null,
  className,
  label,
  description,
  hint,
  errorMessages,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  //   Handle outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node | null;

      if (
        target &&
        containerRef.current &&
        !containerRef.current.contains(target)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && isSearchable) {
      searchInputRef.current?.focus();
    }
  }, [isOpen, isSearchable]);

  const filteredOptions = React.useMemo(() => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [options, searchTerm]);

  /* Reset highlight when filtering */
  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchTerm]);

  useEffect(() => {
    const el = optionRefs.current[highlightedIndex];
    if (el) {
      el.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }

    console.log(highlightedIndex);
  }, [highlightedIndex]);

  const asArray = (
    val: SelectOption | SelectOption[] | null,
  ): SelectOption[] => (Array.isArray(val) ? val : val ? [val] : []);

  const isSelected = (option: SelectOption): boolean => {
    if (isMulti) {
      return asArray(value).some((v) => v.value === option.value);
    }
    return (value as SelectOption | null)?.value === option.value;
  };

  const handleSelect = (option: SelectOption) => {
    if (isMulti) {
      const arr = asArray(value);
      const exists = arr.some((v) => v.value === option.value);

      const newValue = exists
        ? arr.filter((v) => v.value !== option.value)
        : [...arr, option];

      onChange(newValue);

      const idx = filteredOptions.findIndex((o) => o.value === option.value);
      setHighlightedIndex(idx);
      containerRef.current?.focus();
      return;
    }

    onChange(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleRemove = (
    option: SelectOption,
    e: RMouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();

    if (isMulti) {
      const arr = asArray(value);
      onChange(arr.filter((v) => v.value !== option.value));
    } else {
      onChange(null);
    }
  };

  const handleClear = (e: RMouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onChange(isMulti ? [] : null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) {
      if (["Enter", " ", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((p) =>
          p < filteredOptions.length - 1 ? p + 1 : 0,
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((p) =>
          p > 0 ? p - 1 : filteredOptions.length - 1,
        );
        break;

      case "Enter":
        e.preventDefault();
        try {
          const opt = filteredOptions[highlightedIndex];
          if (opt) handleSelect(opt);
        } catch (error) {
          console.error(error);
        }

        break;

      case "Escape":
        setIsOpen(false);
        setSearchTerm("");
        break;

      default:
        break;
    }
  };

  const getDisplayValue = () => {
    if (!value || (isMulti && asArray(value).length === 0)) {
      return <span className="text-gray-500">{placeholder}</span>;
    }

    if (isMulti) {
      return (
        <div className="flex flex-wrap gap-1">
          {asArray(value).map((item) => (
            <div
              key={item.value}
              className="border-primary-200 flex items-center gap-1 rounded border bg-white px-2 py-0.5 text-xs text-gray-900"
            >
              {renderValue ? renderValue(item) : item.label}
              <button
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

    return renderValue
      ? renderValue(value as SelectOption)
      : (value as SelectOption).label;
  };

  const showClearButton =
    isClearable &&
    ((isMulti && asArray(value).length > 0) || (!isMulti && value !== null));

  const hasError = fieldHasError(errorMessages);

  return (
    <FormField
      label={label}
      errorMessages={errorMessages}
      description={description}
      hint={hint}
    >
      <div
        ref={containerRef}
        className={cn("relative w-full focus-within:outline-none", className)}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        {/* Input Field */}
        <div
          aria-selected={isOpen}
          className={cn(
            "focus:ring-primary-300 flex min-h-10 cursor-pointer items-center justify-between rounded-lg border bg-white px-3 py-2 text-gray-900 transition-all focus-within:outline-none focus:ring",
            isDisabled && "cursor-not-allowed bg-gray-100",
            isOpen ? "border-primary-300 ring-0" : "border-gray-200",
            hasError && "border-danger-500",
          )}
          onClick={() => !isDisabled && setIsOpen(!isOpen)}
          tabIndex={isDisabled ? -1 : 0}
        >
          <div className="flex-1 overflow-hidden text-xs font-medium text-gray-900">
            {getDisplayValue()}
          </div>

          <div className="ml-2 flex items-center gap-1">
            {showClearButton && (
              <button
                onClick={handleClear}
                className="rounded text-center text-gray-700"
              >
                <Icon name="times-circle" size={20} />
              </button>
            )}

            <Icon
              className="text-gray-700"
              name={isOpen ? "angle-up-small" : "angle-down-small"}
              size={20}
            />
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div
            className={cn(
              "absolute z-50 mt-1 max-h-80 w-full space-y-2 overflow-hidden rounded-lg border bg-white p-2",
              "border-gray-200",
            )}
          >
            {isSearchable && (
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2.5">
                <Icon name="search" size={20} className="text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 bg-transparent text-sm outline-none"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}

            {/* Options */}
            <div className="max-h-[250px] space-y-2 overflow-y-auto focus:outline-none">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-8 text-center text-sm text-gray-500">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option, index) => {
                  const selected = isSelected(option);
                  const highlighted = index === highlightedIndex;

                  return (
                    <div
                      key={option.value}
                      ref={(el) => {
                        optionRefs.current[index] = el;
                      }}
                      onClick={() => handleSelect(option)}
                      className={cn(
                        "flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-900 transition-colors focus:outline-none",
                        highlighted && "bg-primary-100",
                        selected
                          ? "bg-primary-50 border-primary-300"
                          : "hover:bg-gray-50",
                      )}
                    >
                      <div className="flex-1">
                        {renderOption ? (
                          renderOption(option, { selected })
                        ) : (
                          <div className={cn(selected && "font-medium")}>
                            {option.label}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </FormField>
  );
};
