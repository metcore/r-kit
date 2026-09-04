---
name: input-clearable-must-track-hasvalue
description: Input's clearAble button must only render when the field actually has a value — it used to show unconditionally, matching Textarea's already-correct pattern
metadata:
  type: project
---

`Input`'s clear (X) button (`input.tsx`) used to render whenever
`clearAble && !isDisabled` — with no check on whether the field had
anything to clear. Symptom: the clear icon sat inside every `clearAble`
input all the time, including a freshly-mounted empty one.

**Why:** unlike `Textarea` (`textarea.tsx`), which already tracks
`hasValue` (controlled: derived from `value`; uncontrolled: a
`uncontrolledHasValue` state kept in sync by its own `onChange` wrapper)
and gates its clear button on it, `Input`'s `clearAble` was implemented
without that tracking — it only ever handled the *clearing* mechanism
(`handleClear`: native value setter + dispatched `input` event), never
the button's own visibility.

**How to apply:** `Input` now mirrors `Textarea`'s pattern —
`value`/`defaultValue`/`onChange` are destructured out of the rest-props
spread specifically so `hasValue` can be computed (`isControlled ?
String(value ?? '').length > 0 : uncontrolledHasValue`) and the button
gated on `clearAble && !isDisabled && hasValue`. If another input-like
component in the kit grows a `clearAble`/similar prop, copy this pattern
(or `Textarea`'s), not the old unconditional-render one. Also: dropped
the redundant manual `props.onChange?.(...)` call `handleClear` used to
make in addition to dispatching the native `input` event — the wired
`<input onChange={handleChange}>` already receives that dispatched event
through React's synthetic system (same as `Textarea`'s `handleClear`,
which never had the redundant call), so calling it twice was dead
duplication, not a required second path.

See [[select-menu-portal-inside-dialog]] for another `Input`/`Select`
family bug found and fixed in the same session.
