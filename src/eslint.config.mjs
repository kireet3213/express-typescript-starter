import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
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
            'no-unused-vars': 'warn',
            'no-undef': 'warn',
            'no-console': 'error',
            '@typescript-eslint/no-unused-vars': 'warn',
        },
        ignores: ['node_modules', '../**/dist/*'],
    },
];
