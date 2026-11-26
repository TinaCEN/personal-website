<script setup>
import { computed, onUnmounted, ref } from "vue";

const total = 10 * 60;
const left = ref(total);
const running = ref(false);
let timer;

const clock = computed(() => {
  const m = Math.floor(left.value / 60);
  const s = left.value % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
});

const done = computed(() => left.value <= 0);

function start() {
  if (running.value || done.value) return;
  running.value = true;
  timer = setInterval(() => {
    if (left.value <= 1) {
      left.value = 0;
      running.value = false;
      clearInterval(timer);
      return;
    }
    left.value -= 1;
  }, 1000);
}

onUnmounted(() => clearInterval(timer));
</script>

<template>
  <section class="break-timer">
    <div>
      <p class="kicker">BREAK · 10 MIN</p>
      <h2>休息</h2>
      <p class="break-copy">喝口水。回来每人做一条 5 秒的视频：一句古诗，或一个经典镜头。</p>
    </div>
    <div class="break-clock">
      <p>倒计时</p>
      <strong>{{ clock }}</strong>
      <button type="button" :disabled="running || done" @click.stop="start">
        {{ done ? "时间到" : running ? "进行中" : "开始" }}
      </button>
    </div>
  </section>
</template>
