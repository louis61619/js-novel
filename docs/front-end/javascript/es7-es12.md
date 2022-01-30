# ES7~ES12

相對於 ES6 的大更新，ES7 之後就沒有做出巨大的更迭，僅僅是加入了一些比較小的改動。



## ES7

### includes 方法

在沒有這個方法之前，通常是透過 indexOf 方法判斷陣列有沒有包含所需要的元素：

```js
const names = ["abc", "cba", "ndv", "fjd"]

if (names.indexOf("cba") !== -1) {
  console.log("包含該元素")
}
```

有了 includes 方法之後，可以用該方法進行判斷，並且相對 indexOf 更增加了對 NaN 這個元素判斷的支持：

```js
const names = ["abc", "cba", "ndv", "fjd", NaN]

// 第一個參數為要判斷的值，第二個參數為從第幾個元素開始
if (names.includes(NaN, 0)) {
  console.log("包含該元素")
}
```



### 指數運算

在ES7之前要做指數運算可能會通過 Math.pow 完成， ES7 新增了一個對指數運算的簡化寫法：

```js
// 3的3次方
console.log(Math.pow(3, 3) === 3 ** 3)
```



## ES8

### Object.values

透過 Object.values 可以獲取物件中的所有值：

```js
const obj = {
  name: 'Louis',
  age: 26
}

// [ 'Louis', 26 ]
console.log(Object.values(obj))
```

傳入字符串的話會被拆分：

```js
// [ 'L', 'o', 'u', 'i', 's' ]
console.log(Object.values("Louis"))
```

### Object.entries

物件透過 Object.entries 方法可以獲取到一個陣列，該陣列的元素是物件中的 key 和 value 組成：

```js
const obj = {
  name: 'Louis',
  age: 26
}

// [ [ 'name', 'Louis' ], [ 'age', 26 ] ]
console.log(Object.entries(obj))
```

也可以傳入陣列，key 就替換為陣列的下標值：

```js
const names = ['ald', 'ajj', 'fif']

// [ [ '0', 'ald' ], [ '1', 'ajj' ], [ '2', 'fif' ] ]
console.log(Object.entries(names))
```



### padStart 和 padEnd

這兩個方法都可以對字符串進行填充，padStart 是往前面加，padEnd 是往後面加：

```js
const message = 'Hello World'

const newMessage = message.padStart(15, '*').padEnd(20, '-')

// ****Hello World-----
console.log(newMessage)
```



### async

非同步函數：

```js
async function foo() {
  // await
}
```



## ES9

### Async iterators



### Object spread operators

物件展開運算符。



### Promise finally



## ES10

### flat

對陣列的進行降維，參數為進行到第幾層：

```js
const nums = [10, 20, [2, 9], [9, [30, [40, 20, 40]]]]

// [ 10, 20, 2, 9, 9, [ 30, [ 40, 20, 40 ] ] ]
console.log(nums.flat(1))

// [ 10, 20, 2, 9, 9, 30, 40, 20, 40 ]
console.log(nums.flat(3))
```



### flatMap

在對陣列進行循環操作後，會對返回值進行降維：

```js
const messages = ['Hello everyone', 'My name is Louis', 'I am 26 years old']
const newMessages = messages.flatMap(item => {
  return item.split(' ')
})

// [
//   'Hello', 'everyone',
//   'My',    'name',
//   'is',    'Louis',
//   'I',     'am',
//   '26',    'years',
//   'old'
// ]
console.log(newMessages)
```



### Object.fromEntries

可以將一個可迭代的 entries 物件轉換成一般的鍵值對物件：

```js
const entries = [['name', 'Louis'], ['age', 26]]

// ES10 新增了 Object.fromEntries 方法
const newObj2 = Object.fromEntries(entries)

// { name: 'why', age: '26', height: '1.73' }
console.log(newObj2)
```



### trimStart 和 trimEnd

trimStart 去除開始的空格，trimEnd 去除尾部的空格。



### Symbol description

Symbol 數據的描述。



### Optional catch binding



## ES11



### bigInt

在 ES11 之前，最大安全數字為 Number.MAX_SAFE_INTEGER ，在 ES11 多了一種大數類型：

```js
// ES11 BigInt
const bigInt = 9007199254740991028383n

// 要進行加減需要相同類型
console.log(bigInt + 100n)

const num = 100
// 9007199254740991028483n
console.log(bigInt + BigInt(num))
```



### Nullish Coalecing operator

空值合併運算符（Nullish Coalecing operator）會將  0 、 false 和 空字串不視為 undefined：

```js
const foo = false

// 邏輯或會將 0 、 false 和 空字串同樣視為 undefined
const baz = foo || 'default Value'

const bar = foo ?? 'default Value'

// 輸出：default Value , false
console.log(baz, bar)
```



### Optional chaining

可選鏈 （Optional chaining）可以對物件屬性進行是否為空的判斷：

```js
const info = {
  name: 'Louis',
}

// 報錯無法執行
// console.log(info.friend.name)

// 輸出：undefined
console.log(info.friend?.name)
```



### globalThis

全局物件，瀏覽器中是 windo，nodejs環境中是 global。



### Dynamic Import

動態導入模塊，ES Module中解釋。



### Promise.allSettled



### import meta



## ES12



### FinalizationRegistry

創建一個實例用來監測某些物件被銷毀，當註冊的物件被銷毀時，會調用 FinalizationRegistry 傳入的函數：

```js
const finalRegistry = new FinalizationRegistry((value) => {
  console.log('object is destroy', value)
})

let obj = { name: 'Louis' }

// 第一個參數為監測的物件，第二個參數做為 value 傳入 callback 中
finalRegistry.register(obj, 'obj')

obj = null
```



### WeakRef

使用**弱引用**對某個物件：

```js
let obj = { name: 'Louis' }
let info = new WeakRef(obj)

obj = null

// 之後 GC 就會對 obj 本身引用的物件進行回收
setTimeout(() => {
  // undefined
  console.log(info.deref())
}, 10000)
```



### logical assignment operator

 邏輯或的簡化寫法：

```js
let message = ""
// message = message || 'default value'
message ||= 'default value'

// default value
console.log(message)
```

 邏輯與的簡化寫法：

```js
let myName = 'Louis'
let otherName = 'Renny'

myName &&= otherName

// Renny
console.log(myName)
```

 邏輯空的簡化寫法：

```js
let message = ""
// message = message ?? 'default value'
message ??= 'default value'

// 輸出為空字串
console.log(message1)
```



### Numeric Seprator

數字連接符：

```
const number = 100_000_000_000
```



### String.replaceAll：

字符串替換。
