# ES6 語法糖

語法糖（英語：Syntactic sugar）是由英國電腦科學家彼得·蘭丁發明的一個術語，指程式語言中添加的某種語法，這種語法對語言的功能沒有影響，但是更方便程式設計師使用。 語法糖讓程式更加簡潔，有更高的可讀性。

## 字面量增強寫法

通過某些簡化的寫法來創建物件。

### 屬性簡寫（ property shorthand ）

```js
var name = 'Louis'
var age = 26

var obj = {
  // property shorthand(屬性簡寫)
  name,
  age
}
```

### 方法簡寫 （ method shorthand ）

```js
var obj = {
  // method shorthand(方法簡寫)
  foo() {}
}
```

### 計算屬性名（ computed property name ）

```js
var name = 'Louis'
var age = 26

var key = name + age

var obj = {
  // computed property name(計算屬性名)
  [key]: 20
}
```

## 解構賦值

### 陣列解構

```js
var array = ['acb', 'bca', 'abc']

var [item1, item2, item3] = array
```

可以只對後面的元素進行解構，只要在前面加上 `,` ：

```js
var array = ['acb', 'bca', 'abc']

var [, item2, item3] = array
```

解構出一個元素，後面的元素放入一個新陣列：

```js
var array = ['acb', 'bca', 'abc']

var [item1, ...newArray] = array
```

給予默認值：

```js
var [item1, item2, item3, item4 = 'aaa'] = array
```

### 物件解構

```js
var obj = {
  name: 'Louis',
  age: 26,
  height: 1.75
}

var { name, age, height } = obj
```

改變 key 的名稱：

```js
var obj = {
  name: 'Louis',
  age: 26,
  height: 1.75
}

var { name: newName } = obj
```

給予默認值：

```js
var obj = {
  name: 'Louis',
  age: 26,
  height: 1.75
}

var { address = '新北市' } = obj
```

## 模板字符串

在 ES6 之前拼接字符串，需要使用 + 號 ：

```js
const name = 'Louis'

const age = 18

console.log('my name is ' + name + ', age is ' + age)
```

ES6 之後可以使用模板字符串：

```js
const name = 'Louis'

const age = 18

console.log(`my name is ${name}, age is ${age}`)
```

可以在 ${} 內寫任意表達式：

```js
const name = 'Louis'

const age = 18

console.log(`my name is ${name}, age is ${age * 2}`)

function doubleAge() {
  return age * 2
}

console.log(`my name is ${name}, age is ${doubleAge()}`)
```

## 標籤模板字符串

可以將模板字符串作為參數傳入函數中，第一個參數是模板字符串中整個字符串，只是會被 ${} 切成多塊，放到一個陣列中，接下來的參數都依序是 ${} 中的值：

```js
function foo(m, n) {
  console.log(m, n)
}

const name = 'Louis'

foo`Hello${name}World`
```

輸出：

```
[ 'Hello', 'World' ] Louis
```

標籤模板字符串在一般中很少用到，不過如果在 React 中有使用到 styled-components 這個庫，就會大量用使用標籤模板字符串。

## 函數中參數的默認值

ES6 之後給函數中的參數默認值，非常方便：

```js
function foo(m = '123') {
  console.log(m)
}

foo()
```

或是可以直接在參數做解構：

```js
function printInfo({ name, age } = { name: 'Louis', age: 26 }) {
  console.log(name, age)
}
```

有默認值之後的參數都不放在 length 中：

```js
function baz(x, y, z, m = 30, j) {}

// 3
console.log(baz.length)
```

## 函數的剩餘參數

ES6 中引用了 rest parameter，可以將不定量的參數放入陣列中：

```js
function foo(m, n, ...args) {}
```

相較於 arguments ， ES6 提供的 rest parameter 只包含沒有對應形參的實際參數，而 arguments 包含了所有傳遞給函數的實參。

## 箭頭函數

相對於普通函數：

- 箭頭函數沒有 prototype 所以不作爲構造函數進行調用。
- 沒有 this。
- 沒有 arguments。

```js
const foo = () => {}
```

## ES6 中的展開語法

函數調用時：

```js
const names = ['abc', 'vj', 'fjf']

function foo(x, y, z) {
  console.log(x, y, z)
}
foo(...names)
```

構造陣列時：

```js
const names = ['abc', 'vj', 'fjf']

const newNames = [...names]
```

構造物件時：

```js
const info = { name: 'Louis', age: 28 }

// ES2018
const newInfo = { ...info }
```

## ES6 中的數值

在 ES6 中數值是可以用其他進制來進行表示的：

```js
const num1 = 100 // 十進制
const num2 = 0b100 // 二進制
const num3 = 0o100 // 八進制
const num4 = 0x100 // 十六進制

console.log(num1, num2, num3, num4)
```

輸出：

```
100 4 64 256
```

## Symbol

Symbol 是一個基本的數據類型，如果在物件要定義一屬性，而該屬性為了防止被覆蓋所以必須有一個唯一的 key ，就可以使用 Symbol 這個數據結構做為 key 。

使用字面量寫法：

```js
const s1 = Symbol()
const newObj = {
  [s1]: 'Louis'
}
```

作為屬性新增：

```js
const newObj = {}
const s1 = Symbol()
// 新增屬性
newObj[s2] = 'Louis'
```

使用 Object.defineProperty ：

```js
const s1 = Symbol()
Object.defineProperty({}, s1, {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 'Louis'
})
```

如果要獲取物件中所有使用 Symbel 的 key 必須調用專門的方法 Object.getOwnPropertySymbols 。

透過 Symbol.for 可以定義一個相同的 key ：

```js
const sa = Symbol.for('aaa')
const ab = Symbol.for('aaa')

// 輸出為 true
console.log(sa === ab)
```

透過 Symbol.keyFor 可以獲取 key :

```js
const sa = Symbol.for('aaa')

// 輸出為 aaa
console.log(Symbol.keyFor(sa))
```

在 ES2019 中 symbel 可以傳入一段描述（description）:

```js
const s1 = Symbol('aaa')
```
