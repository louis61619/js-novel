export default {
  title: 'elp-schema-form',
  description: 'Vue3 + ElementPlus 组件库',

  themeConfig: {
    // logo: '/logo.png',

    repo: 'https://github.com/louis61619/elp-schema-form',
    darkMode: false,
    // editLink: false,

    navbar: [
      { text: '介紹', link: '/' },
      {
        text: '组件',
        link: '/components/form'
      }
    ],

    sidebar: {
      '/': [
        {
          text: '介紹',
          children: ['/README.md']
        }
        // {
        //   text: '組件',
        //   children: ['/components/form.md']
        // }
      ],
      '/components/': [
        '/components/overview',
        {
          text: '組件',
          children: ['/components/form', '/components/table']
        }
      ]
    }
  }
}
