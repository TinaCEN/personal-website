<script setup>
import { ref } from "vue";

const track = ref(0);
const tracks = [
  { name: "窗前", meta: "慢 · 钢琴 · 没有词" },
  { name: "中秋", meta: "齐 · 有鼓 · 四句短词" },
  { name: "配在视频后面", meta: "先听一遍，再决定要不要用" },
];
</script>

<template>
  <div class="listen">
    <button
      v-for="(item, index) in tracks"
      :key="item.name"
      type="button"
      :class="{ on: track === index }"
      @click.stop="track = index"
    >
      <span class="bars" aria-hidden="true"><i /><i /><i /><i /></span>
      <span>
        <b>{{ item.name }}</b>
        <small>{{ item.meta }}</small>
      </span>
    </button>
  </div>
</template>

<style scoped>
.listen { display: grid; gap: 0.75rem; }
button {
  display: flex;
  gap: 0.9rem;
  align-items: center;
  padding: 0.85rem 1rem;
  text-align: left;
  background: #fff;
  border: 1px solid rgba(29, 29, 31, 0.08);
  border-radius: 18px;
  cursor: pointer;
}
button.on { border-color: #0071e3; background: #f4f9ff; }
.bars { display: flex; gap: 3px; align-items: end; width: 22px; height: 18px; }
.bars i {
  width: 3px;
  height: 6px;
  background: #9bb4d4;
  border-radius: 2px;
}
button.on .bars i { background: #0071e3; animation: bar 0.7s ease-in-out infinite alternate; }
button.on .bars i:nth-child(2) { animation-delay: 0.1s; }
button.on .bars i:nth-child(3) { animation-delay: 0.2s; }
button.on .bars i:nth-child(4) { animation-delay: 0.05s; }
b { display: block; color: #17243b; font-size: 1.05rem; }
small { color: #52627b; font-size: 0.85rem; }
@keyframes bar { to { height: 16px; } }
@media (prefers-reduced-motion: reduce) {
  button.on .bars i { animation: none; height: 12px; }
}
</style>
