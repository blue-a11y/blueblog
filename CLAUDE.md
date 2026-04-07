# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

- React 19 + TypeScript 6 + Vite 8
- React Compiler (via babel-plugin-react-compiler + @rolldown/plugin-babel)
- react-router 7 (installed but not yet integrated)
- pnpm as package manager

## Commands

- `pnpm dev` — dev server with HMR
- `pnpm build` — type check (`tsc -b`) then Vite build
- `pnpm lint` — ESLint on all files
- `pnpm preview` — preview production build

## Architecture

Single-page Vite + React app. Entry point: `src/main.tsx` → `src/App.tsx`. No routing or data layer yet — react-router is installed for future use.

Styling uses CSS custom properties with light/dark mode via `prefers-color-scheme` media queries (defined in `src/index.css`). Component styles in `src/App.css`.

React Compiler is enabled — avoid patterns it can't optimize (mutation of props/state, reassigning let bindings that capture props).

## TypeScript

Target ES2023, bundler module resolution, `verbatimModuleSyntax` enabled (use `import type` for type-only imports). Strict linting: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`.

## ESLint

Flat config in `eslint.config.js`. Covers JS recommended, TypeScript recommended, React Hooks, and React Refresh (Vite). Ignores `dist/`.
