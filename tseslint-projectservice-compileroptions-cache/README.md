# typescript-eslint project service caches inferred-project `compilerOptions`

Minimal reproduction showing that `typescript-eslint` caches the first inferred-project `compilerOptions` it sees,
and reuses it for all subsequent files.

## Structure

- `packages/a/tsconfig.json` - DOM-enabled `compilerOptions`
- `packages/b/tsconfig.json` - no DOM in `compilerOptions`
- `packages/{a,b}/src/in-project.ts` - simple file that is included in the package's `tsconfig.json`.
- `packages/{a,b}/src/out-of-project.ts` - file that uses DOM and is included in the package's `allowDefaultProject`.

## Running the reproduction

```bash
pnpm install

pnpm lint      # ESLint passes - expected to fail on b/src/out-of-project.ts
pnpm lint:a    # ESLint passes as expected
pnpm lint:b    # ESLint fails as expected
```
