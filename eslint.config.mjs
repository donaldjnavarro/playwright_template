import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: [
    "**/*.{js,mjs,cjs,ts,jsx,tsx}"
  ]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {
    ignores: ["playwright-report/"],
  },
  {
    rules: {
      semi: 'warn'
    }
  },
  {
    settings: {
      react: {
        version: "detect"
      }
    }
  },
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];