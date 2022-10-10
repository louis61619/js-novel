const fs = require('fs')
const path = require('path')

const config = [
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

function getConfig(rawConfigs, sidebar = {}) {
  for (const raw of rawConfigs) {
    if (raw.children) {
      getConfig(raw.children, sidebar)
    } else {
      const _path = path.resolve(__dirname, `..${raw.path}`)
      const text = raw.text
      const files = fs
        .readdirSync(path.resolve(__dirname, _path))
        .filter((x) => /.md$/.test(x))
        .sort((a, b) => {
          const aIndex = Number(a.split('_')[0])
          const bIndex = Number(b.split('_')[0])
          return aIndex - bIndex
        })

      const filesPath = files.map((file) => raw.path + '/' + file)

      // navbar.push({
      //   text,
      //   link: raw.path + '/' + filesPath[0]
      // })

      if (!sidebar[raw.path]) {
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

console.log(JSON.stringify(navbar), '----', sidebar)

// function getJsonFiles(jsonPath) {
//   let jsonFiles = []
//   function findJsonFile(path) {
//     let files = fs.readdirSync(path)
//     files.forEach(function (item, index) {
//       let fPath = join(path, item)
//       let stat = fs.statSync(fPath)
//       if (stat.isDirectory() === true) {
//         findJsonFile(fPath)
//       }
//       if (stat.isFile() === true) {
//         jsonFiles.push(fPath)
//       }
//     })
//   }
//   findJsonFile(jsonPath)
//   console.log(jsonFiles)
// }

// getJsonFiles('./front-end')
