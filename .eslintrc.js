module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    "airbnb-base",
    "eslint:recommended",
    "plugin:jest/recommended",
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
  },
  plugins: [
    "jest",
  ],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
  },
};
// reglas: https://eslint.org/docs/latest/rules/
