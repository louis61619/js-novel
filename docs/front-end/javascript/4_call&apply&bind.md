# apply、call、bind

練習實現 apply、call、bind，並更深刻的了解 this 和在函數中的調用關係。

## call 的實現

### 自定義方法

首先使用 prototype 為函數添加一個名為 mycall 的自定義方法：

```js
Function.prototype.mycall = function (thisArg) {
  console.log('mycall')
}
```

以上這段程式碼能夠讓我們能夠透過 mycall 這個方法模擬原生的 call 方法，接下來我們只要需要在 mycall 方法中獲取需要被執行的函數。

### 綁定 this

透過 this 能夠獲取到需要被執行的函數，具體可以參考 [JavaScript 中的 this]() 這篇。

```js
Function.prototype.mycall = function (thisArg) {
  var fn = this
}
```

接下來就要進行 this 的綁定，參數 thisArg 就代表著要綁定的物件，透過在物件中作用為方法調用可以對函數的 this 進行綁定。

```js
Function.prototype.mycall = function (thisArg) {
  var fn = this
  thisArg.fn = fn
  thisArg.fn()
}
```

簡單寫一個範例：

```js
Function.prototype.mycall = function (thisArg) {
  var fn = this
  thisArg.fn = fn
  thisArg.fn()
}
function foo() {
  console.log('foo函數被執行了', this)
}
foo.mycall({ name: 'louis' })
```

console.log 輸出結果為：

```
foo函數被執行了 {name: 'louis', fn: ƒ}
```

可以看到 foo 函數中的 this 被指向了對應的物件，物件內部多出了一個 fn 函數是綁定物件調用的結果，這是在 JavaScript 中模擬 call 的副作用，原生的 call 使用 C++進行編寫，就不會出現這個屬性，當然最後也是可以使用 delete 將該 fn 屬性進行刪除，但是打印 this 的時候依然會出現，所以就先不刪了。

### 邊緣情況(edge case)

接下來我們在對這個函數進行ㄧ些改進，由於使用 thisArg.fn 去綁定函數的關係，所以當傳入的 thisArg 不為物件時就會出錯。

可以透過 Object 這個函數將 string、number 等類型轉化為物件形式：

```js
Function.prototype.mycall = function (thisArg) {
  var fn = this
  // 防止傳入的參數不為物件
  thisArg = Object(thisArg)
  thisArg.fn = fn
  thisArg.fn()
}
```

這樣就可以傳入字符串：

```js
function foo() {
  console.log('foo函數被執行了', this)
}
foo.mycall('louis')
```

輸出：

```
foo函數被執行了 String {'louis', fn: ƒ}
```

還有一個邊緣情況(edge case)可以進行修正，原生的 call 在傳入 null 或是 undefined 作為參數時，綁定的 this 會是 window。

可以透過簡單的運算子來實現：

```js
Function.prototype.mycall = function (thisArg) {
  var fn = this
  // 假如傳入null或是undefined要綁定window
  thisArg = (thisArg !== undefined && thisArg !== null && Object(thisArg)) || window
  thisArg.fn = fn
  thisArg.fn()
}
```

```js
function foo() {
  console.log('foo函數被執行了', this)
}
foo.mycall(null)
```

輸出：

```
foo函數被執行了 Window {window: Window, self: …}
```

### 接收參數

要實現接收參數，可以直接使用 es6 的語法接收所有剩餘參數，並且將函數處理後的結果進行返回，以下為最終的例子：

```js
Function.prototype.mycall = function (thisArg, ...args) {
  var fn = this
  thisArg = (thisArg !== undefined && thisArg !== null && Object(thisArg)) || window
  thisArg.fn = fn
  // 接收參數並返回結果
  return thisArg.fn(...args)
}
```

```js
function foo(n1, n2) {
  return n1 + n2
}
var result = foo.mycall('louis', 20, 30)
console.log(result)
```

輸出為：

```
50
```

## apply 的實現

apply 和 call 的實現方式幾乎相同，差別只在於傳入參數的形式，apply 是以陣列的形式將參數傳入：

```js
foo.apply(obj, [arg1, arg2, arg3])
```

所以要修改的地方就只有參數的接收，並且對不傳入參數進行處理：

```js
// argArray做為參數不用以剩餘參數的形式接收
Function.prototype.mycall = function (thisArg, argArray) {
  var fn = this
  thisArg = (thisArg !== undefined && thisArg !== null && Object(thisArg)) || window
  thisArg.fn = fn
  // 對不傳入參數進行處理
  argArray = (argArray !== undefined && argArray !== null && argArray) || []
  return thisArg.fn(...argArray)
}
```

```js
function foo(n1, n2) {
  console.log('foo函數執行', this)
  return n1 + n2
}
var result = foo.myapply('louis', [20, 30])
console.log(result)
```

輸出的結果為：

```
foo函數執行 String {'louis', fn: ƒ}
50
```

## bind 的實現

bind 和 call、apply 最大的差別是會返回一個函數，這個返回的函數會綁定傳入的物件作為 this。

```js
Function.prototype.mybind = function (thisArg, ...argArray) {
  var fn = this
  thisArg = (thisArg !== null && thisArg !== undefined && Object(thisArg)) || window

  // bind和call、apply最大的差別是要返回一個函數
  return function (...args) {
    // ...
  }
}
```

接下來可只要把在 call、apply 中進行綁定 this 操作在返回的函數中實現即可，同時也要注意返回的函數也能夠進行參數的傳遞。

```js
Function.prototype.mybind = function (thisArg, ...argArray) {
  var fn = this
  thisArg = (thisArg !== null && thisArg !== undefined && Object(thisArg)) || window

  return function (...args) {
    // 在返回的函數中進行this綁定
    thisArg.fn = fn
    // 將新函數的參數一起傳入要調用的函數中
    return thisArg.fn(...argArray, ...args)
  }
}
```
