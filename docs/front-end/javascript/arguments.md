# arguments 和 array-like

arguments 是函數中的一個由所有參數所合成的類陣列(array-like)物件。

> Array-like 簡單介紹：
>
> - Array-like 並非一種陣列類型，而是一個物件。
>
> - Array-like 物件可以調用 length 獲取其長度，也可以透過索引(index)進行訪問，並且也能使迭代器(iterator)進行循環。
>
> - Array-like 不是陣列類型，所以不能使用陣列的方法，比如 forEach、map 等。

可以在函數中直接進行打印：

```js
function foo(num1, num2, num3) {
  console.log(arguments)
}

foo(10, 20, 30, 40, 50)
```

輸出為：

```
Arguments(5) [10, 20, 30, 40, 50, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```

## 將 arguments 轉化為 Array

前面提到過 arguments 並非一般的 Array 類型，而是一種類陣列(array-like)物件，所以有時候會將其轉成 Array 會更好操作。

### 進行 for 循環轉成陣列

```js
function foo() {
  var newArr = []
  for (var i = 0; i < arguments.length; i++) {
    newArr.push(arguments[i])
  }
  console.log(newArr)
}
```

### 使用 Array 的原型方法 slice

```js
function foo() {
  var newArr = Array.prototype.slice.call(arguments)
  console.log(newArr)
}
```

slice 的原理是將 this 作為指定的陣列進行 for 循環返回一個新的陣列，所以和前一種方法的實現原理是差不多的。

所以也可以直接這樣用：

```js
function foo() {
  var newArr = [].slice.call(arguments)
  console.log(newArr)
}
```

### 透過 ES6 的語法 Array.from、展開運算符、for...of 等

Array.from

```js
function foo() {
  var newArr = Array.from(arguments)
  console.log(newArr)
}
```

For...of

```js
function foo() {
  var newArr = []
  for (let item of arguments) {
    newArr.push(item)
  }
  console.log(newArr)
}
```

展開運算符

```js
function foo() {
  var newArr = [...arguments]
  console.log(newArr)
}
```

## ES6 與 arguments

### 在 ES6 中的箭頭函數中不存在 arguments

```js
var foo = () => {
  console.log(arguments)
}
```

如果在瀏覽器中打印會得到一個錯誤：

```
Uncaught ReferenceError: arguments is not defined
```

不過如果在 Nodejs 中打印出的結果會有所不同，由於 Nodejs 會將各個文件當作模塊，並放到一個函數中，所以箭頭函數中的 arguments 會向上找到這個函數中的 arguments，類似於以下的例子：

```js
// 模擬noejs的機制
function foo() {
  var bar = () => {
    console.log(arguments)
  }
  bar()
}
foo(123)
```

在瀏覽器中執行，會打印出：

```
Arguments [123, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```

### 可以使用其餘參數(rest parameter)獲取動態的參數

由於 es6 的箭頭函數中無法獲取 arguments 物件，所以現在通常不會推薦使用 arguments，而會使用新的 es6 語法——其餘參數(rest parameter)，**其餘參數（rest parameter)** 語法可以讓我們表示不確定數量的參數，並將其視為一個陣列：

```js
function foo(num1, num2, ...nums) {
  console.log(nums)
}

foo(10, 20, 30, 40, 50)
```

輸出為：

```
[30, 40, 50]
```
