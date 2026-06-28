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

console.log("module.exports = plugin: ", assignment.exports);
console.log("modules.exports = { rules, configs }: ", plainObject.exports);
