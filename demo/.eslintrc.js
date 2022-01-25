module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "plugin:@typescript-eslint/eslint-recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "react-app",
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint",
    "simple-import-sort",
    "prettier",
  ],
  "rules": {
    "simple-import-sort/sort": "off",
    "prettier/prettier": "error"
  }
};
