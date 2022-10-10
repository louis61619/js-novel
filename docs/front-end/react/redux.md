# Redux

在很多場景中，對於數據的管理都相當重要，一個狀態管理的第三方庫如 Redux，能對開發產生極大的幫助：

- 保證數據可被追蹤並且可被預測。
- 所有數據變化，必須通過派發 action 來更新。
- Action 是一個普通的 JavaScript 物件，用來描述這次更新的類型 （type）和內容（content）。

## Redux 三大原則

- 單一數據源
- State 是只讀的
- 使用純函數來執行修改

## 如何使用

首先定義初始化值：

```js
const initialState = {
  counter: 0
}
```

創建容器（store）:

```js
function reducer(state = initialState, action) {}

const store = redux.createStore(reducer)
```

定義 action :

```js
const action1 = { type: 'INCREMENT' }
```

在定義 action 後我們可以在 reducer 中寫上針對該 type 要進行的操作，比如說＋ 1，然後將全新的 state 返回：

```js
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 }
    default:
      return state
  }
}
```

最後可以通過派發 action 來操作 store：

```js
// 通過 dispatch 來調用 reducer 函數並將 action 作為參數傳入 reducer 中
store.dispatch(action1)
```

當然，在派發 action 之前可以對 state 的改變作定閱：

```js
store.subscribe(() => {
  console.log('state 發生改變', store.getState())
})
```

## 優化

可以將 action 寫成函數以便傳入參數，如：

```js
const addAction = (num) => {
  return {
    type: 'INCREMENT',
    num
  }
}
store.dispatch(addAction(10))
```

由於在 reducer 和 action 中都要對 type 進行獲取，可以將 type 定義成一個常量直接進行引用：

```js
const INCREMENT = 'INCREMENT'

const addAction = (num) => {
  return {
    type: INCREMENT,
    num
  }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, counter: state.counter + 1 }
    default:
      return state
  }
}
```

有時後為了避免 reducer 過於臃腫，可以進行拆分：

```js
const defaultCounterState = {
  counter: 0
}

function counterReducer(state = defaultCounterState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, counter: state.counter + action.num }

    default:
      return state
  }
}

function reducer(state = {}, action) {
  return {
    counterState: counterReducer(state.counterState, action)
    // ... 可以放入更多的 reducer
  }
}
```
