<script setup>
defineProps({
  kind: { type: String, required: true },
});
</script>

<template>
  <figure class="board">
    <div v-if="kind === 'title'" class="screen notes">
      <span class="back">‹ 文件夹</span>
      <strong>备忘录</strong>
      <span class="search">搜索</span>
      <span class="note"><b>周末计划</b><small>昨天 · 去图书馆</small></span>
    </div>

    <div v-else-if="kind === 'rows'" class="screen alarms">
      <span class="row">
        <span><b>7:00</b><small>闹钟 · 工作日</small></span>
        <i class="switch on" />
      </span>
      <span class="row">
        <span><b>8:30</b><small>闹钟 · 出门</small></span>
        <i class="switch" />
      </span>
      <span class="row">
        <span><b>21:00</b><small>闹钟 · 读书</small></span>
        <i class="switch on" />
      </span>
    </div>

    <div v-else-if="kind === 'button'" class="screen actions">
      <p>要保存这张照片吗？</p>
      <b>继续</b>
      <em>取消</em>
    </div>

    <div v-else class="screen standard">
      <div class="draft">
        <b>AI 画的</b>
        <span>很快</span>
      </div>
      <div class="person" aria-hidden="true">
        <i class="head" />
        <i class="body" />
        <i class="arm" />
      </div>
      <div class="sheet">
        <span>需求</span>
        <strong>标准 <em>✓</em></strong>
      </div>
    </div>

    <figcaption>
      {{ { title: "备忘录", rows: "时钟 · 闹钟", button: "蓝色继续，红色取消", standard: "人来写需求，人来定标准" }[kind] }}
    </figcaption>
  </figure>
</template>

<style scoped>
.board { margin: 0.8rem 0 0; }
.screen {
  height: 168px;
  overflow: hidden;
  border-radius: 16px;
  font-family: -apple-system, "SF Pro Text", "PingFang SC", sans-serif;
}
figcaption {
  margin: 0.4rem 0 0;
  color: #8b97a8;
  font-size: 0.75rem;
  text-align: center;
}

.notes {
  display: flex;
  flex-direction: column;
  gap: 0.28rem;
  padding: 0.7rem 0.7rem 0;
  background: #f2f2f7;
}
.back { color: #d89b00; font-size: 0.78rem; font-weight: 600; }
.notes strong {
  color: #1d1d1f;
  font-size: 1.7rem;
  font-weight: 760;
  letter-spacing: -0.04em;
  line-height: 1;
}
.search {
  padding: 0.28rem 0.5rem;
  color: #8e8e93;
  font-size: 0.75rem;
  background: #e3e3e8;
  border-radius: 8px;
}
.note {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  margin-top: 0.15rem;
  padding: 0.45rem 0.55rem;
  background: #fff;
  border-radius: 10px;
}
.note b { color: #1d1d1f; font-size: 0.86rem; }
.note small { color: #8e8e93; font-size: 0.72rem; }

.alarms { padding: 0.15rem 0.75rem; background: #fff; border: 1px solid #eceef2; }
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  border-bottom: 1px solid #eceef2;
}
.row:last-child { border-bottom: 0; }
.row > span { display: flex; flex-direction: column; line-height: 1.05; }
.row b { color: #1d1d1f; font-size: 1.25rem; font-weight: 360; }
.row small { color: #8e8e93; font-size: 0.7rem; }
.switch {
  position: relative;
  width: 36px;
  height: 22px;
  background: #e5e5ea;
  border-radius: 999px;
}
.switch::after {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
  content: "";
}
.switch.on { background: #34c759; }
.switch.on::after { left: 16px; }

.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  padding: 0.8rem;
  background: #f4f6f8;
}
.actions p { margin: 0; color: #1d1d1f; font-size: 0.92rem; font-weight: 650; }
.actions b {
  display: grid;
  place-items: center;
  width: 100%;
  height: 42px;
  color: #fff;
  font-size: 1rem;
  background: #0071e3;
  border-radius: 12px;
}
.actions em { color: #ff3b30; font-size: 0.86rem; font-style: normal; font-weight: 650; }

.standard {
  display: grid;
  grid-template-columns: 1fr auto 0.9fr;
  align-items: center;
  gap: 0.35rem;
  padding: 0.7rem 0.55rem;
  background: #f4f7fb;
  border: 1px solid #e6edf5;
}
.draft {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 72px;
  padding: 0.4rem;
  color: #8aa0bd;
  text-align: center;
  background: #e7eef8;
  border-radius: 12px;
}
.draft b { font-size: 0.78rem; font-weight: 650; }
.draft span { font-size: 0.68rem; }
.person { position: relative; width: 46px; height: 92px; }
.head {
  position: absolute;
  top: 0;
  left: 12px;
  width: 22px;
  height: 22px;
  background: #17243b;
  border-radius: 50%;
}
.body {
  position: absolute;
  top: 26px;
  left: 8px;
  width: 30px;
  height: 48px;
  background: #17243b;
  border-radius: 16px 16px 10px 10px;
}
.arm {
  position: absolute;
  top: 34px;
  left: 30px;
  width: 22px;
  height: 6px;
  background: #17243b;
  border-radius: 999px;
  transform: rotate(18deg);
}
.sheet {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 0.65rem 0.5rem;
  background: #fff;
  border: 1px solid #d5deea;
  border-radius: 12px;
}
.sheet span { color: #8b97a8; font-size: 0.75rem; }
.sheet strong { color: #0b2b57; font-size: 0.92rem; }
.sheet em {
  display: inline-grid;
  place-items: center;
  width: 16px;
  height: 16px;
  margin-left: 0.15rem;
  color: #fff;
  font-size: 0.68rem;
  font-style: normal;
  background: #0071e3;
  border-radius: 50%;
}
</style>
