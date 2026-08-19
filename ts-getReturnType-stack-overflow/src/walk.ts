import path from "node:path";
import ts from "typescript";

export const subjectFileName = path.resolve(import.meta.dirname, "subject.ts");

export function walk(program: ts.Program, checker: ts.TypeChecker): void {
  const sourceFile = program.getSourceFile(subjectFileName)!;

  const [subject] = checker.getExportsOfModule(
    checker.getSymbolAtLocation(sourceFile)!,
  );

  function recurse(type: ts.Type, depth: number) {
    // Show only the top ones to see that it's working.
    if (depth < 5) {
      console.log(`${depth}: ${checker.typeToString(type)}`);
    }

    for (const signature of checker.getSignaturesOfType(
      type,
      ts.SignatureKind.Call,
    )) {
      recurse(checker.getReturnTypeOfSignature(signature), depth + 1);
    }
  }

  recurse(checker.getTypeOfSymbol(subject), 0);
}
