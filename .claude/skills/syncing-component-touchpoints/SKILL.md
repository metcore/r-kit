---
name: syncing-component-touchpoints
description: Use when adding a prop, changing behavior, fixing a bug, adding, renaming, or removing a component in this repo — before considering the change done
---

# Syncing Component Touchpoints

## Overview

Every component here has three places besides its source (`src/components/<name>/`)
that go stale silently — typecheck and lint don't catch any of them. A change
isn't done until they're checked, not just when the code compiles.

## Checklist

| Touchpoint | Path | Update when |
| --- | --- | --- |
| Doc | `src/doc/content/components/<name>.md` | Always — new/changed prop needs a row in the Props table; a fixed bug may make an existing example wrong |
| Playground | `src/playground/pages/**/<Name>Page.tsx` | Always — add or update a live demo that exercises the new prop or the fixed behavior, so it's visibly testable, not just typechecked |
| Landing | `src/landing/data/site.ts` (catalog entries), `src/landing/pages/HomePage.tsx`, `src/landing/components/SpecSheet.tsx` | Only for a new, renamed, or removed component, or a changed playground route. A prop tweak or bug fix on an already-listed component normally needs none of this — skip it |

## Common mistake

Treating "typecheck and lint pass" as "the change is done." Neither one reads
`src/doc/content/components/*.md` or the playground pages — a prop can be
fully implemented and still be invisible/undocumented everywhere a consumer
would look for it. Before calling the work finished, point to the specific
doc line and playground section that reflect the change.
