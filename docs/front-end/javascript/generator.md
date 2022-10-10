# 生成器

生成器是 ES6 新增一種函數控制、使用的方案，可以更加靈活的控制函數什麼時候執行或是暫停，被認爲是一種特殊的迭代器，首先要創建一個生成器函數，該生成器函數返回生成器：

```js
function* foo() {
  const value1 = 100
  yield value1
}
```

## next 方法

next 方法能夠讓函數分次調用：

```js
function* foo() {
  // 1.
  console.log('生成器函數開始')
  const value1 = 100
  yield value1

  // 2.
  const value2 = 200
  yield value2

  // 3.
  const value3 = 300
  yield value3

  // 4.
  console.log('生成器函數結束')
  // 結束時返回
  return '123'
}

const generator = foo()

console.log(generator.next())
console.log('------')
console.log(generator.next())
console.log('------')
console.log(generator.next())
console.log('------')
console.log(generator.next())
```

輸出結果為：

```
生成器函數開始
{ value: 100, done: false }
------
{ value: 200, done: false }
------
{ value: 300, done: false }
------
生成器函數結束
{ value: '123', done: true }
```

也可以傳入參數：

```js
function* foo() {
  const value1 = 100
  // 透過第一個 yield 的返回值，能夠獲取第二個 next 傳入的參數
  const n = yield value1

  const value2 = 200 * n
  yield value2
}

const generator = foo()

console.log(generator.next())
console.log(generator.next(10))
```

輸出結果為：

```js
{ value: 100, done: false }
{ value: 2000, done: false }
```

## return 方法

生成器中的 return 方法能夠終止生成器繼續向下執行，調用 return 方法後會將傳入的參數作為結果返回並且將之後再調用 next 方法無法繼續向下執行程式：

```js
function* foo() {
  const value1 = 100
  const n = yield value1

  const value2 = 200 * n
  yield value2
}

const generator = foo()

console.log(generator.next())
console.log(generator.return(10))
console.log(generator.next())
console.log(generator.next())
```

輸出結果為：

```
{ value: 100, done: false }
{ value: 10, done: true }
{ value: undefined, done: true }
{ value: undefined, done: true }
```

## throw 方法

```js
function* foo() {
  const value1 = 100
  try {
    // throw 會在這邊拋出異常，如果有將該異常捕獲程式碼就可以向下執行
    yield value1
  } catch (error) {
    console.log(error)
    yield 'abc'
  }

  const value2 = 200
  yield value2
}

const generator = foo()

console.log(generator.next())
console.log('-------')
console.log(generator.throw(10))
console.log('-------')

console.log(generator.next())
console.log(generator.next())
```

輸出結果為：

```
{ value: 100, done: false }
-------
10
{ value: 'abc', done: false }
-------
{ value: 200, done: false }
{ value: undefined, done: true }
```

## 用生成器替代迭代器

```js
function* createArrayIterator(arr) {
  // 第一種寫法
  // for(const item of arr) {
  //   yield item
  // }

  // 第二種寫法
  yield* arr
}

const names = ['abc', 'dcd', 'jdjd']

const namesIterator = createArrayIterator(names)

console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
```

## 非同步程式碼的處理方案

生成器用於處理非同步程式碼是非常簡潔明瞭的，可以透過生成器實現一個類似於 async、await 的方案，首先透過遞迴實現一個執行函數：

```js
function execGenerator(genFn) {
  const generator = genFn()

  function exec(res) {
    const result = generator.next(res)
    if (result.done) {
      return result.value
    }
    result.value.then((res) => {
      exec(res)
    })
  }
  exec()
}
```

以下的程式碼用來模擬非同步請求：

```js
function requestData(params) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(params)
    }, 200)
  })
}

function* getData() {
  const res1 = yield requestData('aaa')
  const res2 = yield requestData(res1 + 'bbb')
  console.log(res2)
}

execGenerator(getData)
```

所以本質上，async 和 await 其實就是 generator 和 promise 的一種語法糖而已：

```js
async function getData() {
  const res1 = await requestData('aaa')
  const res2 = await requestData(res1 + 'bbb')
  console.log(res2)
}
getData()
```
