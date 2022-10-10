# WebStorage

WebStorage 主要提供了一種機制，可以讓瀏覽器提供一種比 cookie 更直觀的 key、value 存儲方式：

localStorage：本地儲存，提供永久性存儲，在關閉網頁後重新打開內容依然保留。

sessionStorage：會話儲存，提供一次性儲存，在關閉視窗後內容會被清除。

## Storage 基本操作

設置值：

```js
localStorage.setItem('name', 'Louis')
```

透過索引獲取 key：

```js
localStorage.key(0)
```

透過 key 獲取 value：

```js
localStorage.getItem('name')
```

循環遍歷：

```js
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i)
  console.log(localStorage.getItem(key))
}
```

刪除 key 和 value：

```js
localStorage.removeItem('name')
```

清空：

```js
localStorage.clear()
```

SessionStorage 中的方法亦同，可以實現一個簡易的工具類：

```js
class MyCache {
  constructor(isLocal = true) {
    this.storage = isLocal ? localStorage : sessionStorage
  }

  setItem(key, value) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getItem(key, value) {
    let value = this.storage.getItem(key)
    if (value) {
      value = JSON.parse(value)
      return value
    }
  }

  removeItem(key) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

export const LocalCache = new MyCache()
export const SessionCache = new MyCache(false)
```
