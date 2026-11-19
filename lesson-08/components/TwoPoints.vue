<script setup>
// Motion Prompt #005 mask reveal, #002 stagger, #010 overshoot.
// MIT License (c) 2026 Shohei Ohtaki · https://showheyohtaki.github.io/motion-prompt/#005
import { backOut, eIO, maskY, P, useHold } from "./motion.js";

const u = useHold(3.4);

const SLOW = [
  [0.35, 0.9, 0.22],
  [1.15, 1.6, 0.48],
  [1.95, 2.35, 0.7],
  [2.65, 3.15, 1],
];

function slowFill() {
  let from = 0;
  for (const [start, end, to] of SLOW) {
    if (u.value < start) return from;
    if (u.value < end) return from + (to - from) * eIO(P(u.value, start, end));
    from = to;
  }
  return 1;
}

function fastFill() {
  return Math.max(0, backOut(P(u.value, 0.35, 0.85), 2.6));
}

function pop(start) {
  const p = Math.max(0, backOut(P(u.value, start, start + 0.5), 2.6));
  return { opacity: Math.min(1, p * 1.4), transform: `scale(${0.6 + 0.4 * p})` };
}
</script>

<template>
  <div>
    <p class="kicker">SEE · TWO THINGS</p>
    <h2>
      <span class="mask-line"><span :style="maskY(u, 0.05, 0.7)">界面就盯这两件事。</span></span>
    </h2>
    <div class="idea-grid">
      <article class="card">
        <p class="index">更好用</p>
        <h3>
          <span class="mask-line"><span :style="maskY(u, 0.2, 0.85)">让它更快。</span></span>
        </h3>
        <div class="race">
          <div class="race__row">
            <span class="race__label">没有设计</span>
            <div class="speed speed--slow" aria-hidden="true">
              <span :style="{ transform: `scaleX(${slowFill()})` }" />
            </div>
            <span class="race__time" :class="{ 'is-done': u >= 3.15 }">12 秒</span>
          </div>
          <div class="race__row">
            <span class="race__label">有设计</span>
            <div class="speed" aria-hidden="true">
              <span :style="{ transform: `scaleX(${fastFill()})` }" />
            </div>
            <span class="race__time" :class="{ 'is-done': u >= 0.85 }">3 秒</span>
          </div>
        </div>
        <p>少等一步，就更好用一点。这是最容易下手的一处。</p>
      </article>
      <article class="card">
        <p class="index">更好看</p>
        <h3>
          <span class="mask-line"><span :style="maskY(u, 0.35, 1)">样子会变。</span></span>
        </h3>
        <div class="evolve" aria-hidden="true">
          <div class="evolve__col">
            <span class="flat-btn" :style="pop(0.45)">开始阅读</span>
            <small>扁平</small>
          </div>
          <span class="evolve__arrow" :style="pop(0.8)">→</span>
          <div class="evolve__col">
            <span class="glass-btn glass-btn--blue" :style="pop(1.05)">开始阅读</span>
            <span class="glass-btn" :style="pop(1.2)">稍后再说</span>
            <small>液态玻璃</small>
          </div>
        </div>
        <p>扁平按钮后来又长成了液态玻璃。先看得出哪一版更好看，才改得动。</p>
      </article>
    </div>
    <p class="deck-note">
      <span class="mask-line"><span :style="maskY(u, 0.9, 1.55)">你的时间，也放在这两件事上。</span></span>
    </p>
  </div>
</template>
