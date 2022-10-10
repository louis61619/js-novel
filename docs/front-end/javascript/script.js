const fs = require('fs')
const path = require('path')
const { join } = require('path')

// const arr = [
//   '/front-end/javascript/how-browsers-work.md',
//   '/front-end/javascript/closure.md',
//   '/front-end/javascript/this.md',
//   '/front-end/javascript/arguments.md',
//   '/front-end/javascript/call&apply&bind.md',
//   '/front-end/javascript/functional-programming.md',
//   '/front-end/javascript/object&prototype.md',
//   '/front-end/javascript/prototype-chain&Inhertitance.md',
//   '/front-end/javascript/es6&class.md',
//   '/front-end/javascript/es6&new-type.md',
//   '/front-end/javascript/es6-syntactic-sugar.md',
//   '/front-end/javascript/var&let&const.md',
//   '/front-end/javascript/es7-es12.md',
//   '/front-end/javascript/strict-mode.md',
//   '/front-end/javascript/supplement.md',
//   '/front-end/javascript/proxy&reflect.md',
//   '/front-end/javascript/promise.md',
//   '/front-end/javascript/iterator.md',
//   '/front-end/javascript/generator.md',
//   '/front-end/javascript/async-await.md',
//   '/front-end/javascript/event-loop.md',
//   '/front-end/javascript/handle-error.md',
//   '/front-end/javascript/module.md',
//   '/front-end/javascript/package-manager.md',
//   '/front-end/javascript/json.md',
//   '/front-end/javascript/web-storage.md',
//   '/front-end/javascript/IndexDB.md',
//   '/front-end/javascript/cookie.md',
//   '/front-end/javascript/BOM.md',
//   '/front-end/javascript/DOM.md',
//   '/front-end/javascript/throttle&debounce.md',
//   '/front-end/javascript/deep-copy.md',
//   '/front-end/javascript/event-bus.md'
// ]

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

// getJsonFiles('javascript')

const filepath = path.resolve(__dirname, '../javascript')
// console.log(filepath)

const files = fs.readdirSync(filepath)
console.log(files)
