module.exports = {
  root: true,
  extends: ['airbnb-typescript-prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/jsx-props-no-spreading': 'off'
  },
  settings: {
    "import/resolver": {
      "babel-module": {
        "extensions": [
          ".ios.ts",
          ".android.ts",
          ".ts",
          ".d.ts",
          ".ios.tsx",
          ".android.tsx",
          ".tsx",
          ".jsx",
          ".js",
          ".json",
        ],
        "alias": {
          "@root": "./src",
          "@components": "./src/components",
          "@views": "./src/views"
        }
      }
    }
  },
};
