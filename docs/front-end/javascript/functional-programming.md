# JS函數式編程(functional programming)

JavaScript雖然不能完全算是函數式編程的標準語言，但許多框架比如：React，都非常受到函數式編程這個概念的影響，所以仍舊應該要了解一下函數式編程的幾種基本概念。



## 純函數(pure function)

不論是在React中使用React hook、Redux或是在Vue3中使用composition api，純函數的概念都相當重要。

純函數在維基中的定義為：

- 此函數在相同的輸入值時，需產生相同的輸出。
- 函數的輸出和輸入值以外的其他隱藏信息或[狀態](https://zh.wikipedia.org/w/index.php?title=程式狀態&action=edit&redlink=1)無關，也和由[I/O](https://zh.wikipedia.org/wiki/I/O)設備產生的外部輸出無關。
- 該函數不能有語義上可觀察的[函數副作用](https://zh.wikipedia.org/wiki/函数副作用)，諸如「觸發事件」，使輸出設備輸出，或更改輸出值以外物件的內容等。

可以簡單總結一下：

- 確定的輸入，一定會產生確定的輸出。
- 函數在執行的過程中，不能產生**副作用**。

>副作用(side effect)：在計算機科學中，表示一個函數在執行時，除了返回值之外，還產生了一些其他附加的影響，比如修改了全局變數、修改傳入參數的值等等。
