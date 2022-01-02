# Iterator

**迭代器**（iterator），是確使使用者可在容器物件（container，例如[連結串列](https://zh.wikipedia.org/wiki/鏈表)或[陣列](https://zh.wikipedia.org/wiki/陣列)）上遍訪的[物件](https://zh.wikipedia.org/wiki/对象_(计算机科学))[[1\]](https://zh.wikipedia.org/wiki/迭代器#cite_note-1)[[2\]](https://zh.wikipedia.org/wiki/迭代器#cite_note-definition-2)[[3\]](https://zh.wikipedia.org/wiki/迭代器#cite_note-3)，設計人員使用此介面無需關心容器物件的記憶體分配的實現細節。其行為很像資料庫技術中的[游標](https://zh.wikipedia.org/wiki/指標_(資料庫))（cursor），迭代器最早出現在1974年設計的[CLU](https://zh.wikipedia.org/wiki/CLU)程式語言中。

簡言之，迭代器就是可以對某個數據結構進行遍歷的物件。

JavaScript 中，迭代器是一個具體的物件，這個物件需要符合符合迭代器協議（iterator protocal），迭代器協議定義了產生一系列值的標準方式。