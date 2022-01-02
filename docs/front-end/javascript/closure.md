# 閉包

維基百科中對閉包是這樣定義的：

- 閉包（Closure），又稱詞法閉包 （Lexical Closure）或函數閉包 （Function Closure）;
- 是在支援[頭等函式](https://zh.wikipedia.org/wiki/头等函数)的程式語言中實現[詞法](https://zh.wikipedia.org/wiki/作用域#静态作用域与动态作用域)[繫結](https://zh.wikipedia.org/wiki/名字绑定)的一種技術；
- 閉包在實現上是一個結構體，它儲存了一個函式（通常是其入口位址）和一個關聯的環境（相當於一個符號尋找表）;
- 閉包跟函式最大的不同在於，當捕捉閉包的時候，它的自由變數會在捕捉時被確定，這樣即便脫離了捕捉時的上下文，它也能照常執行。



以下是一段嚴格意義上的閉包：

```js
function foo() {
  var name ="louis"
  function bar(){
    console.log(name)
  }
  return bar
}

var fn = foo()
fn()
```

以上的程式碼在記憶題中執行的流程如下圖：

![image-20211221193936316](assets/image-20211221193936316.png)

閉包由兩個部分組合：函數＋可以訪問的自由變數。

由於 fn 函數的存在導致 foo 函數作用域內的 name 變數不被銷毀，所以最後可以將 fn 函數進行置空：

```js
function foo() {
  var name ="louis"
  function bar(){
    console.log(name)
  }
  return bar
}

var fn = foo()
fn()

// 避免產生內存洩漏
fn = null
```

