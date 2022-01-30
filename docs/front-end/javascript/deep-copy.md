# Deep copy

物件的複製可以簡單分成兩種：

- 淺拷貝（shallow copy）：物件的淺層複製，內部引入的物件仍然會相互引響
- 深拷貝（deep sopy）：複製出來的物件和原物件不再有任何關係，不會互相影響



## 利用 JSON 物件

利用 JSON 物件可以進行深拷貝：

```js
const obj = {
  name: 'Louis',
  age: 26,
  freinds: {
    name: 'Renny',
    age: 31
  }
}

const info = JSON.parse(JSON.stringify(obj))
```

缺點：

- 物件中的屬性的值不能為函數
- 物件中的屬性不能為 Symbol 格式
- 物件中不能存在屬性指向自己（循環引用）



## 基本實現

透過遞迴調用實現一個簡易的深拷貝函數：

```js
function isObject(value) {
  const valueType = typeof value
  return (value !== null) && (valueType === 'object' || valueType === 'function')
}

function deepClone(originValue) {
  // 判斷傳入的 originValue 是否是一個物件類型
  if(!isObject(originValue)) {
    return originValue
  }
  const newObj = {}
  for(const key in originValue) {
    // 遞歸調用
    newObj[key] = deepClone(originValue[key])
  }
  return newObj
}
```

加入判斷條件以對應不同的類型格式：

```js
function isObject(value) {
  const valueType = typeof value
  return (value !== null) && (valueType === 'object' || valueType === 'function')
}

function deepClone(originValue) {
  // map/set 簡單處理
  if (originValue instanceof Set) {
    return new Set([...originValue])
  }
  if (originValue instanceof Map) {
    return new Map([...originValue])
  }

  // 判斷如果值為 Symbaol，創建一個新的 Symbol
  if (typeof originValue === 'symbol') {
    return Symbol(originValue.description)
  }

  // 判斷如果是函數類型直接複用
  if (typeof originValue === 'function') {
    return originValue
  }

  // 判斷傳入的 originValue 是否是一個物件類型
  if(!isObject(originValue)) {
    return originValue
  }
  
  // 判斷是陣列或是物件
  const newObj = Array.isArray(originValue) ? [] : {}
  for(const key in originValue) {
    // 遞歸調用
    newObj[key] = deepClone(originValue[key])
  }

  // 對 Symbol 的 key 進行處理
  const symbolKeys = Object.getOwnPropertySymbols(originValue)
  for(const sKey of symbolKeys) {
    // 沒必要創建一個新的 key
    newObj[sKey] = deepClone(originValue[sKey])
  }

  return newObj
}
```

透過加入一個 WeakMap 參數，將 key 設置為原物件，可以在遞歸調用時判斷值是否為原物件：

```js
function isObject(value) {
  const valueType = typeof value
  return (value !== null) && (valueType === 'object' || valueType === 'function')
}

function deepClone(originValue, map = new WeakMap()) {
  // map/set 簡單處理
  if (originValue instanceof Set) {
    return new Set([...originValue])
  }
  if (originValue instanceof Map) {
    return new Map([...originValue])
  }

  // 判斷如果值為 Symbaol，創建一個新的 Symbol
  if (typeof originValue === 'symbol') {
    return Symbol(originValue.description)
  }

  // 判斷如果是函數類型直接複用
  if (typeof originValue === 'function') {
    return originValue
  }

  // 判斷傳入的 originValue 是否是一個物件類型
  if(!isObject(originValue)) {
    return originValue
  }

  // 判斷如果是循環引用直接返回新物件
  if(map.has(originValue)) {
    return map.get(originValue)
  }
  
  // 判斷是陣列或是物件
  const newObj = Array.isArray(originValue) ? [] : {}
  // 保存原物件作為 key
  map.set(originValue, newObj)
  for(const key in originValue) {
    // 遞歸調用
    newObj[key] = deepClone(originValue[key], map)
  }

  // 對 Symbol 的 key 進行處理
  const symbolKeys = Object.getOwnPropertySymbols(originValue)
  for(const sKey of symbolKeys) {
    // 沒必要創建一個新的 key
    newObj[sKey] = deepClone(originValue[sKey], map)
  }

  return newObj
}
```

