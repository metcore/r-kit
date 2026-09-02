---
name: dot-claude-breaks-typed-lint
description: Adding files under .claude/ (skills, scripts, examples) can crash the pre-commit lint hook because eslint's file glob isn't scoped away from it
metadata:
  type: project
---

`eslint.config.ts`'s `files: ['**/*.{js,ts,jsx,tsx}']` glob matches
anything with those extensions anywhere in the repo, `.claude/` included.
Typed rules (`@typescript-eslint/strict-boolean-expressions`, etc.) need
`parserOptions.project` (`tsconfig.eslint.json`) to resolve type info —
that tsconfig only covers `src/`, so any `.js`/`.ts` file under
`.claude/skills/**` (bundled skill scripts/examples, not part of the app)
makes ESLint throw a hard error instead of just warning, which fails the
`lefthook` pre-commit hook.

**Why:** hit this directly while committing the portable-skills bundle —
`.claude/skills/brainstorming/scripts/helper.js` and
`.claude/skills/systematic-debugging/condition-based-waiting-example.ts`
crashed `git commit` with "You have used a rule which requires type
information, but don't have parserOptions set to generate type
information for this file."

**How to apply:** `eslint.config.ts`'s top-level `ignores` array already
excludes `.claude/` — don't remove it. If you add a brand-new top-level
folder that isn't part of the app's own source (docs tooling, scripts,
another bundle of vendored files), check whether it needs the same
treatment before it trips the same crash.
