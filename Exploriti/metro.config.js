/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * Changed to the specifications required by react-native-svg-transformer
 * @format
 */

const { getDefaultConfig } = require("metro-config");


module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"]
    }
  };
})();
