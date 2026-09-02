---
name: flex-min-width-blocks-overflow-scroll
description: An overflow-x-auto wrapper silently stops scrolling (the whole layout just grows past viewport instead) when any flex-item ancestor between it and a flex-wrap container lacks min-width:0
metadata:
  type: project
---

Browsers default every flex item to `min-width: auto`, which means "never
shrink below your content's natural size" — regardless of any
`overflow-x-auto`/`overflow-hidden` set on a descendant several levels
deeper. If a flex item in that ancestor chain doesn't have `min-width: 0`
(Tailwind `min-w-0`), a wide descendant (a `table-auto` table with long
cell content, in this case) forces that flex item wider than its own
parent's row width instead of the intended child ever getting a chance to
scroll — the parent `flex flex-wrap` container just lets that one item
overflow the row rather than shrinking it or wrapping it.

**Why:** hit this building `ApiTable`'s self-contained horizontal-scroll
wrapper. `<div className="overflow-x-auto"><Table/></div>` measured
`scrollWidth === clientWidth` (no overflow detected) even though the
table visibly ran off the right edge of the page — the wide table was
inflating `Card` (an ancestor several levels up, itself a flex item
inside `ApiTablePage`'s `flex flex-wrap gap-2` row layout) past the
461px column width it was actually given. `cardVariants` had no
`min-w-0`, so the whole `Card` grew to ~845px instead of shrinking and
letting the inner `overflow-x-auto` div do its job. Confirmed by
diffing every ancestor's `getBoundingClientRect()` from the `<table>`
up to `<body>` — exactly one flex item in the chain (`Card`) was wider
than its own parent.

**How to apply:** if an `overflow-x-auto`/`overflow-y-auto` wrapper you
added isn't scrolling and the layout instead grows past its container,
don't assume the wrapper itself is broken — walk the ancestor chain
(`el.parentElement` + `getBoundingClientRect()` in a loop) looking for
the first flex/grid item that's wider/taller than its own parent. Fix it
there (`min-w-0`/`min-h-0` on that specific item), not by adding more
overflow rules to the wrapper that already has them.
