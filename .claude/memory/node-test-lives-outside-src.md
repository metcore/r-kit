---
name: node-test-lives-outside-src
description: Unit test repo ini pakai node --test bawaan (tanpa vitest) dan wajib di folder tests/, bukan di src/, karena tsconfig.app.json membatasi types ke vite/client
metadata:
  type: project
---

`npm test` = `node --test "tests/**/*.test.ts"`. Node 24 menjalankan `.ts`
langsung (type stripping), jadi tidak ada dependency test (vitest/jest) dan
tidak ada lockfile yang perlu disentuh. Repo ini memelihara **dua**
lockfile (`package-lock.json` dan `yarn.lock`), jadi menambah dependency
berarti harus memperbarui keduanya.

**Why:** test pertama (`input-number-helpers.test.ts`, 2026-11-25) awalnya
ditaruh di `src/` dan langsung bikin `tsc -p tsconfig.app.json` gagal:
`Cannot find module 'node:test'`. `tsconfig.app.json` punya
`"types": ["vite/client"]`, jadi `@types/node` tidak ikut. Menambahkan
`/// <reference types="node" />` akan mencemari tipe global seluruh app
(mis. `setTimeout` jadi `NodeJS.Timeout`).

**How to apply:**
- Test di `tests/`. Folder itu sudah masuk `tsconfig.node.json` (types node)
  dan `tsconfig.eslint.json`.
- Import modul yang dites pakai ekstensi `.ts`
  (`../src/components/input/input-number-helpers.ts`).
- Yang dites harus modul **murni**, tanpa React/DOM/alias import. Pisahkan
  logikanya ke file helper dulu, seperti `input-number-helpers.ts`.
- Aturan `@typescript-eslint/no-floating-promises` sengaja dimatikan untuk
  `tests/**` di `eslint.config.ts`, karena `describe`/`it` dari `node:test`
  mengembalikan promise yang ditunggu oleh runner.
