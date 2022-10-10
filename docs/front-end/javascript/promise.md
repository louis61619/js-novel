# Promise

在沒有 Promise 是如和處理的網路請求的呢？可以通過 callback 的形式：

```js
function requestData(params, successCallback, failtureCallback) {
  setTimeout(() => {
    if (params === 'google') {
      // 成功
      let data = ['fkfk', 'fkfk', 'fkfkf']
      successCallback(data)
    } else {
      // 失敗
      let errMessage = '請求失敗'
      failtureCallback(errMessage)
    }
  })
}

requestData(
  'google',
  (res) => {
    console.log(res)
  },
  (err) => {
    console.log(err)
  }
)
```

callback 方式的弊端：

- 需要自己設計好 requestData
- 如果使用第三方庫，需要看文檔或是源代碼才能了解如何使用

ES6 就實現了一個更好的方案，Promise。

## Promise 的基本使用

- Promise 是一個類，可以翻譯成承諾、期約。
- 在通過 new 創建 Promise 物件時，需要傳入一個回調函數，稱之為 executor，回調函數有兩個參數 resolve 和 reject ，當調用 resolve 時，會執行 Promise 物件的 then 方法傳入的回調函數，當調用 reject 時，會執行 Promise 物件的 catch 方法傳入的回調函數。

```js
// 成功時調用 resolve
// 失敗時調用 reject
const promise = new Promise((resolve, reject) => {
  resolve()
})

promise.then(() => {
  console.log('----success---')
})

promise.catch(() => {
  console.log('----err----')
})
```

非同步請求的 Promise：

```js
function requestData(params) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (params === 'google') {
        // 成功
        let data = ['fkfk', 'fkfk', 'fkfkf']
        resolve(data)
      } else {
        // 失敗
        let errMessage = '請求失敗'
        reject(errMessage)
      }
    }, 3000)
  })
}

const promise = requestData('google')

// then 中可以同時處理 resolve 和 reject
promise.then(
  (res) => {
    console.log(res)
  },
  (err) => {
    console.log(err)
  }
)
```

Promise 可以被分為幾個階段，每個階段一但被確立就是不可更改的：

```js
new Promise((resolve, reject) => {
  // pending 階段
  resolve()
}).then(
  (res) => {
    // fulfilled 階段
    console.log(res)
  },
  (err) => {
    // rejected 階段
    console.log(err)
  }
)
```

## resolve 參數

resolve 參數有兩個例外情況。

當傳入 Promise 物件作為 resolve 參數時，那麼當前 Promise 的狀態會交由傳入的 Promise 來決定：

```js
const newPromise = new Promise((resolve, reject) => {})

new Promise((resolve, reject) => {
  resolve(newPromise)
  // newPromise沒調用resolve, reject所以不會往下執行
}).then(
  (res) => {
    console.log(res)
  },
  (err) => {
    console.log(err)
  }
)
```

當傳入一個物件，並且該物件有實現 then 方法時，那麼會執行 then 方法，並且由該方法決定後續狀態：

```js
const obj = {
  then(resolve, reject) {
    reject('error')
  }
}

new Promise((resolve, reject) => {
  resolve(obj)
}).then(
  (res) => {
    console.log(res)
  },
  (err) => {
    // 打印 error
    console.log(err)
  }
)
```

## Promise 的實例方法

### then

當 resolve 被調用時，所有 then 方法都會被調用：

```js
const promise = new Promise((resolve, reject) => {
  resolve('1111')
})

// 當 resolve 被調用時，所有 then 方法都會被調用
promise.then((res) => {
  console.log(res)
})

promise.then((res) => {
  console.log(res)
})

promise.then((res) => {
  console.log(res)
})
```

當返回一個值，那麼這個值會作為一個新的 Promise 的 resolve 值：

```js
const promise = new Promise((resolve, reject) => {
  resolve('1111')
})

// 當返回一個普通值，那麼這個值會作為一個新的 Promis 的 resolve 值
promise
  .then((res) => {
    return '123'
  })
  .then((res) => {
    console.log(res)
  })
```

