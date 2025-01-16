// import { NavbarConfig } from '@vuepress/theme-default'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { defaultTheme, NavbarOptions } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { path, fs } from '@vuepress/utils'
import { shikiPlugin } from '@vuepress/plugin-shiki'

type ConfigType = {
  path?: string
  text: string
  link?: string
}

type ConfigsType = (
  | ConfigType
  | {
      text: string
      children: ConfigsType
    }
)[]

const config: ConfigsType = [
  {
    text: '前端',
    children: [
      {
        path: '/front-end/javascript',
        text: 'javascript'
      }
    ]
  }
]

function getConfig(
  rawConfigs: ConfigsType,
  navbar: {
    text: string
    link: string
  }[] = [],
  sidebar: {
    [key: string]: string[]
  } = {}
) {
  for (const raw of rawConfigs) {
    if ('children' in raw) {
      getConfig(raw.children, navbar, sidebar)
    } else {
      const _path = path.resolve(__dirname, `..${raw.path}`)
      const files = fs
        .readdirSync(path.resolve(__dirname, _path))
        .filter((x) => /.md$/.test(x))
        .sort((a, b) => {
          const aIndex = Number(a.split('_')[0])
          const bIndex = Number(b.split('_')[0])
          return aIndex - bIndex
        })

      const filesPath = files.map((file) => raw.path + '/' + file)

      if (raw.path && !sidebar[raw.path]) {
        sidebar[raw.path] = filesPath
      }

      delete raw.path
      raw.link = filesPath[0]
    }
  }

  return {
    navbar: rawConfigs,
    sidebar
  }
}

const { navbar, sidebar } = getConfig(config)

export default defineUserConfig({
  title: `Louis's blog`,
  description: '這是一本前端工程學習筆記',
  theme: defaultTheme({
    // set theme config here
    repo: 'https://github.com/louis61619/js-novel.git',
    // navbar: {

    // },
    sidebar,
    themePlugins: {
      prismjs: false
    }
  }),
  bundler: webpackBundler(),
  base: '/js-novel/',
  plugins: [
    shikiPlugin({
      langs: ['bash', 'diff', 'json', 'md', 'ts', 'vue'],
      theme: 'dark-plus'
    })
  ]
  // extendsMarkdown: (md) => {
  //   md.use(mdPlugin)
  // }
})

export { navbar }
