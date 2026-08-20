# AGENTS.md

Fresh Vite + React 19 + TypeScript + Tailwind v4 + shadcn/ui template (style: `base-nova`). Single-screen app, no routing, no tests.

## Tooling

- **Package manager is Bun** (`bun.lock`, bun 1.4.0 installed). Use `bun install`, `bun run <script>`, `bunx <pkg>`. Never use `npm`/`yarn` (would create a second lockfile).
- **No tests exist** — no test framework or test script. Verification is `typecheck` + `lint`.

## Commands

| Task                 | Command                                                 |
| -------------------- | ------------------------------------------------------- |
| Dev server           | `bun run dev`                                           |
| Build                | `bun run build` (runs `tsc -b` first, so it typechecks) |
| Typecheck            | `bun run typecheck` (`tsc --noEmit`)                    |
| Lint                 | `bun run lint` (`eslint .`)                             |
| Format               | `bun run format` (prettier, only `**/*.{ts,tsx}`)       |
| Add shadcn component | `bunx shadcn add <name>` (lands in `src/components/ui`) |

Suggested order after editing: `bun run typecheck` then `bun run lint`.

## Conventions and gotchas

- **Tailwind is v4, CSS-first: there is no `tailwind.config.*`.** Theme tokens (colors, radius, sidebar, chart, fonts) live in `src/index.css` via `@theme inline` + shadcn CSS vars; dark mode uses `@custom-variant dark`. Change styling in CSS, not a config file.
- shadcn components here use **`@base-ui/react` primitives**, not Radix (`components.json` `"style": "base-nova"`). Don't assume `@radix-ui/*` imports or radix data-attributes; check how `src/components/ui/button.tsx` wraps a base-ui primitive.
- Dark mode is handled by the **local** `src/components/theme-provider.tsx` (wraps `App` in `main.tsx`; `d` key toggles; persists to `localStorage` key `"theme"`). It is NOT `next-themes`.
- Prettier (`.prettierrc`): **no semicolons, double quotes**, `trailingComma: "es5"`, width 80, and `prettier-plugin-tailwindcss` sorts classes (`cn`/`cva` are registered tailwind functions). Write new code accordingly.
- Strict TS flags that bite (`tsconfig.app.json`): `verbatimModuleSyntax` → use `import type` for types; `erasableSyntaxOnly` → no `enum`/`namespace`; `noUnusedLocals`/`noUnusedParameters` → dead vars fail `typecheck`.
- `allowImportingTsExtensions: true` — imports may include `.tsx`/`.ts` extensions; existing entry files do (e.g. `./App.tsx`, `@/components/theme-provider.tsx`).
- Path alias `@/*` → `src/*` in both `vite.config.ts` and tsconfig `paths`.
- `theme-provider.tsx` exports the `useTheme` hook next to the `ThemeProvider` component and carries `/* eslint-disable react-refresh/only-export-components */`; keep that disable if you add exports there.

## Layout

- `src/main.tsx` — entrypoint (imports `index.css`, wraps `App` in `ThemeProvider`).
- `src/App.tsx` — the single screen (template placeholder content; exports both named and default `App`).
- `src/components/ui/` — generated shadcn components (only `button` so far).
- `src/lib/utils.ts` — `cn()` helper (`clsx` + `tailwind-merge`).

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Built-in Commands vs Scripts

`vp <name>` runs a built-in command. `vp run <name>` runs a `package.json` script or a `vite.config.ts` task. Scripts cannot overwrite built-ins, so `vp dev` and `vp run dev` may do different things. Check `package.json` and `vite.config.ts` first, and run `vp run <name>` when the project defines a script or task with that name.

## Tool Versions

Run `vp toolchain` to show versions and relationships in the active Vite+
release. Add a tool name to select part of the graph. For example, run
`vp toolchain vite`. Use `--global` to ignore the local `vite-plus` package. Use
`vp why <package>` to show the package-manager dependency graph.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->
