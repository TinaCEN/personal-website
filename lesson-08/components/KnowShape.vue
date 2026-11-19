<script setup>
// Motion Prompt #004 line draw, #005 mask reveal.
// MIT License (c) 2026 Shohei Ohtaki · https://showheyohtaki.github.io/motion-prompt/#005
import { eIO, maskY, P, useHold } from "./motion.js";

const u = useHold(2.2);
const outline = 680;

function dash() {
  return outline * (1 - eIO(P(u.value, 0.1, 1.3)));
}
</script>

<template>
  <div>
    <p class="kicker">SEE · THE SHAPE</p>
    <h2>
      <span class="mask-line"><span :style="maskY(u, 0.05, 0.7)">人要先认出，这是什么。</span></span>
    </h2>
    <div class="split">
      <div class="shape-stage">
        <div class="shape-button">
          <svg class="btn-draw" viewBox="0 0 320 120" aria-hidden="true">
            <rect
              x="16"
              y="28"
              width="288"
              height="64"
              rx="32"
              :stroke-dasharray="outline"
              :stroke-dashoffset="dash()"
            />
          </svg>
          <p class="shape-label">
            <span class="mask-line"><span :style="maskY(u, 1.05, 1.7)">开始阅读</span></span>
          </p>
        </div>
        <p class="deck-note">人看见这个样子，就知道要点这里。</p>
      </div>
      <div class="stack">
        <article class="card">
          <h3>
            <span class="mask-line"><span :style="maskY(u, 0.4, 1.05)">要做成这件事，得点这个样子的东西。</span></span>
          </h3>
          <p>这个样子，就是按钮。</p>
        </article>
        <article class="card">
          <h3>
            <span class="mask-line"><span :style="maskY(u, 0.7, 1.35)">动作写几行就够。</span></span>
          </h3>
          <p>终端里也能让它听懂要做什么。给人看的，是这个能被认出来的样子。</p>
        </article>
        <article class="card">
          <h3>
            <span class="mask-line"><span :style="maskY(u, 1, 1.65)">先认出这是按钮。</span></span>
          </h3>
          <p>认出来，这一屏才用得上。</p>
        </article>
      </div>
    </div>
  </div>
</template>
