# async、await

ES8 提供的一種基於生成器的語法糖，在函數開頭加上 async 就代表是一個非同步函數：

```js
async function foo() {
  
}
```

非同步函數永遠返回一個 Promise：

```js
async function foo() {
  return '123'
}

const promise = foo()

promise.then(res => {
  console.log(res)
})
```

如果在非同步函數中拋出異常，可以使用 catch 進行捕獲 ：

```js
async function foo() {

  throw new Error('-----')
}

const promise = foo()

promise.then(res => {

}).catch(err => {
  console.log(err)
})
```

在非同步函數中可以透過 await 關鍵字獲取 promise 的返回結果，在這等待結果返回的過程中都是同步執行的：

```js
async function foo() {
  const res = await new Promise((resolve) => {
    resolve('123')
  })
  console.log(res)
}
foo()
```