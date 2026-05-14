import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

declare global {
  interface ImportMeta {
    dirname: string;
  }
}

export default defineConfig([
  ...tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["eslint.config.ts", "src/default-project.ts"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
