export interface CounterProps {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
  allowMinus?: boolean;
  inputWidth?: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';

  // Props baru untuk controlled/uncontrolled component
  value?: string; // Untuk mode controlled
  defaultValue?: string; // Untuk mode uncontrolled (default: "0")
  onChange?: (value: string) => void; // Callback saat value berubah
}
export interface CounterControllerProps {
  value: string;
  valueUpdater: (value: string) => void;
}
