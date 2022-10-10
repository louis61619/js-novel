# Cookie

Cookie，類型為小型文件文件，某些網站為了識別用戶申份而儲存在用戶本地終端（Client Side）上的數據，瀏覽器會在特定情況下攜帶 cookie 發送請求，服務器可以通過 cookie 來獲取一些信息。

Cookie 儲存在客戶端中，按在客戶端中的儲存位置，可分為記憶體 Cookie 和硬碟 Cookie。

記憶體 Cookie 由[瀏覽器](https://zh.wikipedia.org/wiki/浏览器)維護，儲存在[記憶體](https://zh.wikipedia.org/wiki/内存)中，瀏覽器關閉即消失，存在時間短暫。硬碟 Cookie 儲存在[硬碟](https://zh.wikipedia.org/wiki/硬盘)裡，有過期時間，除非使用者手動清理或到了過期時間，硬碟 Cookie 不會清除，存在時間較長。所以，按存在時間，可分為非持久 Cookie 和持久 Cookie。

## 基本使用

透過 express 這個 web 框架可以輕鬆的管理 cookie：

```js
const express = require('express')

const app = express()

// 首頁，讀取cookie
app.get('/home', function (req, res) {
  const { name, age } = req.headers.cookie
    ? req.headers.cookie.split(';').reduce((res, item) => {
        const data = item.trim().split('=')
        return { ...res, [data[0]]: data[1] }
      }, {})
    : {}
  res.send(`Hello ${name}, you're age is ${age}`)
})

// 登入，註冊cookie
app.get('/login', function (req, res) {
  // 建立cookie，值為字串
  res.cookie('name', 'Louis', { expires: new Date(Date.now() + 900000), httpOnly: true })
  res.cookie('age', '26', { expires: new Date(Date.now() + 900000), httpOnly: true })

  res.send('已註冊cookie')
})

// 退出，清除cookie
app.get('/exit', function (req, res) {
  res.clearCookie('name')
  res.clearCookie('age')
  res.send('已清除cookie')
})

app.listen(5000)
```

## cookie 的常見屬性

### cookie 的生命週期

默認情況下 cookie 是記憶體 Cookie，也就是在瀏覽器關閉時會自動被刪除，可以透過參數 expires 或 max-age 來設置過期時間：

- expires：設置的事 Date.toUTCString，設置格式是 ;expires=date-in-GMTString-formate；
- max-age：設置過期秒鐘 ;max-age=max-age-in-secondes （例如一年為 `60*60*24*365`）

### cookie 的作用域

- 如果不指定 domain，默認為 origin，不包含子域名，如果指定 domain 則包含子域名。如果設置 Domain=mozila.org，則 cookie 也包含在子域名中（如：developer.mozila.org）。

- 如果不指定 path，默認為所有路徑。如果設置 Path=/docs，則會匹配所有 /docs 下的路徑，如：/docs、/docs/web、/docs/web/123

## 瀏覽器中操作 cookie

在 cookie 中有一個屬性為 httpOnly，當其為 true 時便不可以透過 JavaScript 進行操作，所以要設置為 false。

```js
const express = require('express')

const app = express()

app.get('/', function (req, res) {
  res.cookie('name', 'Louis', { expires: new Date(Date.now() + 900000), httpOnly: false })

  res.send('已註冊cookie')
})

app.listen(5000)
```

要將 cookie 刪除必須對 max-age 進行設置：

```js
document.cookie = 'name=louis;max-age=0'
```

## cookie 的缺點

- cookie 會附加在每一次請求頭中，無形中增加了流量
- cookie 在 headers 中是被明文傳輸的
- 大小限制只有 4kb
