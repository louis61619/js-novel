import { path } from '@vuepress/utils'

export default {
  // 继承默认主题
  extends: '@vuepress/theme-default',

  // 覆盖 `404` 布局
  layouts: {
    Layout: path.resolve(__dirname, 'layouts/Layout.vue')
  }
}
