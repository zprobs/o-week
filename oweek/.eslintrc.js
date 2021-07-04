module.exports = {
  root: true,
  extends: ['airbnb-typescript-prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    "import/resolver": {
      "babel-module": {}
    }
  }
};
