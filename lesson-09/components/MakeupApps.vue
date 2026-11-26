<template>
  <div class="phones">
    <article>
      <div class="device notes" aria-hidden="true">
        <div class="bar"><span>9:41</span><i class="sig" /><i class="bat" /></div>
        <b class="app-title">备忘录</b>
        <div class="search">搜索</div>
        <div class="cell"><b>周末计划</b><small>昨天 · 去图书馆</small></div>
        <div class="cell"><b>购物清单</b><small>星期一 · 牛奶、面包</small></div>
        <div class="cell"><b>课上想法</b><small>今天 · 标题要最大</small></div>
      </div>
      <h3>标题最大</h3>
      <p>打开就知道这是哪一屏。</p>
    </article>
    <article>
      <div class="device alarms" aria-hidden="true">
        <div class="bar"><span>9:41</span><i class="sig" /><i class="bat" /></div>
        <div class="app-head"><b>闹钟</b><em>编辑</em></div>
        <div class="alarm">
          <span><b>7:00</b><small>上午</small><em>起床 · 工作日</em></span>
          <i class="switch on" />
        </div>
        <div class="alarm">
          <span><b>8:30</b><small>上午</small><em>出门</em></span>
          <i class="switch" />
        </div>
        <div class="alarm">
          <span><b>9:00</b><small>下午</small><em>读书</em></span>
          <i class="switch on" />
        </div>
      </div>
      <h3>同类长一样</h3>
      <p>旁边有一行小字，才能选。</p>
    </article>
    <article>
      <div class="device timer" aria-hidden="true">
        <div class="bar"><span>9:41</span><i class="sig" /><i class="bat" /></div>
        <div class="tabs"><span>世界时钟</span><span class="on">计时器</span></div>
        <div class="dial"><b>0:30</b></div>
        <i class="go">开始</i>
      </div>
      <h3>一个主按钮</h3>
      <p>计时器的开始是绿色。继续、确认用蓝。</p>
    </article>
    <article>
      <div class="device empty" aria-hidden="true">
        <div class="bar"><span>9:41</span><i class="sig" /><i class="bat" /></div>
        <div class="app-head"><b>备忘录</b></div>
        <div class="blank">
          <i class="doc" />
          <b>今天还没有记录</b>
          <small>空着，也要知道下一步。</small>
          <em>记下第一件</em>
        </div>
      </div>
      <h3>空白要告诉下一步</h3>
      <p>空着，也要知道接下来点哪里。</p>
    </article>
  </div>
</template>

<style scoped>
.phones {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;
}
article {
  min-width: 0;
  padding: 0.7rem 0.7rem 0.75rem;
  background: #fff;
  border: 1px solid rgba(29, 29, 31, 0.08);
  border-radius: 22px;
}
.device {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 228px;
  margin-bottom: 0.7rem;
  overflow: hidden;
  background: #f2f2f7;
  border: 6px solid #1c1c1e;
  border-radius: 24px;
  font-family: -apple-system, "SF Pro Text", "PingFang SC", sans-serif;
}
.bar {
  display: flex;
  align-items: center;
  height: 16px;
  padding: 5px 8px 0;
  color: #111;
  font-size: 0.58rem;
  font-weight: 700;
}
.sig, .bat { margin-left: auto; }
.sig {
  width: 11px;
  height: 7px;
  margin-right: 3px;
  background: linear-gradient(#111, #111) 0 100% / 2px 40% no-repeat,
    linear-gradient(#111, #111) 4px 100% / 2px 70% no-repeat,
    linear-gradient(#111, #111) 8px 100% / 2px 100% no-repeat;
}
.bat {
  width: 14px;
  height: 7px;
  border: 1px solid #111;
  border-radius: 2px;
}
.bat::after {
  content: "";
  display: block;
  width: 8px;
  height: 100%;
  background: #111;
}
.app-title, .app-head b {
  margin: 1px 8px 0;
  color: #111;
  font-size: 1.22rem;
  font-weight: 760;
  letter-spacing: -0.04em;
  line-height: 1.2;
}
.app-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-right: 8px;
}
.app-head em {
  color: #007aff;
  font-size: 0.68rem;
  font-style: normal;
  font-weight: 600;
}
.search {
  height: 18px;
  margin: 8px 8px 2px;
  padding: 0 8px;
  color: #8e8e93;
  font-size: 0.62rem;
  line-height: 18px;
  background: #e3e3e8;
  border-radius: 6px;
}
.cell {
  margin: 0 8px;
  padding: 5px 0;
  border-bottom: 1px solid rgba(60, 60, 67, 0.16);
}
.cell b, .alarm b {
  display: block;
  color: #111;
  font-size: 0.72rem;
  font-weight: 650;
}
.cell small, .alarm em {
  display: block;
  color: #8e8e93;
  font-size: 0.58rem;
  font-style: normal;
  font-weight: 500;
}
.alarm {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 8px;
  padding: 5px 0;
  border-bottom: 1px solid rgba(60, 60, 67, 0.16);
}
.alarm b {
  display: inline;
  font-size: 1.15rem;
  font-weight: 500;
  letter-spacing: -0.04em;
}
.alarm small {
  margin-left: 2px;
  color: #111;
  font-size: 0.58rem;
}
.switch {
  position: relative;
  flex: none;
  width: 30px;
  height: 18px;
  background: #e9e9eb;
  border-radius: 999px;
}
.switch.on { background: #34c759; }
.switch::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.22);
}
.switch.on::after { left: 14px; }
.tabs {
  display: flex;
  gap: 8px;
  padding: 0 8px;
  color: #8e8e93;
  font-size: 0.62rem;
  font-weight: 650;
}
.tabs .on { color: #111; }
.dial {
  display: grid;
  width: 92px;
  height: 92px;
  margin: 8px auto 0;
  place-items: center;
  background: conic-gradient(#ff9f0a 0 72%, #e5e5ea 0);
  border-radius: 50%;
}
.dial::before {
  content: "";
  grid-area: 1 / 1;
  width: 74px;
  height: 74px;
  background: #fff;
  border-radius: 50%;
}
.dial b {
  z-index: 1;
  grid-area: 1 / 1;
  color: #111;
  font-size: 1.25rem;
  font-weight: 560;
  letter-spacing: -0.04em;
}
.go {
  display: grid;
  place-items: center;
  height: 28px;
  margin: auto 10px 10px;
  color: #fff;
  font-size: 0.78rem;
  font-style: normal;
  font-weight: 700;
  background: #34c759;
  border-radius: 999px;
}
.blank {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto 10px;
  text-align: center;
}
.doc {
  width: 28px;
  height: 34px;
  margin-bottom: 6px;
  background: #fff;
  border: 1.5px solid #c7c7cc;
  border-radius: 5px;
  box-shadow: inset 0 -10px 0 #ffe27a;
}
.blank b { color: #111; font-size: 0.78rem; }
.blank small { margin-top: 2px; color: #8e8e93; font-size: 0.58rem; }
.blank em {
  margin-top: 8px;
  padding: 0.28rem 0.7rem;
  color: #fff;
  font-size: 0.68rem;
  font-style: normal;
  font-weight: 700;
  background: #007aff;
  border-radius: 999px;
}
h3 { margin: 0 0 0.2rem; color: #17243b; font-size: 1.02rem; }
p { margin: 0; color: #52627b; font-size: 0.82rem; line-height: 1.35; }
</style>
