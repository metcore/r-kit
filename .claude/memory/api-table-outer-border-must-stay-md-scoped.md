---
name: api-table-outer-border-must-stay-md-scoped
description: ApiTable's outer card border/rounding must only apply at md: and up when responsive is true — an unscoped border/overflow-hidden on that wrapper shows a wrapping border on mobile that the stacked-card layout isn't supposed to have
metadata:
  type: project
---

`ApiTable` owns its outer "card" look (rounded corners + border) on a
plain wrapper `<div>` around the scrollable `<Table>`, not on `<Table>`
itself (see [[flex-min-width-blocks-overflow-scroll]] for why the scroll
wrapper is structured this way). When `responsive` is true, each row
becomes its own bordered card below `md` (`tableRowVariants`'s
`max-md:border max-md:rounded-xl`) — the outer wrapper is not supposed to
also draw a border there, only at `md:` and up where rows go back to
being plain table rows.

**Why:** hit this right after moving the border from `<Table>`
(`tableVariants` already handled this correctly via `max-md:!border-0`)
to the new wrapper div — the wrapper's border/`overflow-hidden` was
applied unconditionally whenever `bordered` was true, with no `md:`
scoping at all, so mobile showed both the per-row card borders *and* a
wrapping border around the whole stack.

**How to apply:** when `responsive` is true, gate the wrapper's own
border and `overflow-hidden` behind `md:` (`md:border md:border-gray-300`,
`md:overflow-hidden`) instead of applying them unconditionally. Verify
with `getComputedStyle(wrapper).borderWidth` at a sub-`768px` width —
should be `0px` — and again above 768px — should be `1px`.
