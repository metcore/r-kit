---
name: use-caveman-commit
description: Always use the caveman-commit skill when writing commit messages in this repo — no AI attribution trailers
metadata:
  type: project
---

Tiap bikin commit message di repo ini, invoke skill `caveman-commit`
(sudah ke-bundle di [.claude/skills/caveman-commit/](../skills/caveman-commit/)):
Conventional Commits ringkas, subject ≤50 char, body cuma kalau "why"-nya
gak jelas dari diff — **tanpa trailer `Co-Authored-By`, tanpa baris
"Generated with Claude Code", tanpa penanda AI-authorship apa pun.**

**Why:** user gak mau history commit kelihatan di-generate AI atau punya
co-author palsu — commit harus kebaca seolah ditulis manusia yang paham
codebase-nya.

**How to apply:** sebelum propose atau nulis commit message, invoke Skill
`caveman-commit` dan ikuti aturannya. Tampilkan pesannya sebagai code
block; jangan jalanin `git commit` kecuali diminta eksplisit.
