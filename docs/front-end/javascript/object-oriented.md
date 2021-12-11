# Object oriented

JavaScript支持了多種程式設計的範式，包含函數式編程和物件導向編程：

- JavaSciprt中的物件被設計成一組**屬性的無序集合**，類似一個哈希表，由key和value組成。

- Key是一個標識符名稱，value可以是任意類型，也可以是**物件或者函數類型**

- 如果值是一個函數通常稱之為**方法**

  

## 如何創建物件

透過new關鍵字：

```js
var obj = new Object()

obj.name = "Louis"
obj.age = 19
```

透過字面量的方式：

```js
var obj = {
  name: 'Louis',
  age: 19
}
```



## 如何操作物件

基本的操作方式如下：

```js
var obj = {
  name: 'Louis',
  age: 26
}

// 獲取
obj.name

// 賦值
obj.name = 'XXX'

// 刪除
delete obj.name
```

### Object.defineProperty

也可以使用Object.defineProperty進行更加精確的操作，Object.defineProperty允許傳入三個參數：

- obj： 要定義屬性的物件。
- prop：要被定義或修改的屬性名字。
- descriptor：要定義或修改物件敘述內容。

descriptor為物件的屬性描述器，屬性描述器（Property descriptor）主要有兩種：資料描述器（data descriptor）與訪問描述器（accessor descriptor），共有以下幾個屬性：

- configurable

  `true` 則此屬性將可改變或刪除。 **預設為 `false`**

- enumerable

  `true` 如果物件被列舉，將會列舉此屬性。 **預設為 `false`**

一個資料描述器有以下屬性：

- value

  屬性的值，**預設 [`undefined`](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/undefined).**

- writable

  `true` 則該物件屬性可透過[賦予運算子](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#assignment_operators)改變其值。 **預設 `false`**

一個訪問描述器有以下屬性:

- get

  獲取屬性時調用。 **預設 [`undefined`](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/undefined)**

- set

  修改屬性時調用。. **預設 [`undefined`](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/undefined)**

一個簡單的資料描述器使用案例：

```js
var obj = {
  name: 'Louis',
  age: 26
}

Object.defineProperty(obj, "height", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 1.75
})

console.log(obj.height)
```

一個簡單的訪問描述器使用案例：

```js
var obj = {
  name: 'Louis',
  age: 26,
  _height: 1.75
}

Object.defineProperty(obj, "height", {
  configurable: true,
  enumerable: true,
  get: function() {
    return this._height
  },
  set: function(value) {
    this._height = value
  }
})

console.log(obj.height)

```

