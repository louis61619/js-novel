# 原型鏈和繼承

```js
function Person() {

}
var p1 = new Person()
```

在編寫以上的程式碼時，許多從其他語言轉過來的開發者習慣將 new 關鍵字後的 Person 稱之為類，不過在 JavaScript 中這個 Person 本質就是一個**構造函數**，類的定義是ES6以後才明確以 class 關鍵字來定義，而 class 本質上也是用原型和構造函數實現的一種語法糖。



## 物件導向的特性

JavaScript支持了多種程式設計的範式，包含函數式編程（ Functional Programming ）和物件導向編程（ Object-oriented programming ）。

物件導向有三大特性：

- **封裝 (Encapsulation)**：將屬性和方法集合到某個類中，並將必要的內容對外公開，沒有必要的內容隱藏起來。
- **繼承 (Inhertitance)**：透過繼承子類能使用父類所擁有的屬性和方法。
- **多態 (polymorphism)**：不同的物件在執行時會表現出不同的型態。



## 原型鏈

要了解 JavaScript 中的繼承是如何實現的，就要討論到物件的原型鏈，在 JavaScript 中獲取物件屬性是優先從物件中查找，如果在該物件中不存在會到 `__proto__` (原型物件) 中查找。

例如：

```js
var obj = {
  name: 'Louis',
  age: 26
}

// 物件上的原型
obj.__proto__ = {
  address: '台北市'
}

console.log(obj.address)
```

輸出：

```
台北市
```

而原型鏈指的是原型之上依然存在著原型，如果要具體來理解就像是以下的程式碼：

```js
var obj = {
  name: 'Louis',
  age: 26
}

obj.__proto__ = {
}

obj.__proto__.__proto__ = {
}

obj.__proto__.__proto__.__proto__ = {
  address: '台北市'
}

console.log(obj.address)
```

輸出：

```
台北市
```



### 原型如何產生

在前面提到，通過 new 關鍵字建立物件時，會有幾個步驟：

1. 在記憶體中創建一個空物件；
2. 將 this 賦值為該物件，意即 this 的指針指向該物件；
3. 該物件的  `__proto__` 賦值為構造函數的 prototype；
4. 返回 this 。

而創建物件時以下兩種方式是等價的：

```js
var obj = {}
```

和

```js
var obj = new Object()
```

所以一開始 obj 的 `__proto__` (原型) 其實就來自於 Object 函數的 prototype。

要證明可以直接對兩者進行比較：

```js
console.log(obj.__proto__ === Object.prototype)
```

通常來說原型內部的所有方法是不可列舉的，不過可以借助Object本身提供的方法將所有包含在原型中的方法進行列舉：

```js
console.log(Object.getOwnPropertyDescriptors(Object.prototype))
```

因為在 JavaScrirpt 中類就是物件，也就是說實際上 Object 原型就是所有類的父類。

通過以下簡單的程式碼就能得到驗證：

```js
function Person() {

}

const p = new Person()

console.log(p.__proto__.__proto__ === Object.prototype)
```



## 繼承的實現

### 基於原型鏈直接實現

```js
function Person() {
  this.name = 'Louis'
}

Person.prototype.eating = function() {
  console.log(this.name + ' eating')
}

function Student() {
  this.sno = '111'
}

// 實現基於原型鏈的繼承
var p = new Person()
Student.prototype = p

Student.prototype.studying = function() {
  console.log(this.name + ' studying')
}

var stu = new Student()

stu.eating()
```

實際上是將 Student 構造函數的 prototype 指向透過 Person 構造函數創建的物件 p 實現的繼承，如下圖表現：

![image-20211219185631742](assets/image-20211219185631742.png)

缺點：

1. 如果直接打印 stu 實例，會無法獲取父類的屬性。
2. 由於是直接對 ｐ實例進行引用，所以當 ｐ內部的某些屬性為物件時，修改這個屬性所有繼承 p 的子類會全部受到影響。
3. 不好處理參數傳遞。



### 借用構造函數 （ constructor stealing ）

```js
function Person(name) {
  this.name = name
}

Person.prototype.eating = function() {
  console.log(this.name + ' eating')
}

function Student(name, sno) {
  // 透過調用 Person 構造函數在創建自身的屬性
  Person.call(this, name)
  this.sno = sno
}

var p = new Person()
Student.prototype = p

Student.prototype.studying = function() {
  console.log(this.name + ' studying')
}

var stu = new Student('Louis', 111)
```

