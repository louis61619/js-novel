"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[5],{3919:(n,s,a)=>{a.r(s),a.d(s,{data:()=>p});const p={key:"v-433f4a86",path:"/front-end/react/redux.html",title:"Redux",lang:"en-US",frontmatter:{},excerpt:"",headers:[{level:2,title:"Redux 三大原則",slug:"redux-三大原則",children:[]},{level:2,title:"如何使用",slug:"如何使用",children:[]},{level:2,title:"優化",slug:"優化",children:[]}],filePathRelative:"front-end/react/redux.md",git:{updatedTime:1665387363e3,contributors:[{name:"louis",email:"louis61619@gmail.com",commits:1},{name:"louis61619",email:"louis61619@gmail.com",commits:1}]}}},4206:(n,s,a)=>{a.r(s),a.d(s,{default:()=>t});const p=(0,a(6252).uE)('<h1 id="redux" tabindex="-1"><a class="header-anchor" href="#redux" aria-hidden="true">#</a> Redux</h1><p>在很多場景中，對於數據的管理都相當重要，一個狀態管理的第三方庫如 Redux，能對開發產生極大的幫助：</p><ul><li>保證數據可被追蹤並且可被預測。</li><li>所有數據變化，必須通過派發 action 來更新。</li><li>Action 是一個普通的 JavaScript 物件，用來描述這次更新的類型 （type）和內容（content）。</li></ul><h2 id="redux-三大原則" tabindex="-1"><a class="header-anchor" href="#redux-三大原則" aria-hidden="true">#</a> Redux 三大原則</h2><ul><li>單一數據源</li><li>State 是只讀的</li><li>使用純函數來執行修改</li></ul><h2 id="如何使用" tabindex="-1"><a class="header-anchor" href="#如何使用" aria-hidden="true">#</a> 如何使用</h2><p>首先定義初始化值：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> initialState <span class="token operator">=</span> <span class="token punctuation">{</span>\n  counter<span class="token operator">:</span> <span class="token number">0</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>創建容器（store）:</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">reducer</span><span class="token punctuation">(</span><span class="token parameter">state <span class="token operator">=</span> initialState<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> store <span class="token operator">=</span> redux<span class="token punctuation">.</span><span class="token function">createStore</span><span class="token punctuation">(</span>reducer<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>定義 action :</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> action1 <span class="token operator">=</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">&#39;INCREMENT&#39;</span> <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>在定義 action 後我們可以在 reducer 中寫上針對該 type 要進行的操作，比如說＋ 1，然後將全新的 state 返回：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">reducer</span><span class="token punctuation">(</span><span class="token parameter">state <span class="token operator">=</span> initialState<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">switch</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">case</span> <span class="token string">&#39;INCREMENT&#39;</span><span class="token operator">:</span>\n      <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token operator">...</span>state<span class="token punctuation">,</span> counter<span class="token operator">:</span> state<span class="token punctuation">.</span>counter <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">}</span>\n    <span class="token keyword">default</span><span class="token operator">:</span>\n      <span class="token keyword">return</span> state\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>最後可以通過派發 action 來操作 store：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// 通過 dispatch 來調用 reducer 函數並將 action 作為參數傳入 reducer 中</span>\nstore<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span>action1<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>當然，在派發 action 之前可以對 state 的改變作定閱：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>store<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;state 發生改變&#39;</span><span class="token punctuation">,</span> store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="優化" tabindex="-1"><a class="header-anchor" href="#優化" aria-hidden="true">#</a> 優化</h2><p>可以將 action 寫成函數以便傳入參數，如：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">addAction</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    type<span class="token operator">:</span> <span class="token string">&#39;INCREMENT&#39;</span><span class="token punctuation">,</span>\n    num\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\nstore<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">addAction</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>由於在 reducer 和 action 中都要對 type 進行獲取，可以將 type 定義成一個常量直接進行引用：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token constant">INCREMENT</span> <span class="token operator">=</span> <span class="token string">&#39;INCREMENT&#39;</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">addAction</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    type<span class="token operator">:</span> <span class="token constant">INCREMENT</span><span class="token punctuation">,</span>\n    num\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function">reducer</span><span class="token punctuation">(</span><span class="token parameter">state <span class="token operator">=</span> initialState<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">switch</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">case</span> <span class="token constant">INCREMENT</span><span class="token operator">:</span>\n      <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token operator">...</span>state<span class="token punctuation">,</span> counter<span class="token operator">:</span> state<span class="token punctuation">.</span>counter <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">}</span>\n    <span class="token keyword">default</span><span class="token operator">:</span>\n      <span class="token keyword">return</span> state\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>有時後為了避免 reducer 過於臃腫，可以進行拆分：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> defaultCounterState <span class="token operator">=</span> <span class="token punctuation">{</span>\n  counter<span class="token operator">:</span> <span class="token number">0</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function">counterReducer</span><span class="token punctuation">(</span><span class="token parameter">state <span class="token operator">=</span> defaultCounterState<span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">switch</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">case</span> <span class="token constant">INCREMENT</span><span class="token operator">:</span>\n      <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token operator">...</span>state<span class="token punctuation">,</span> counter<span class="token operator">:</span> state<span class="token punctuation">.</span>counter <span class="token operator">+</span> action<span class="token punctuation">.</span>num <span class="token punctuation">}</span>\n\n    <span class="token keyword">default</span><span class="token operator">:</span>\n      <span class="token keyword">return</span> state\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function">reducer</span><span class="token punctuation">(</span><span class="token parameter">state <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    counterState<span class="token operator">:</span> <span class="token function">counterReducer</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>counterState<span class="token punctuation">,</span> action<span class="token punctuation">)</span>\n    <span class="token comment">// ... 可以放入更多的 reducer</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div>',25),e={},t=(0,a(3744).Z)(e,[["render",function(n,s){return p}]])}}]);