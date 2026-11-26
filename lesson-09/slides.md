---
theme: default
title: Move. Hear. Place.
info: |
  第 9 课。先做一段 5 秒的画面，再写一首能听的曲子。
  曲子可以当背景音乐，画面可以当第一个作品的开头。
class: text-center
drawings:
  persist: false
transition: fade
mdc: true
canvasWidth: 1280
aspectRatio: 16/9
fonts:
  sans: PingFang SC
  serif: PingFang SC
  mono: SF Mono
layout: none
---

<div class="lesson-cover">
  <p class="codespark-brand">CodeSpark</p>
  <CoverField :seed="9" />
  <p class="eyebrow eyebrow-corner">LESSON 09</p>
  <h1>Move. Hear.Place.</h1>
  <p class="subtitle">这节课用强大的AI做有趣的创意项目:创意短片动画、有趣的网页、一首曲子...</p>
</div>

<!--
今天不改产品本身。先做出能看的 5 秒，和能听的一小段。
-->

---
layout: none
---

<div class="page-shell roadmap">
  <p class="codespark-brand">CodeSpark</p>
  <header>
    <p class="kicker">TODAY</p>
    <h1>我们来做一些有意思的设计，从网页、短片到音乐</h1>
  </header>

  <ol>
    <li v-click>
      <b>01 回顾</b>
      <p>上一屏怎么看懂，四句话就够。</p>
    </li>
    <li v-click>
      <b>02 一个网页</b>
      <p>AI 做出来的页面，你可以直接点、可以直接玩。</p>
    </li>
    <li v-click>
      <b>03 一个短片</b>
      <p>可以将古诗科普知识变成趣味短片</p>
    </li>
  </ol>

  <p class="roadmap-break" v-click>休息 · 10 分钟</p>

  <ol>
    <li v-click>
      <b>04 我是制片人</b>
      <p>使用AI工具产出一个你的短片</p>
    </li>
    <li v-click>
      <b>05 我是音乐家</b>
      <p>使用AI工具编出一首好听的曲子</p>
    </li>
    <li v-click>
      <b>06 我的作品</b>
      <p>回顾学的知识<br>我最后可以做出一个什么有意思的作品出来</p>
    </li>
  </ol>
</div>

---
layout: none
---

<section class="section-page" data-number="01">
  <p class="codespark-brand">CodeSpark</p>
  <p class="kicker">RECAP</p>
  <h1 class="one-line">先看懂这一屏。</h1>
  <p class="lead">四个内容总结上一节课的重点。这对我们以后想要做出自己的APP很重要，因为<mark>画面和声音也要有人来定</mark>。</p>
</section>

---
layout: none
---

<div class="page-shell recap-four">
  <p class="codespark-brand">CodeSpark</p>
  <p class="kicker">FROM LESSON 08</p>
  <h2>四句话总结上节课的内容。</h2>
  <div class="cards four">
    <article class="card" v-click>
      <span class="index">01</span>
      <h3>标题最大</h3>
      <p>打开就知道这是哪一屏。</p>
      <RecapBoards kind="title" />
    </article>
    <article class="card" v-click>
      <span class="index">02</span>
      <h3>同类长一样</h3>
      <p>旁边有一行小字，才能决定。</p>
      <RecapBoards kind="rows" />
    </article>
    <article class="card" v-click>
      <span class="index">03</span>
      <h3>一个主按钮</h3>
      <p>蓝色是继续、确认。红色是禁止、拒绝、取消。</p>
      <RecapBoards kind="button" />
    </article>
    <article class="card" v-click>
      <span class="index">04</span>
      <h3>人来定标准</h3>
      <p>AI 画得快。需求和标准，还是你的。</p>
      <RecapBoards kind="standard" />
    </article>
  </div>
</div>

---
layout: none
---

<section class="section-page" data-number="02">
  <p class="codespark-brand">CodeSpark</p>
  <p class="kicker">A PAGE</p>
  <h1 class="one-line fit">我们来看一些大神做的网页</h1>
  <p class="lead">AI 能做出很炫酷的东西。下面这几页，<mark>你可以直接玩</mark>。</p>
</section>

---
layout: none
---

<div class="page-shell web-page">
  <p class="codespark-brand">CodeSpark</p>
  <p class="kicker">TOUCH IT</p>
  <h2>点一个名字，换一页来玩。</h2>
  <WebStage />
</div>

<!--
先从乐队开始。鱼塘要点屏幕。铁屑可以做小实验。极光、陶轮、果冻字、青苔、蚁巢都可以换着玩。
点网页里面不会翻页。翻页要点标题下面，或按方向键。
-->

---
layout: none
---

<section class="section-page" data-number="03">
  <p class="codespark-brand">CodeSpark</p>
  <p class="kicker">SEE</p>
  <h1 class="one-line see">先看别人怎么做。</h1>
  <p class="lead">三种有意思的AI短片类型，<mark>今天我们做其中一种</mark></p>
</section>

---
layout: none
---

<div class="page-shell guess-page">
  <p class="codespark-brand">CodeSpark</p>
  <h2>看看这两个视频，哪一个是AI做的。</h2>
  <div class="tablet" @click.stop>
    <i class="tablet-cam" aria-hidden="true" />
    <div class="tablet-screen">
      <video :src="videoSrc" controls playsinline preload="metadata"></video>
    </div>
  </div>
