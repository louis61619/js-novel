"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[450],{9794:(n,s,a)=>{a.r(s),a.d(s,{data:()=>e});const e={key:"v-031d6795",path:"/front-end/javascript/14_supplement.html",title:"補充",lang:"en-US",frontmatter:{},excerpt:"",headers:[{level:2,title:"Eval",slug:"eval",children:[]},{level:2,title:"With",slug:"with",children:[]}],filePathRelative:"front-end/javascript/14_supplement.md",git:{updatedTime:1665400196e3,contributors:[{name:"louis61619",email:"louis61619@gmail.com",commits:1}]}}},9534:(n,s,a)=>{a.r(s),a.d(s,{default:()=>t});const e=(0,a(6252).uE)('<h1 id="補充" tabindex="-1"><a class="header-anchor" href="#補充" aria-hidden="true">#</a> 補充</h1><h2 id="eval" tabindex="-1"><a class="header-anchor" href="#eval" aria-hidden="true">#</a> Eval</h2><p>eval 是一個特殊的函數，可以將傳入的字符串當作 JavaScript 程式碼來運行。</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">var</span> str <span class="token operator">=</span> <span class="token string">&#39;var message = &quot;Hello World&quot;; console.log(message);&#39;</span>\n\n<span class="token function">eval</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span>\n\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>不建議使用的原因如下：</p><ul><li>eval 程式碼的可讀性非常差，因為是一連串的字符串。</li><li>eval 是執行字符串，如果該字符串是從服務器獲取，非常容易被竄改而造成危險。</li><li>通過 eval 函數並不會經過 js 引擎優化，效能較差。</li></ul><h2 id="with" tabindex="-1"><a class="header-anchor" href="#with" aria-hidden="true">#</a> With</h2><p>with 語句是一種比較少見的 JavaScript 語法，由於其特殊性現在大多數時候已經不太推薦於使用了，並且在嚴格模式下 with 語句是無法運作的。</p><p>透過 with 語句，能夠指定某個物件做為內部變數查找的作用域：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>\n  message<span class="token operator">:</span> <span class="token string">&#39;Hello Obj&#39;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">with</span> <span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n<span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>上面這個案例中 bar 函數中將 obj 指定為作用域，就會優先從 obj 這個物件中進行查找 message 這個變數，所以最終的輸出解果為：</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Hello Obj\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div>',12),p={},t=(0,a(3744).Z)(p,[["render",function(n,s){return e}]])}}]);