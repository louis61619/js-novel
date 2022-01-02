# Proxy 和 Reflect

在沒有 Proxy 時，是如何監聽物件被操作的呢？可以利用 Object.defineProperty 的訪問描述器：

```js
const obj = {
  name: 'Louis',
  age: 26
}

// 監聽多屬性
Object.keys(obj).forEach(key => {
  let value = obj[key]
  Object.defineProperty(obj, key, {
    get() {
      console.log('監聽obj屬性被訪問了')
      return value
    },
    set(newValue) {
      console.log('監聽obj屬性放修改了')
      value = newValue
    }
  })
})
```

不過 Object.defineProperty 在設計之初就並非是為了進行屬性監聽的，只能對物件既有的屬性做監聽，對於新增或是刪除屬性 Object.defineProperty 是無法做到的，所以 ES6 新增了 Proxy 。



## Proxy 基本使用

Proxy 是一個類，是用於創建一個代理物件的，針對要監聽的原物件所有操作，都通過 Proxy 所創建的代理物件完成：

```js
const obj = {
  name: 'Louis',
  age: 26
}

// 默認將所有操作映射到原物件
const objProxy = new Proxy(obj, {

  // 獲取值時的捕獲器
  get: function(target, key) {
    console.log(`監聽到${target}物件的${key}屬性被訪問了`)
    return target[key]
  },

  // 設置值時的捕獲器
  set: function(target, key, newValue) {
    console.log(`監聽到${target}物件的${key}屬性被設置了`)
    target[key] = newValue
  },

  // 監聽 in 的捕獲器
  has: function(target, key) {
    console.log(`監聽到${target}物件的${key}屬性的in操作`)
    return key in target
  },

  // 監聽刪除的捕獲器
  deleteProperty: function(target, key) {
    console.log(`監聽到${target}物件的${key}屬性的刪除操作`)
    delete target[key]
  }
})

objProxy.name = 'Renny'

// 輸出：Renny
console.log(obj.name)
```

以上列出 4 個常用的捕獲器，實際上捕獲器總共有 13 個：

- Handler.getPrototypeOf：Object.getPrototypeOf 方法的捕獲器。
- Handler.setPrototypeOf：Object.setPrototypeOf 方法的捕獲器。
- Handler.isExtensible：Object.isExtensible 方法的捕獲器。
- Handler.preventExtensible：Object.preventExtensible 方法的捕獲器。
- Handler.getOwnPropertyDecriptor：Object.getOwnPropertyDecriptor方法的捕獲器。
- Handler.difineProperty：Object.difineProperty 方法的捕獲器。
- Handler.ownKeys：Object.getOwnPropertyName 和 Object.getOwnPropertySymbols 方法的捕獲器。
- Handler.apply：函數調用操作的捕獲器。
- Handler.construct：new 操作符的捕獲器。



## Reflect 基本使用

Reflect 也是 ES6 新增的一個 API，字面上的意思是反射，Reflect 出現的目的是替代 Object 本身的方法，目前最常見的使用場景是和 Proxy 一起使用：

```js
const obj = {
  name: 'Louis',
  age: 26
}

const objProxy = new Proxy(obj, {
  get: function(target, key) {
    return Reflect.set(target, key)
  },
  set: function(target, key, newValue) {
    const result = Reflect.set(target, key, newValue)
    if (result) {
      // ...設置成功
    } else {
      // ...設置失敗
    }
  }
})

objProxy.name = 'Renny'

console.log(obj.name)
```



## Proxy 中 receiver 參數

如果在物件中需要攔截 getter 和 setter 中的操作，需要使用 receiver 參數：

```js
const obj = {
  _name: 'Louis',
  get name() {
    // 需要讓 this 變成 proxy 物件才能攔截
    return this._name
  },
  set name(newValue) {
    this._name = newValue
  }
}

const objProxy = new Proxy(obj, {
  get: function(target, key, receiver) {
    // receiver 是創建出來的代理物件
    // Reflect.get 的第三個參數可以改變 getter 和 setter 的 this 指向
    return Reflect.get(target, key, receiver)
  },
  set: function(target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver)
  }
})

console.log(objProxy.name)
```



## Reflect.construct

執行某個構造函數中的內容，但是創建出來的是其他物件實例：

```js
function Student(name, age) {
  this.name = name
  this.age = age
}

function Teacher() {

}

// 執行 Student 函數中的內容，但是創建出來 Teacher 物件
const teacher = Reflect.construct(Student, ["Louis", 26], Teacher)

console.log(teacher.__proto__ === Teacher.prototype)
```