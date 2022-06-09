module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset','babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
