module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
        'prettier'
    ],
    parserOptions: {
        parser: {
            "ts": "@typescript-eslint/parser",
            "<template>": "espree"
        }
    },
    root: true,
    rules: {
        'vue/no-reserved-component-names': 'off',
        'vue/multi-word-component-names': 'off',
        'no-unused-vars': 'warn',
        'indent': ['error', 4],
        'vue/html-indent': ['error', 4],
        'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
        'semi': [2, 'always'],
        'comma-dangle': ['error', 'always-multiline'],
    },
}