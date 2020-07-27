module.exports = {
  parserOptions: {
    ecmaVersion: 10,
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'standard',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
    'prettier/standard',
  ],
  plugins: ['react', 'react-native', 'flowtype', 'prettier', 'standard'],
  "env": {
    "browser": true,
    "react-native/react-native": true,
  },
  rules: {
    "react-native/no-unused-styles": 2,
    "react-native/no-raw-text": 2,
  },
};
