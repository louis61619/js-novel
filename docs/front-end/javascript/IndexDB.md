# IndexDB

IndexDB 是瀏覽器中一種偏向底層的 API，是一種基於 JavaScript 的物件導向資料庫，IndexDB 本身基於事務，使用時只需要指定資料庫的模式，打開資料庫連接，然後檢索和更新即可。



## 基本使用

創建 db：

```js
const dbRequest = indexedDB.open('Louis')
```

初始化：

```js
dbRequest.onupgradeneeded = function(event) {
  const db = event.target.result
  // 創建一些儲存物件
  db.createObjectStore("users", { keyPath: "id" })
}
```

創建並獲取對應的儲存物件：

```js
let db = null
dbRequest.onsuccess = function(event) {
  db = event.target.result
}
// 事務物件 傳入儲存物件名稱、模式
const transaction = db.transaction('users', 'readwrite')
const store = transaction.objectStore('users')
```

新增：

```js
const request = store.add({
  id: 111,
  name: 'Louis',
  age: 26
})
request.onsuccess = function() {
  console.log('插入成功')
}
// 全部操作完成回調
transaction.onComplete = function() {
  console.log('操作完成')
}
```

根據 key 查詢單條數據：

```js
const request1 = store.get(111)
request1.onsuccess = function(event) {
	console.log(event.target.result)
}
```

查詢多條數據：

```js
const request2 = store.openCursor()
request2.onsuccess = function(event) {
	const cursor = event.target.result
	if (cursor) {
		console.log(cursor.key, cursor.value)
		cursor.continue()
	} else {
		console.log('查詢完成')
	}
}
```

修改：

```js
const request3 = store.openCursor()
request3.onsuccess = function(event) {
	const cursor = event.target.result
	if (cursor) {
    if (cursor.key === 111) {
    	const value = cursor.value
      // 修改並更新
    	value.name = "Renny"
    	cursor.update(value);
    } else {
    	cursor.continue()
    }
  }
}        
```

刪除：

```js
const request4 = store.openCursor()
request4.onsuccess = function(event) {
  const cursor = event.target.result
  if (cursor) {
    if (cursor.key === 111) {
      cursor.delete();
    } else {
      cursor.continue()
    }
  }
}    
```

