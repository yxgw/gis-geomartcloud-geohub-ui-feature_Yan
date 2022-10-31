module.exports = {
  extends: [],
  env: {
    "node": true,
    "jest": true,
    "es6": true
  },
  globals: {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  rules: {
    "eqeqeq": "error",
    "class-methods-use-this": "error",
    "comma-dangle": "error",
    "no-extra-semi": "error",
    "curly": "error",
    "semi": "error",
    "no-console": 0,
    "no-unused-vars": 0,
    "quotes": 0
  },

  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
  },
}
