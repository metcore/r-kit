import { iconRegistry } from './icon-registry';
import type { IconNameProps } from './type';

/**
 * Seluruh nama ikon bawaan kit, dalam urutan registry. Dipakai untuk
 * keperluan runtime seperti Select pemilih ikon.
 */
export const iconNames: readonly IconNameProps[] = Object.freeze(
  Object.keys(iconRegistry) as IconNameProps[]
);
