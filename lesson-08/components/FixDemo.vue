<script setup>
import { computed } from "vue";
import { P, eOut5, useHold } from "./motion.js";

defineProps({
  kind: { type: String, required: true },
});

const u = useHold(2.2);
const grow = computed(() => 1 + 0.55 * eOut5(P(u.value, 0.25, 1.05)));
const result = computed(() => eOut5(P(u.value, 0.7, 1.5)));
const swap = computed(() => eOut5(P(u.value, 0.6, 1.3)));
</script>

<template>
  <div class="fix" aria-hidden="true">
    <div v-if="kind === 'size'" class="fix__screen">
      <b class="fix__title" :style="{ transform: `scale(${grow})` }">今天读完了吗</b>
      <span class="fix__line" />
      <span class="fix__line short" />
      <span class="fix__btn">开始阅读</span>
    </div>

    <div v-else-if="kind === 'row'" class="fix__screen">
      <span class="fix__row">
        <b>阅读</b>
        <small :style="{ opacity: result, transform: `translateX(${(1 - result) * 8}px)` }">12 页</small>
      </span>
      <span class="fix__row">
        <b>休息</b>
        <small :style="{ opacity: result, transform: `translateX(${(1 - result) * 8}px)` }">还没开始</small>
      </span>
      <span class="fix__row">
        <b>绘画</b>
        <small :style="{ opacity: result, transform: `translateX(${(1 - result) * 8}px)` }">已完成</small>
      </span>
    </div>

    <div v-else class="fix__screen fix__screen--swap">
      <div class="fix__face" :style="{ opacity: 1 - swap, transform: `translateY(${-swap * 8}px)` }">
        <b>阅读</b><span class="fix__line" /><span class="fix__line short" />
      </div>
      <div class="fix__face fix__face--empty" :style="{ opacity: swap, transform: `translateY(${(1 - swap) * 8}px)` }">
        <em>今天还没有记录</em>
        <span class="fix__btn">记下第一件</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fix {
  margin-top: 0.9rem;
}

.fix__screen {
  position: relative;
  height: 118px;
  padding: 0.75rem 0.8rem;
  overflow: hidden;
  background: #f6f8fb;
  border-radius: 14px;
}

.fix__title {
  display: inline-block;
  color: #0b2b57;
  font-size: 0.95rem;
  letter-spacing: -0.03em;
  transform-origin: left center;
}

.fix__line {
  display: block;
  width: 100%;
  height: 7px;
  margin-top: 0.55rem;
  background: #dfe6f0;
  border-radius: 99px;
}

.fix__line.short { width: 62%; }

.fix__btn {
  display: block;
  margin-top: 0.6rem;
  padding: 0.28rem 0;
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  text-align: center;
  background: #0071e3;
  border-radius: 999px;
}

.fix__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.42rem 0;
  border-bottom: 1px solid #e6edf5;
}

.fix__row:last-child { border-bottom: 0; }
.fix__row b { color: #17243b; font-size: 0.85rem; }
.fix__row small { color: #8b97a8; font-size: 0.75rem; }

.fix__screen--swap { padding: 0; }

.fix__face {
  position: absolute;
  inset: 0.75rem 0.8rem auto;
}

.fix__face--empty {
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
}

.fix__face--empty em {
  color: #6e7c90;
  font-size: 0.8rem;
  font-style: normal;
}

.fix__face--empty .fix__btn { width: 70%; margin: 0; }
</style>
