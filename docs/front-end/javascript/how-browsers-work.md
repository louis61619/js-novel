# 瀏覽器運作原理

語言的發展分為三個階段：

機器語言：10000110111這類機器指令。

彙編語言： 或稱組合語言，mov    %ebx, [%esp+12] 這類彙編指令。

而前端工程師學習的 js 是一門高級語言，高級語言有更接近於人類思維方式的語法，不過最終還是要被轉換為機器語言，而在瀏覽器中網頁是被如何執行的呢？



## 瀏覽器內核

當我們在瀏覽器中輸入域名，域名會被dns服務器進行解析，然後我們會獲取ip地址，一開始會返回html，如果解析html的過程中遇到css會再去服務器對css文件進行下載，當遇到script標籤時會再請求js文件，如下圖：

![e37361431fc3c95707613f0305f080ca089b09ed](https://i.imgur.com/wnEWS6W.png)

而瀏覽器中是由browser engine(瀏覽器內核)解析這些html、css這些文件，主要的內核有以下這些：

![0_IL4lYLlHboGssAVX](https://i.imgur.com/1CoMGPF.png)



html在透過browser engine(瀏覽器內核)解析後會形成一顆dom樹，而css這些規則會被附加在上面，最後透過布局引擎(layout)將這顆dom樹生成最終的render tree繪製在頁面上。

如果有Javascript程式碼會透過另外的Javascript引擎來執行，透過Javascript引擎程式碼會被轉譯成相應的cpu認識的機器指令，最後由cpu來執行。

所以瀏覽器核心分成兩個部分，一個部分是browser engine(瀏覽器內核)負責html解析、布局、渲染等等相關工作，一個部分是Javascript引擎，負責解析並執行Javascript程式碼。



## V8引擎

Javascript引擎中最著名的就是google所開發的V8引擎了，nodejs的執行環境也是基於V8。

> V8 is Google’s open source high-performance JavaScript and WebAssembly engine, written in C++. It is used in Chrome and in Node.js, among others. It implements [ECMAScript](https://tc39.es/ecma262/) and [WebAssembly](https://webassembly.github.io/spec/core/), and runs on Windows 7 or later, macOS 10.12+, and Linux systems that use x64, IA-32, ARM, or MIPS processors. V8 can run standalone, or can be embedded into any C++ application.

官方提到：

- V8 是 Google用 C++ 編寫的開源的高性能 JavaScript 和 WebAssembly 引擎，它用於 Chrome 和 Node.js 。
- 它實現了[ECMAScript](https://tc39.es/ecma262/)和[WebAssembly](https://webassembly.github.io/spec/core/)，並在 x64、IA-32、ARM 或 MIPS 處理器的 Windows 7 或更高版本、macOS 10.12+ 和 Linux 系統上運行。
- V8 可以獨立運行，也可以嵌入到任何 C++ 應用程序中。

以下是官方對於v8引擎處理 JavaScript 的流程圖：

![Basics of understanding Chrome&#39;s V8 Engine | by Kevin Duarte | Medium](https://i.imgur.com/yYNJ2JV.png)

一般流程如下：

1. Parser 對 JavaScript 程式碼進行解析；

2. 轉為 AST 抽象語法樹(透過 https://astexplorer.net 這個網站能看到抽象語法樹的樣子)；
3. 透過 ignition 轉換為 Bytecode(字節碼)；
4. 最後轉換為機器碼。

TurboFan 會標記多次執行的函數直接轉換為 Machine Code(機器碼)。

不過如果有函數的參數突然被轉換類型，會再次從 Ignition的部分走，如果多次執行再被 TurboFan 標記。



## 關鍵名詞

### 執行上下文棧(Execution Context Stack, ECStack)

當Javascript首次執行時，會運行一個執行上下文棧(Execution Context Stack, ECStack)，它是一種先進後出的結構，被用於儲存所有創建過的執行環境。

![What is the Execution Context &amp; Stack in JavaScript? | by Madhavan  Nagarajan | Medium](https://i.imgur.com/0cu2axe.jpg)



### 全局物件(Global Object，GO)

程式碼在解析的過程中會創造全局物件(Global Object，GO)，window 指向這個全局物件，GO會在程式碼解析階段時將所有的全局變數作為屬性放入其中。

所以類似下面這種程式碼是window物件還是可以被打印出來。

![image-20210909195831752](https://i.imgur.com/n4qYV0G.png)



### 活躍物件(Activation Object，AO)

程式碼在執行函數時會創造活躍物件(Activation Object，AO)，在創建階段時也會解析內部所有變數作為屬性放入其中，並在函數執行完畢時銷毀。



### 變數

執行一段變數：

```js
var message = "Hello Message";
```

程式碼的運行過程如下:

* 代碼被解析時，v8引擎會幫助我們創造一個物件(Global Object-> GO)
* v8引擎為了執行程式碼，會運行一個執行上下文棧(Execution Context Stack, ECStack)
* 全局變數執行時會被創建的全局執行上下文(Global Execution Context，GC)會被放入ECStack中
* GC內部有Variable  Object(VO)指向全局物件(GO)，如果有變數執行，GO中的對應變數的屬性會被賦值

運行以下的程式碼：

```js
console.log(string)

var string = "484646";
```

代碼被解析的階段時，v8引擎會幫助我們創造一個物件(Global Object)，

如果透過var來定義變數，Global Object中的屬性會被賦值，但是在上面這段程式碼中使用console打印string這個變數時，該變數還沒有被執行，所以GO中的屬性會看起來是以下這樣的：

```js
var globalObject = {
  // 內部還存在setTimeout Object等全局類或函數 其中window指向globalObject本身
  window: globalObject,
  name: undefined,
  string: undefined,
};
```

理所當然地 string 打印出來的才會是 undefiend。



### 函數

執行一段函數：

```js
function foo() {
  var message = "Hello Message";
}
```

程式碼的運行過程如下：

- 在解析階段時，Javascript引擎會分配一塊內存給函數，這塊內存保留函數的作用域(scope)以及函數體本身並作為屬性保存在GO中
- Javascript引擎為了執行程式碼，會運行一個執行上下文棧(Execution Context Stack, ECStack)
- 函數執行上下文(Functional Execution Contex，FEC)會被放入ECStack中
- 在函數執行上下文(Functional Execution Contex，FEC)中也是存在Variable  Object(VO)，這個VO指向的是活躍物件(Activation Object，AO)

所以像這樣運行以下的程式碼，foo在解析階段就確定了父級作用域，所以打印出來會是Hello Message，而非從調用foo函數的位置查找父級作用域的變數。

```js
var message = "Hello Message";

function foo() {
  console.log(message);
}

function bar() {
  var message = "Hello function";
  foo();
}

bar();
```



### ECMA 標準

以下是ECMA早期的官方定義：

>Every execution context has associated with it a variable object.Variables and functions declared in the source text are added as properties of the variable object.For function, anonymous, and implementation-supplied code, parameters are added as properties of the variable object.
>
>每一個執行上下(execution context)會被關聯到一個變數物件(variable object，VO)，在源代碼中聲明的變數或函數會作為屬性被添加到VO中。
>
>對於函數來說，參數也會被添加到VO中。

不過在[更新的版本](https://262.ecma-international.org/5.1/#sec-10.5)中ECMA 做了更加精確的定義和解釋

> Every execution context has an associated [VariableEnvironment](https://262.ecma-international.org/5.1/#sec-10.3). Variables and functions declared in ECMAScript code evaluated in an execution context are added as bindings in that [VariableEnvironment](https://262.ecma-international.org/5.1/#sec-10.3)’s [Environment Record](https://262.ecma-international.org/5.1/#sec-10.2.1). For function code, parameters are also added as bindings to that [Environment Record](https://262.ecma-international.org/5.1/#sec-10.2.1).
>
> 每一個執行上下文(execution context)會被關聯到一個**環境變數(VariableEnvironment，VE)**，在**執行代碼**中聲明的或函數會作為**環境紀錄(Environment Record，ER)**被添加到VE中。
>
> 對於函數來說，參數也會被添加到VE中。

也就是說在最新的官方標準的變數物件(variable object，VO)被替換成環境變數(VariableEnvironment，VE)，環境紀錄(Environment Record，ER)的概念也出現了。