透過在 Student 構造函數中調用 Person 構造函數，能夠在 stu 物件中創建本身的屬性以解決上面提到的三個問題，記憶體中的表現形式如下圖：

![image-20211219193823926](assets/image-20211219193823926.png)

缺點：

1. Person 函數被調用了兩次。
2. 原型物件上多出了一些值為 undefined 的不必要屬性。



### 將父類原型賦值給子類

```js
function Person(name) {
  this.name = name
}

Person.prototype.eating = function() {
  console.log(this.name + ' eating')
}

function Student(name, sno) {
  Person.call(this, name)
  this.sno = sno
}

// 直接替換prototype
Student.prototype = Person.prototype

Student.prototype.studying = function() {
  console.log(this.name + ' studying')
}

var stu = new Student('Louis', 111)
```

這種方法的好處是不需要調用兩次 Person 構造函數，但是缺點也很明顯，Student 的 prototype 如果要進行任何改動都會影響到 Person 的 prototype，因為此時兩者的記憶體地址是相同的。

![image-20211219213654869](assets/image-20211219213654869.png)

缺點：

1. 修改子類的 prototype 等於修改父類的 prototype



### 寄生組合式繼承的實現

上面的方法雖然解決了構造函數調用兩次以及原型上存在不必要屬性的問題，但是直接將父類 prototyp 直接賦予子類又會出現引用的問題，那明顯就要找出一種將物件作為原型引用的方式，以下提供了三種方式。

利用 Object.setPrototypeOf 實現：

```js
function createObject(o) {
  var newObj = {}
  Object.setPrototypeOf(newObj, o)
  return newObj
}
var info = createObject(obj)
```

手動實現：

```js
function createObject(o) {
  function Fn() {}
  Fn.prototype = o
  var newObj = new Fn()
  return newObj
}
var info = createObject(obj)
```

直接使用 Object.create ：

```js
var info = Object.create(obj)
```

得知了以上的方式，就可以將前面替換 prototype 的方式加以改進：

```js
function Person(name) {
  this.name = name
}

Person.prototype.eating = function() {
  console.log(this.name + ' eating')
}

function Student(name, sno) {
  Person.call(this, name)
  this.sno = sno
}

// 創建一個空物件，物件上的原型為 Person.prototype 並賦值
Student.prototype = Object.create(Person.prototype)

// 對 constructor 進行處理
Object.defineProperty(Student.prototype, "constructor", {
  enumerable: false,
  configurable: true,
  writable: true,
  value: Student
})

Student.prototype.studying = function() {
  console.log(this.name + ' studying')
}

var stu = new Student('Louis', 111)
```

可以將繼承的操作封裝成函數：

```js
function inheritPrototype(SubType, SuperType) {
  // 只取一個空物件上的原型為 Person.prototype
  SubType.prototype = Object.create(SuperType.prototype)
  // 對 constructor 進行處理
  Object.defineProperty(SubType.prototype, "constructor", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: SubType
  })
}

function Person(name) {
  this.name = name
}

Person.prototype.eating = function() {
  console.log(this.name + ' eating')
}

function Student(name, sno) {
  Person.call(this, name)
  this.sno = sno
}

inheritPrototype(Student, Person)

Student.prototype.studying = function() {
  console.log(this.name + ' studying')
}

var stu = new Student('Louis', 111)
```

內存的表現形式如下圖：

![image-20211219233210491](assets/image-20211219233210491.png)





## 物件、函數與原型

假設有這樣的一行程式碼：

```js
function Foo() {}
```

原型鏈中的關係如下圖：

![image-20211220204350619](assets/image-20211220204350619.png)





## 有關原型的方法補充

- hasOwnProperty
  - 物件是否有某一個自身的屬性（ 不是在原型上的屬性 ）

- In 操作符
  - 判斷某個屬性是否在某物件或是該物件的原型上
- instanceof
  - 用於檢測構造函數的prototype，是否出現在某個實例的原型鏈上
- isPrototypeOf
  - 用於檢測某個物件，是否出現在某個實例的原型鏈上