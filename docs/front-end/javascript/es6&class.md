# ES6 和 Class

```js
class Person {

}
```

本質上 Class 關鍵字，實際上就是一個構造函數的語法糖。

在 new  一個 class 之後，我們能夠得到和 new 一個構造函數相同的結果：

```js
var p = new Person()
// true
console.log(p.__proto__ === Person.prototype)
console.log(Person === p.__proto__.constructor)
```

也就是說 p 的原型同樣也是指向 Person 的 prototype，p的原型上也存在一個 constructor 指向 class 本身，所以 class 的調用也是會走下這四步：

1. 在記憶體中創建一個空物件 {}
2. 將構造函數的 prototype 賦值給該物件的 `__proto__`

3. 將該物件賦值 this 
4. 如果沒有返回值則返回 this



## 方法的定義

### 構造方法

Constructor 是類中的構造方法，也等於是構造函數，透過構造方法能去定義類中的屬性：

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}
```



### 實例方法

通過 new 關鍵字調用 class 返回的物件稱為實例，可以在 class 中加入自訂函數以對實例方法進行定義：

```js
class Person {

  constructor(name, age) {
    this.name = name
    this.age = age
  }

  eating() {
    console.log(this.name + '在吃東西')
  }
}

var p = new Person("Renny", 29)
console.log(p)
```

打印 p 的時候，輸出是這樣的：

```
Person { name: 'Renny', age: 29 }
```

為什麼看不到方法呢？因為方法是保存在 class 的 prototype 中，這樣每次 new 一個新的物件時，方法就不會重複進行創建而佔用多餘的內存空間，而 p 的 `__proto__` 是指向 Person 的 prototype，所以能夠利用 getOwnPropertyDescriptors 對原型上的所有屬性進行列舉：

```js
console.log(Object.getOwnPropertyDescriptors(p.__proto__))
```

輸出：

```
{
  constructor: {
    value: [class Person],
    writable: true,
    enumerable: false,
    configurable: true
  },
  eating: {
    value: [Function: eating],
    writable: true,
    enumerable: false,
    configurable: true
  }
}
```



### 訪問描述器方法

透過訪問描述器能對屬性進行攔截：

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
    this._address = '新北市'
  }

  eating() {
    console.log(this.name + '在吃東西')
  }

  get address() {
    return this._address
  }

  set address(newValue) {
    this._address = newValue
  }
}

var p = new Person("Renny", 29)
```

對 address 屬性的獲取會經過 get address 訪問描述器，而對 address 屬性的修改會經過 set address。



### 靜態方法（類方法）

透過靜態方法能夠直接通過類對方法進行調用，而無需 new 出一個物件：

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  // 靜態方法(類方法)
  static createPerson() {
    var names = ['vbc', 'aa', 'aff']
    var nameIndex = Math.floor(Math.random() * names.length)
    var name = names[nameIndex]
    var age = Math.floor(Math.random() * 100)
    return new Person(name, age)
  }
}

var p = Person.createPerson()

console.log(p)
```



## 繼承

通過 class 實現繼承要比以 prototype 實現繼承簡單明確的多：

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}

// Student 稱之為子類
class Student extends Person {
  // JS引擎在解析子類的時候就有要求，如果要實現繼承，那麼子類必須調用super，即調用父類的構造方法
  constructor(name, age, sno) {
    super(name, age)
    this.sno = sno
  }
}

var stu = new Student("why", 18, 100)

console.log(stu)
```

能夠透過原型鏈往上找到 Person 類：

```js
console.log(stu.__proto__.__proto__.constructor)
```

輸出：

```
[class Person]
```



### 方法重寫

通常子類會繼承父類的方法，不過在子類中編寫同名方法可以直接對父類的方法進行覆蓋：

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  eating() {
    console.log('吃早餐')
  }
}

class Student extends Person {
  constructor(name, age, sno) {
    super(name, age)
    this.sno = sno
  }

  eating() {
    console.log('吃午餐')
  }
}
```

甚至可以用 super 對父類的方法進行複用：

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  eating() {
    console.log('吃早餐')
  }
}

class Student extends Person {
  constructor(name, age, sno) {
    super(name, age)
    this.sno = sno
  }

  eating() {
    super.eating()
    console.log('吃午餐')
  }
}

```

靜態方法也是相同的模式。



## 當ES6 的 class 透過 babel 轉化為 ES5

透過 [babel 的官網](https://babeljs.io/repl) 可以將 ES6 的程式碼進行化，以下轉化後的版本是基於版本 v7.16.6 ，並且 targets 為 defaults, not ie 10, not ie_mob 11。

### 一般的 class 實現

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  eating() {
    console.log(this.name + ' 再吃東西')
  }
}
```

轉化之後：

```js
"use strict";

