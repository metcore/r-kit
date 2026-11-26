export type SizeType = 'sm' | 'md' | 'lg';
export type ColorType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'orange'
  | 'purple'
  | 'gray';

export interface SwitchProps {
  'id'?: string;
  'checked'?: boolean;
  'defaultChecked'?: boolean;
  'onCheckedChange'?: (checked: boolean) => void;
  'disabled'?: boolean;
  'required'?: boolean;
  'name'?: string;
  'size'?: SizeType;
  'color'?: ColorType;
  'className'?: string;
  'tooltip'?: string;
  /** Nama untuk pembaca layar kalau tidak ada `label` yang terlihat (misal di baris tabel). */
  'aria-label'?: string;
  /** Id elemen yang menjadi nama kontrol ini. */
  'aria-labelledby'?: string;
}
