import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // Context providers ship with their consumer hook, and a couple of
      // components export a helper or palette beside themselves. That costs a
      // full reload instead of a fast refresh in dev, which is acceptable.
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
          allowExportNames: [
            'useWishlist',
            'useToast',
            'useAdminAuth',
            'productToForm',
            'CHART_PALETTE',
            'SearchEmpty',
            'ProductGridSkeleton',
            'ListSkeleton',
          ],
        },
      ],
    },
  },
])
