import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: [
    "**/*.{js,mjs,cjs,ts,jsx,tsx}"
  ]},
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*/*.{mjs,ts,json}', '*.{mjs,ts,json}'],
          maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: 1000
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: ["playwright-report/"],
  },
  {
    rules: {
      semi: 'warn',
      "eol-last": 'warn',
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
      "no-unused-vars": 'warn',
      "no-undef": 'error',
      "no-useless-catch": 'warn',
      "no-var": 'warn',
      "prefer-const": 'warn',
      curly: 'warn',
      indent: ['warn', 2, { ArrayExpression: 'first', SwitchCase: 1 }],
      'no-multiple-empty-lines': ['warn', { max: 2 }],
      'no-multi-spaces': ['warn', { ignoreEOLComments: true }],
    },
  },
  {
    settings: {
      react: {
        version: "detect"
      }
    }
  }
];
