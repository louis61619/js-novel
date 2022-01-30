# 模塊化

模塊化的最終目的是將程式碼劃分為一個個小的結構，每個結構有自己的邏輯和作用域，這個結構可以將想要暴露的變數、函數、物件等提供給其他結構使用。

在早期 JavaScript 僅僅是作為網頁的腳本語言，應用場景是在做一些簡單的表單驗證和動畫，所以 JavaScript 程式碼寫到 `<script>`中即可。

隨著 JavaScript 的發展以及 Nodejs 的出現，JavaScript 的模塊化成為相當迫切的需求，但是 JavaScript 本身直到 ES6 才推出自身的模塊化方案，在此之前社區實現相當多的模塊化方案：AMD、CMD、CommonJS 等。

到現在最主流的模塊化方案就是 ES6 和 CommonJS 這兩種。



## 實現一個簡單的模塊方案

假設在 index.html 中引入了兩個文件：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script src="./aaa.js"></script>
  <script src="./bbb.js"></script>
</body>
</html>
```

在沒有標準的模塊化方案出現之前，要實現一個簡單的模塊可以利用函數作用域：

```js
// 文件 aaa.js
var moduleA =  (function() {
  var name = 'Louis'
  var age = 26

  return {
    name,
    age
  }
})()
```

```js
// 文件 bbb.js
var moduleB = (function() {
  if(moduleA.name) {
    console.log('my name is ' + moduleA.name)
  }
})()
```

以上的方式有幾個問題：

1. 模塊命名還是可能會衝突，需要另外自訂規範
2. 規範自訂性太高，需要額外學習



## CommonJS

CommonJS 是一個模塊化的規範，最初是提出來在瀏覽器之外的地方使用，簡稱 CJS，Nodejs 是 CommonJS 在服務器端的實現，BrowserifyJS 是在瀏覽器中的實現，不過通常在網頁開發的時候會使用 ES Module 作為模塊化方案，最後利用 Webpack 等打包工具進行模塊的解析和打包。

### 基本使用

假設有兩個文件，aaa.js 和 main.js

```js
// aaa.js
const aaa = {
  name: 'Louis',
  age: 26
}

module.exports = aaa
```

```js
// main.js
const aaa = require('./aaa.js')
console.log(aaa.name)
```

透過 require 的方式，能夠導入其他文件的內容，需要了解的是導入的物件和在其他模塊中的物件本身是指向同一個記憶體地址的。

也可以透過 exports 導出，module.exports 和 exports 是相等的，最終被導出的是 module.exports：

```js
// aaa.js
// module.exports = exports

const name = "Louis"
const age = 26

exports.name = name
exports.age = age

// 最終能導出的只能是 module.exports
```

```js
// main.js
const aaa = require('./aaa.js')
console.log(aaa.name)
```

不過 exports 是為了符合 CommonJS 規範而添加的，現在相對較少使用。



### require

require 的本質上就是一個函數，require 函數本身的規則下，假設導入 x 模塊：

- x 為 Nodejs 核心模塊，直接導入
- x 為路徑，會當對應目錄查找該模塊，如果路徑有帶上後綴名會直接查找該文件，假設文件為 y ，如果沒有後綴名會依照 y 、 y.js、y.json、y.node 的順序進行查找
- x 不是路徑也不是核心模塊，會從當前目錄一層層往上查找 node_modules 資料夾中有沒有對應的第三方庫

模塊的加載順序採用深度優先搜索算法（DFS）。



### CommonJS 缺點

由於 CommonJS 的 require 採用同步加載的方式，如果加載本地文件沒有問題，但是如果加載遠端文件就會面臨程式碼可能在請求的過程中阻塞的問題。

現代網頁採用的是將 CommonJS 進行打包轉化的方式，不過早期在瀏覽器中會使用 AMD 或是 CMD 這兩種模塊化方案。



## AMD

AMD 是 Asyncchronous Module Definition 的縮寫，採用非同步加載模塊的方式，AMD 作為一種規範，requriejs 是其中一種實現方式：



### 基本使用

首先要下載 requriejs [官網](https://requirejs.org/) 上釋出的庫文件，放在 lib/require.js 資料夾下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script src="./lib/require.js" data-main="./src/main.js"></script>
</body>
</html>
```

