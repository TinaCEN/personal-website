<script setup>
// Motion Prompt #002 stagger, #005 mask reveal, #001 pop-in.
// MIT License (c) 2026 Shohei Ohtaki · https://showheyohtaki.github.io/motion-prompt/#002
import { backOut, maskY, P, useHold } from "./motion.js";

const u = useHold(2.8);
const bars = [
  { delay: 0.24, width: "92%" },
  { delay: 0.36, width: "64%" },
  { delay: 0.48, width: "84%" },
];

function grow(delay) {
  return Math.max(0, backOut(P(u.value, delay, delay + 0.5), 2.6));
}

function pop(start) {
  const p = Math.max(0, backOut(P(u.value, start, start + 0.45), 2.6));
  return { opacity: Math.min(1, p * 1.4), transform: `scale(${0.7 + 0.3 * p})` };
}
</script>

<template>
  <div>
    <p class="kicker">SEE · DEMAND</p>
    <h2>
      <span class="mask-line"><span :style="maskY(u, 0.05, 0.7)">AI画出来很快。画好，要人来定。</span></span>
    </h2>
    <div class="split">
      <div class="judge" aria-hidden="true">
        <div class="mini fast-screen">
          <span class="ai-chip" :style="pop(0.1)">AI · 1 秒画完</span>
          <div class="bar" />
          <div class="judge__title">
            <i :style="{ width: '78%', transform: `scaleX(${grow(0.12) * (1 - P(u, 1.2, 1.4))})` }" />
            <h4 class="mask-line"><span :style="maskY(u, 1.3, 1.9)">今天读完了吗</span></h4>
          </div>
          <i
            v-for="bar in bars"
            :key="bar.delay"
            :style="{ width: bar.width, transform: `scaleX(${grow(bar.delay)})` }"
          />
          <span
            class="cta judge__cta"
            :class="{ 'is-judged': u >= 2 }"
            :style="{ transform: `scale(${Math.min(1, grow(0.7))})` }"
          ><span class="judge__go">开始阅读</span><span class="judge__stop">删除记录</span></span>
        </div>
        <div class="judge__notes">
          <p class="note note--need" :style="pop(1.45)"><b>需求</b>写给自己看的阅读记录</p>
          <p class="note note--standard" :style="pop(1.95)"><b>标准</b>继续用蓝，取消用红</p>
          <p class="note note--you" :style="pop(2.35)">✓ 你来定</p>
        </div>
      </div>
      <div class="stack">
        <article class="card">
          <p class="index">需求</p>
          <h3>
            <span class="mask-line"><span :style="maskY(u, 0.35, 1)">这一屏给谁，要做成什么</span></span>
          </h3>
          <p>如果需求不清楚，标准也定不下来。</p>
        </article>
        <article class="card">
          <p class="index">标准</p>
          <h3>
            <span class="mask-line"><span :style="maskY(u, 0.55, 1.2)">做成什么样算对</span></span>
          </h3>
          <p class="taste">
            <span><i class="chip chip--blue">蓝色</i>主操作，比如继续、确认。</span>
            <span><i class="chip chip--red">红色</i>警示色，表示禁止、拒绝、取消。</span>
          </p>
          <p>颜色跟着意思走，要看你用在什么样的场景。</p>
        </article>
      </div>
    </div>
  </div>
</template>
