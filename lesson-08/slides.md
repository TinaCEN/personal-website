---
theme: default
title: See. Arrange. Build.
info: |
  Lesson 08 · 这节讲手机的屏幕设计逻辑，为什么按钮是这样，我们能运用这些底层规范搭建什么。
transition: fade
mdc: true
colorSchema: light
layout: none
aspectRatio: 16/9
canvasWidth: 1280
highlighter: shiki
lineNumbers: false
fonts:
  provider: none
  sans: PingFang SC
---

<div class="lesson-cover">
  <p class="codespark-brand">@CodeSpark</p>
  <CoverField :seed="8" />
  <p class="eyebrow">LESSON 08</p>
  <h1>See.<br>Arrange.<br>Build.</h1>
  <p class="subtitle">这节讲手机的屏幕设计逻辑，为什么按钮是这样，我们能运用这些底层规范搭建什么。</p>
</div>

<!--
今天不写代码。前面几节把功能做出来了，这节只看别人能不能一眼看懂。
-->

---
layout: none
---

<div class="page-shell roadmap">
  <header>
    <p class="kicker">ROADMAP</p>
    <h1>See. Arrange. Build.</h1>
  </header>
  <section>
    <h2>上半场 · Recap → Look → Choose</h2>
    <ol class="stagger">
      <li>
        <div>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l2.5 2"/></svg>
          <b>Recap</b>
        </div>
        <p>回顾上一节课的内容。</p>
      </li>
      <li>
        <div>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/></svg>
          <b>Look</b>
        </div>
        <p>什么是UI设计，我们到底在设计什么？</p>
      </li>
      <li>
        <div>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          <b>Choose</b>
        </div>
        <p>两张 AI 画出来的页面，你会选哪个？</p>
      </li>
    </ol>
  </section>
  <p class="roadmap-break">BREAK · 10 MIN</p>
  <section>
    <h2>下半场 · Components → Demo → Product</h2>
    <ol class="stagger">
      <li>
        <div>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 9h8M8 13h5"/></svg>
          <b>Components</b>
        </div>
        <p>一屏里面到底有什么。标题、列表、按钮、状态。</p>
      </li>
      <li>
        <div>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h10M4 17h7"/></svg>
          <b>Demo</b>
        </div>
        <p>Agent能快速做Demo，但我们怎么判断它是否合格？</p>
      </li>
      <li>
        <div>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="6" y="3" width="12" height="18" rx="2"/><path d="M10 18h4"/></svg>
          <b>Product</b>
        </div>
        <p>每人只改一处。下课前留下改前和改后两张图。</p>
      </li>
    </ol>
  </section>
</div>

---
layout: none
---

<div class="section-page" data-number="01">
  <p class="kicker">SECTION 01</p>
  <h1>Recap.</h1>
  <p class="lead">上节课我们讲了什么。</p>
</div>

<!--
交给奕凡，控制在 10 分钟。不要投影代码。
-->

---
layout: none
---

<div class="page-shell">
  <p class="kicker">RECAP · LESSON 07 · 奕凡</p>
  <h2>回顾一遍上节课的内容。</h2>
  <div class="cards three">
    <v-click>
      <article class="card">
        <p class="index">01</p>
        <h3>人打开这个页面是要干什么的</h3>
        <p>上节课讲的 Personal Agent 要记得你。</p>
      </article>
    </v-click>
    <v-click>
      <article class="card">
        <p class="index">02</p>
        <h3>条件、数组、循环、函数</h3>
        <p>程序怎么判断走哪条路、怎么记住一组东西、怎么重复做一件事。</p>
      </article>
    </v-click>
    <v-click>
      <article class="card">
        <p class="index">03</p>
        <h3>Agent 会用工具</h3>
        <p>它能看懂图片和声音，一步步调用工具做事。做完还要打开结果核对。</p>
      </article>
    </v-click>
  </div>
</div>

---
layout: none
---

<div class="section-page" data-number="02">
  <p class="kicker">SECTION 02</p>
  <h1>See.</h1>
  <p class="lead">这节课我们讲UI的设计。<br>也就是两件事：更好用，更好看。</p>
</div>

---
layout: none
---