在 src 資料夾下建立 main 作為入口：

```js
require.config({
  paths: {
    foo: './foo'
  }
})

require(['foo'], function(foo) {
  console.log(foo)
})
```

最後建立 foo 模塊：

```js
define(function() {
  const name = "Louis"

  return {
    name
  }
})
```

如果在其他模塊中想要使用 foo 模塊：

```js
define(['foo'], function(foo) {
  console.log(foo)
})
```



## CMD

CMD 也是一種應用於瀏覽器的模塊化規範，全稱 Common Module Definition，比較優先的實現有：seajs。



### 基本使用

下載 seajs [官網](https://seajs.github.io/seajs/docs/) 上釋出的庫文件，放在 lib/sea.js 資料夾下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script src="./lib/sea.js"></script>
  <script>
    seajs.use("./src/main.js")
  </script>
</body>
</html>
```

在 src 資料夾下建立 main 作為入口：

```js
define(function(require, exports, module) {
  const { name } = require('./foo')
  console.log(name)
})
```

最後建立 foo 模塊：

```js
define(function(require, exports, module) {
  const name = "Louis"

  module.exports = {
    name
  }
})
```



## ES Module

ES Module 是 ES6 推出的模塊化系統，使用 import 和 export 關鍵字，並採用靜態分析編譯的方式，當然也支持動態加載。

採用 ES Module 將自動使用嚴格模式： use strict，並且只能使用 http/https 協議進模塊加載。



### 基本使用

建立 index.html ，在導入的 script 標籤上必須加上 type="module" 吿知必須以模塊的方式進行該文件的加載：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script type="module"  src="./main.js"></script>
</body>
</html>
```

```js
// main.js
import { name } from './foo.js'

console.log(name)
```

```js
// foo.js
export const name = 'Louis'
```



### export

export 有幾種導出的方式。

直接導出：

```js
// 直接導出
export const name = 'Louis'
```

導出和聲明分開：

```js
const name = 'Louis'
export {
  name
}
```

導出時設置別名：

```js
const name = 'Louis'
export {
  name as fooName
}
```



### import

import 有幾種導出的方式。

直接導入：

```js
import { name } from './foo.js'
console.log(name)
```

導入時設置別名：

```js
import { name as fooName } from './foo.js'
```

統一導入：

```js
import * as foo from './foo.js'
console.log(foo.name)
```

export 和 import 結合使用：

```js
import { name } from './foo.js'
export {
 	name
}
```

等同於：

```js
export { name } from './foo.js'
```

等同於：

```js
export * from './foo.js'
```



### default

使用 default 可以讓該模塊被讀取默認值，默認導出只能有一個：

```js
const name = 'Louis'

export default name

// export {
//   name as default
// }
```

獲取時：

```js
import name from './bar.js'
// import { default as fooName } from './foo.js'

console.log(name)
```



### import 函數

ES Module 提供的 import 是會將程式碼進行阻塞的，會等待要導入的文件執行完畢後再執行下面的程式碼，ES 模塊化方案另外提供了 import 函數用於動態導入：

```js
import('./foo.js').then(res => {
  console.log(res.default)
})
```

ES11 新增了一個特性， import.meta 提供了當前 url 路徑：

```js
console.log(import.meta)
```



### ES Module原理

階段一：構建（Construction），根據地址查找 js 文件，並且下載將其解析成模塊紀錄（Module Record）

階段二：實例化（Instantiation），對模塊紀錄進行實例化，解析導入導出語句，將模塊指向對應的記憶體地址

階段三：運行（Evaluation），運行程式碼，將值填充到對應的記憶體地址中。

並且 ES Module 是不允許修改導入的值。
