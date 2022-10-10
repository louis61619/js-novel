# Strict Mode

在 ES5 中，JavaScript 提出了一個嚴格模式的概念：

嚴格模式是一種具有限制性的 JavaScript 模式，支持嚴格模式的瀏覽器在檢測到程式碼中有嚴格模式時，會以更加嚴格的方式進行檢測和執行。

通常會達到以下這些功能：

- 通過拋出錯誤來消除一些原有的靜默 ( silent ) 錯誤。
- JS 引擎可以在執行時做出更多的優化 (不需要對特殊的語法進行處理)。

- 禁用了一些 ECMAScript 可能會在未來版本中定義的一些語法錯誤。

嚴格模式有兩種方式開啟——

在文件最上面的位置加上 use strict，而啟用的嚴格模式只會針對該文件：

```js
'use strict'

message = 'Hello World'
console.log(message)

true.ooo = 'ijiji'
```

或者是在函數內部加上 use strict，嚴格模式就會只在該函數的作用域內執行：

```js
function foo() {
  'use strict'

  true.foo = '123'
}

foo()
```

### 嚴格模式下常見的限制

不允許以下這種方式創建全局變數：

```js
function foo() {
  age = 300
}

foo()
```

不允許函數有相同的參數名稱：

```js
function foo(x, y, x) {
  console.log(x, y, x)
}
```

對靜默錯誤進行報錯：

```js
// 靜默錯誤
true.name = 'abc'
NanN = 123
```

不允許八進制

```js
var num = 0123
```

不允許使用 with 語句：

```js
var obj = {
  message: 'Hello Obj'
}

function bar() {
  with (obj) {
    console.log(message)
  }
}
bar()
```

eval 函數不會向上引用變數：

```js
var str = 'var message = "Hello World"; console.log(message);'

eval(str)

console.log(message)
```

嚴格模式下普通函數默認指向 undefined：

```js
function foo() {
  console.log(this)
}

foo()
```
