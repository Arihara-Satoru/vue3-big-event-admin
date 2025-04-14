// 导入 ESLint 的 defineConfig 方法，用于定义配置
import { defineConfig } from 'eslint/config'
// 导入全局变量定义，用于支持浏览器环境的全局变量
import globals from 'globals'
// 导入 ESLint 的 JavaScript 规则配置模块
import js from '@eslint/js'
// 导入 Vue 的 ESLint 插件，用于支持 Vue 文件的规则检查
import pluginVue from 'eslint-plugin-vue'
// 导入 Prettier 的 ESLint 插件，用于格式化代码
import pluginPrettier from 'eslint-plugin-prettier'
// 导入 Vue 的 Prettier 配置文件，跳过部分格式化规则以避免冲突
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// 导出默认的 ESLint 配置
export default defineConfig([
  // 使用 ESLint 推荐的基础 JavaScript 规则
  js.configs.recommended,
  // 使用 Vue 插件的 flat/essential 规则集
  ...pluginVue.configs['flat/essential'],
  // 跳过部分格式化规则以避免与 Prettier 冲突
  skipFormatting,
  {
    // 指定需要检查的文件类型（JavaScript 和 Vue 文件）
    files: ['**/*.{js,vue}'],
    // 忽略不需要检查的目录（如 dist 和 node_modules）
    ignores: ['**/dist/**', '**/node_modules/**'],
    // 定义语言选项
    languageOptions: {
      // 定义全局变量，支持浏览器环境下的全局变量
      globals: {
        ...globals.browser
      }
    },
    // 定义插件
    plugins: {
      // 注册 Prettier 插件
      prettier: pluginPrettier,
      // 注册 Vue 插件
      vue: pluginVue
    },
    // 定义规则
    rules: {
      // 启用 Prettier 格式化规则，设置为警告级别
      'prettier/prettier': [
        'warn',
        {
          singleQuote: true, // 使用单引号
          semi: false, // 禁用分号
          printWidth: 80, // 每行最大字符数为 80
          trailingComma: 'none', // 禁用尾随逗号
          endOfLine: 'auto', // 自动处理换行符
          htmlWhitespaceSensitivity: 'ignore', // 忽略 HTML 空白敏感性
          bracketSameLine: true, // 关键点1：允许标签结束符 > 不换行
          singleAttributePerLine: false // 关键点2：强制每个属性单独一行
        }
      ],
      // 设置 Vue 标签闭合规则
      'vue/html-closing-bracket-newline': [
        'error',
        {
          singleline: 'never', // 关键点3：单行时 > 不换行
          multiline: 'never' // 关键点4：多行时 > 也不换行（根据你的需求修改）
        }
      ],
      // 关闭 Vue 属性每行数量限制规则，让 Prettier 接管
      'vue/max-attributes-per-line': 'off', // 关键点5：关闭此规则让 Prettier 接管
      // 关闭 Vue 属性分行规则
      'vue/first-attribute-linebreak': 'off', // 关键点6：关闭此规则
      // 设置 Vue 组件命名规则，忽略 index 文件
      'vue/multi-word-component-names': ['warn', { ignores: ['index'] }],
      // 允许在 Vue 的 setup 中解构 props
      'vue/no-setup-props-destructure': 'off',
      // 禁止使用未定义的变量
      'no-undef': 'error'
    }
  }
])
