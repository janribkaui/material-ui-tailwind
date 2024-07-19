/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    camelcase: "error",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "variable",
        format: ["PascalCase", "camelCase", "UPPER_CASE"],
        leadingUnderscore: "forbid",
        modifiers: ["global"],
      },
      {
        selector: "variable",
        format: ["camelCase"],
        leadingUnderscore: "allow",
        modifiers: ["const"],
      },
      {
        selector: "function",
        format: ["camelCase"],
        leadingUnderscore: "forbid",
      },
      {
        selector: "interface",
        format: ["PascalCase"],
        custom: {
          regex: "^I[A-Z]",
          match: false,
        },
      },
      {
        selector: "class",
        format: ["PascalCase"],
      },
    ],
  },
};
