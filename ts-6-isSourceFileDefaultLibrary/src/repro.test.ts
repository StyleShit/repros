import * as ts5 from "typescript-5";
import * as ts6 from "typescript-6";
import * as ts6Patched from "typescript-6-patched";
import { describe, it, expect } from "vitest";
import { checkIsSourceFileDefaultLibraryAfterReuse } from "./repro.js";

describe("isSourceFileDefaultLibrary after program structure reuse", () => {
  it("returns true for both programs with TypeScript 5", () => {
    const result = checkIsSourceFileDefaultLibraryAfterReuse(ts5);

    expect(result.program1).toBe(true);
    expect(result.program2).toBe(true);
  });

  it("returns true for both programs with TypeScript 6", () => {
    const result = checkIsSourceFileDefaultLibraryAfterReuse(ts6 as never);

    expect(result.program1).toBe(true);
    expect(result.program2).toBe(true);
  });

  it("returns true for both programs with TypeScript 6 patched", () => {
    const result = checkIsSourceFileDefaultLibraryAfterReuse(
      ts6Patched as never
    );

    expect(result.program1).toBe(true);
    expect(result.program2).toBe(true);
  });
});
