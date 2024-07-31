import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    { files: ['src/**/*'] },
    { languageOptions: { globals: globals.browser } },
    ...tseslint.configs.recommended,
    pluginJs.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
        rules: {
            'no-unused-vars': 'off',
            'no-undef': 'warn',
            'no-console': 'error',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    args: 'all',
                },
            ],
        },
        ignores: ['node_modules', '../**/dist/*'],
    },
];
