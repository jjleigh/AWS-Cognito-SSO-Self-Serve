module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/default',
    transform: {
        '^.+\\.css$': '<rootDir>/src/tests/unit/__mocks__/cssTransform.js'
    },
    moduleNameMapper: {
        '^@mdi/font/css/materialdesignicons.css$': '<rootDir>/src/tests/unit/__mocks__/emptyModule.js'
    },
    transformIgnorePatterns: [
        "/node_modules/(?!(^@mdi/font/)/)"
    ]
};
