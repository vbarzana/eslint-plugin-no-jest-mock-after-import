import * as noJestMockAfterImportWalker from './rules/no-jest-mock-after-import';
export default {
    rules: {
        'no-only-tests': noJestMockAfterImportWalker
    }
};