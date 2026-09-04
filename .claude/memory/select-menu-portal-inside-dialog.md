---
name: select-menu-portal-inside-dialog
description: Select's dropdown menu must portal inside the nearest Sheet/Modal ancestor, not always to document.body — otherwise its focus trap makes the search input unfocusable
metadata:
  type: project
---

`Select`'s menu (`select.tsx`, the `createPortal(menu, ...)` call at the
end of the component) now resolves its portal target instead of always
hardcoding `document.body`: it uses the `portalContainer` prop if given,
else the nearest ancestor matching `[data-slot="sheet-content"],
[role="dialog"]` (`Sheet`, `Modal`), else falls back to `document.body`.

**Why:** `Sheet` wraps Radix `Dialog.Content`, which renders with a
`FocusScope` (`trapped` when modal). `FocusScope` reverts any focus that
lands outside its own DOM subtree. `Select`'s menu used to always portal
to `document.body` — a sibling of the dialog subtree, not a descendant —
so once a `Select` inside a `Sheet` opened, focusing its search input
(via the existing `searchInputRef.current?.focus()` effect that runs
right after open) got immediately reverted by Radix. Symptom: the search
input
renders, but is completely unfocusable/untypable. `Modal` isn't built on
Radix `FocusScope`, but has its own Tab-trap keyed off
`modalRef.current.contains(active)` — same problem, milder (Tab trap
misbehaves, not a hard focus revert), same fix.

**How to apply:** don't revert this to a hardcoded `document.body`. If a
new dialog/overlay-like component is added to the kit and it also traps
focus, either give it `data-slot="sheet-content"`/`role="dialog"` so this
selector already finds it, or pass `portalContainer` explicitly at the
call site. The portal target is computed inline during render (reading
`containerRef.current` synchronously, not via `useState`+`useEffect`) —
keep it that way, since `containerRef` is already attached from a prior
commit by the time `isOpen` can turn `true` (the container itself always
renders), and a state+effect version would delay the portal by one
render pass, breaking the very same "focus the search input right after
open" effect this fix exists to unbreak.

See `src/playground/pages/SheetPage.tsx`'s "Advanced Search" demo — it
already has `Select`s with default `isSearchable` inside a `Sheet`, so it
reproduced this bug pre-fix and exercises the fix now, no new demo
needed.
