# 防抖（debounce）和節流（throttle）

由於 JavaScript 是基於事件驅動，大量的操作會觸發事件，加入到事件隊列中處理，而對於某些頻繁的事件處理會照成性能的損耗，可以透過防抖（debounce）和節流（throttle）來限制事件頻繁的發生。

## 防抖（Debounce）

防抖的意義在於，當事件被觸發時，相應的函數不會被立即觸發，而是會被推遲一段時間，當事件被密集觸發時，函數的觸發也會被頻繁推遲，只有在等待一段時間後沒有事件觸發，才會真正執行函數。

應用場景如：

- 輸入框中頻繁的輸入內容，搜索或者提交訊息
- 頻繁的點擊按鈕，觸發事件
- 監聽滾動事件，完成某些特定操作

### 基本實現

實現一個基本的防抖函數是相當容易的，利用閉包的特性返回一個新函數並透過定時器進行延遲：

```js
function debounce(fn, delay) {
  let timer = null

  function _debounce() {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
  return _debounce
}
```

不過有個缺點，由於 fn 相當於獨立函數調用所以不綁定 this ，以及無法獲取參數，所以可以透過 apply 綁定 this 和 es6 的剩餘參數語法進行修改：

```js
function debounce(fn, delay) {
  let timer = null

  function _debounce(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
  return _debounce
}
```

### 進階實現

可以多設置一個參數讓函數在延遲前被直接執行一次：

```js
function debounce(fn, delay, immediate = false) {
  let timer = null
  let isInvoke = false

  function _debounce(...args) {
    if (timer) clearTimeout(timer)

    // 判斷是否需要立即執行
    if (immediate && !isInvoke) {
      fn.apply(this, args)
      isInvoke = true
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
        isInvoke = false
      }, delay)
    }
  }
  return _debounce
}
```

還可以另外再返回的函數加上取消的屬性：

```js
function debounce(fn, delay, immediate = false) {
  let timer = null
  let isInvoke = false

  function _debounce(...args) {
    if (timer) clearTimeout(timer)

    if (immediate && !isInvoke) {
      fn.apply(this, args)
      isInvoke = true
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
        isInvoke = false
        timer = null
      }, delay)
    }
  }

  // 加入取消功能
  _debounce.cancel = function () {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return _debounce
}
```

獲取返回值可以有兩種方案，一種是加上 callback 參數或者是利用 promise：

```js
function debounce(fn, delay, immediate = false, resultCallback) {
  let timer = null
  let isInvoke = false
  let invokeTimer = null

  function _debounce(...args) {
    return new Promise((resolve, reject) => {
      if (timer) clearTimeout(timer)

      if (immediate && !isInvoke) {
        const result = fn.apply(this, args)
        if (resultCallback) resultCallback(result)
        resolve(result)
        isInvoke = true
      } else {
        timer = setTimeout(() => {
          const result = fn.apply(this, args)
          if (resultCallback) resultCallback(result)
          resolve(result)
          isInvoke = false
          timer = null
        }, delay)
      }
    })
  }
  _debounce.cancel = function () {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return _debounce
}
```

## 節流（throttle）

節流與防抖不相同的事，不管如何頻繁觸發事件，都讓執行的函數以相同的頻率被執行。

應用場景如：

- 監聽頁面滾動
- 用戶頻繁點擊按鈕

### 基本實現

透過紀錄當前時間並計算間隔可以簡單的實現節流函數：

```js
function throttle(fn, interval) {
  let lastTime = 0
  function _throttle(...args) {
    const nowTime = new Date().getTime()
    // 計算當間隔小於當前時間減去上一次紀錄的時間就要被執行
    const remainTime = interval - (nowTime - lastTime)
    if (remainTime <= 0) {
      fn.apply(this, args)
      lastTime = nowTime
    }
  }

  return _throttle
}
```

### 進階實現

加入立即執行和尾部執行參數選項：

```js
function throttle(fn, interval, options = { leading: true, trailing: false }) {
  const { leading, trailing } = options
  let lastTime = 0
  let timer = null

  function _throttle(...args) {
    const nowTime = new Date().getTime()
    if (!lastTime && !leading) lastTime = nowTime

    // 計算當間隔小於當前時間減去上一次紀錄的時間就要被執行
    const remainTime = interval - (nowTime - lastTime)
    if (remainTime <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      fn.apply(this, args)
      lastTime = nowTime
      return
    }

    // trailing 改以定時器的方式判斷間隔
    if (trailing && !timer) {
      timer = setTimeout(() => {
        timer = null
        lastTime = !leading ? 0 : new Date().getTime()
        fn.apply(this, args)
      }, remainTime)
    }
  }

  return _throttle
}
```

加上 callback 參數或者是利用 promise 獲取返回值：

```js
function throttle(
  fn,
  interval,
  options = { leading: true, trailing: false, resultCallback: undefined }
) {
  const { leading, trailing, resultCallback } = options
  let lastTime = 0
  let timer = null

  function _throttle(...args) {
    return new Promise((resolve) => {
      const nowTime = new Date().getTime()
      if (!lastTime && !leading) lastTime = nowTime

      // 計算當間隔小於當前時間減去上一次紀錄的時間就要被執行
      const remainTime = interval - (nowTime - lastTime)
      if (remainTime <= 0) {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        const result = fn.apply(this, args)
        if (resultCallback) resultCallback(result)
        resolve(result)
        lastTime = nowTime
        return
      }

      if (trailing && !timer) {
        timer = setTimeout(() => {
          timer = null
          lastTime = !leading ? 0 : new Date().getTime()
          const result = fn.apply(this, args)
          if (resultCallback) resultCallback(result)
          resolve(result)
        }, remainTime)
      }
    })
  }

  _throttle.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    lastTime = 0
  }

  return _throttle
}
```

## 借助第三方庫

借助於某些第三方庫可以輕鬆完成防抖的操作，以 underscore 為例：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <input type="text" />
    <script src="https://cdn.jsdelivr.net/npm/underscore@1.13.2/underscore-umd-min.js"></script>
    <script>
      const inputEl = document.querySelector('input')
      let counter = 1
      function inputChange(event) {
        console.log(`發送了第${++counter}次網路請求`, event, this)
      }
      inputEl.oninput = _.debounce(inputChange, 1000)
      // inputEl.oninput = _.throttle(inputChange, 1000)
    </script>
  </body>
</html>
```

以上是一個輸入框，當使用者輸入後，會推遲一秒鐘觸發事件，如果使用者不斷輸入則不斷推遲。