### catch

當 excutor 拋出異常時，也會調用錯誤捕獲的回調函數：

```js
const promise = new Promise((resolve, reject) => {
  throw new Error()
  // reject('1111')
})

promise.catch((err) => {
  console.log('---')
})
```

catch 也可以寫在 then 方法之後，相當於一個語法糖，前面的 promise 拋出的錯誤都會進行捕獲：

```js
const promise = new Promise((resolve, reject) => {
  throw new Error()
  // reject('1111')
})

promise
  .then((res) => {
    return new Promise((resolve, reject) => {
      reject('error')
    })
  })
  .catch((err) => {
    console.log(err)
  })
```

catch 的返回值也是一個 Promise：

```js
const promise = new Promise((resolve, reject) => {
  throw new Error()
  // reject('1111')
})

promise
  .then((res) => {})
  .catch((err) => {
    return '-----'
  })
  .then((res) => {
    // 輸出：-----
    console.log(res)
  })
```

### finally

finally 是 ES9 新增的一個方法，Promise 無論成功失敗都會執行：

```js
const promise = new Promise((resolve, reject) => {
  resolve('success')
})

promise
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    console.log('finally')
  })
```

## Promise 的類方法

### Promise.resolve

可以將一個值轉換為 Promise 物件，並且回調 resolve 函數：

```js
const objPromise = Promise.resolve({ name: 'Louis' })
objPromise.then((res) => {
  console.log(res)
})
```

等價於：

```js
const objPromise = new Promise((resolve, reject) => {
  resolve({ name: 'Louis' })
})
objPromise.then((res) => {
  console.log(res)
})
```

### Promise.reject

可以將一個值轉換為 Promise 物件，並且回調 reject 函數：

```js
const objPromise = Promise.reject({ name: 'Louis' })
objPromise.catch((err) => {
  console.log(err)
})
```

等價於：

```js
const objPromise2 = new Promise((resolve, reject) => {
  reject({ name: 'Louis' })
})
objPromise.catch((err) => {
  console.log(err)
})
```

### Promis.all

同時拿到全部 Promise 返回的結果，result 為返回一個陣列：

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('1111')
  }, 500)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('2222')
  }, 200)
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('333')
  }, 700)
})

// 結果是依需返回
// 只要有一個 promise 變成 reject ，那麼會直接調用 catch
Promise.all([p1, p2, p3, '---'])
  .then(([res1, res2, res3, res4]) => {
    console.log(res1, res2, res3, res4)
  })
  .catch((err) => {
    console.log(err)
  })
```

### Promise.allSettled

allSettled 最終一定是調用 then 方法：

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('1111')
  }, 500)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('2222')
  }, 200)
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('333')
  }, 700)
})

Promise.allSettled([p1, p2, p3, '---']).then(([res1, res2, res3, res4]) => {
  console.log(res1, res2, res3, res4)
})
```

最終打印出來的會是一個數組，返回各自的結果：

```js
;[
  { status: 'fulfilled', value: '1111' },
  { status: 'fulfilled', value: '2222' },
  { status: 'rejected', reason: '333' },
  { status: 'fulfilled', value: '---' }
]
```

### Promise.race

只要有一個 Promise 返回結果，就結束：

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('1111')
  }, 500)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('2222')
  }, 200)
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('333')
  }, 700)
})

Promise.race([p1, p2, p3]).then((res) => {
  // 2222
  console.log(res)
})
```

### Promise.any

ES12 中新增的方法，只要有一個 Promise 返回的結果是成功的，就調用 then 方法，如果所有 Promise 都失敗，則調用 catch 方法，從 callback 中參數 errors 屬性能獲取 reject 返回值的陣列集合：

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('1111')
  }, 500)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('2222')
  }, 200)
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('333')
  }, 700)
})

Promise.race([p1, p2, p3])
  .then((res) => {
    // 1111
    console.log(res)
  })
  .catch((err) => {
    // err: [AggregateError: All promises were rejected]
    console.log(err.errors)
  })
```

