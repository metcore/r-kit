export interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  orientation: 'horizontal' | 'vertical';
  unmountOnHide: boolean;
  registerTrigger: (value: string, ref: HTMLElement) => void;
  unregisterTrigger: (value: string) => void;
  buildHref?: (value: string) => string;
  urlReplace: boolean;
}

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  id: string;
  urlReplace?: boolean;
  orientation?: 'horizontal' | 'vertical';
  unmountOnHide?: boolean;
  className?: string;
  children?: React.ReactNode;
}
export interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

export interface TabsTriggerProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export interface TabsContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}
