# Iterator

**迭代器**（iterator），是確使使用者可在容器物件（container，例如[連結串列](https://zh.wikipedia.org/wiki/鏈表)或[陣列](https://zh.wikipedia.org/wiki/陣列)）上遍訪的[物件](https://zh.wikipedia.org/wiki/对象_(计算机科学))[[1\]](https://zh.wikipedia.org/wiki/迭代器#cite_note-1)[[2\]](https://zh.wikipedia.org/wiki/迭代器#cite_note-definition-2)[[3\]](https://zh.wikipedia.org/wiki/迭代器#cite_note-3)，設計人員使用此介面無需關心容器物件的記憶體分配的實現細節。其行為很像資料庫技術中的[游標](https://zh.wikipedia.org/wiki/指標_(資料庫))（cursor），迭代器最早出現在1974年設計的[CLU](https://zh.wikipedia.org/wiki/CLU)程式語言中。

簡言之，迭代器就是可以對某個數據結構進行遍歷的物件。

JavaScript 中，迭代器是一個具體的物件，這個物件需要符合符合迭代器協議（iterator protocal），迭代器協議定義了產生一系列值的標準方式。

編寫一個迭代器：

```js
const names = ['abc', 'dcd', 'jdjd']

// 創建一個迭代器來訪問 names
let index = 0
const namesIterator = {
  next: function() {
    if(index < names.length) {
      return { done: false, value: names[index++] }
    } else {
      return { done: true, value: undefined }
    }
  }
}

console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
```

輸出：

```
{ done: false, value: 'abc' }
{ done: false, value: 'dcd' }
{ done: false, value: 'jdjd' }
{ done: true, value: undefined }
```

也可以寫一隻自動生成迭代器的函數：

```js
function createArrayIterator(arr) {
  let index = 0
  return {
    next() {
      if(index < arr.length) {
        return { done: false, value: arr[index++] }
      } else {
        return { done: true, value: undefined }
      }
    }
  }
}
```



## 可迭代物件

可迭代物件是指一個物件實現了可迭代 （iterable protocal） 協議。

```js
const iterableObj = {
  names: ['abc', 'cba', 'bba'],
  [Symbol.iterator]: function() {
    let index = 0
    return {
      next: () => {
        if (index < this.names.length) {
          return { done: false, value: this.names[index++] }
        } else {
          return { done: true, value: undefined }
        }
      }
    }
  }
}
```

可以這樣使用：

```js
const iterator = iterableObj[Symbol.iterator]()

// { done: false, value: 'abc' }
console.log(iterator.next())

// { done: false, value: 'cba' }
console.log(iterator.next())

// { done: false, value: 'bba' }
console.log(iterator.next())

// { done: true, value: undefined }
console.log(iterator.next())
```

也可以使用 for...of 進行遍歷，本質上 for ... of 就是以上寫法的語法糖，當 done 成為 true 時就遍歷就會停止：

```js
for(const item of iterableObj) {
  console.log(item)
}
```

 所以的可迭代物件，都內置了這樣一個函數：

```js
const names = ["abc", "cvn", "aaa"]
// [Function: values]
console.log(names[Symbol.iterator])
```