## Promise 如何實現

[promis A+](https://promisesaplus.com/) 是一個開放的規範，為如何設計一個開源的 Promise 制定一個共同的標準，會參考這些規範實現一個簡易的 Promise。

先創造一個 MyPromise 類：

```js
class MyPromise {
  constructor(executor) {
    const resolve = () => {}

    const reject = () => {}

    executor(resolve, reject)
  }
}
```

定義 Promise 中不同階段的狀態：

```js
const PROMISE_STATUS_PENDING = 'pedding'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    this.stauts = PROMISE_STATUS_PENDING

    const resolve = () => {
      if (this.stauts === PROMISE_STATUS_PENDING) {
        this.stauts = PROMISE_STATUS_FULFILLED
        console.log('resolve 被調用')
      }
    }

    const reject = () => {
      if (this.stauts === PROMISE_STATUS_PENDING) {
        this.stauts = PROMISE_STATUS_REJECTED
        console.log('reject 被調用')
      }
    }

    executor(resolve, reject)
  }
}
```

添加 then 方法：

```js
const PROMISE_STATUS_PENDING = 'pedding'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    this.stauts = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = (value) => {
      if (this.stauts === PROMISE_STATUS_PENDING) {
        // 使用微任務進行延遲以添加 then 的回調函數
        queueMicrotask(() => {
          if (this.stauts !== PROMISE_STATUS_PENDING) return
          this.stauts = PROMISE_STATUS_FULFILLED
          this.value = value
          this.onFulfilledFns.forEach((fn) => {
            fn(this.value)
          })
        })
      }
    }

    const reject = (reason) => {
      if (this.stauts === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.stauts !== PROMISE_STATUS_PENDING) return
          this.stauts = PROMISE_STATUS_REJECTED
          this.reason = reason
          this.onRejectedFns.forEach((fn) => {
            fn(this.reason)
          })
        })
      }
    }

    // executor(resolve, reject)
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      // 如果在 then 調用的時候狀態已經確定了
      if (this.stauts === PROMISE_STATUS_FULFILLED && onFulfilled) {
        try {
          const value = onFulfilled(this.value)
          resolve(value)
        } catch (error) {
          reject(error)
        }
      }
      if (this.stauts === PROMISE_STATUS_REJECTED && onRejected) {
        try {
          const reason = onRejected(this.reason)
          resolve(reason)
        } catch (error) {
          reject(error)
        }
      }

      // 將成功和失敗的回調放到陣列中
      if (this.stauts === PROMISE_STATUS_PENDING) {
        this.onFulfilledFns.push(() => {
          try {
            const value = onFulfilled(this.value)
            resolve(value)
          } catch (error) {
            reject(error)
          }
        })
        this.onRejectedFns.push(() => {
          try {
            const reason = onRejected(this.reason)
            resolve(reason)
          } catch (error) {
            reject(error)
          }
        })
      }
    })
  }
}
```

加入 finally 和 catch API：

```js
const PROMISE_STATUS_PENDING = 'pedding'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value)
    resolve(result)
  } catch (error) {
    reject(error)
  }
}

class MyPromise {
  constructor(executor) {
    this.stauts = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = (value) => {
      if (this.stauts === PROMISE_STATUS_PENDING) {
        // 使用微任務進行延遲以添加 then 的回調函數
        queueMicrotask(() => {
          if (this.stauts !== PROMISE_STATUS_PENDING) return
          this.stauts = PROMISE_STATUS_FULFILLED
          this.value = value
          this.onFulfilledFns.forEach((fn) => {
            fn(this.value)
          })
        })
      }
    }

    const reject = (reason) => {
      if (this.stauts === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.stauts !== PROMISE_STATUS_PENDING) return
          this.stauts = PROMISE_STATUS_REJECTED
          this.reason = reason
          this.onRejectedFns.forEach((fn) => {
            fn(this.reason)
          })
        })
      }
    }

    // executor(resolve, reject)
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    // 如果沒有 onRejected 給予默認函數
    const defaultOnRejected = (err) => {
      throw err
    }
    onRejected = onRejected || defaultOnRejected

    const defaultOnFulfilled = (value) => value
    onFulfilled = onFulfilled || defaultOnFulfilled

    return new MyPromise((resolve, reject) => {
      // 如果在 then 調用的時候狀態已經確定了
      if (this.stauts === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
      }
      if (this.stauts === PROMISE_STATUS_REJECTED && onRejected) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
      }

      // 將成功和失敗的回調放到陣列中
      if (this.stauts === PROMISE_STATUS_PENDING) {
        if (onFulfilled)
          this.onFulfilledFns.push(() => {
            execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
          })
        if (onRejected)
          this.onRejectedFns.push(() => {
            execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
          })
      }
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    this.then(
      () => {
        onFinally()
      },
      () => {
        onFinally()
      }
    )
  }
}
```

添加靜態方法：

```js
const PROMISE_STATUS_PENDING = 'pedding'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value)
    resolve(result)
  } catch (error) {
    reject(error)
  }
}

class MyPromise {
  constructor(executor) {
    this.stauts = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = (value) => {
      if (this.stauts === PROMISE_STATUS_PENDING) {
        // 使用微任務進行延遲以添加 then 的回調函數
        queueMicrotask(() => {
          if (this.stauts !== PROMISE_STATUS_PENDING) return
          this.stauts = PROMISE_STATUS_FULFILLED
          this.value = value
          this.onFulfilledFns.forEach((fn) => {
            fn(this.value)
          })
        })
      }
    }

    const reject = (reason) => {
      if (this.stauts === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.stauts !== PROMISE_STATUS_PENDING) return
          this.stauts = PROMISE_STATUS_REJECTED
          this.reason = reason
          this.onRejectedFns.forEach((fn) => {
            fn(this.reason)
          })
        })
      }
    }

    // executor(resolve, reject)
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    // 如果沒有 onRejected 給予默認函數
    const defaultOnRejected = (err) => {
      throw err
    }
    onRejected = onRejected || defaultOnRejected

    const defaultOnFulfilled = (value) => value
    onFulfilled = onFulfilled || defaultOnFulfilled

    return new MyPromise((resolve, reject) => {
      // 如果在 then 調用的時候狀態已經確定了
      if (this.stauts === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
      }
      if (this.stauts === PROMISE_STATUS_REJECTED && onRejected) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
      }

      // 將成功和失敗的回調放到陣列中
      if (this.stauts === PROMISE_STATUS_PENDING) {
        if (onFulfilled)
          this.onFulfilledFns.push(() => {
            execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
          })
        if (onRejected)
          this.onRejectedFns.push(() => {
            execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
          })
      }
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    this.then(
      () => {
        onFinally()
      },
      () => {
        onFinally()
      }
    )
  }

  static resolve(value) {
    return new MyPromise((resolve) => resolve(value))
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason))
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const values = []
      promises.forEach((promise) => {
        promise.then(
          (res) => {
            values.push(res)
            if (values.length === promises.length) {
              resolve(values)
            }
          },
          (err) => {
            reject(err)
          }
        )
      })
    })
  }

  static allSettiled(promises) {
    return new MyPromise((resolve, reject) => {
      const results = []
      promises.forEach((promise) => {
        promise.then(
          (res) => {
            results.push({ status: PROMISE_STATUS_FULFILLED, value: res })
            if (results.length === promises.length) {
              resolve(results)
            }
          },
          (err) => {
            results.push({ status: PROMISE_STATUS_REJECTED, reason: err })
            if (results.length === promises.length) {
              resolve(results)
            }
          }
        )
      })
    })
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve, reject)
      })
    })
  }

  static any(promises) {
    // resolve 必須等到有一個成功的結果
    // reject 所有都失敗
    const reasons = []
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve, (err) => {
          reasons.push(err)
          if (reasons.length === promises.length) {
            reject(new AggregateError(reasons))
          }
        })
      })
    })
  }
}
```
