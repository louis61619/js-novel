# This

常見的編程語言中，幾乎都有this關鍵字，但是JavaScript中的this和常見的物件導向語言中的this不太一樣，通常在Java、C++等語言中需要有一個類才能透過this調用當前物件。

## this的作用

假設我們有以下的程式碼：

```js
var obj = {
  name: "louis",
  eating: function () {
    console.log(this.name + "在吃東西");
  },
};
obj.eating();
```

當我們執行這段結果後輸出會是：

```
louis在吃東西
```

也就是說使用this.name我們得到當前的物件的name屬性，不過沒有this也是可以編寫相對的程式碼，像是：

```js
var obj = {
  name: "louis",
  eating: function () {
    console.log(obj.name + "在吃東西");
  },
};
obj.eating();
```

不過這樣做當我們改變物件名稱時，內部方法就要跟著進行改變，少了this會缺少很多複用程式碼的機會。

## this在全局作用域中

一般來說當我們在瀏覽器中執行：

```js
console.log(this);
```

我們會得到window物件，而在Nodejs中執行this時，會得到一個空物件，而之所以會是空物件，是Nodejs中使用Commonjs規範，將每個文件都視為一個獨立的module，而在編譯後會將這個module放到一個函數中並且進行call綁定，而這個綁定的物件是expots

所以在Nodejs中執行以下程式碼：

```js
exports.obj = {
  foo: "foo",
};

console.log(this);
```

會得到：

```
{ obj: { foo: 'foo' } }
```

## this在函數中

由於this並非在編譯階段中就進行綁定，而是在程式碼執行時動態綁定，所以有幾個綁定規則。

假設有以下這樣一個函數：

```js
function foo() {
  console.log(this);
}
```

### 函數獨立被調用

如果直接在函數中進行調用，在瀏覽器中的輸出結果會是window物件：

```js
foo();
```

以及

```js
var obj = {
  foo: foo,
};
var bar = obj.foo;
bar();
```

以上兩種情況都是屬於獨立調用，所以輸出結果都會是全局window物件。

### 綁定在物件中調用

如果該函數是物件中的某個方法，輸出結果會是會是該物件：

```js
var obj = {
  foo: foo,
};
// 會得obj
obj.foo();
```

和前面的案例有一點類似，但是只要前面綁定有物件，輸出的結果都會是綁定在前面的物件。

### 使用函數原型中的方法進行綁定

在物件中做為方法調用可以讓函數具有指定的this，如果不想要讓函數作為方法但是又想要指定this，可以使用call或是apply對該函數中的this進行綁定：

```js
// 會得到String {"abc"} 物件
foo.call("abc");
```

也可以使用bind，前面有說到只要是函數獨立調用this就會指向全局windon物件，不過bind的優先級更高可以將獨立調用的函數綁定this。

```js
function foo() {
  console.log(this);
}
var newFoo = foo.bind("bar");
newFoo();
```

輸出的結果為String物件。

## this在透過構造函數(new)創建出來的物件中

JavaScript可以使用new關鍵字進行函數的調用，而使用new創建出來的物件會直接將this和該物件進行綁定。

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

var p1 = new Person("why", 10);
console.log(p1.name, p1.age);
```

## this綁定規則的優先級

new構造函數 > call/apply/bind > 作為物件中的方法調用 > 直接調用函數

## this與箭頭函數

箭頭函數(Arrow Function)不綁定任何this，而是從外層作用域中尋找this。

```js
var foo = () => {
  console.log(this)
}
// 輸出為window
foo.call("bar")
```

箭頭函數常常用在非同步函數中獲取外層的this物件，例如：

```js
var obj = {
  data: [],
  getData: function() {
    // 在箭頭函數之前的解決方案
    var _this = this
    setTimeout(function () {
      var result = ["aaa", "fff", "ddd"]
      _this.data = result
    }, 2000)
  }
}
obj.getData()
```

有了箭頭函數可以直接調用外層的this：

```js
var obj = {
  data: [],
  getData: function() {
    setTimeout(() => {
      var result = ["aaa", "fff", "ddd"]
      this.data = result
    }, 2000)
  }
}
obj.getData()
```
