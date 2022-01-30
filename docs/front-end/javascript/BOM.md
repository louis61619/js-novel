# BOM

瀏覽器作為 JavaScript 最重要的運行環境之一，瀏覽器會有對應的物件模型（BOM，Browser Object Model）供 JavaScript 進行操作。

BOM 主要包含：

- window：包含全局屬性、方法、控制瀏覽器窗口的相關屬性、方法
- location：瀏覽器的連接到的 URL
- history：操作瀏覽器的歷史紀錄
- document：當前窗口操作文檔的物件

Window 物件在瀏覽器中有兩個身份：

- 全局物件，這個全局物件在 Nodejs 中是 global
- 作為瀏覽器窗口，提供對瀏覽器操作的相關 API

也就是說如果通過 var 聲明變數，該變數會被添加到 window 物件上，window 物件也提供了全局的類和函數：setTimeout、Math、Object 等。

Window 中除了包含大量的屬性和方法，也繼承了 EventTarget 的事件監聽方法，如：addEventListener、removeEventListener。

MDN 文檔中有對應的細節： https://developer.mozilla.org/zh-TW/docs/Web/API/Window



## EventTarget

透過原型鏈可以查看到 window 所繼承的類：

```js
console.log(window.__proto__.__proto__.__proto__)
```

輸出：

```
EventTarget {Symbol(Symbol.toStringTag): 'EventTarget', addEventListener: ƒ, dispatchEvent: ƒ, removeEventListener: ƒ, constructor: ƒ}
```

EventTarget 最主要有三個方法：

addEventListener，監聽事件：

```js
const clickHandler = () => {
  console.log('window 發生點擊')
}
window.addEventListener("click", clickHandler)
```

removeEventListener，取消監聽事件：

```js
const clickHandler = () => {
  console.log('window 發生點擊')
}
window.addEventListener("click", clickHandler)
window.removeEventListener("click", clickHandler)
```

dispatchEvent，自訂事件派發：

```js
window.addEventListener("myEvent", () => {
  console.log("myEvent~")
})

window.dispatchEvent(new Event("myEvent"))
```



## Location

```
http://127.0.0.1:5500/34_Cookie-DOM-BOM/index.html?q=bbb#aaa
```

如果 url 是以下，透過打印 location 物件能獲取詳細訊息：

```
hash: "#aaa"
host: "127.0.0.1:5500"
hostname: "127.0.0.1"
href: "http://127.0.0.1:5500/34_Cookie-DOM-BOM/index.html?q=aaaa#aaa"
origin: "http://127.0.0.1:5500"
pathname: "/34_Cookie-DOM-BOM/index.html"
port: "5500"
protocol: "http:"
search: "?q=bbb"
```

- hash：哈希
- host：主機地址＋端口好
- hostname：主機地址
- href：完整的 url 地址
- origin：源
- pathname：路徑
- port：端口號
- protocol：協議
- search：查詢參數

可以發先 location 就是一個 url 的抽象實現，常見的方法有幾個：

- 跳轉頁面：location.assign("https://www.google.com")

- 跳轉頁面，不留下當前頁面的紀錄：location.replace("https://www.google.com")

- 重新加載頁面：location.reload()



## history

History 物件在現代前端框架中是相當重要的，透過刷新 history ，能夠在不請求服務器的情況下改變 url：

```js
history.pushState('Louis', '', '/detail')
```

這時候 url 中的路徑會被改為 /detail，透過 history 物件能夠獲取狀態值和保留的歷史紀錄：

```js
console.log(history.length)
```

```js
// Louis
console.log(history.state)
```

使用 replaceState 不會留下上一頁的紀錄：

```js
history.replaceState('Louis', '', '/detail')
```

還有幾個方法：

- back：回退一頁，同 go(-1)
- forward：前進一頁，同 go(1)
- go：指定加載歷史中的一頁