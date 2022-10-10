# this

常見的編程語言中，幾乎都有 this 關鍵字，但是 JavaScript 中的 this 和常見的物件導向語言中的 this 不太一樣，通常在 Java、C++等語言中需要有一個類才能透過 this 調用當前物件。

## this 的作用

假設我們有以下的程式碼：

```js
var obj = {
  name: 'louis',
  eating: function () {
    console.log(this.name + '在吃東西')
  }
}
obj.eating()
```

當我們執行這段結果後輸出會是：

```
louis在吃東西
```

也就是說使用 this.name 我們得到當前的物件的 name 屬性，不過沒有 this 也是可以編寫相對的程式碼，像是：

```js
var obj = {
  name: 'louis',
  eating: function () {
    console.log(obj.name + '在吃東西')
  }
}
obj.eating()
```

不過這樣做當我們改變物件名稱時，內部方法就要跟著進行改變，少了 this 會缺少很多複用程式碼的機會。

## this 在全局作用域中

一般來說當我們在瀏覽器中執行：

```js
console.log(this)
```

我們會得到 window 物件，而在 Nodejs 中執行 this 時，會得到一個空物件，而之所以會是空物件，是 Nodejs 中使用 Commonjs 規範，將每個文件都視為一個獨立的 module，而在編譯後會將這個 module 放到一個函數中並且進行 call 綁定，而這個綁定的物件是 expots

所以在 Nodejs 中執行以下程式碼：

```js
exports.obj = {
  foo: 'foo'
}

console.log(this)
```

會得到：

```
{ obj: { foo: 'foo' } }
```

## this 在函數中

由於 this 並非在編譯階段中就進行綁定，而是在程式碼執行時動態綁定，所以有幾個綁定規則。

假設有以下這樣一個函數：

```js
function foo() {
  console.log(this)
}
```

### 函數獨立被調用

如果直接在函數中進行調用，在瀏覽器中的輸出結果會是 window 物件：

```js
foo()
```

以及

```js
var obj = {
  foo: foo
}
var bar = obj.foo
bar()
```

以上兩種情況都是屬於獨立調用，所以輸出結果都會是全局 window 物件。

### 綁定在物件中調用

如果該函數是物件中的某個方法，輸出結果會是會是該物件：

```js
var obj = {
  foo: foo
}
// 會得obj
obj.foo()
```

和前面的案例有一點類似，但是只要前面綁定有物件，輸出的結果都會是綁定在前面的物件。

### 使用函數原型中的方法進行綁定

在物件中做為方法調用可以讓函數具有指定的 this，如果不想要讓函數作為方法但是又想要指定 this，可以使用 call 或是 apply 對該函數中的 this 進行綁定：

```js
// 會得到String {"abc"} 物件
foo.call('abc')
```

也可以使用 bind，前面有說到只要是函數獨立調用 this 就會指向全局 windon 物件，不過 bind 的優先級更高可以將獨立調用的函數綁定 this。

```js
function foo() {
  console.log(this)
}
var newFoo = foo.bind('bar')
newFoo()
```

輸出的結果為 String 物件。

## this 在透過構造函數(new)創建出來的物件中

JavaScript 可以使用 new 關鍵字進行函數的調用，而使用 new 創建出來的物件會直接將 this 和該物件進行綁定。

```js
function Person(name, age) {
  this.name = name
  this.age = age
}

var p1 = new Person('why', 10)
console.log(p1.name, p1.age)
```

## this 綁定規則的優先級

new 構造函數 > call/apply/bind > 作為物件中的方法調用 > 直接調用函數

## this 與箭頭函數

箭頭函數(Arrow Function)不綁定任何 this，而是從外層作用域中尋找 this。

```js
var foo = () => {
  console.log(this)
}
// 輸出為window
foo.call('bar')
```

箭頭函數常常用在非同步函數中獲取外層的 this 物件，例如：

```js
var obj = {
  data: [],
  getData: function () {
    // 在箭頭函數之前的解決方案
    var _this = this
    setTimeout(function () {
      var result = ['aaa', 'fff', 'ddd']
      _this.data = result
    }, 2000)
  }
}
obj.getData()
```

有了箭頭函數可以直接調用外層的 this：

```js
var obj = {
  data: [],
  getData: function () {
    setTimeout(() => {
      var result = ['aaa', 'fff', 'ddd']
      this.data = result
    }, 2000)
  }
}
obj.getData()
```
