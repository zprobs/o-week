module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ["./src/"],
        alias: {
          "@root": "./src/",
          "@components": "./src/components/",
          "@views": "./src/views/"
        }
      }
    ],
  ]
};
