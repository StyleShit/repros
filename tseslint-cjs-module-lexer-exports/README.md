# tseslint-cjs-module-lexer-exports

Reproduce the issue where `cjs-module-lexer` parses the exports of a CJS module incorrectly.

## Reproduction

```bash
pnpm build
pnpm repro
```

## Result:

```
┌─────────┬─────────────────────────────────────────────────────────────────────┬──────────────────┐
│ (index) │ source                                                              │ exports          │
├─────────┼─────────────────────────────────────────────────────────────────────┼──────────────────┤
│ 0       │ 'module.exports = plugin'                                           │ ''               │
│ 1       │ 'module.exports = { rules: plugin.rules, configs: plugin.configs }' │ 'rules'          │
│ 2       │ 'module.exports = { rules, configs }'                               │ 'rules, configs' │
└─────────┴─────────────────────────────────────────────────────────────────────┴──────────────────┘
```
