# `getReturnType` Stack Overflow

Minimal reproduction showing that walking a type's call signatures might never terminate and cause stack overflow.

## What causes this

[src/subject.ts](./src/subject.ts) is a generic function type whose call signature returns the same
type, instantiated with an accumulated type argument:

```ts
type Recursive<T> = <U>() => Recursive<T & U>;
```

## Running the reproduction

```bash
pnpm install
pnpm repro
pnpm repro-tsgo
```

Both print the first few levels and then die:

### TS 6

```
0: Recursive<unknown>
1: Recursive<U>
2: Recursive<U & U>
3: Recursive<U & U & U>
4: Recursive<U & U & U & U>

RangeError: Maximum call stack size exceeded
    at instantiateType (.../typescript/lib/typescript.js:68310:27)
    at getMappedType (.../typescript/lib/typescript.js:67991:67)
    at instantiateTypeWorker (.../typescript/lib/typescript.js:68355:14)
```

### TSGO

```
0: Recursive<unknown>
1: Recursive<U>
2: Recursive<U & U>
3: Recursive<U & U & U>
4: Recursive<U & U & U & U>

RangeError: Maximum call stack size exceeded
    at Checker.getSignaturesOfType (.../@typescript/native-preview/dist/api/sync/api.js:757:24)
    at walkRecurse (.../src/walk.ts:18:37)
```

Related: [typescript-eslint#12705](https://github.com/typescript-eslint/typescript-eslint/issues/12705)
