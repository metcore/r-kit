export type SelectOption<TValue extends string | number = string | number> = {
  value: TValue;
  label: string;
};

type Selector<T> = keyof T | ((item: T) => unknown);

function resolve<T>(item: T, selector: Selector<T>): unknown {
  return typeof selector === 'function' ? selector(item) : item[selector];
}

export function toSelectOptions<
  T,
  TValue extends string | number = string | number,
>(
  data: readonly T[] | null | undefined,
  config: { value: Selector<T>; label: Selector<T> }
): SelectOption<TValue>[] {
  return (data ?? []).map((item) => ({
    value: resolve(item, config.value) as TValue,
    label: String(resolve(item, config.label)),
  }));
}
