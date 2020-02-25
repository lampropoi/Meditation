module.exports = {
  root: true,
  extends: ['airbnb', 'plugin:react/recommended', '@react-native-community'],
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', 'never'],
    'max-len': ['error', 120],
    'no-console': 'off',
    'no-return-assign': 'off',
    'no-plusplus': 'off',
    'object-curly-spacing': ['error', 'never'],
    'object-curly-newline': 'off',
    'prefer-destructuring': 'off',
    'react/jsx-filename-extension': [1, {extensions: ['.js']}],
    'react/no-array-index-key': 'off',
    'react/jsx-props-no-spreading': 'off'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    node: true,
    es6: true,
    browser: true
  },
  plugins: ['react'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js']
      }
    }
  }
};
