---
name: table-cell-classnames-need-responsive-prop
description: A column's max-md:flex / col-span-* / col-start-*/row-start-* className only makes sense when the Table/ApiTable it's rendered in has responsive set — otherwise cell borders visibly misalign below the md breakpoint
metadata:
  type: project
---

`ApiTableColumn.className` values like `max-md:flex max-md:items-center`
or `max-md:col-start-2 max-md:row-start-1 ...` are written assuming the
row is `display:grid` at that breakpoint — which only happens when the
`<Table>`/`<ApiTable>` itself has `responsive` set (`tableRowVariants`'s
`responsive: true` adds `max-md:grid max-md:grid-cols-2 ...` to `<tr>`).

Without `responsive` on the table, the row stays a normal table row, but
a `<td>` with its own `max-md:flex` (or grid position) still switches
that one cell's `display` away from `table-cell` below `md`. A flex/grid
`<td>` sizes to its own content instead of stretching to the row's full
height, so its border-bottom ends up at a different y-position than the
sibling cells that stayed plain `table-cell` — visually a border that
doesn't line up with the rest of the row.

**Why:** hit this at 745px width on the "Table Basic" ApiTable demo —
its `columns` all have `max-md:flex`/`col-span-2`/`col-start-*`
classNames (built for the stacked-card responsive layout), but the
`<ApiTable responsive={true} .../>` prop on that call site had been
dropped in an earlier edit. Confirmed via `getBoundingClientRect()`:
the "Name" and "Action" cells were 20-24px shorter than their row and
vertically offset, while every other cell in the same row filled it
exactly — the row itself was never `display:grid`.

**How to apply:** if a column's `className` has any `max-md:`
grid/flex/col-span utility, the `<Table>`/`<ApiTable>` it's used in
must have `responsive` set — don't add one without the other. If you
see a raggedly-aligned border below `md` width, check whether
`responsive` is still wired up on that specific table instance before
suspecting the shared `Table`/`ApiTable` components themselves.
