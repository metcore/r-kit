import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import type {
  TabsContentProps,
  TabsContextValue,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
} from "./type";
import { cn } from "../../lib/utils";

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within Tabs");
  }
  return context;
};
export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  orientation = "horizontal",
  className,
  children,
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue || "",
  );
  const triggersRef = useRef<Map<string, HTMLButtonElement>>(new Map());

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(newValue);
    }
    onValueChange?.(newValue);
  };

  const registerTrigger = (triggerValue: string, ref: HTMLButtonElement) => {
    triggersRef.current.set(triggerValue, ref);
  };

  const unregisterTrigger = (triggerValue: string) => {
    triggersRef.current.delete(triggerValue);
  };

  return (
    <TabsContext.Provider
      value={{
        value,
        onValueChange: handleValueChange,
        orientation,
        registerTrigger,
        unregisterTrigger,
      }}
    >
      <div className={cn(className)} data-orientation={orientation}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ className, children }) => {
  const { orientation, value } = useTabsContext();
  const listRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const updateIndicator = () => {
      if (!listRef.current) return;

      const activeButton = listRef.current.querySelector(
        `[aria-selected="true"]`,
      ) as HTMLButtonElement;

      if (!activeButton) return;

      const listRect = listRef.current.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      if (orientation === "horizontal") {
        setIndicatorStyle({
          width: `${buttonRect.width}px`,
          height: `${buttonRect.height}px`,
          transform: `translateX(${buttonRect.left - listRect.left - 4}px)`,
          opacity: 1,
        });
      } else {
        setIndicatorStyle({
          width: `${buttonRect.width}px`,
          height: `${buttonRect.height}px`,
          transform: `translateY(${buttonRect.top - listRect.top - 4}px)`,
          opacity: 1,
        });
      }

      if (!isInitialized) {
        setIsInitialized(true);
      }
    };

    updateIndicator();

    window.addEventListener("resize", updateIndicator);

    const timer = setTimeout(updateIndicator, 50);

    return () => {
      window.removeEventListener("resize", updateIndicator);
      clearTimeout(timer);
    };
  }, [value, orientation, isInitialized]);

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-orientation={orientation}
      className={cn(
        "relative rounded-lg bg-gray-100 p-1",
        orientation === "horizontal"
          ? "inline-flex items-center justify-start gap-1"
          : "inline-flex flex-col items-stretch gap-1",
        className,
      )}
    >
      <div
        className={cn(
          "bg-primary-1000 pointer-events-none absolute z-0 rounded-md shadow-sm",
          isInitialized ? "transition-all duration-300 ease-out" : "opacity-0",
        )}
        style={indicatorStyle}
        aria-hidden="true"
      />

      <div
        className={cn(
          "relative z-10",
          orientation === "horizontal"
            ? "flex items-center gap-1"
            : "flex w-full flex-col gap-1",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value: triggerValue,
  disabled = false,
  className,
  children,
}) => {
  const { value, onValueChange, registerTrigger, unregisterTrigger } =
    useTabsContext();
  const isSelected = value === triggerValue;
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (triggerRef.current) {
      registerTrigger(triggerValue, triggerRef.current);
    }
    return () => {
      unregisterTrigger(triggerValue);
    };
  }, [triggerValue, registerTrigger, unregisterTrigger]);

  return (
    <button
      ref={triggerRef}
      role="tab"
      type="button"
      aria-selected={isSelected}
      aria-controls={`panel-${triggerValue}`}
      id={`tab-${triggerValue}`}
      disabled={disabled}
      onClick={() => onValueChange(triggerValue)}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-md px-4 py-2 whitespace-nowrap",
        "text-sm font-semibold transition-colors duration-200",
        "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 focus-visible:outline-none",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        isSelected ? "text-white" : "text-gray-700 hover:text-gray-900",
        className,
      )}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({
  value: contentValue,
  className = "",
  children,
}) => {
  const { value } = useTabsContext();
  const isSelected = value === contentValue;

  if (!isSelected) return null;

  return (
    <div
      role="tabpanel"
      id={`panel-${contentValue}`}
      aria-labelledby={`tab-${contentValue}`}
      tabIndex={0}
      className={cn(
        "mt-4 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none",
        "animate-in fade-in-50 duration-300",
        className,
      )}
    >
      {children}
    </div>
  );
};

Tabs.displayName = "Tabs";
TabsList.displayName = "TabsList";
TabsTrigger.displayName = "TabsTrigger";
TabsContent.displayName = "TabsContent";