</div>

<script setup>
const videoSrc = "/guess-side.mp4"
</script>

---
layout: none
---

<div class="page-shell">
  <p class="codespark-brand">CodeSpark</p>
  <p class="kicker">THREE KINDS</p>
  <h2>点一张，看它在动什么。</h2>
  <FilmTypes />
  <p class="deck-note">知识型用古诗。短篇动漫要同一张脸。科普要把一件事讲完。</p>
</div>

---
layout: none
---

<div class="page-shell">
  <p class="codespark-brand">CodeSpark</p>
  <p class="kicker">YOUR TURN</p>
  <h2>选一个你喜欢的主题吧</h2>
  <TaskPick />
</div>

<!--
第二种更有意思，但只用自己的照片。
-->

---
layout: none
---

<div class="page-shell">
  <p class="codespark-brand">CodeSpark</p>
  <p class="kicker">HOW TO MAKE IT</p>
  <h2>AI工具+提示词</h2>
  <div class="cards two tools">
    <article class="card" v-click>
      <span class="index"><img class="tool-mark" src="/jimeng-logo.png" alt="">即梦 · 古诗、卡通</span>
      <h3>jimeng.jianying.com</h3>
      <p class="say">《静夜思》。一个人在窗前抬头看月亮，然后低下头。<br>中国卡通，慢慢移动，5 秒。不要字，不要第二个人。</p>
    </article>
    <article class="card" v-click>
      <span class="index"><img class="tool-mark" src="/kling-logo.png" alt="">可灵 · 把自己放进镜头</span>
      <h3>klingai.com</h3>
      <p class="say">用这张照片里的人，让他穿越森林，像天使一样飞过热带雨林5秒。不要换脸，不要加第二个人。</p>
    </article>
  </div>
  <p class="deck-note" v-click>这是我们常用的工具和提示词，我们一起来试一试吧！</p>
</div>

---
layout: none
---

<BreakTimer />

---
layout: none
---

<section class="section-page" data-number="04">
  <p class="codespark-brand">CodeSpark</p>
  <p class="kicker">MAKE</p>
  <h1>做一条 5 秒。</h1>
  <p class="lead">做完后，大家一起来看看。</p>
</section>

---
layout: none
---

<section class="section-page" data-number="05">
  <p class="codespark-brand">CodeSpark</p>
  <p class="kicker">HEAR</p>
  <h1>我们来做<br>作曲家</h1>
  <p class="lead">AI编曲需要我们设定<mark>节奏、旋律，还有编曲</mark>。</p>
</section>

---
layout: none
---

<div class="page-shell">
  <p class="codespark-brand">CodeSpark</p>
  <p class="kicker">RHYTHM · MELODY · ARRANGEMENT</p>
  <h2>点一下，听这一层在干什么。</h2>
  <MusicBuild />
</div>

---
layout: none
---

<div class="page-shell">
  <p class="codespark-brand">CodeSpark</p>
  <p class="kicker">WRITE ONE</p>
  <h2>选一件事，写成一句。</h2>
  <SongPick />
  <p class="deck-note">我们使用SUNO生成音乐</p>
</div>

---
layout: none
---

<div class="page-shell">
  <p class="codespark-brand">CodeSpark</p>
  <p class="kicker">LISTEN</p>
  <h2>我们动手制作吧</h2>
  <p class="deck-note">制作完了之后，我们一起来听听。</p>
</div>

---
layout: none
---

<div class="page-shell">
  <p class="codespark-brand">CodeSpark</p>
  <p class="kicker">PLACE</p>
  <h2>我今天学会了做视频，还有做音乐</h2>
  <div class="place">
    <div v-click>
      <b>我的第一支AI歌曲</b>
      <span>可以嵌进作品里，当背景音乐。作品本身今天不改。</span>
    </div>
    <div v-click>
      <b>我的第一个AI短片</b>
      <span>可以放进第一个作品，当 5 秒的开头。</span>
    </div>
  </div>
</div>

---
layout: none
class: lesson-cover lesson-cover--closing
---

<div class="lesson-cover">
  <p class="codespark-brand">CodeSpark</p>
  <CoverField :seed="19" />
  <p class="eyebrow">DONE</p>
  <h1 class="closing-title">画面和声音我都会做了，<br>下一步是～</h1>
  <p class="subtitle">今天我们产出了一个短片和歌曲，下课</p>
</div>

---
layout: none
---

<section class="section-page" data-number="06">
  <p class="codespark-brand">CodeSpark</p>
  <p class="kicker">AFTER CLASS · 30 MIN</p>
  <h1 class="makeup-title">上节课没来的同学，<br>这回补一下课</h1>
  <p class="lead">我们简单补一下上节课我们讲课的内容，主要是APP设计里面的几个重要的组件：按钮、文案、标题、空白页</p>
</section>

---
layout: none
---

<div class="page-shell">
  <p class="codespark-brand">CodeSpark</p>
  <p class="kicker">MAKEUP</p>
  <h2>我们来打开一下手机/平板里面的软件</h2>
  <MakeupApps />
  <p class="deck-note">所有的设计都是为了让我们使用者用起来更方便</p>
</div>