<div class="page-shell">
  <p class="kicker">TINA · DESIGN</p>
  <h2>我是 Tina。今天讲界面的设计。</h2>
  <div class="cards three">
    <v-click>
      <article class="card">
        <p class="index">WHO</p>
        <h3>今天我来讲界面的设计</h3>
        <p>前面几节把功能做出来了。接下来讲我们设计的别人能不能一眼看懂。</p>
      </article>
    </v-click>
    <v-click>
      <article class="card">
        <p class="index">FROM</p>
        <h3>我做的是大家每天打开的那一屏界面</h3>
        <p>中国美术学院视觉传达，香港理工大学交互设计在读。做过微信支付，淘宝闪购的界面设计。</p>
      </article>
    </v-click>
    <v-click>
      <article class="card">
        <p class="index">TODAY</p>
        <h3>今天你能学会的</h3>
        <p>AI 也能做设计，但我要告诉你AI为何这样做。</p>
      </article>
    </v-click>
  </div>
</div>

<!--
8 分钟以内。奖项不念。第三张讲完，接更好用和更好看。
-->

---
layout: none
---

<div class="page-shell">
  <TwoPoints />
</div>

<!--
左边那条很快走完，讲更好用。右边扁平按钮之后弹出两颗玻璃按钮，讲更好看。
学生今天仍做一个实心蓝按钮。液态玻璃只说明样子会变。
-->

---
layout: none
---

<div class="page-shell">
  <NeedStandard />
</div>

<!--
先看左边那一屏自己长出来。再指需求、标准。色块在蓝和红之间换，是在说标准会变。
-->

---
layout: none
---

<div class="page-shell">
  <KnowShape />
</div>

<!--
按钮先描边，字再出来。讲：人认的是这个样子。动作不用在这页展开。
-->

---
layout: none
---

<div class="page-shell">
  <p class="kicker">LOOK · THREE QUESTIONS</p>
  <h2>打开手机里的一个APP。</h2>
  <div class="cards three">
    <v-click>
      <article class="card">
        <p class="index">01</p>
        <h3>这个页面要人干什么？</h3>
        <p>要你做什么事。说不清，那它就是设计得不好。</p>
      </article>
    </v-click>
    <v-click>
      <article class="card">
        <p class="index">02</p>
        <h3>你的眼睛先落在哪？</h3>
        <p>那个位置，为何是想让你先看见？</p>
      </article>
    </v-click>
    <v-click>
      <article class="card">
        <p class="index">03</p>
        <h3>只能点一个地方的话，你会点哪？</h3>
        <p>点得到，这一屏就有主按钮。点不到，按钮就是摆设。</p>
      </article>
    </v-click>
  </div>
</div>

---
layout: none
---

<div class="page-shell">
  <p class="kicker">CHOOSE · CLICK A SCREEN</p>
  <h2>哪一张你先看懂？</h2>
  <ScreenPick />
</div>

<!--
让学生先点。点完再念下面那句判断，不要自己先说答案。
-->

---
layout: none
---

<div class="page-shell">
  <p class="kicker">CHOOSE · THREE RULES</p>
  <h2>记住这三条就够。</h2>
  <div class="cards three">
    <v-click>
      <article class="card">
        <p class="index">01</p>
        <h3>只做一件事</h3>
        <p>多出来的说明、第二个入口、装饰图，先拿掉。</p>
      </article>
    </v-click>
    <v-click>
      <article class="card">
        <p class="index">02</p>
        <h3>先看哪，后看哪</h3>
        <p>标题最大，然后是列表，主按钮只留一个。</p>
      </article>
    </v-click>
    <v-click>
      <article class="card">
        <p class="index">03</p>
        <h3>靠近的是一组</h3>
        <p>有关系的放近，没关系的拉开。空出来是在分组，不是没排完。</p>
      </article>
    </v-click>
  </div>
</div>

---
layout: none
---

<div class="page-shell flow-page">
  <BlockFall />
  <p class="kicker">CHOOSE · TELL THE AI</p>
  <h2>用AI生成界面的Workflow</h2>
  <div class="cards four flow">
    <v-click>
      <article class="card">
        <p class="index">01 · 给谁、做什么</p>
        <h3>先说这一屏的用处</h3>
        <p class="say">「给我自己用的阅读记录，一打开就看今天读完没有。」</p>
      </article>
    </v-click>
    <v-click>
      <article class="card">
        <p class="index">02 · 要什么</p>
        <h3>点名要的零件</h3>
        <p class="say">「要一个标题、一组列表、一个主按钮。」</p>
      </article>
    </v-click>
    <v-click>
      <article class="card">
        <p class="index">03 · 不要什么</p>
        <h3>把多余的先拦住</h3>
        <p class="say">「不要登录，不要第二个主按钮，不要大段说明。」</p>
      </article>
    </v-click>
    <v-click>
      <article class="card">
        <p class="index">04 · 先看哪</p>
        <h3>讲清楚字的层级</h3>
        <p class="say">「标题最大，列表其次，按钮放在最下面。」</p>
      </article>
    </v-click>
  </div>
  <v-click>
    <p class="deck-note">生成完，用三个问题检查：要人干什么？眼睛先落哪？只能点哪？答不上来就让它删，别整页重做。</p>
  </v-click>
