<script setup>
import { onBeforeUnmount, ref } from "vue";

const root = ref(null);
const part = ref("beat");
const parts = [
  { id: "beat", name: "节奏", line: "快还是慢。像走路，还是像跑步。" },
  { id: "tune", name: "旋律", line: "高低怎么走。往上更亮，往下更安静。" },
  { id: "band", name: "编曲", line: "除了主旋律，还垫了什么。钢琴，鼓，或者弦乐。" },
];

const beat = 0.68;
const loop = beat * 4;
const melody = [523.25, 659.25, 587.33, 783.99];
let audio = null;
let noise = null;
let timer = 0;
let guard = 0;
let live = [];

function slideNo() {
  const match = root.value?.closest("[class*='slidev-page-']")?.className.match(/slidev-page-(\d+)/);
  return match ? Number(match[1]) : null;
}

function here() {
  return window.__slidev__?.nav?.currentSlideNo === slideNo();
}

function keep(node) {
  live.push(node);
  return node;
}

function stop() {
  window.clearTimeout(timer);
  window.clearInterval(guard);
  timer = 0;
  guard = 0;
  for (const node of live) {
    try { node.stop?.(); } catch { /* already ended */ }
    try { node.disconnect?.(); } catch { /* already disconnected */ }
  }
  live = [];
}

function context() {
  if (!audio) audio = new AudioContext();
  if (audio.state === "suspended") audio.resume();
  if (!noise) {
    const length = Math.floor(audio.sampleRate * 0.05);
    noise = audio.createBuffer(1, length, audio.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
  }
  return audio;
}

function kick(ctx, time) {
  const osc = keep(ctx.createOscillator());
  const gain = keep(ctx.createGain());
  osc.type = "sine";
  osc.frequency.setValueAtTime(168, time);
  osc.frequency.exponentialRampToValueAtTime(50, time + 0.14);
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.42, time + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.3);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(time);
  osc.stop(time + 0.32);
}

function hat(ctx, time) {
  const source = keep(ctx.createBufferSource());
  const filter = keep(ctx.createBiquadFilter());
  const gain = keep(ctx.createGain());
  source.buffer = noise;
  filter.type = "highpass";
  filter.frequency.value = 4800;
  gain.gain.setValueAtTime(0.11, time);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.045);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(time);
  source.stop(time + 0.05);
}

function note(ctx, freq, time, peak) {
  const osc = keep(ctx.createOscillator());
  const gain = keep(ctx.createGain());
  osc.type = "triangle";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(peak, time + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + beat * 0.86);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(time);
  osc.stop(time + beat * 0.9);
}

function pad(ctx, time) {
  for (const freq of [196, 293.66]) {
    const osc = keep(ctx.createOscillator());
    const gain = keep(ctx.createGain());
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.045, time + 0.35);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + loop);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(time);
    osc.stop(time + loop);
  }
}

function schedule(ctx, mode) {
  const start = ctx.currentTime + 0.04;
  for (let i = 0; i < 4; i += 1) {
    const time = start + i * beat;
    if (mode === "beat" || mode === "band") {
      if (i % 2 === 0) kick(ctx, time);
      else hat(ctx, time);
      hat(ctx, time + beat * 0.5);
    }
    if (mode === "tune" || mode === "band") note(ctx, melody[i], time, mode === "band" ? 0.1 : 0.16);
  }
  if (mode === "band") pad(ctx, start);
}

function play(id) {
  part.value = id;
  stop();
  if (!here()) return;
  const ctx = context();
  const loopPlay = () => {
    if (!here() || part.value !== id) return;
    schedule(ctx, id);
    timer = window.setTimeout(loopPlay, loop * 1000);
  };
  loopPlay();
  guard = window.setInterval(() => {
    if (!here()) stop();
  }, 300);
}

onBeforeUnmount(stop);
</script>

<template>
  <div ref="root" class="score">
    <div class="sheet" aria-hidden="true">
      <div class="row" :class="{ on: part === 'beat' }">
        <span v-for="n in 8" :key="n" class="tick" :style="{ animationDelay: `${n * 0.12}s` }" />
      </div>
      <svg class="tune" viewBox="0 0 360 70" :class="{ on: part === 'tune' }">
        <path d="M8 48 C 40 48, 52 18, 86 22 S 140 58, 176 36 230 8, 268 24 330 52, 352 30" />
      </svg>
      <div class="layers" :class="{ on: part === 'band' }">
        <i>钢琴</i><i>弦乐</i><i>鼓</i>
      </div>
    </div>
    <div class="keys">
      <button
        v-for="item in parts"
        :key="item.id"
        type="button"
        :class="{ on: part === item.id }"
        @click.stop="play(item.id)"
      >
        <b>{{ item.name }}</b>
        <span>{{ item.line }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.score {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 1.1rem;
  align-items: center;
}

.sheet {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  height: 280px;
  padding: 1.3rem 1.4rem;
  background: #fff;
  border-radius: 28px;
  box-shadow: 0 18px 50px rgba(29, 29, 31, 0.06);
}

.row { display: flex; gap: 0.55rem; align-items: end; height: 42px; }
.tick {
  width: 16px;
  height: 18px;
  background: #b9d4f5;
  border-radius: 8px;
}
.row.on .tick {
  background: #0071e3;
  animation: pulse 0.96s ease-in-out infinite;
}
.tick:nth-child(odd) { height: 22px; border-radius: 7px; }

.tune { width: 100%; height: 70px; }
.tune path {
  fill: none;
  stroke: #8eb6e6;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: 520;
  stroke-dashoffset: 0;
}
.tune.on path {
  stroke: #0071e3;
  stroke-dashoffset: 520;
  animation: draw 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.layers { display: flex; gap: 0.5rem; }
.layers i {
  padding: 0.35rem 0.7rem;
  color: #52627b;
  font-size: 0.82rem;
  font-style: normal;
  background: #eef3f8;
  border-radius: 999px;
  opacity: 1;
}
.layers.on i { animation: stack 0.7s ease both; }
.layers.on i:nth-child(1) { color: #0b2b57; background: #e8f2ff; }
.layers.on i:nth-child(2) { animation-delay: 0.15s; }
.layers.on i:nth-child(3) { animation-delay: 0.3s; }

.keys { display: flex; flex-direction: column; gap: 0.7rem; }
.keys button {
  padding: 0.85rem 1rem;
  text-align: left;
  background: #fff;
  border: 1px solid rgba(29, 29, 31, 0.08);
  border-radius: 18px;
  cursor: pointer;
}
.keys button.on { border-color: #0071e3; background: #f4f9ff; }
.keys b { display: block; margin-bottom: 0.2rem; color: #17243b; font-size: 1.15rem; }
.keys span { color: #52627b; font-size: 0.92rem; line-height: 1.4; }

@keyframes pulse {
  50% { transform: scaleY(1.8); transform-origin: bottom; }
}
@keyframes draw { to { stroke-dashoffset: 0; } }
@keyframes stack { to { opacity: 1; transform: none; } }
.layers.on i { transform: translateY(6px); }

@media (prefers-reduced-motion: reduce) {
  .row.on .tick,
  .tune.on path,
  .layers.on i { animation: none; }
  .tune.on path { stroke-dashoffset: 0; }
  .layers.on i { opacity: 1; transform: none; }
}
</style>
