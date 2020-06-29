module.exports = {
  parserOptions: {
    "ecmaVersion": 10,
  },
  extends: [
    'standard',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
    'prettier/standard'
  ],
  plugins: [
    'react',
    'react-native',
    'flowtype',
    'prettier',
    'standard'
  ]
};
