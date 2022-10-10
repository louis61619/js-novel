# 函式程式設計

函數式程式設計（ Funtional Programming ）又稱函數式編程，JavaScript 具備了函數式編程的幾種重要的特徵，而許多框架比如：React，都非常受到函數式編程這個概念的影響，所以了解一下函數式編程的幾種基本概念是非常重要的。

## 純函數(Pure function)

不論是在 React 中使用 React hook、Redux 或是在 Vue3 中使用 composition api，純函數的概念都相當重要。

純函數在維基中的定義為：

- 此函數在相同的輸入值時，需產生相同的輸出。
- 函數的輸出和輸入值以外的其他隱藏信息或[狀態](https://zh.wikipedia.org/w/index.php?title=程式狀態&action=edit&redlink=1)無關，也和由[I/O](https://zh.wikipedia.org/wiki/I/O)設備產生的外部輸出無關。
- 該函數不能有語義上可觀察的[函數副作用](https://zh.wikipedia.org/wiki/函数副作用)，諸如「觸發事件」，使輸出設備輸出，或更改輸出值以外物件的內容等。

可以簡單總結一下：

- 確定的輸入，一定會產生確定的輸出。
- 函數在執行的過程中，不能產生**副作用**。

> 副作用(side effect)：在計算機科學中，表示一個函數在執行時，除了返回值之外，還產生了一些其他附加的影響，比如修改了全局變數、修改傳入參數的值等等。

### 純函數案例：

```js
function foo(num1, num2) {
  return num1 * 1 + num2 * 3
}
```

函數 foo 遵循純函數的規則，確定的輸入產生確定的輸出，在執行過程中不產生副作用。

非純函數案例：

```js
var a = 'abc'
function bar(num1, num2) {
  a = 'bca'
  return num1 * 1 + num2 * 3
}
```

可以看到函數 bar 明顯有對函數外部的變數進行更動，這就明顯不是純函數。

```js
function baz(info) {
  info.age = 100
}

var obj = { name: 'Louis', age: 19 }
baz(obj)
```

函數 baz 對引用的參數進行了修改，這也並非純函數，如果要遵守純函數的設計原則，應該是：

```js
function baz(info) {
  return {
    ...info,
    age: 100
  }
}
```

透過解構語法產生新的物件，再對新的物件進行修改。

### 純函數的優勢

純函數在使用上因為可以確保不會有任何函數外部的值被調用，所以開發者只需要關心函數的輸入，而輸入的內容在純函數中也是不被允許修改的，當輸入輸出確定，對開發者的心智負擔也會更低，在大型軟件開發時更具有優勢。

現代前端框架中，比如 React，框架要求使用者在進行設計的時候，函數組件必須是個純函數：

```js
function HelloWorld(props) {
  props.info = {}
}
```

像是以上直接對 props 修改的操作，在 React 中是不被允許的。

## 柯里化(Currying)

維基百科中對柯理化的定義如下：

**柯里化**是把接受多個[參數](<https://zh.wikipedia.org/wiki/參數_(程式設計)>)的[函數](https://zh.wikipedia.org/wiki/函数)變換成接受一個單一參數（最初函數的第一個參數）的函數，並且返回接受餘下的參數而且返回結果的新函數的技術。

在直覺上，柯里化聲稱「如果你固定某些參數，你將得到接受餘下參數的一個函數」。

來舉一個函數柯里化的過程做為例子：

```js
function add(x, y, z) {
  return x + y + z
}
```

如果要對 add 函數進行柯里化，可以修改成：

```js
function add1(x) {
  return function (y) {
    return function (z) {
      return x + y + z
    }
  }
}
```

如果覺得要不斷 return 非常麻煩，以上的 add1 函數其實等價於：

```js
var add2 = (x) => (y) => (z) => x + y + z
```

相對於一般的函數直接傳入參數，柯里化後的函數是一層層將參數傳入的：

```js
var result = add2(10)(20)(30)
```

### 爲什麼需要柯里化

如果將函數柯里化，可以將一個大的複雜函數拆解成不同的**單一職責**的小函數並返回，這些小函數更有利於**重複使用**。

如果有一個函數需要對 x, y, z 三個參數進行計算：

```js
function add(x, y, z) {
  x = 0 + 2
  y = y * 2
  z = z * z
  return x + y + z
}
```

我們可以將 add 函數拆解成不同的只有單一職則的函數：

```js
function add(x) {
  x = 0 + x
  return function (y) {
    y = y * 2
    return function (z) {
      z = z * z
      return x + y + z
    }
  }
}
```

這樣做可以不斷的利用返回的函數，比如對每一次返回的函數進行賦值：

```js
// 0+2=2 x:2
const foo = add(2)

// 3*2=6 y:6
const baz = foo(3)

// 4*4=16 x+y+z=24
console.log(baz(4))
```

這樣就可以重複使用 foo 函數：

```js
// 4*2=6 y:8
const bar = foo(4)

// 5*5=25 x+y+z=35
console.log(bar(5))
```

### 實現一個對函數進行柯里化的函數

透過以下這樣一個簡練的函數能對一般的函數進行柯里化：

```js
function myCurring(fn) {
  function curried(...args) {
    // 判斷fn的函數和當前傳入的函數數量是否一致
    if (args.length >= fn.length) {
      // 要使用apply才能將外層綁定的this傳入
      return fn.apply(this, args)
    } else {
      // 使用遞歸重複調用curried，重點是將下次傳入的參數拼接上次傳入的參數
      return function (...args2) {
        return curried.apply(this, [...args, ...args2])
      }
    }
  }
  return curried
}
```

例如將這個 add 函數透過 myCurring 函數進行轉化，就可以使用柯里化的方式調用：

```js
function add(x, y, z) {
  x = 0 + 2
  y = y * 2
  z = z * z
  return x + y + z
}

const curringAdd = myCurring(add)
const result = curringAdd(10)(20)(30)

// 950
console.log(result)
```

## 組合函數(Compose function)

```js
function double(num) {
  return num * 2
}

function square(num) {
  return num ** 2
}
```

假設要對以上兩個函數連續進行調用，如下：

```js
console.log(square(double(10)))
```

也可以寫一個函數返回一個新函數再調用：

```js
function composeFn(m, n) {
  return function (count) {
    return n(m(count))
  }
}
const doubleAndSquare = composeFn(double, square)
```

```js
console.log(doubleAndSquare(10))
```

composeFn 就是一個組合函數。

### 一個實現對傳入函數進行組合的函數

```js
function myCompose(...fns) {
  var fnsLength = fns.length
  // 判斷fns有沒有非函數
  for (var i = 0; i < fnsLength; i++) {
    if (typeof fns[i] !== 'function') {
      throw new TypeError('Excepted arguments are function')
    }
  }

  function compose(...args) {
    var index = 0
    var result = fnsLength ? fns[index].apply(this, args) : args
    while (++index < fnsLength) {
      result = fns[index].call(this, result)
    }
    return result
  }

  return compose
}
```

同樣的利用以上這個函數能夠直接實現對函數進行組合：

```js
function double(num) {
  return num * 2
}

function square(num) {
  return num ** 2
}

const doubleAndSquare = myCompose(double, square)

// 400
console.log(doubleAndSquare(10))
```
