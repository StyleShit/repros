import { parse, init } from "cjs-module-lexer";
import * as fs from "node:fs";
import * as path from "node:path";
await init();

const assignment = parseFile("assignment");
const plainObject = parseFile("plain-object");
const plainObjectShorthand = parseFile("plain-object-shorthand");

console.table([
  {
    source: "module.exports = plugin",
    exports: assignment.exports.join(", "),
  },

  {
    source: "module.exports = { rules: plugin.rules, configs: plugin.configs }",
    exports: plainObject.exports.join(", "),
  },

  {
    source: "module.exports = { rules, configs }",
    exports: plainObjectShorthand.exports.join(", "),
  },
]);

function parseFile(fileName: string) {
  const contents = fs.readFileSync(
    path.join(import.meta.dirname, `../dist/${fileName}.js`),
    "utf8"
  );

  return parse(contents);
}
