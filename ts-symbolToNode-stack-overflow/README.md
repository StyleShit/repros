# `symbolToNode` Stack Overflow

Minimal reproduction showing that `symbolToNode` stack overflows when used in a recursive function.

## Reproductions

I extracted the initial reproduction ([src/repro-1.ts](./src/repro-1.ts)) from
[typescript-eslint#11947](https://github.com/typescript-eslint/typescript-eslint/issues/11947),
removed all ESLint-related stuff, and got a "Maximum call stack size exceeded" error.

After playing with that a little but, I was able to create a second, more minimal, reproduction
([src/repro-2.ts](./src/repro-2.ts)) that still reproduces the issue.

Seems like both reproductions are calling `symbolToNode`, but each reproduction has a slightly different
stack trace, so I thought it might be worth keeping both.

## Running the reproductions

```bash
pnpm install
pnpm typecheck-1
pnpm typecheck-2
```

Interestingly, this is failing in `tsgo` as well, but it a different way - just hanging and eating up memory
(I stopped it after ~30 seconds). You can run it with:

```bash
pnpm typecheck-1-tsgo
pnpm typecheck-2-tsgo
```

Funnily enough, it does work properly in the IDE, and I'm getting ts(2345):

```
Argument of type '() => () => CustomNode<() => CustomNode<any>>' is not assignable to parameter of type '() => CustomNode<unknown>'.
  Type '() => CustomNode<typeof node.getNextNode<any>>' is not assignable to type 'CustomNode<unknown>'.ts(2345)
```
