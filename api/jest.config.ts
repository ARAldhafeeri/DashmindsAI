module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleDirectories: ["node_modules", "<rootDir>"],
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  testTimeout: 300000,
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "tests/(.*)": "<rootDir>/__tests__/$1",
  },
};
