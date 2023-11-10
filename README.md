# eslint-plugin-no-jest-mock-after-import
This TSLint plugin provides a custom rule for TypeScript projects that use Jest for testing. It ensures that all jest.mock() calls are placed at the beginning of the file, before any import statements. Enforces best practices within our team requiring Jest tests to warn when mock declarations are not hoisted to the top of the module scope.
