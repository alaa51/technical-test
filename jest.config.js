module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    './jest.setup.ts',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-reanimated)/)',
  ],
};
