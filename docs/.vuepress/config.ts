import { NavbarConfig } from '@vuepress/theme-default'
import { path, fs } from '@vuepress/utils'
import type { DefaultThemeOptions } from 'vuepress'
import { defineUserConfig } from 'vuepress'
import { mdPlugin } from './plugin'

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
      },
      {
        path: '/front-end/react',
        text: 'react'
      }
    ]
  },
  {
    text: '演算法',
    path: '/algorithm'
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
    navbar: rawConfigs as NavbarConfig,
    sidebar
  }
}

const { navbar, sidebar } = getConfig(config)

export default defineUserConfig<DefaultThemeOptions>({
  title: `Louis's blog`,
  description: '這是一個web開發者的部落格',
  theme: path.resolve(__dirname, './theme'),
  base: '/js-novel/',
  extendsMarkdown: (md: any) => {
    md.use(mdPlugin)
  },
  themeConfig: {
    repo: 'https://github.com/louis61619/js-novel.git',
    navbar,
    sidebar
  }
})

export { navbar }