</div>

---
layout: none
---

<BreakTimer />

---
layout: none
---

<div class="section-page" data-number="03">
  <p class="kicker">SECTION 03</p>
  <h1>Arrange.</h1>
  <p class="lead">四个主要零件：标题、列表、按钮、状态。</p>
</div>

---
layout: none
---

<div class="page-shell">
  <p class="kicker">COMPONENTS · THIS SCREEN</p>
  <h2>这四个，各管一件事。</h2>
  <div class="cards four stagger parts">
    <article class="card">
      <p class="index">标题</p>
      <h3>这一屏在做什么</h3>
      <p>整屏最大的字，只写一句。</p>
      <UiSample kind="title" />
    </article>
    <article class="card">
      <p class="index">列表</p>
      <h3>同一类内容重复</h3>
      <p>每一行长得一样：一个名字，旁边再加一个小字用于说明。</p>
      <UiSample kind="list" />
    </article>
    <article class="card">
      <p class="index">按钮</p>
      <h3>全屏只留一个</h3>
      <p>实心、蓝色、够大。别的动作写成小字。</p>
      <UiSample kind="button" />
    </article>
    <article class="card">
      <p class="index">状态</p>
      <h3>现在进行到哪</h3>
      <p>空的、正在做、做完了，是三张不同的图。</p>
      <UiSample kind="state" />
    </article>
  </div>
</div>

---
layout: none
---

<div class="page-shell">
  <p class="kicker">COMPONENT · TITLE</p>
  <h2>标题要让人知道，这是哪一屏。</h2>
  <div class="split">
    <div class="stack">
      <v-click>
        <article class="card">
          <h3>写这一屏要人做的事</h3>
          <p>写一句短的。写成一段，标题就不显眼了。</p>
        </article>
      </v-click>
      <v-click>
        <article class="card">
          <h3>整屏只有这里最大</h3>
          <p>卡片上的字如果和页面标题一样大，就不知道先看哪一句。</p>
        </article>
      </v-click>
    </div>
    <div class="mini device">
      <span class="device__status"><b>9:41</b><i></i></span>
      <h4>今天读完了吗</h4>
      <p class="deck-note">给自己用的阅读记录。一进来就知道要核对今天。</p>
      <span class="row faint"><b>阅读</b><small>12 页</small></span>
      <span class="row faint"><b>休息</b><small>还没开始</small></span>
      <span class="row faint"><b>绘画</b><small>已完成</small></span>
      <span class="cta faint">开始阅读</span>
    </div>
  </div>
</div>

---
layout: none
---

<div class="page-shell">
  <p class="kicker">COMPONENT · LIST</p>
  <h2>看完一行，要能做决定。</h2>
  <div class="split">
    <div class="stack">
      <v-click>
        <article class="card">
          <h3>同类的信息样式需要一致</h3>
          <p>阅读、休息、绘画是同一类。格式一样，才好一眼扫过去。</p>
        </article>
      </v-click>
      <v-click>
        <article class="card">
          <h3>名字旁边再放一个信息</h3>
          <p>页数、还没开始、已完成。只有一个名字，就没法决定下一步。</p>
        </article>
      </v-click>
    </div>
    <div class="mini device">
      <span class="device__status"><b>9:41</b><i></i></span>
      <h4>今天读完了吗</h4>
      <span class="row"><b>阅读</b><small>12 页</small></span>
      <span class="row"><b>休息</b><small>还没开始</small></span>
      <span class="row"><b>绘画</b><small>已完成</small></span>
    </div>
  </div>
</div>

---
layout: none
---

<div class="page-shell">
  <p class="kicker">COMPONENT · BUTTON</p>
  <h2>主按钮只有一个。</h2>
  <div class="split">
    <div class="stack">
      <v-click>
        <article class="card">
          <h3>实心、操作颜色</h3>
          <p>人先看懂这一屏，再看引导的按钮。</p>
        </article>
      </v-click>
      <v-click>
        <article class="card">
          <h3>第二个动作写成灰色小字</h3>
          <p>三个一样大的蓝按钮，就等于没有主按钮。</p>
        </article>
      </v-click>
    </div>
    <div class="mini device">
      <span class="device__status"><b>9:41</b><i></i></span>
      <h4>今天读完了吗</h4>
      <span class="row"><b>阅读</b><small>12 页</small></span>
      <span class="row"><b>休息</b><small>还没开始</small></span>
      <span class="cta">开始阅读</span>
      <span class="ghost">稍后再说</span>
    </div>
  </div>
  <p class="deck-note">设计的样式会有很多。</p>
