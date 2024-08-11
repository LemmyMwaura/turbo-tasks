module.exports = {
  preset: 'jest-expo',
  setupFiles: ['./jest.setup.js'],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!react-native|@react-native|expo|@expo|@react-navigation|@react-native-async-storage|@react-native-picker|@react-native-community|@expo/vector-icons|expo-router)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testPathIgnorePatterns: ['/node_modules/', '/.expo/'],
  collectCoverageFrom: ['/**/*.{ts,tsx,js,jsx}'],
}
