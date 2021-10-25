import { path } from '@vuepress/utils'

export default {
  title: `louis's blog`,
  description: '這是一個web開發者的部落格',
  theme: path.resolve(__dirname, './theme'),
  base: process.env.NODE_ENV === 'production' ? '/blog/' : '/',
  themeConfig: {
    // logo: '/logo.png',

    repo: 'https://github.com/louis61619/blog.git',

    navbar: [
      {
        text: '前端',
        children: [
          {
            text: 'javascript',
            link: '/blog/front-end/javascript/'
          },
          {
            text: 'react',
            link: '/blog/front-end/react/'
          }
        ]
      }
    ],

    sidebar: {
      '/blog/front-end/javascript': [
        '/blog/front-end/javascript/index.md',
        '/blog/front-end/javascript/正則.md',
        '/blog/front-end/javascript/閉包.md'
      ]
    }
  }
}