// 檢測該函數是不是作用構造函數進行調用
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// 傳入陣列進行遍歷，然後透過 defineProperty 去添加屬性
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    console.log(target, descriptor.key, descriptor)
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

// 透過一個封裝好的函數為構造函數添加構造方法和靜態方法
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

// 放在函數作用域中避免與全局變數衝突
// /*#__PURE__*/ 標記為純函數，使用 webpack壓縮時可以進行 tree shaking
var Person = /*#__PURE__*/ (function () {
  function Person(name, age) {
    // 目的是為了讓這個函數不被用普通的方式進行調用
    _classCallCheck(this, Person);

    this.name = name;
    this.age = age;
  }

  // 通過調用這個函數進行方法的添加
  _createClass(Person, [
    {
      key: "eating",
      value: function eating() {
        console.log(this.name + " 再吃東西");
      }
    }
  ]);

  return Person;
})();

```

### 繼承的實現

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  
  eating () {
    console.log(this.name + ' 吃東西')
  }
}

class Student extends Person {
  constructor(name, age, sno) {
    super(name, age)
    this.sno = sno
  }

  studying() {
    console.log(this.name + ' 在讀書')
  }
}
```

轉化後的程式碼相對複雜很多，不過可以直接關注於核心思路 _inherits 函數作為繼承方法的實現，和 _createSuper 如何調用父類構造函數：

```js
"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  // 將父類的 prototype 作為某個物件的 __proto__ 並賦值給子類的 prototype
  // 並且該物件裡面要定義一個 constructor 指向子類本身
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });

  // 靜態方法的繼承
  // Student.__proto__ = Person
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    // 做一些邊界判斷，最終還是返回 result
    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Person = /*#__PURE__*/ (function () {
  function Person(name, age) {
    _classCallCheck(this, Person);

    this.name = name;
    this.age = age;
  }

  _createClass(Person, [
    {
      key: "eating",
      value: function eating() {
        console.log(this.name + " 吃東西");
      }
    }
  ]);

  return Person;
})();

var Student = /*#__PURE__*/ (function (_Person) {
  // 繼承方法
  _inherits(Student, _Person);

  var _super = _createSuper(Student);

  function Student(name, age, sno) {
    var _this;

    _classCallCheck(this, Student);

    // 讓 _this 等於父類創建的實例，但是實例的 constructor 為子類
    _this = _super.call(this, name, age);
    _this.sno = sno;
    return _this;
  }

  _createClass(Student, [
    {
      key: "studying",
      value: function studying() {
        console.log(this.name + " 在讀書");
      }
    }
  ]);

  return Student;
})(Person);
```



## 繼承內置類

透過繼承既有的類能夠延展出更多的方法：

```js
class MyArray extends Array {
  firstItem() {
    return this[0]
  }
  lastItem() {
    return this[this.length - 1]
  }
}

var arr = new MyArray(1, 2, 3)
```



## 類的混入

由於 JavaScript 中並沒有 mixing 之類的關鍵字，所以通常要實現混入會利用自訂義函數：

```js
class Student {

}

function mininRunner(BaseClass) {
  class NewClass extends BaseClass {
    running() {
      console.log('running')
    }
  }
  return NewClass
}

function mixinEater(BaseClass) {
  return class extends BaseClass {
    eating() {
      console.log('eating')
    }
  }
}

var stu = new (mixinEater(mininRunner(Student)))()

stu.running()
stu.eating()

```

在 React 等框架中，在使用 class components 時，也會用到基於這種混入函數實現的高階組件（HOC）效果。



## 類的多態

在 JavaScript 中存不存在多態或許有些爭議，不過如果從傳入不同數據類型的呈現結果就不同的定義上來看，多態就是存在的：

```js
function calcArea(shape) {
  console.log(shape.getArea())
}

var obj1 = {
  getArea: function() {
    return 1000
  }
}

class Person {
  getArea() {
    return 100
  }
}

var p = new Person()

calcArea(obj1)
calcArea(p)
```

或者也可以使用 TypeScript ：

```ts
class Shape {
  getArea() {}
}

class Rectangle extends Shape {
  getArea() {
    return 100
  }
}

class Circle extends Shape {
  getArea() {
    return 200
  }
}

var r = new Rectangle()
var c = new Circle()

// 多態： 當對不同數據類型執行同一個操作時，如果表現出來的形式不一樣就是多態的體現
function calcArea(shape: Shape) {
  console.log(shape.getArea())
}

calcArea(r)
calcArea(c)
```

