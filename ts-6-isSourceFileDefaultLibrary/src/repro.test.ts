import * as ts5 from "typescript-5";
import * as ts6 from "typescript-6";
import * as ts6Patched from "typescript-6-patched";
import { describe, it, expect } from "vitest";
import { isES6LibInDefaultLibrary } from "./repro.js";

describe("isSourceFileDefaultLibrary after program structure reuse", () => {
  it.each([
    { name: "typescript-5", ts: ts5 },
    { name: "typescript-6", ts: ts6 },
    { name: "typescript-6-patched", ts: ts6Patched },
  ])("returns true for both programs with $name", ({ ts }) => {
    const result = isES6LibInDefaultLibrary(ts as never);

    expect(result.program1).toBe(true);
    expect(result.program2).toBe(true);
  });
});
