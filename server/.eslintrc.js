module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: [
        'prettier',
        'prettier/@typescript-eslint',
        'plugin:@typescript-eslint/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    rules: {
        '@typescript-eslint/no-namespace': 'off'
    }
};
