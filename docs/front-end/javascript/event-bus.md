# 事件總線

自訂義事件總線屬於一種觀察者模式，其中包含三個角色：

- 發布者（Publisher）：發出事件（Event）
- 訂閱者（Subscriber）：訂閱事件（Event），並且進行響應（Handler）
- 事件總線（EventBus）：作為中繼站。



## 基本實現

```js
class EventBus {
  constructor() {
    this.eventBus = {}
  }

  on(eventName, eventCallback, thisArg) {
    let handlers = this.eventBus[eventName]
    if (!handlers) {
      handlers = []
      this.eventBus[eventName] = handlers
    }
    handlers.push({
      eventCallback,
      thisArg
    })
  }

  off(eventName, eventCallback) {
    const handlers = this.eventBus[eventName]
    if(handlers) {
      this.eventBus[eventName] = handlers.filter(handler => handler.eventCallback !== eventCallback)
    }
  }

  emit(eventName, ...payload) {
    const handlers = this.eventBus[eventName]
    if(!handlers) return
    handlers.forEach(handler => {
      handler.eventCallback.apply(handler.thisArg, payload)
    })
  }
}
```

