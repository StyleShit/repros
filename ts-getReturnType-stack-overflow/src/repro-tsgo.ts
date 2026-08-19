import path from "node:path";
import { API } from "@typescript/native-preview/unstable/sync";
import { walk } from "./walk.ts";

const api = new API();

const snapshot = api.updateSnapshot({
  openProjects: [path.resolve("tsconfig.json")],
});

const { checker, program } = snapshot.getProjects()[0];

walk(program as never, checker as never);
