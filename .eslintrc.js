const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: [
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    'plugin:vue/essential',
    'plugin:vuejs-accessibility/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint', 'vitest'],
  rules: {
    'no-unused-vars': 'off',
    'no-console': isProduction ? ['error', { allow: ['error', 'warn'] }] : 'off',
    'no-debugger': isProduction ? 'error' : 'off',
    'no-unreachable': isProduction ? 'error' : 'warn',
    quotes: [
      isProduction ? 'error' : 'warn',
      'single',
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],
    // no-use-before-define has some special behaviors
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md#how-to-use
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { enums: true, typedefs: true, ignoreTypeReferences: true },
    ],
    eqeqeq: 'off',
    camelcase: 'off',
    'vue/this-in-template': 'off',
    'require-await': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'import/order': 'off',
    'no-new': 'off',
    'import/named': 'off',
    'handle-callback-err': 'off',
    'no-undef': 'off',
    'no-lonely-if': 'off',
    'vue/valid-v-slot': [
      'error',
      {
        allowModifiers: true,
      },
    ],
    // Override label-has-for to allow for either nesting or id/for.
    // Default is to require both.
    'vuejs-accessibility/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
        allowChildren: true,
      },
    ],
    'vuejs-accessibility/click-events-have-key-events': 'off', // Silence for now since there are too many violations
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      rules: { '@typescript-eslint/no-use-before-define': 'off' },
    },
    {
      files: ['pages/**/*.vue', 'layouts/*.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
  ],
};
