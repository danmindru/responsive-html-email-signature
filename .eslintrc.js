module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: ['standard', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    semi: 0
  }
};
