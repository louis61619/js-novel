# Vue3 響應式原理

Vue 的三大核心模塊：

- Compiler 模塊(編譯系統)

  編譯 template 的系統，分為 Runtime + Compiler 和 Runtime-only 兩種，通常我們會使用 Runtime-only，讓 vue-loader 幫我們將 template 轉化一般的 javascript 程式碼，也就是 render 函數

- Render 模塊(渲染系統)

  主要的工作是透過 render 函數生成 vnode 節點(虛擬 DOM 由多個 vnode 組成)，並且會進行 diff 算法更新被修改的 vode 節點

- Reactivity 模塊(響應式系統)

  組件內部會依賴一些，而數據改變時 Reactivity 模塊會調用 render 函數使 vnode 更新

![vuevirtualdomgraph](assets/xlUUnVs.jpg)

三個模塊是這樣協同工作的

- Compiler 模塊會將 template 在編譯階段轉化成不同的 render 函數
- Render 模塊將不同的 render 函數生成對應的 vnode 節點(虛擬 DOM 由多個 vnode 組成)，並將虛擬 DOM 渲染成真實 DOM
- Reactivity 模塊會監測數據的變化，如果出現變化會通知 Render 模塊
- Render 模塊會對比新舊虛擬 DOM 的差別，然後使用 diff 算法將相應的 vnode 節點進行更新

## 實現一個渲染系統

要實現一個簡單的渲染系統包含以下幾點

- 定義 h 函數來返回 vnode 節點
- mount 函數進行掛載
- patch 函數比對更新舊節點

### 定義 h 函數來返回 vnode 節點

首先來寫一個 h 函數來定義一個 vnode 節點，一個 vnode 節點中應該包含 tag(html 標籤)、prop(屬性，EX: id、class、placeholder 或者是監聽函數)、children(子節點)

```js
const h = (tag, props, children) => {
  return {
    tag,
    props,
    children
  }
}
```

### mount 函數進行掛載

然後我們要寫一個 mount 函數將 vnode 掛載至頁面上，在這個 mount 函數中我們應該傳入兩個東西，一個 vnode 節點、一個是要掛載的標籤，這個函數要做的事情有以下幾點

- 在 vnode 節點中新增一個對應真實 dom 節點的屬性
- 將 props 轉為相對應的屬性以及透過 addEventListener 監聽事件的發生
- 遞歸將 vnode 內的子節點轉換成真實 dom
- 最後透過 appendChild 這個函數掛載到對應的標籤內

```js
const mount = (vnode, container) => {
  const el = (vnode.el = document.createElement(vnode.tag))

  // 處理props
  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key]
      if (key.startsWith('on')) {
        el.addEventListener(key.slice(2).toLowerCase(), value)
      } else {
        el.setAttribute(key, value)
      }
    }
  }

  // 處理children
  if (vnode.children) {
    if (typeof vnode.children === 'string') {
      el.textContent = vnode.children
    } else {
      for (let item of vnode.children) {
        mount(item, el)
      }
    }
  }

  // 將el掛載的container上
  container.appendChild(el)
}
```

我們可以透過 mount 函數掛載 vnode，以下做一個示例

html

```html
<div id="app"></div>
```

js

```js
// 通過h函數創建vnode
const vnode = h('div', { class: 'counter', id: 'counter' }, [
  h('h2', null, '0'),
  h(
    'button',
    {
      onClick: () => {
        counter++
      }
    },
    '+1'
  )
])

// 通過mount函數 將vnode掛載到#app上
mount(vnode, document.querySelector('#app'))
```

實際呈現的結構會是這樣的

![image20210912134806019](assets/kslN7JI.png)

### patch 函數比對更新舊節點

還要實現一個比對新舊節點，進行 diff 算法更新的 patch 函數，由於 patch 函數比較複雜，所以我們一步步拆開來看

這個 path 函數將有兩個參數一個 n1(舊節點)、一個是 n2(新節點)，n1 作為舊節點我們前面已經透過 mount 函數賦予了一個新的對應真實 dom 的屬性

```js
const patch = (n1, n2) => {
 ...
}
```

我們第一步可以先判斷這兩個新舊節點的標籤是否一樣，如果不同我們可以直接對拿到舊節點的父元素，然後對整個舊節點進行替換

```js
if (n1.tag !== n2.tag) {
    const parentNode = n1.el.parentNode
    parentNode.removeChild(n1.el)
    mount(n2, parentNode)
} else {
    ...
}
```

但是如果新舊節點的差別只有一點呢? 我們可以透過算法直接找到區別的地方進行替換就好，而這裡我們要先將獲取節點所對應的真實 dom 以方便之後修改並將舊節點對應真實 dom 的屬性保存到 n2 的屬性中

```js
const el = (n2.el = n1.el)
```

然後對比新舊屬性的區別，並進行真實 dom 的更新

```js
// 處理props
const oldProps = n1.props || {}
const newProps = n2.props || {}
// 獲取所有新節點的props加到對應的元素中 如果判斷新舊props相同的就不用加
for (const key in newProps) {
  const oldValue = oldProps[key]
  const newValue = newProps[key]
  if (oldValue !== newValue) {
    // 對是否為on開頭的事件監聽做判斷
    if (key.startsWith('on')) {
      el.addEventListener(key.slice(2).toLowerCase(), newValue)
    } else {
      el.setAttribute(key, newValue)
    }
  }
}

// 刪除舊的props
for (const key in oldProps) {
  // 舊的事件要被移除掉避免多次掛載
  if (key.startsWith('on')) {
    el.removeEventListener(key.slice(2).toLowerCase(), oldProps[key])
  }
  // 判斷新的props有沒有這個key，
  if (!(key in newProps)) {
    el.removeAttribute(key)
  }
}
```

