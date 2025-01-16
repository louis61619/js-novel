// import { defineClientAppEnhance } from '@vuepress/client'
import Home from './theme/components/Home.vue'
// import './theme/style/index.scss'

import { defineClientConfig } from 'vuepress/client'

export default defineClientConfig({
  layouts: {
    Home
  }
})
