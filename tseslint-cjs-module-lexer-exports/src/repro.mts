import { parse, init } from "cjs-module-lexer";
import * as fs from "node:fs";
import * as path from "node:path";
await init();

const assignmentContent = fs.readFileSync(
  path.join(import.meta.dirname, "../dist/assignment.js"),
  "utf8"
);

const plainObjectContent = fs.readFileSync(
  path.join(import.meta.dirname, "../dist/plain-object.js"),
  "utf8"
);

const assignment = parse(assignmentContent);
const plainObject = parse(plainObjectContent);

console.table([
  {
    source: "module.exports = plugin",
    exports: assignment.exports.join(", "),
  },
  {
    source: "module.exports = { rules, configs }",
    exports: plainObject.exports.join(", "),
  },
]);
