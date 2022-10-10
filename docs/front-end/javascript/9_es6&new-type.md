# ES6 中新增的數據類型

在 ES6 之前，存儲數據的結構主要有兩種：陣列、物件，ES6 新增了另外兩種資料結構：Set、Map 以及它們的另外形式 WeakSet、Weakmap。

## Set

Set 物件可以儲存任何類型的唯一值：

```js
const set = new Set()

set.add(10)
set.add(20)

set.add(10)

// Set(4) { 10, 20 }
console.log(set)
```

記憶體地址不同可以重複添加：

```js
const set = new Set()

// 內存地址不同可以添加
set.add({})
set.add({})

// Set(4) { {}, {} }
console.log(set)
```

記憶體地址相同不可重複添加：

```js
const set = new Set()

// 內存地址相同無法重複添加
const obj = {}
set.add(obj)
set.add(obj)

// Set(4) { {} }
console.log(set)
```

Set 也可以用來為陣列去除重複的元素：

```js
// 為陣列去重
const arr = [33, 30, 33, 40, 30, 444, 5050]

const arrSet = new Set(arr)
console.log([...arrSet])
```

總結一下 Set 物件包含的幾種屬性和方法：

- size 屬性：獲取 Set 物件的元素個數。
- add 方法：為 Set 物件添加元素。
- delete 方法：為 Set 物件刪除元素，需要傳入指定的變數。
- has 方法：查找 Set 物件內有沒有該元素，返回 boolean 類型。
- clear 方法：清空 Set 物件。
- 可以使用 forEach 方法，和 for ... of 對 Set 物件進行遍歷。

## WeakSet

WeakSet 和 Set 結構基本相似，只有兩點差別：

- 不能存放基本的數據類型，只能存放物件；
- 對內部物件是一個**弱引用**，意思 WeakSet 中的某個物件對應的記憶體地址若沒有其他物件指向，那麼 GC 就會對 WeakSet 中的該物件進行回收。

```js
let obj = {
  name: 'Louis'
}

const set = new WeakSet()
set.add(obj)

obj = null
```

由於是弱引用的關係，如果遍歷獲取到某個元素，可能會導致該元素無法正常銷毀，所以不能進行循環遍歷，進行打印也不會正常顯示內部的元素。

以下是一個 WeakSet 的使用情境：

```js
// 不用 Set 的原因是如果銷毀實例， WeakSet 中存在的物件會跟著銷毀
const personSet = new WeakSet()

class Person {
  constructor() {
    personSet.add(this)
  }
  running() {
    if (!personSet.has(this)) {
      throw new Error('is not correct this!')
    }
    console.log('running~', this)
  }
}

const p = new Person()

// error!
p.running.call({ name: 'Louis' })
```

## Map

Map 用於儲存映射關係，和一般的物件不同，Map 的 key 可以使用物件：

```js
const obj1 = {
  name: 'Renny'
}

const obj2 = {
  name: 'Louis'
}

// Map 允許使用物件類型作為 key
const map = new Map()
map.set(obj1, 'aaa')
map.set(obj2, 'bbb')

// Map(2) { { name: 'Renny' } => 'aaa', { name: 'Louis' } => 'bbb' }
console.log(map)
```

在 new Map 時也可以傳入陣列作為參數：

```js
const obj1 = {
  name: 'Renny'
}

const obj2 = {
  name: 'Louis'
}

const map = new Map([
  [obj1, 'aaa'],
  [obj2, 'bbb'],
  [2, 'ddd']
])

// Map(2) { { name: 'Renny' } => 'aaa', { name: 'Louis' } => 'bbb' }
console.log(map)
```

總結一下 Map 物件包含的幾種屬性和方法：

- size 屬性：獲取 Map 物件的鍵值對個數。
- add 方法：為 Map 物件添加元素。
- delete 方法：為 Map 物件刪除元素，需要傳入指定的變數。
- has 方法：查找 Map 物件內有沒有該元素，返回 boolean 類型。
- clear 方法：清空 Map 物件。
- 可以使用 forEach 方法，和 for ... of 對 Map 物件進行遍歷。

## WeakMap

WeakMap 和 Map 結構基本相似，只有兩點差別：

- WeakMap 的 key 只使用物件，不接受其他類型作為 key；
- 對 key 物件是一個**弱引用**，意思 WeakMap 中的某個 key 對應的記憶體地址若沒有其他物件指向，那麼 GC 就會對 WeakMap 中的該 key 和 value 進行回收。

```js
let obj = { name: 'obj1' }

const map = new WeakMap()

map.set(obj, 'aaa')

obj = null
```

WeakMap 在使用上有一個相當廣為人知的案例， Vue3 底層的響應式就是利用到 WeakMap 保存數據對應函數的依賴關係，以下實現一個簡化的案例：

```js
const obj = {
  name: 'Louis'
}

function objNameFn() {
  console.log('obj name is change')
}

const weakMap = new WeakMap()

const objMap = new Map()

objMap.set('name', [objNameFn])
weakMap.set(obj, objMap)

// 當目標物件發生改變，Vue3 會透過 proxy 監聽獲取對應的物件和屬性
const targetMap = weakMap.get(obj)
const fns = targetMap.get('name')

fns.forEach((item) => {
  item()
})
```