接下來要處理新舊節點中各自的 children，會有幾種可能，如果新的 children 是字符串最簡單，直接把舊的 children 用 innerHTML 替換掉就好，當然我們可以做更多的判斷，比如新舊 children 是否都是文本

```js
const oldChildren = n1.children;
const newChildren = n2.children;

// 情況一: newChildren本身是字符串
if (typeof newChildren === "string") {
  // 可以考慮更多的edge case(邊緣情況判斷)
  if (typeof oldChildren === "string") {
    if (oldChildren !== newChildren) {
      el.textContent = newChildren;
    }
  } else {
    el.innerHTML = newChildren;
  }
} else {
   ...
}
```

如果舊的 children 是字串而新的 children 是一個陣列(就是由多個 h 函數所組合的 vnode)，可以直接遍歷然後進行 mount 掛載

```js
 // oldChildren是字串就直接清空並進行掛載
if (typeof oldChildren === "string") {
  el.innerHTML = ""
  newChildren.forEach(item => {
    mount(item, el)
  })
} else {
  ....
}
```

如果新舊 children 都是陣列，就需要對陣列中的每個 vnode 進行比對，

> oldChildren: [vnode1, vnode2, vnode3]
>
> newChildren: [vnode4, vnode5, vnode6]

首先我們獲取新舊 children 最小的陣列長度，直接比對各個 vnode 進行更新，如果有新的 children 比較多就直接使用 mount 函數進行掛載，舊的 children 比較多則要移除

```js
const commonLength = Math.min(oldChildren.length, newChildren.length)
for (let i = 0; i < commonLength; i++) {
  // console.log(i)
  patch(oldChildren[i], newChildren[i]) // 比對新舊節點進行更新
}

if (newChildren.length > oldChildren.length) {
  // 新節點的數量大於舊節點 對多出的節點進行掛載
  newChildren.slice(oldChildren.length).forEach((item) => {
    mount(item, el)
  })
}

if (newChildren.length < oldChildren.length) {
  // 舊節點的數量大於舊節點 對多出的節點進行刪除
  oldChildren.slice(newChildren.length).forEach((item) => {
    el.removeChild(item.el)
  })
}
```

## 如何實現一個響應式系統

### Dep 類

響應式的核心就是透過一個叫做 dep 的類實現依賴收集，所以我們首先要定義類，內部存放依賴這個變數的所有函數，當變數改變時這些函數也會被重新執行

```js
class Dep {
  constructor() {
    // subscribers中存放所有對應的依賴
    // 使用集合這樣的數據格式
    this.subscribers = new Set()
  }

  // 負責收集依賴
  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect)
    }
  }

  // 通知依賴更新
  notify() {
    this.subscribers.forEach((effect) => {
      effect()
    })
  }
}
```

### 數據劫持

而如何監測數據改變呢，Vue3 使用 proxy 對物件中各屬性的變化進行劫持，proxy 中有兩個方法 get 和 set，參數是 target(物件)和 key(屬性)

通過這個 reactive 函數能劫持數據中的所有屬性，當屬性被調用或重新設置時都會調用 getDep 這個函數，獲取相應的 dep 類

```js
// 透過reactive函數進行數據劫持
function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      const dep = getDep(target, key)
      dep.depend()
      return target[key] // proxy中target物件並非原物件 所以不會照成循環引用的問題
    },
    set(target, key, newValue) {
      const dep = getDep(target, key)
      target[key] = newValue
      dep.notify()
    }
  })
}
```

getDep 函數是這樣的，使用 weakmap 這樣的結構來儲存該 reactive 物件對應的 dep 類，weakmap 的好處是如果 key 值為 null，對應的 key 和 value 都會被自動回收

```js
// 一般的map中key是一個字符串
// weakmap中的key是一個物件 並且是弱引用的 意思是當key賦值為null時 這個key和對應的value都會被取消掉(垃圾回收)
// 用weakmap是要將對應的原始數據做為key
const targetMap = new WeakMap()
function getDep(target, key) {
  // 跟據傳入的target取targetMap中的dep集合
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  // 從dep集合中取出key對應的dep
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Dep()
    depsMap.set(key, dep)
  }

  return dep
}
```

### watchEffect

然後，我們還可以寫一個 watchEffect 函數來對傳入 watchEffect 內部的函數進行依賴收集

```js
// 透過watchEffect這個函數加入dep的依賴中
let activeEffect = null
function watchEffect(effect) {
  activeEffect = effect
  effect() // 第一次自動執行
  activeEffect = null
}
```

## 實現一個 createApp 函數

最後要實現一個入口以供外部進行調用，示例:

```js
const createApp = (rootComponent) => {
  return {
    mount(selector) {
      const container = document.querySelector(selector)
      let isMounted = false
      let oldVnode = null
      watchEffect(function () {
        // 判斷是否已經被掛載到dom上
        if (!isMounted) {
          oldVnode = rootComponent.render()
          mount(oldVnode, container)
          isMounted = true
        } else {
          const newVnode = rootComponent.render()
          patch(oldVnode, newVnode)
          oldVnode = newVnode
        }
      })
    }
  }
}
```
