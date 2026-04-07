import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import { defineConfig, globalIgnores } from "eslint/config";

/** @type {import("eslint").Linter.Config[]} */
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettierConfig,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // 最佳实践
      eqeqeq: ["warn", "smart"],
      "no-var": "error",
      "prefer-const": "error",
      "no-console": "warn",
      curly: ["error", "all"],
      "no-throw-literal": "error",
      "no-return-await": "off",

      "no-unused-expressions": ["error", { allowShortCircuit: true, allowTernary: true }],
      "no-self-compare": "error",
      "no-duplicate-imports": "error",
      "no-else-return": "error",

      "no-multiple-empty-lines": ["warn", { max: 1, maxEOF: 1 }],
      "no-trailing-spaces": "warn",
    },
  },
]);