</div>

---
layout: none
---

<div class="page-shell">
  <p class="kicker">COMPONENT · STATE</p>
  <h2>没有内容的时候，也要有画面。</h2>
  <div class="split">
    <div class="stack">
      <v-click>
        <article class="card">
          <h3>空的时候告诉人下一步</h3>
          <p>只留一块空白，用户不知道是界面无法加载，还是今天还没记录。</p>
        </article>
      </v-click>
      <v-click>
        <article class="card">
          <h3>做完了就换一句话</h3>
          <p>正在做和已经做完，不要用同一句标题。</p>
        </article>
      </v-click>
    </div>
    <div class="mini device state-empty">
      <span class="device__status"><b>9:41</b><i></i></span>
      <h4>今天读完了吗</h4>
      <p class="empty">今天还没有记录</p>
      <span class="cta">记下第一件</span>
    </div>
  </div>
</div>

---
layout: none
---

<div class="section-page" data-number="04">
  <p class="kicker">SECTION 04</p>
  <h1>Demo.</h1>
  <p class="lead">先说清楚你的限制，再出工程代码。<br>根据效果修改。</p>
</div>

---
layout: none
---

<div class="page-shell">
  <p class="kicker">DEMO · FIVE MOVES</p>
  <h2>图整理好了，再交给 AI。</h2>
  <div class="steps">
    <v-click>
      <article>
        <p class="index">01</p>
        <h3>念出限制</h3>
        <p>给谁、做一件什么事、不要什么。</p>
      </article>
    </v-click>
    <v-click>
      <article>
        <p class="index">02</p>
        <h3>生成一版</h3>
        <p>先看，不急着保存。好的界面都是迭代出来的。</p>
      </article>
    </v-click>
    <v-click>
      <article>
        <p class="index">03</p>
        <h3>指出哪里看得不舒服</h3>
        <p>字一样大，按钮太多，或者一行只有一个名字。</p>
      </article>
    </v-click>
    <v-click>
      <div class="tool-span">
        <AppMarks kind="ai" spread />
        <p class="tool-note">不局限于这些。你平时用的那个 Agent 就行。</p>
      </div>
    </v-click>
    <v-click>
      <article>
        <p class="index">04</p>
        <h3>放进 Figma 修改（进阶）</h3>
        <p>只留标题、列表、一个主按钮。</p>
        <AppMarks kind="figma" />
      </article>
    </v-click>
    <v-click>
      <article>
        <p class="index">05</p>
        <h3>按这张图做</h3>
        <p>截图告诉 AI：照这张图的展示效果做，不要自己再加模块。</p>
      </article>
    </v-click>
  </div>
</div>

<!--
演示中断就用事先做好的前后两张图，把这五步讲完。
-->

---
layout: none
---

<div class="section-page" data-number="05">
  <p class="kicker">SECTION 05</p>
  <h1>Build.</h1>
  <p class="lead">你可以开始<mark>建造自己的个人页面</mark>或做<mark>你想做的APP</mark>。</p>
</div>

---
layout: none
---

<div class="page-shell">
  <p class="kicker">PRODUCT · 15 MIN</p>
  <h2>三选一，只改一处。</h2>
  <div class="cards three stagger">
    <article class="card">
      <p class="index">01</p>
      <h3>把大小拉开</h3>
      <p>标题最大，主按钮只选择一个颜色。</p>
      <FixDemo kind="size" />
    </article>
    <article class="card">
      <p class="index">02</p>
      <h3>一行能看出结果</h3>
      <p>名字旁边加上数量，或者加上做完没有。</p>
      <FixDemo kind="row" />
    </article>
    <article class="card">
      <p class="index">03</p>
      <h3>再画一种情况</h3>
      <p>空的，或者已经完成的。和现在这张不一样。</p>
      <FixDemo kind="state" />
    </article>
  </div>
</div>

<!--
线下老师带操作。Tina 看那三个问题有没有答出来。要改代码时交给线下老师。
下课交改前、改后两张图，再加一句：这一屏是用来 ______ 的。
-->

---
layout: none
---

<div class="lesson-cover lesson-cover--closing">
  <p class="codespark-brand">@CodeSpark</p>
  <CoverField :seed="21" />
  <p class="eyebrow">LESSON 08 · KEEP LOOKING</p>
  <h1>See.<br>Arrange.<br>Build.</h1>
  <p class="subtitle">这一屏先看什么、后看什么，已经清楚了。下节课我们讲AI生成式多媒体。</p>
</div>
