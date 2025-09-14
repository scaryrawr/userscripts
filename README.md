# Userscripts

TypeScript + Bun powered collection of personal / experimental userscripts. Each script lives in its own folder under `scripts/` with a `meta.js` and an `index.ts` implementation. A small build helper (`build.ts`) bundles everything to `dist/*.user.js` with the correct metadata banner injected.

## ✨ Current Script(s)

| Name          | File                    | Purpose                                                                                                                                                                                                                                          |
| ------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Comment Judge | `scripts/comment-judge` | Mostly a joke/experiment to use the Prompt API. Adds an emoji based constructive‑feedback signal (and optional suggested rewrite) while composing PR review comments on GitHub / Azure DevOps using the experimental `window.LanguageModel` API. |

> The `Comment Judge` script watches for newly added comment textareas and gently rates the constructiveness of your draft (debounced) via an LLM. Clicking the emoji copies the suggested improved comment (if one was produced).

## 🔨 Development Workflow

Type check only:

```bash
bun run typecheck   # (script defined in package.json)
```

Build (all scripts):

```bash
bun run build.ts
```

## ➕ Adding a New Userscript

1. Create a folder: `scripts/my-new-script/`
2. Add a `meta.js` (copy an existing one and tweak `@name`, `@description`, `@match`, `@version`).
3. Add `index.ts` with your logic. Use TypeScript + the patterns below.
4. Run `bun run build.ts` – a `dist/my-new-script.user.js` file should appear.
5. Install via [Tampermonkey](https://www.tampermonkey.net/) or [ViolentMonkey](https://violentmonkey.github.io/).

### Minimal `meta.js` template

```javascript
// ==UserScript==
// @name         My New Script
// @namespace    https://github.com/scaryrawr/userscripts
// @version      0.0.1
// @description  What it does.
// @author       Your Name
// @match        https://example.com/*
// @grant        none
// ==/UserScript==
"use strict";
```

### Suggested `index.ts` shape

```ts
const main = async (): Promise<void> => {
  // your logic here
};

(() => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
  } else {
    main();
  }
})();
```

## 🧬 Code Style & Conventions

Summarized (full list in `AGENTS.md`):

* TypeScript (strict) + async/await
* Prefer `const`, arrow functions, destructuring
* CamelCase for variables/functions; PascalCase for types; kebab-case folders
* Use optional chaining (`?.`) and nullish coalescing (`??`)
* `WeakMap` for DOM element associations
* Silent JSON parse errors (fail open) where resilience > correctness
* Direct DOM APIs (`document.createElement`, `querySelector`)

## 🧵 Build Details

`build.ts` walks each directory in `scripts/`, reads `meta.js` as a banner, and calls `Bun.build` with:

* `naming: <name>.user.js`
* `target: browser`
* No minification (readable output for quick inspection)

If you need a single script build, just adapt the loop or temporarily comment others.

## 🔐 Experimental APIs

`Comment Judge` uses `window.LanguageModel` (an experimental browser / Chrome AI API). The script no-ops if the API is absent so it fails gracefully.
