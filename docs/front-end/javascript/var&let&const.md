# var、let、const

在 ES5 中聲明變數都是使用 var 關鍵字，從 ES6 開始新增了兩個關鍵字可以聲明變數：let、const。

## 基本使用

```js
let bar = 'bar'
```

const 意思即為常量（ constant ），代表不可被修改。

```js
const foo = 'abc'
```

但如果是賦值為某個引用類型，則可以修改其內部的屬性或元素，例如：

```js
const obj = {
  foo: 'foo'
}
obj.foo = 'bar'
```

相對於 var ， let 和 const 所定義過的變數名稱都不可以重複聲明。

## 作用域提升

var 有作用域提升，那 let 有作用域提升嗎？運行以下程式碼：

```js
console.log(foo)
let foo = 'foo'
```

可以獲得錯誤 Cannot access 'foo' before initialization ，意思是 foo 在初始化前無法被訪問，所以實際上這些變數會提前被創建，但是不可以被訪問，直到這些變數被賦值。

由於作用域提升沒有準確的定義，所以從不可被訪問的角度來說，可以說 let 和 const 是沒有作用域提升的。

## let、const 和 window

在全局通過 var 聲明一個變數時，這個變數會作為屬性放到 window 物件中：

```js
var foo = 'foo'
console.log(window.foo)
```

而 let 和 const 作為新的語法被 JS 引擎分開處理，放到一張獨立的哈希表 （Hash map） 中。

## 塊極作用域

在 ES5 中只有兩個東西會形成作用域，第一個是全局作用域，第二個是函數作用域。

在 ES6 中的 let、const、class 存在塊極作用域，外部無法訪問作用域內部的變數：

```js
{
  let foo = 'foo'
}

console.log(foo) // foo is not defined
```

if 後面跟的就是塊極作用域：

```js
if (true) {
  let foo = 'foo'
}
console.log(foo) // foo is not defined
```

switch 和 for 迴圈也是：

```js
var bar = 'a'
switch (bar) {
  case 'a':
    let foo = 'foo'
    break

  default:
    break
}
console.log(foo) // foo is not defined
```

```js
for (let i = 0; i < 10; i++) {
  console.log('Hello World' + i)
}

console.log(i) // i is not defined
```

### 塊極作用域的用處

```js
for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i)
  })
}
```

執行以上程式碼會得到十個 10 的打印，因為 var 沒有塊極作用域，所以變數是保存在全局中，要想要分別打印出每個 i 的值，在 ES5 中可以使用函數作用域。

```js
for (var i = 0; i < 10; i++) {
  ;(function (n) {
    setTimeout(() => {
      console.log(n)
    })
  })(i)
}
```

有了 es6 就不用寫這麼複雜了：

```js
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(n)
  })
}
```

### 暫時性死區

在 ES6 中，let 和 const 在聲明之前，變數是都不可以被問的，社區將其稱為暫時性死區（temporal dead zone）。

類似以下這種程式碼，只要有使用到 let，都是不能被訪問的：

```js
var foo = 'foo'

if (true) {
  console.log(foo)

  let foo = 'abg'
}
```

報錯：

```
ReferenceError: Cannot access 'foo' before initialization
```

## var、const、let 的選擇

var 的特殊性：比如作用域提升、window 全局物件屬性、沒有塊極作用域等，這些都是歷史遺留的問題，是在 JavaScript 設計之初的一些缺陷，所以在實際業務中還是以最新的標準來編寫程式碼，也就是不再用 var 來定義變數。

ES6 中的 const 可以保證數據的安全性，所以在開發中優先使用，只有在明確該變數會在後續進行修改時再使用 let。
