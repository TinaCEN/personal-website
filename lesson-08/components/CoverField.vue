<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const props = defineProps({
  seed: { type: Number, default: 8 },
});

function hash(n) {
  const x = Math.sin(n) * 43758.5453;
  return x - Math.floor(x);
}

function buildCells(seed) {
  const cols = 46;
  const rows = 15;
  const list = [];

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const x = (c + 0.5) / cols;
      const y = (r + 0.5) / rows;
      const wave =
        0.46 +
        Math.sin(x * Math.PI * 1.35 - 0.3) * 0.22 +
        Math.sin(x * 5.6 + seed * 0.2) * 0.035;
      const dist = Math.abs(y - wave);
      const colony = hash(Math.floor(c / 3) * 12.7 + Math.floor(r / 2) * 4.3 + seed);
      const speck = hash(c * 19.1 + r * 7.4 + seed * 3);
      const inSpine = dist < 0.07 && speck > 0.18;
      const inColony = dist < 0.2 && colony > 0.34 && speck > 0.22;
      if (!inSpine && !inColony) continue;

      const deep = dist < 0.08;
      list.push({
        id: `${c}-${r}`,
        x: (c / (cols - 1)) * 100,
        y: (r / (rows - 1)) * 100,
        delay: (colony * 4.2 + speck * 1.4).toFixed(2),
        dur: (5.4 + colony * 3.2).toFixed(2),
        color: deep ? "#0071e3" : dist < 0.14 ? "#4c9cf2" : "#c5ddff",
        base: deep ? 0.92 : dist < 0.14 ? 0.7 : 0.42,
      });
    }
  }

  return list;
}

const cells = buildCells(props.seed);
const root = ref(null);
let frame = 0;
let reduceMotion = false;

function place(event) {
  if (reduceMotion || !root.value) return;
  const box = root.value.getBoundingClientRect();
  const x = (event.clientX - box.left) / box.width;
  const y = (event.clientY - box.top) / box.height;
  const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
  if (frame) cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    if (!root.value) return;
    root.value.querySelectorAll(".cover-field__cell").forEach((node) => {
      if (!inside) {
        node.style.setProperty("--lift", "0");
        return;
      }
      const cx = parseFloat(node.style.left) / 100;
      const cy = parseFloat(node.style.top) / 100;
      const distance = Math.hypot((cx - x) * 1.15, cy - y);
      const lift = distance < 0.22 ? 1 - distance / 0.22 : 0;
      node.style.setProperty("--lift", lift.toFixed(3));
    });
  });
}

onMounted(() => {
  reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.addEventListener("pointermove", place, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("pointermove", place);
  if (frame) cancelAnimationFrame(frame);
});
</script>

<template>
  <div ref="root" class="cover-field" aria-hidden="true">
    <span
      v-for="cell in cells"
      :key="cell.id"
      class="cover-field__cell"
      :style="{
        left: `${cell.x}%`,
        top: `${cell.y}%`,
        background: cell.color,
        animationDelay: `${cell.delay}s`,
        animationDuration: `${cell.dur}s`,
        '--base': cell.base.toFixed(3),
      }"
    />
  </div>
</template>
