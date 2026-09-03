---
name: api-table-scroll-must-be-unconditional
description: ApiTable's horizontal scroll wrapper must not be gated behind the responsive prop — responsive mode still reverts to a plain table at md+ and can overflow
metadata:
  type: project
---

`ApiTable`'s inner `overflow-x-auto` wrapper wraps the `<Table>` on every
render now, regardless of `responsive`. It used to be
`responsive ? undefined : 'overflow-x-auto'` — scroll only when
`responsive` was off.

**Why:** `responsive` only changes layout *below* the `md` breakpoint
(rows become stacked cards). At `md` and above, even a `responsive`
table renders as a normal `<table>` again — same overflow risk as the
non-responsive case. Gating the scroll wrapper on `responsive` meant a
wide `responsive` table had no horizontal scroll at desktop widths.

**How to apply:** don't reintroduce a `responsive`-based (or any other
mode-based) condition on this wrapper — it's meant to be a permanent
safety net. If a future prop changes table layout again, check whether
that mode can still overflow horizontally at some breakpoint before
assuming the wrapper can be conditioned on it.

See [[table-cell-classnames-need-responsive-prop]] and
[[api-table-outer-border-must-stay-md-scoped]] for the other
`responsive`-conditioned pieces of ApiTable — those stay conditional on
purpose (card-mode-only concerns), unlike this one.
