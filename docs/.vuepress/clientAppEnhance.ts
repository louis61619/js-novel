import { defineClientAppEnhance } from '@vuepress/client'
import Home from './theme/components/Home.vue'
import '../.vuepress/theme/style/index.scss'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  // ...
  app.component('Home', Home)
})
