import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginPrettier from 'eslint-plugin-prettier' // 新增
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfig([
  // 基础配置
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting,

  // 自定义规则
  {
    files: ['**/*.{js,vue}'],
    ignores: ['**/dist/**', '**/node_modules/**'],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    },
    plugins: {
      prettier: pluginPrettier // 注册 Prettier 插件
    },
    rules: {
      'prettier/prettier': [
        'warn',
        {
          singleQuote: true,
          semi: false,
          printWidth: 80,
          trailingComma: 'none',
          endOfLine: 'auto'
        }
      ],
      'vue/multi-word-component-names': [
        'warn',
        {
          ignores: ['index']
        }
      ],
      'vue/no-setup-props-destructure': 'off',
      'no-undef': 'error'
    }
  }
])
