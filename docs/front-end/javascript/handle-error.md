# 錯誤處理

如果有一個函數在調用時，內部出現了錯誤，應該告知調用者這是一個錯誤：

```js
function sum(num1, num2) {
  if(typeof num1 !== "number" || typeof num2 !== 'number') {
    throw 'parmas must be number'
  }
  return num1 + num2
}

console.log(sum({ name: 'Louis' }))
```



## 錯誤類型

通常會將 Error 這個類進行拋出：

```js
function foo(type) {
  if (type === 0) {
    throw new Error('type can not be zero')
  }
}

foo(0)
```

Error 包含了一些屬性：

```js
function foo(type) {
  if (type === 0) {
    const err = new Error('type can not be zero')
    // Error
    console.log(err.name)
    // type can not be zero
    console.log(err.message)
    // Function Call Stack
    console.log(err.stack)
  }
}

foo(0)
```

Error 也有一些子類：

- RangeError：下標值越界時使用的錯誤類型
- SyntaxError：解析語法錯誤時使用的錯誤類型
- TypeError：出現類型錯誤時使用的錯誤類型



## 捕獲異常

在函數執行中如果拋出了異常，程序是會中斷執行的，不過在中斷之前，異常是會一層層往上拋出的，如果不希望中斷執行可以對可能出現錯誤的程式碼進行錯誤捕獲：

```js
function foo() {
  throw new Error('foo error')
}

function bar() {
  try {
    foo()
  } catch (error) {
    console.log(error.message)
  }
  
}
// 異常是會一層層往上拋出的
bar()
```

使用 try catch 之後最終可以加上 finally ，finally 中的程式碼是一定會執行的：

```js
function foo() {
  throw new Error('foo error')
}

function bar() {
  try {
    foo()
  } catch (error) {
    console.log(error.message)
  } finally {
    console.log('finally~')
  }
}

// 異常是會一層層往上拋出的
bar()
```

在 ES10 之後，catch 後的 error 參數是可以省略的：

```js
function foo() {
  throw new Error('foo error')
}

function baz() {
  try {
    foo()
  } catch  {
    console.log('error')
  } finally {
    console.log('finally~')
  }
  
}

baz()
```

