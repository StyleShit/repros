# `isSourceFileDefaultLibrary` returns `false` after program structure reuse

Minimal reproduction showing that `program.isSourceFileDefaultLibrary()` returns `false`
after full program structure reuse via `oldProgram` in TypeScript 6.

## What causes this

When `tryReuseStructureFromOldProgram` returns `StructureIsReused.Completely`, the new
program never populates its `libFiles` Set and doesn't copy it from the old program.
This means `isSourceFileDefaultLibrary` — which checks membership in that set — always
returns `false` for the reused program.

Caused by https://github.com/microsoft/TypeScript/pull/62435

## Running the reproduction

```bash
pnpm install
pnpm test
```

The test suite runs `checkIsSourceFileDefaultLibraryAfterReuse` against three TypeScript
versions:

- `typescript-5`: TypeScript 5.9.3
- `typescript-6`: TypeScript 6.0.0-beta
- `typescript-6-patched`: TypeScript 6.0.1-rc with a quick-and-dirty patch to validate the bug.

I'm using rc for the patch version only to be able to have both patched and unpatched versions in the same project,
it doesn't have anything to do with the bug itself.

## AI Disclaimer

I used AI to generate the reproduction to save some time. The bug and the solution were discovered manually
by me when working on ts-eslint upgrade to TypeScript 6 (https://github.com/typescript-eslint/typescript-eslint/pull/12124).
