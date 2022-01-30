# JSON

JSON 是一種數據格式，目前最長用在服務器和客戶端之間的資料傳輸，全稱為 JavaScript Object Notation（JavaScript物件符號），已經有相當多的程式語言都實現了將 JSON格式轉換成對應模型的方法，使用場景通常為：

- 網路數據傳輸
- 項目配置文件
- 非關係型資料庫（NoSQL）



## 基本使用

JSON 支持三種類型的值：

- 簡單值：Number、String、Boolean、null
- 物件值：由 key 和 value 組成，key 為 String 類型並且必須添加雙引號
- 陣列值：陣列的元素可以是簡單值、物件值、陣列值



## JSON.stringify

某些時候會將 JavaScript 中的複雜類型轉換成 JSON 字串，可以透過 JSON.stringify 進行轉化：

```js
const obj = {
  name: 'Louis',
  age: 26
}

const jsonString1 = JSON.stringify(obj)
// {"name":"Louis","age":26}
console.log(jsonString1)
```

並且 stringify 的第二個參數可以進行過濾：

```js
const obj = {
  name: 'Louis',
  age: 26
}


const jsonString2 = JSON.stringify(obj, ['name'])
// {"name":"Louis"}
console.log(jsonString2)
```

stringify 的第二個參數也可以是函數：

```js
const obj = {
  name: 'Louis',
  age: 26
}

const jsonString3 = JSON.stringify(obj, (key, value) => {
  if (key === 'age') {
    return value + 1
  }
  return value
})
// {"name":"Louis","age":27}
console.log(jsonString3)
```

透過第三個參數能夠進行格式化：

```js
const obj = {
  name: 'Louis',
  age: 26
}

// 第三個參數 space
const jsonString4 = JSON.stringify(obj, undefined, " ")
// {
//   "name": "Louis",
//   "age": 26
//  }
console.log(jsonString4)
```

如果轉化的目標物件包含 toJSON 方法，會執行該方法並返回結果：

```js
const obj = {
  name: 'Louis',
  age: 26,
  toJSON() {
    return "111"
  }
}

const jsonString1 = JSON.stringify(obj)
// "111"
console.log(jsonString1)
```



## JSON.parse

JSON 物件除了 stringify 方法，還有 parse 方法能對 JSON 字串進行解析，第二個參數也能對 key 和 value 進行修改：

```js
const JSONString = '{"name":"Louis","age":27}'

const info = JSON.parse(JSONString, (key, value) => {
  if(key === 'age') {
    return value + 1
  }
  return value
})

// { name: 'Louis', age: 28 }
console.log(info)
```



## Deep copy

通常要複製物件，會使用淺拷貝，淺拷貝最簡單的方式就是解構賦值：

```js
const obj = {
  name: 'Louis',
  age: 26,
  friends: [
    {
      name: 'Renny',
      age: 18
    }
  ]
}

const info = { ...obj }
```

 info 中的 friends 和 obj 中的 freinds 是指向同一個記憶體地址， 如果修改掉 info 中的 friends 會影響掉 obj 中的 friends 屬性。

透過 JSON.stringify 和 JSON.parse 能夠進行物件的深拷貝，也就是會讓 friends 屬性指向不同的記憶體地址：

```js
const obj = {
  name: 'Louis',
  age: 26,
  friends: [
    {
      name: 'Renny',
      age: 18
    }
  ]
}

// 深拷貝
const jsonString = JSON.stringify(obj)
const info3 = JSON.parse(jsonString)
```

不過以上的方法有一個最大的缺點，就是 JSON 這種數據格式中沒有函數，如果物件中有函數作為屬性會在轉化的過程中被刪去。

