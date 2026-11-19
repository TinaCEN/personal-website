<script setup>
defineProps({
  kind: { type: String, required: true },
});
</script>

<template>
  <figure class="ui-sample">
    <div v-if="kind === 'title'" class="ios ios--notes">
      <span class="ios__back">‹ 文件夹</span>
      <strong class="ios__large">备忘录</strong>
      <span class="ios__search">⌕ 搜索</span>
      <span class="ios__row"><b>周末计划</b><small>昨天 · 去图书馆</small></span>
    </div>

    <div v-else-if="kind === 'list'" class="ios ios--alarm">
      <span class="alarm"><span><b>7:00</b><small>闹钟 · 工作日</small></span><i class="switch on" /></span>
      <span class="alarm"><span><b>8:30</b><small>闹钟</small></span><i class="switch" /></span>
      <span class="alarm"><span><b>21:00</b><small>读书</small></span><i class="switch on" /></span>
    </div>

    <div v-else-if="kind === 'button'" class="ios ios--timer">
      <span class="timer__time">05:00</span>
      <span class="timer__btns">
        <i class="round round--quiet">取消</i>
        <i class="round round--go">开始</i>
      </span>
    </div>

    <div v-else class="ios ios--states">
      <span class="state">
        <em>空的</em>
        <span class="state__empty">没有备忘录</span>
      </span>
      <span class="state">
        <em>正在做</em>
        <span class="state__ring" />
      </span>
      <span class="state">
        <em>做完了</em>
        <span class="state__done">✓</span>
      </span>
    </div>

    <figcaption>{{ { title: "备忘录", list: "时钟 · 闹钟", button: "时钟 · 计时器", state: "空 / 进行中 / 完成" }[kind] }}</figcaption>
  </figure>
</template>

<style scoped>
.ui-sample {
  margin: auto 0 0;
  padding-top: 0.9rem;
}

.ios {
  height: 132px;
  padding: 0.7rem 0.75rem;
  background: #f2f2f7;
  border-radius: 16px;
  overflow: hidden;
  font-family: -apple-system, "SF Pro Text", "PingFang SC", sans-serif;
}

figcaption {
  margin-top: 0.4rem;
  color: #8b97a8;
  font-size: 0.72rem;
  text-align: center;
}

.ios--notes {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding-top: 0.55rem;
}

.ios__back {
  color: #e0a800;
  font-size: 0.72rem;
}

.ios__large {
  color: #1d1d1f;
  font-size: 1.45rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.ios__search {
  padding: 0.18rem 0.45rem;
  color: #8e8e93;
  font-size: 0.68rem;
  background: #e3e3e8;
  border-radius: 8px;
}

.ios__row {
  display: flex;
  flex-direction: column;
  padding: 0.3rem 0.5rem;
  background: #fff;
  border-radius: 8px;
}

.ios__row b { color: #1d1d1f; font-size: 0.74rem; }
.ios__row small { color: #8e8e93; font-size: 0.62rem; }

.ios--alarm {
  padding: 0.2rem 0.75rem;
  background: #fff;
  border: 1px solid #eceef2;
}

.alarm {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 42px;
  border-bottom: 1px solid #e5e5ea;
}

.alarm:last-child { border-bottom: 0; }
.alarm > span { display: flex; flex-direction: column; line-height: 1.1; }
.alarm b { color: #1d1d1f; font-size: 1.15rem; font-weight: 300; }
.alarm small { color: #8e8e93; font-size: 0.6rem; }

.switch {
  position: relative;
  width: 30px;
  height: 18px;
  background: #e5e5ea;
  border-radius: 999px;
}

.switch::after {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  content: "";
}

.switch.on { background: #34c759; }
.switch.on::after { left: 14px; }

.ios--timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: #1c1c1e;
}

.timer__time {
  color: #fff;
  font-size: 1.7rem;
  font-weight: 200;
  font-variant-numeric: tabular-nums;
}

.timer__btns {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 0.4rem;
}

.round {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  font-size: 0.68rem;
  font-style: normal;
  border-radius: 50%;
}

.round--quiet { color: #aeaeb2; background: #333336; }
.round--go { color: #30d158; background: #0f3a1a; box-shadow: 0 0 0 2px #1c1c1e, 0 0 0 3px #0f3a1a; }

.ios--states {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.35rem;
  padding: 0.5rem;
}

.state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.45rem 0.2rem 0.6rem;
  background: #fff;
  border-radius: 10px;
}

.state em {
  color: #8e8e93;
  font-size: 0.6rem;
  font-style: normal;
}

.state__empty {
  color: #aeaeb2;
  font-size: 0.6rem;
  text-align: center;
}

.state__ring {
  width: 34px;
  height: 34px;
  border: 4px solid #e5e5ea;
  border-top-color: #ff9f0a;
  border-right-color: #ff9f0a;
  border-radius: 50%;
}

.state__done {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 700;
  background: #34c759;
  border-radius: 50%;
}

@media (prefers-reduced-motion: no-preference) {
  .state__ring { animation: ui-spin 1.6s linear infinite; }
}

@keyframes ui-spin {
  to { transform: rotate(360deg); }
}
</style>
