---
name: effect-emitted-onchange-loops-render
description: Never emit a parent callback (onChange/onSelect/...) from a useEffect that lists that callback in its deps — with an inline arrow from the consumer it is an infinite render loop, not just an extra render
metadata:
  type: project
---

A component that mirrors its state up with

```tsx
useEffect(() => {
  onChange?.({ value: phoneNumber, dialCode: selectedDialCode });
}, [phoneNumber, selectedDialCode, onChange]);
```

loops forever for any consumer that passes an inline callback
(`onChange={v => setV(v)}`, a `react-hook-form` `field.onChange`, anything
not wrapped in `useCallback`): effect runs -> parent `setState` -> parent
re-render -> new `onChange` identity -> deps changed -> effect runs again.
React only prints "Maximum update depth exceeded" and keeps re-rendering,
so the page feels frozen rather than crashed. Measured on the unfixed
`InputPhoneNumber`: 300+ parent renders on mount alone.

**Why:** `InputPhoneNumber` (`input/input-phone-number.tsx`) shipped with
that effect, plus internal `phoneNumber`/`selectedDialCode` state that fed
the effect while the rendered `<Input value>` read `value?.value` from the
prop. Fixed 2026-09-29: the effect is gone, `onChange` is called straight
from `handleNumberChange`/`handleCodeChange`, and the component is
controlled-with-internal-fallback (`isControlled = value !== undefined`,
`currentValue = isControlled ? value : internalValue`). Side effect of the
same bug: uncontrolled usage (no `value` prop) never displayed what you
typed, because the internal state it kept was never the one rendered.

**How to apply:** emit from the event handler, not from an effect. If an
effect really must call a parent callback, either keep the callback out of
the deps via a ref mirror (`base-color-picker.tsx` does this) or gate the
call on a signature/ref guard so a re-run with unchanged data emits nothing
(`input-file-typed.tsx`, `input-otp.tsx`, `tabs.tsx` all do this and are
safe). And when a component takes `value` + `onChange`, render from
`isControlled ? value : internalState` — never keep a second private copy
of the same field that the JSX does not read. See
[[input-file-echo-reseed-drops-uploads]] for the other failure mode of
effect-driven `onChange`.
