# 套件管理工具

透過一個專業的套件管理工具，能將開源的庫和框架發布到特定的倉庫，其他工程師能透過該工具安裝、升級、刪除。

現在最主流的 JavaScript 套件管理工具是 npm，全稱 Node Package Manager，只要安裝 Nodejs 就會自動安裝 npm。



## 初始化

輸入 npm init 初始化項目，將訊息輸入完畢後會建立一個文件 package.json，文件中描述了有關於當前項目訊息：

```json
{
  "name": "npmdemo",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

- name 項目名稱（必填）
- version 當前版本號（必填）

- description 項目描述
- main 在作為第三庫導入時會將其作為導入的入口文件
- scripts 啟動腳本
- author 作者
- license 開源協議
- private 項目是否為私有，為 true 無法發布
- engines 可以對 node 版本進行規範，如：node > 8.0.0



## 安裝第三方庫

安裝當前項目在生成時需要依賴的包：

```shell
npm i <package name>
```

安裝當前項目在生成時需要依賴的包：

```shell
npm i <package name> -D
```

在安裝第三方庫後，package.json 可能會多出兩個屬性：

```json
{
  "name": "npmdemo",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "aaa": "node ./scripts/aaa.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.25.0"
  },
  "devDependencies": {
    "webpack": "^5.67.0"
  }
}
```

- dependencies 描述當前項目對於第三方庫的依賴以及庫的版本號
- devDependencies 和上面相同，不過是只有在開發時需要安裝的庫，有可能是打包工具或是腳本工具
- peerDependencies 在使用第三方庫，某些第三方庫會需要當前項目是基於某些庫上面的，該屬性可以描述需要哪些庫。

某些第三庫也會自訂屬性可以放在 package.json 中配置，如：ESLint、browserslist



## 版本管理

npm 包通常遵循 semver 版本管理規範，semver 要求版本號是三位 X.Y.Z：

- X主版本號（major）：當做了可能不兼容向下版本的 API 修改；
- Y次版本號（minor）：當做了向下兼容的功能性增加；
- Z修訂號（patch）：當做了某些問題修正；

在版本號前面有可能加上＾或 ～：

- ＾X.Y.Z：表示 X 不變，Y 和 Z 安裝最新版本
- ～X.Y.Z：表示 X 和 Y 不變，Z 安裝最新版本

不過如果有 package-lock.json 文件，會優先安照該文件紀錄的版本安裝。



## 全局安裝

如果進行全局安裝，該庫導出的命令會被添加到環境變量中：

```shell
npm i -g vue-cli
```

在命令行中輸入：

```shell
vue --version
```

```
@vue/cli 4.5.13
```



## npm install 流程

通常如果從 GitHub 上面下載下來程式碼，都要執行 npm install 以下載第三庫的依賴，具體流程如下：

- 沒有 package-lock.json
  - 分析依賴關係
  - 從倉庫中下載壓縮包
  - 緩存壓縮包
  - 將壓縮包解壓生成 node_modules
- 有 package-lock.json
  - 檢測 package-lock.json 和 package.json 中版本是否一致，如不一致會重新建構依賴關係
  - 一致的情況下會優先查找緩存

![image-20220123163743595](assets/image-20220123163743595.png)

透過一個指令能找到 npm 緩存的存放位置：

```shell
npm get cache
```



## npm 其他指令

卸載：

```shell
npm uninstall <package>
```

清除緩存：

```shell
npm clean cache
```

其他見 https://docs.npmjs.com/cli/v8/commands



## yarn

yarn 是為了彌補早期 npm 的缺陷，雖然 npm5 開始已經進行了很多升級版改進，依然有很多人使用 yarn，首先要進行全局安裝：

```shell
npm i -g yarn
```

以下為命令的對比：

| command                | npm                                                          | yarn                                                         |
| :--------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| Install dependencies   | npm install                                                  | yarn                                                         |
| Install package        | npm install package_name npm install package_name@version_number | yarn add package_name yarn add package_name@version_number   |
| Uninstall package      | npm uninstall package_name                                   | yarn remove package_name                                     |
| Install dev package    | npm install package_name –save-dev                           | yarn add package_name –dev                                   |
| Update dev package     | npm update package_name npm update package_name@version_number | yarn upgrade package_name yarn upgrade package_name@version_number |
| View package           | npm view package_name                                        | yarn info package_name                                       |
| Global install package | npm install -g package_name                                  | yarn global add package_name                                 |



## npx

npx 也是 Nodejs 自帶的工具：

- 透過 npx 能夠優先查找本地的 node_modules 中存在的第三方命令工具
- npx 在本地沒有安裝的情況下會從線上的 registry 獲取相關的命令工具，如：create-react-app



## 發布 npm 套件

可以在 package.json 中加入對該套件的描述：

```json
{
  "name": "my_util",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "xxx.github.com/my_util"
  },
  "homepage": "xxx.github.com/my_util",
  "keywords": ["utils"],
  "author": "Louis",
  "license": "ISC"
}
```

- repository 倉庫訊息
- homepage 頁面，可能框架的首頁或是 GitHub 頁面
- keywords 他人可以透過該關鍵字進行搜索

在註冊一個 npm 帳號之後，在命令行中輸入 npm login 進行登入。

最後使用 npm publish 進行發布。

> 如果使用組織方式發布，需要使用 npm publish --access=public

更新包，需要更改版本號重新 npm publish 。

刪除包：npm unpublish

讓發布的包過期：npm deprecate