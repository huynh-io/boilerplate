module.exports = {
  extends: [
    "eslint-config-airbnb-base",
    "eslint-config-airbnb-typescript",
    "prettier",
  ],
  plugins: ["eslint-plugin-react"],
  ignorePatterns: [
    "app/assets/**/*",
    "app/javascript/controllers/**/*",
    "app/javascript/vendor/**/*",
    "app/javascript/application.js",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "import/prefer-default-export": "off",
    "no-use-before-define": "off",
    "no-unused-vars": [
      "error",
      { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "variable",
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
        leadingUnderscore: "allow",
      },
    ],
  },
};

