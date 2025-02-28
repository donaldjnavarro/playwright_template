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
      semi: 'warn',
      "eol-last": 'error',
      "no-trailing-spaces": 'warn',
      "default-case": 'error',
      "default-case-last": 'warn',
      "no-const-assign": 'warn',
      "no-invalid-regexp": 'error',
      "no-unreachable": 'error',
      "no-useless-assignment": 'warn',
      "block-scoped-var": 'error',
      "capitalized-comments": ["warn", "always", { "ignoreConsecutiveComments": true }],
      "no-unneeded-ternary": 'warn',
      "no-unused-expressions": 'warn',
      "no-useless-catch": 'warn',
      "no-var": 'warn',
      "prefer-const": 'warn'
    },
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
