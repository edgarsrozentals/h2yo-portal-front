module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    node: true,
    browser: true,
    es6: true,
    jest: true,
  },
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    indent: ['warn', 2, {
      'SwitchCase': 1,
    }],
    semi: ['warn', 'always'],
    quotes: ['warn', 'single'],
    eqeqeq: ['warn', 'always'],
    'jsx-quotes': ['warn', 'prefer-double'],
    'object-curly-spacing': ['warn', 'always'],
    'array-bracket-spacing': ['warn', 'never'],
    'computed-property-spacing': ['warn', 'never'],
    'key-spacing': 'warn',
    'keyword-spacing': 'warn',
    'prefer-rest-params': 'off',
    'no-extra-boolean-cast': 'off',
    'no-multiple-empty-lines': ['warn', { max: 3, maxEOF: 3, maxBOF: 3 }],
    'no-multi-spaces': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/type-annotation-spacing': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        'selector': 'interface',
        'format': ['PascalCase'],
      },
      {
        'selector': 'class',
        'format': ['PascalCase'],
      },
      {
        'selector': 'typeAlias',
        'format': ['PascalCase'],
      },
      {
        'selector': 'enum',
        'format': ['PascalCase'],
      },
    ],
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/jsx-tag-spacing': 'warn',
    'react/jsx-equals-spacing': 'warn',
    'react/jsx-props-no-multi-spaces': 'warn',
    'react/self-closing-comp': [
      'warn',
      {
        component: true,
        html: true,
      },
    ],
    // tmp
    // '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
  },
};
