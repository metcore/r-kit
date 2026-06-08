import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import type {
  TabsContentProps,
  TabsContextValue,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
} from './type';
import { cn } from '../../lib/utils';

const TabsContext = createContext<TabsContextValue | undefined>(undefined);
const TAB_URL_EVENT = '__tab_url_change__';

function readParams(): URLSearchParams {
  if (typeof window === 'undefined') {
    return new URLSearchParams();
  }

  return new URLSearchParams(window.location.search);
}

function useUrlSearchParams() {
  const [params, setParams] = useState<URLSearchParams>(readParams);

  useEffect(() => {
    const sync = () => setParams(readParams());

    sync();

    window.addEventListener('popstate', sync);
    window.addEventListener(TAB_URL_EVENT, sync);

    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener(TAB_URL_EVENT, sync);
    };
  }, []);

  const setSearchParams = React.useCallback(
    (
      updater: (prev: URLSearchParams) => URLSearchParams,
      options?: { replace?: boolean }
    ) => {
      const next = updater(readParams());

      const query = next.toString();

      const url =
        `${window.location.pathname}` +
        `${query ? `?${query}` : ''}` +
        `${window.location.hash}`;

      if (options?.replace != undefined) {
        window.history.replaceState(window.history.state, '', url);
      } else {
        window.history.pushState(window.history.state, '', url);
      }

      window.dispatchEvent(new Event(TAB_URL_EVENT));
    },
    []
  );

  return [params, setSearchParams] as const;
}

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (context === undefined) {
    throw new Error('Tabs components must be used within Tabs');
  }
  return context;
};

export const useTabHref = (value: string): string | undefined => {
  const { buildHref } = useTabsContext();
  return buildHref?.(value);
};

export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  id,
  urlReplace = true,
  orientation = 'horizontal',
  unmountOnHide = true,
  className,
  children,
  onLoad,
}) => {
  const hasLoadedRef = useRef(false);

  const [searchParams, setSearchParams] = useUrlSearchParams();
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(
    defaultValue ?? ''
  );
  const triggersRef = useRef<Map<string, HTMLElement>>(new Map());

  const isControlled = controlledValue !== undefined;
  const urlParam = id !== undefined ? `tab-${id}` : undefined;
  const isUrlSynced = urlParam !== undefined && !isControlled;

  let value: string;
  if (isControlled) {
    value = controlledValue;
  } else if (isUrlSynced) {
    value = searchParams.get(urlParam) ?? defaultValue ?? '';
  } else {
    value = uncontrolledValue;
  }

  const buildHref = isUrlSynced
    ? (newValue: string): string => {
        const next = new URLSearchParams(searchParams);
        next.set(urlParam, newValue);
        return `?${next.toString()}`;
      }
    : undefined;

  const handleValueChange = (newValue: string) => {
    if (isUrlSynced && urlParam !== undefined) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set(urlParam, newValue);
          return next;
        },
        { replace: urlReplace }
      );
    }

    if (!isUrlSynced && !isControlled) {
      setUncontrolledValue(newValue);
    }

    onValueChange?.(newValue);
  };

  const registerTrigger = (triggerValue: string, ref: HTMLElement) => {
    triggersRef.current.set(triggerValue, ref);
  };

  const unregisterTrigger = (triggerValue: string) => {
    triggersRef.current.delete(triggerValue);
  };

  useEffect(() => {
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;
    onLoad?.(value);
  }, [value, onLoad]);

  return (
    <TabsContext.Provider
      value={{
        value,
        onValueChange: handleValueChange,
        orientation,
        unmountOnHide,
        registerTrigger,
        unregisterTrigger,
        buildHref,
        urlReplace,
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
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    const updateIndicator = () => {
      if (listRef.current === null) return;

      const activeButton = listRef.current.querySelector<HTMLElement>(
        '[aria-selected="true"]'
      );

      if (activeButton === null) return;

      const listRect = listRef.current.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      if (orientation === 'horizontal') {
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
    window.addEventListener('resize', updateIndicator);
    const timer = setTimeout(updateIndicator, 50);

    return () => {
      window.removeEventListener('resize', updateIndicator);
      clearTimeout(timer);
    };
  }, [value, orientation, isInitialized]);

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-orientation={orientation}
      className={cn(
        'relative rounded-lg bg-gray-100 p-1',
        orientation === 'horizontal'
          ? 'inline-flex items-center justify-start gap-1'
          : 'inline-flex flex-col items-stretch gap-1',
        className
      )}
    >
      <div
        className={cn(
          'bg-primary-1000 pointer-events-none absolute z-0 rounded-md shadow-sm',
          isInitialized ? 'transition-all duration-300 ease-out' : 'opacity-0'
        )}
        style={indicatorStyle}
        aria-hidden="true"
      />

      <div
        className={cn(
          'relative z-10',
          orientation === 'horizontal'
            ? 'flex items-center gap-1'
            : 'flex w-full flex-col gap-1'
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
  const {
    value,
    onValueChange,
    buildHref,
    registerTrigger,
    unregisterTrigger,
  } = useTabsContext();
  const isSelected = value === triggerValue;
  const triggerRef = useRef<HTMLElement>(null);

  const href = buildHref?.(triggerValue);

  useEffect(() => {
    if (triggerRef.current !== null) {
      registerTrigger(triggerValue, triggerRef.current);
    }
    return () => {
      unregisterTrigger(triggerValue);
    };
  }, [triggerValue, registerTrigger, unregisterTrigger]);

  const sharedClass = cn(
    'inline-flex cursor-pointer items-center justify-center rounded-md px-4 py-2 whitespace-nowrap',
    'text-sm font-semibold transition-colors duration-200',
    'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 focus-visible:outline-none',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    isSelected ? 'text-white' : 'text-gray-700 hover:text-gray-900',
    className
  );

  const sharedA11y = {
    'role': 'tab' as const,
    'aria-selected': isSelected,
    'aria-controls': `panel-${triggerValue}`,
    'id': `tab-${triggerValue}`,
  };

  if (href !== undefined && !disabled) {
    return (
      <a
        ref={triggerRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={(e) => {
          e.preventDefault();
          onValueChange(triggerValue);
        }}
        className={sharedClass}
        {...sharedA11y}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={triggerRef as React.RefObject<HTMLButtonElement>}
      type="button"
      disabled={disabled}
      onClick={() => onValueChange(triggerValue)}
      className={sharedClass}
      {...sharedA11y}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({
  value: contentValue,
  className = '',
  children,
}) => {
  const { value, unmountOnHide } = useTabsContext();
  const isSelected = value === contentValue;

  if (unmountOnHide && !isSelected) return null;

  return (
    <div
      role="tabpanel"
      id={`panel-${contentValue}`}
      aria-labelledby={`tab-${contentValue}`}
      tabIndex={0}
      hidden={!isSelected}
      className={cn(
        'mt-4 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none',
        !unmountOnHide && !isSelected ? 'hidden' : '',
        isSelected ? 'animate-in fade-in-50 duration-300' : '',
        className
      )}
    >
      {children}
    </div>
  );
};

Tabs.displayName = 'Tabs';
TabsList.displayName = 'TabsList';
TabsTrigger.displayName = 'TabsTrigger';
TabsContent.displayName = 'TabsContent';
