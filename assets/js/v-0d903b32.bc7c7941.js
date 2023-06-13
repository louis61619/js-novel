"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[561],{2459:(n,s,a)=>{a.r(s),a.d(s,{data:()=>t});const t={key:"v-0d903b32",path:"/front-end/javascript/20_event-loop.html",title:"Event loop",lang:"en-US",frontmatter:{},excerpt:"",headers:[{level:2,title:"瀏覽器中的 JavaScript 線程",slug:"瀏覽器中的-javascript-線程",children:[]},{level:2,title:"Nodejs 中的 JavaScript 線程",slug:"nodejs-中的-javascript-線程",children:[]}],filePathRelative:"front-end/javascript/20_event-loop.md",git:{updatedTime:1665400196e3,contributors:[{name:"louis61619",email:"louis61619@gmail.com",commits:1}]}}},7323:(n,s,a)=>{a.r(s),a.d(s,{default:()=>E});var t=a(6252),e=a(9588),c=a(1381),o=a(9737);const l=(0,t._)("h1",{id:"event-loop",tabindex:"-1"},[(0,t._)("a",{class:"header-anchor",href:"#event-loop","aria-hidden":"true"},"#"),(0,t.Uk)(" Event loop")],-1),p=(0,t._)("p",null,"在了解事件循環之前，必須先有進程和線程這兩個概念：",-1),u=(0,t._)("ul",null,[(0,t._)("li",null,"進程（process）：計算機已經運行的程序，是操作系統管理程序的一種方式。"),(0,t._)("li",null,"線程（thread）：操作系統能夠運行運算調度的最小單位，通常情況下包含在進程中。")],-1),_=(0,t._)("p",null,"可以認為，啟動一個應用程序就會啟動一個以上的進程，而每一個進程中至少有一個以上的線程。",-1),i=(0,t._)("h2",{id:"瀏覽器中的-javascript-線程",tabindex:"-1"},[(0,t._)("a",{class:"header-anchor",href:"#瀏覽器中的-javascript-線程","aria-hidden":"true"},"#"),(0,t.Uk)(" 瀏覽器中的 JavaScript 線程")],-1),k=(0,t._)("p",null,"瀏覽器本身是多進程的，當開啟一個新的頁面都會獨立開啟一個新的進程，這是為了防止一個頁面卡死造成所有頁面無法響應，每個進程中又包含很多線程，其中包含執行 JavaScript 的線程。",-1),r=(0,t._)("p",null,[(0,t.Uk)("由於 JavaScript 程式碼是在"),(0,t._)("strong",null,"單線程"),(0,t.Uk)("中執行的，意味著在如果執行某個複雜的操作，當前線程就會被"),(0,t._)("strong",null,"堵塞"),(0,t.Uk)("，某些真正耗時的操作，比如"),(0,t._)("strong",null,"網路請求"),(0,t.Uk)("、"),(0,t._)("strong",null,"定時器"),(0,t.Uk)("是透過"),(0,t._)("strong",null,"其他線程"),(0,t.Uk)("完成的，執行 JavaScript 的線程中會實現一個事件循環，只要在其他線程執行完畢時回調即可。")],-1),b=(0,t._)("p",null,"事件循環中維護著兩個隊列：",-1),m=(0,t._)("ul",null,[(0,t._)("li",null,"宏任務隊列（macrotask queue）"),(0,t._)("li",null,"微任務隊列（microtask queue）")],-1),U=(0,t._)("p",null,[(0,t._)("img",{src:e,alt:"image-20220109193419856"})],-1),g=(0,t._)("p",null,"在執行任何一個宏任務之前，都會查看是否有微任務需要執行，並保證微任務隊列是空的。",-1),d=(0,t._)("p",null,"假設有以下程式碼：",-1),f=(0,t._)("div",{class:"language-javascript ext-js line-numbers-mode"},[(0,t._)("pre",{class:"language-javascript"},[(0,t._)("code",null,[(0,t._)("span",{class:"token keyword"},"async"),(0,t.Uk)(),(0,t._)("span",{class:"token keyword"},"function"),(0,t.Uk)(),(0,t._)("span",{class:"token function"},"async1"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)(),(0,t._)("span",{class:"token punctuation"},"{"),(0,t.Uk)("\n  console"),(0,t._)("span",{class:"token punctuation"},"."),(0,t._)("span",{class:"token function"},"log"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token string"},"'async start'"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n  "),(0,t._)("span",{class:"token keyword"},"await"),(0,t.Uk)(),(0,t._)("span",{class:"token function"},"async2"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n  console"),(0,t._)("span",{class:"token punctuation"},"."),(0,t._)("span",{class:"token function"},"log"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token string"},"'async end'"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n"),(0,t._)("span",{class:"token punctuation"},"}"),(0,t.Uk)("\n\n"),(0,t._)("span",{class:"token keyword"},"async"),(0,t.Uk)(),(0,t._)("span",{class:"token keyword"},"function"),(0,t.Uk)(),(0,t._)("span",{class:"token function"},"async2"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)(),(0,t._)("span",{class:"token punctuation"},"{"),(0,t.Uk)("\n  console"),(0,t._)("span",{class:"token punctuation"},"."),(0,t._)("span",{class:"token function"},"log"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token string"},"'async2'"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n"),(0,t._)("span",{class:"token punctuation"},"}"),(0,t.Uk)("\n\nconsole"),(0,t._)("span",{class:"token punctuation"},"."),(0,t._)("span",{class:"token function"},"log"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token string"},"'script start'"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n\n"),(0,t._)("span",{class:"token function"},"setTimeout"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token keyword"},"function"),(0,t.Uk)(),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)(),(0,t._)("span",{class:"token punctuation"},"{"),(0,t.Uk)("\n  console"),(0,t._)("span",{class:"token punctuation"},"."),(0,t._)("span",{class:"token function"},"log"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token string"},"'setTimeout'"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n"),(0,t._)("span",{class:"token punctuation"},"}"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n\n"),(0,t._)("span",{class:"token function"},"async1"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n\n"),(0,t._)("span",{class:"token keyword"},"new"),(0,t.Uk)(),(0,t._)("span",{class:"token class-name"},"Promise"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token keyword"},"function"),(0,t.Uk)(),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token parameter"},"resolve"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)(),(0,t._)("span",{class:"token punctuation"},"{"),(0,t.Uk)("\n  console"),(0,t._)("span",{class:"token punctuation"},"."),(0,t._)("span",{class:"token function"},"log"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token string"},"'promise1'"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n  "),(0,t._)("span",{class:"token function"},"resolve"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n"),(0,t._)("span",{class:"token punctuation"},"}"),(0,t._)("span",{class:"token punctuation"},")"),(0,t._)("span",{class:"token punctuation"},"."),(0,t._)("span",{class:"token function"},"then"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token keyword"},"function"),(0,t.Uk)(),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)(),(0,t._)("span",{class:"token punctuation"},"{"),(0,t.Uk)("\n  console"),(0,t._)("span",{class:"token punctuation"},"."),(0,t._)("span",{class:"token function"},"log"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token string"},"'promise2'"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n"),(0,t._)("span",{class:"token punctuation"},"}"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n\nconsole"),(0,t._)("span",{class:"token punctuation"},"."),(0,t._)("span",{class:"token function"},"log"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token string"},"'script end'"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n")])]),(0,t._)("div",{class:"line-numbers"},[(0,t._)("span",{class:"line-number"},"1"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"2"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"3"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"4"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"5"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"6"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"7"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"8"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"9"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"10"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"11"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"12"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"13"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"14"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"15"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"16"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"17"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"18"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"19"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"20"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"21"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"22"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"23"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"24"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"25"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"26"),(0,t._)("br")])],-1),v=(0,t._)("p",null,"可以按照上面的任務進行區分：",-1),y=(0,t._)("p",null,[(0,t._)("img",{src:c,alt:"image-20220113222320655"})],-1),h=(0,t._)("p",null,"打印順序依序為：main script => microtask queue => macrotask queue",-1),w=(0,t._)("h2",{id:"nodejs-中的-javascript-線程",tabindex:"-1"},[(0,t._)("a",{class:"header-anchor",href:"#nodejs-中的-javascript-線程","aria-hidden":"true"},"#"),(0,t.Uk)(" Nodejs 中的 JavaScript 線程")],-1),j=(0,t._)("p",null,"Nodejs 中的事件循環是由 libuv 來實現的。",-1),T=(0,t._)("p",null,"事件循環類似一個橋樑，連接 JavaScript 和系統調用之間的通道，無論是文件讀取、定時器、子進程，在完成對應的操作後，都會將對應的結果和回調函數放到事件循環中，事件循環會不斷的從任務隊列中取出對應的事件（回調函數）來執行。",-1),x=(0,t._)("p",null,"一次完整的循環分成多個階段：",-1),q=(0,t._)("ul",null,[(0,t._)("li",null,"定時器（Timers）"),(0,t._)("li",null,"待定回調（Pending Callback）"),(0,t._)("li",null,"Idle、prepare"),(0,t._)("li",null,"輪詢（Poll）"),(0,t._)("li",null,"檢測（Poll）"),(0,t._)("li",null,"檢測（check）"),(0,t._)("li",null,"關閉的回調函數")],-1),S=(0,t._)("p",null,"Nodejs 中的事件循環相對更為複雜，也分成微任務和宏任務，並且隊列也做出更多的細分，執行順序由上至下：",-1),J=(0,t._)("ul",null,[(0,t._)("li",null,[(0,t._)("p",null,"微任務"),(0,t._)("ul",null,[(0,t._)("li",null,"Next tick queue：process.nextTick"),(0,t._)("li",null,"Other queue：Promise 的 then 回調、queueMicrotask")])]),(0,t._)("li",null,[(0,t._)("p",null,"宏任務"),(0,t._)("ul",null,[(0,t._)("li",null,"Timer queue：setTimeout、setInterval"),(0,t._)("li",null,"Poll queue：IO 事件"),(0,t._)("li",null,"Check queue：setImmediate"),(0,t._)("li",null,"Close queue：close 事件")])])],-1),P=(0,t._)("div",{class:"language-javascript ext-js line-numbers-mode"},[(0,t._)("pre",{class:"language-javascript"},[(0,t._)("code",null,[(0,t._)("span",{class:"token keyword"},"async"),(0,t.Uk)(),(0,t._)("span",{class:"token keyword"},"function"),(0,t.Uk)(),(0,t._)("span",{class:"token function"},"async1"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)(),(0,t._)("span",{class:"token punctuation"},"{"),(0,t.Uk)("\n  console"),(0,t._)("span",{class:"token punctuation"},"."),(0,t._)("span",{class:"token function"},"log"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token string"},"'async start'"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n  "),(0,t._)("span",{class:"token keyword"},"await"),(0,t.Uk)(),(0,t._)("span",{class:"token function"},"async2"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n  console"),(0,t._)("span",{class:"token punctuation"},"."),(0,t._)("span",{class:"token function"},"log"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token string"},"'async end'"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n"),(0,t._)("span",{class:"token punctuation"},"}"),(0,t.Uk)("\n\n"),(0,t._)("span",{class:"token keyword"},"async"),(0,t.Uk)(),(0,t._)("span",{class:"token keyword"},"function"),(0,t.Uk)(),(0,t._)("span",{class:"token function"},"async2"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)(),(0,t._)("span",{class:"token punctuation"},"{"),(0,t.Uk)("\n  console"),(0,t._)("span",{class:"token punctuation"},"."),(0,t._)("span",{class:"token function"},"log"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token string"},"'async2'"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n"),(0,t._)("span",{class:"token punctuation"},"}"),(0,t.Uk)("\n\n"),(0,t._)("span",{class:"token function"},"setTimeout"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)(),(0,t._)("span",{class:"token operator"},"=>"),(0,t.Uk)(),(0,t._)("span",{class:"token punctuation"},"{"),(0,t.Uk)("\n  console"),(0,t._)("span",{class:"token punctuation"},"."),(0,t._)("span",{class:"token function"},"log"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token string"},"'setTimeout0'"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n"),(0,t._)("span",{class:"token punctuation"},"}"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n\n"),(0,t._)("span",{class:"token function"},"setTimeout"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)(),(0,t._)("span",{class:"token operator"},"=>"),(0,t.Uk)(),(0,t._)("span",{class:"token punctuation"},"{"),(0,t.Uk)("\n  console"),(0,t._)("span",{class:"token punctuation"},"."),(0,t._)("span",{class:"token function"},"log"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token string"},"'setTimeout2'"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n"),(0,t._)("span",{class:"token punctuation"},"}"),(0,t._)("span",{class:"token punctuation"},","),(0,t.Uk)(),(0,t._)("span",{class:"token number"},"300"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n\n"),(0,t._)("span",{class:"token function"},"setImmediate"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)(),(0,t._)("span",{class:"token operator"},"=>"),(0,t.Uk)(" console"),(0,t._)("span",{class:"token punctuation"},"."),(0,t._)("span",{class:"token function"},"log"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token string"},"'setImmediate'"),(0,t._)("span",{class:"token punctuation"},")"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n\nprocess"),(0,t._)("span",{class:"token punctuation"},"."),(0,t._)("span",{class:"token function"},"nextTick"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)(),(0,t._)("span",{class:"token operator"},"=>"),(0,t.Uk)(" console"),(0,t._)("span",{class:"token punctuation"},"."),(0,t._)("span",{class:"token function"},"log"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token string"},"'nextTick1'"),(0,t._)("span",{class:"token punctuation"},")"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n\n"),(0,t._)("span",{class:"token function"},"async1"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n\nprocess"),(0,t._)("span",{class:"token punctuation"},"."),(0,t._)("span",{class:"token function"},"nextTick"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)(),(0,t._)("span",{class:"token operator"},"=>"),(0,t.Uk)(" console"),(0,t._)("span",{class:"token punctuation"},"."),(0,t._)("span",{class:"token function"},"log"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token string"},"'nextTick2'"),(0,t._)("span",{class:"token punctuation"},")"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n\n"),(0,t._)("span",{class:"token keyword"},"new"),(0,t.Uk)(),(0,t._)("span",{class:"token class-name"},"Promise"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token keyword"},"function"),(0,t.Uk)(),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token parameter"},"resolve"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)(),(0,t._)("span",{class:"token punctuation"},"{"),(0,t.Uk)("\n  console"),(0,t._)("span",{class:"token punctuation"},"."),(0,t._)("span",{class:"token function"},"log"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token string"},"'promise1'"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n  "),(0,t._)("span",{class:"token function"},"resolve"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n  console"),(0,t._)("span",{class:"token punctuation"},"."),(0,t._)("span",{class:"token function"},"log"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token string"},"'promise2'"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n"),(0,t._)("span",{class:"token punctuation"},"}"),(0,t._)("span",{class:"token punctuation"},")"),(0,t._)("span",{class:"token punctuation"},"."),(0,t._)("span",{class:"token function"},"then"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token keyword"},"function"),(0,t.Uk)(),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)(),(0,t._)("span",{class:"token punctuation"},"{"),(0,t.Uk)("\n  console"),(0,t._)("span",{class:"token punctuation"},"."),(0,t._)("span",{class:"token function"},"log"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token string"},"'promise then'"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n"),(0,t._)("span",{class:"token punctuation"},"}"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n\nconsole"),(0,t._)("span",{class:"token punctuation"},"."),(0,t._)("span",{class:"token function"},"log"),(0,t._)("span",{class:"token punctuation"},"("),(0,t._)("span",{class:"token string"},"'script end'"),(0,t._)("span",{class:"token punctuation"},")"),(0,t.Uk)("\n")])]),(0,t._)("div",{class:"line-numbers"},[(0,t._)("span",{class:"line-number"},"1"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"2"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"3"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"4"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"5"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"6"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"7"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"8"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"9"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"10"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"11"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"12"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"13"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"14"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"15"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"16"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"17"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"18"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"19"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"20"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"21"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"22"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"23"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"24"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"25"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"26"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"27"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"28"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"29"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"30"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"31"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"32"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"33"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"34"),(0,t._)("br"),(0,t._)("span",{class:"line-number"},"35"),(0,t._)("br")])],-1),I=(0,t._)("p",null,"按照 Nodejs 中的任務隊列進行區分，由於 setTimeout2 延遲 300 毫秒加入所以最後執行：",-1),N=(0,t._)("p",null,[(0,t._)("img",{src:o,alt:"image-20220113223918218"})],-1),C={},E=(0,a(3744).Z)(C,[["render",function(n,s){return(0,t.wg)(),(0,t.iD)(t.HY,null,[l,p,u,_,i,k,r,b,m,U,g,d,f,v,y,h,w,j,T,x,q,S,J,P,I,N],64)}]])},9588:(n,s,a)=>{n.exports=a.p+"assets/img/image-20220109193419856.aae41446.png"},1381:(n,s,a)=>{n.exports=a.p+"assets/img/image-20220113222320655.573ad6f0.png"},9737:(n,s,a)=>{n.exports=a.p+"assets/img/image-20220113223918218.2a4c89b5.png"}}]);