# 補充

## Eval

eval 是一個特殊的函數，可以將傳入的字符串當作 JavaScript 程式碼來運行。

```js
var str = 'var message = "Hello World"; console.log(message);'

eval(str)

console.log(message)
```

不建議使用的原因如下：

- eval 程式碼的可讀性非常差，因為是一連串的字符串。
- eval 是執行字符串，如果該字符串是從服務器獲取，非常容易被竄改而造成危險。
- 通過 eval 函數並不會經過 js 引擎優化，效能較差。

## With

with 語句是一種比較少見的 JavaScript 語法，由於其特殊性現在大多數時候已經不太推薦於使用了，並且在嚴格模式下 with 語句是無法運作的。

透過 with 語句，能夠指定某個物件做為內部變數查找的作用域：

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

上面這個案例中 bar 函數中將 obj 指定為作用域，就會優先從 obj 這個物件中進行查找 message 這個變數，所以最終的輸出解果為：

```
Hello Obj
```
