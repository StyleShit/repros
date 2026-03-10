import type * as TS from "typescript-5";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

export function isES6LibInDefaultLibrary(ts: typeof TS): {
  program1: boolean;
  program2: boolean;
} {
  const projectDir = fs.mkdtempSync(path.join(os.tmpdir(), "ts-repro-"));

  try {
    const fileName = path.join(projectDir, "file.ts");
    fs.writeFileSync(fileName, "export {}");

    const options: TS.CompilerOptions = { target: ts.ScriptTarget.ES2015 };
    const host = ts.createCompilerHost(options);

    const program1 = ts.createProgram([fileName], options, host);
    const program2 = ts.createProgram([fileName], options, host, program1);

    return {
      program1: isSourceFileDefaultLibrary(program1, "lib.es6.d.ts"),
      program2: isSourceFileDefaultLibrary(program2, "lib.es6.d.ts"),
    };
  } finally {
    fs.rmSync(projectDir, { recursive: true, force: true });
  }
}

function isSourceFileDefaultLibrary(
  program: TS.Program,
  libName: string
): boolean {
  const sf = program.getSourceFiles().find((f) => f.fileName.endsWith(libName));

  if (!sf) {
    throw new Error(`Source file not found: ${libName}`);
  }

  return program.isSourceFileDefaultLibrary(sf);
}
