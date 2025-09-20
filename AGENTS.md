# Agents Guide

## Build/Test Commands

- `bun run build.ts` - Build all userscripts to dist/ folder
- `npm run typecheck` - Type check with TypeScript
- No test framework configured

## Project Structure

- `scripts/[name]/index.ts` - Main userscript entry points
- `scripts/[name]/meta.js` - Tampermonkey metadata banner
- `types/` - TypeScript declarations

## Code Style

- Use TypeScript with strict mode enabled
- Import style: Named imports (`import z from "zod"`)
- Use async/await for async operations
- Use `const` for variables, arrow functions preferred
- Use WeakMap for DOM element associations
- Add type annotations for function parameters
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Prefer destructuring for object properties
- Use camelCase for variables and functions
- Use PascalCase for types and interfaces
- Use kebab-case for file/folder names
- Handle errors with try/catch blocks, ignore parse errors silently
- Use `document.createElement` and `querySelector` for DOM manipulation
