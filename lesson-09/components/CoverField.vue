<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const props = defineProps({
  seed: { type: Number, default: 9 },
});

const canvas = ref(null);
const stars = [];
const ripples = [];
let frame = 0;
let reduceMotion = false;
let width = 0;
let height = 0;
let observer;
const pointer = { x: 0.5, y: 0.3, inside: false };

function hash(n) {
  const x = Math.sin(n) * 43758.5453;
  return x - Math.floor(x);
}

function build() {
  stars.length = 0;
  const total = 1100;
  for (let i = 0; i < total; i += 1) {
    const depth = hash(i * 12.7 + props.seed);
    const band = 0.34 + Math.sin(hash(i * 3.1) * Math.PI * 2) * 0.08;
    const onBand = hash(i * 9.4 + props.seed * 2) > 0.72;
    stars.push({
      x: hash(i * 19.1 + props.seed),
      y: onBand ? band + (hash(i * 4.4) - 0.5) * 0.16 : hash(i * 7.4 + 2) * 0.92,
      r: depth > 0.975 ? 2.4 : depth > 0.9 ? 1.45 : 0.45 + depth * 0.7,
      phase: hash(i * 5.3) * Math.PI * 2,
      warm: hash(i * 8.8 + props.seed) > 0.9,
      blue: hash(i * 2.2 + props.seed) > 0.82,
      drift: 0.000015 + hash(i + 6) * 0.00004,
    });
  }
}

function resize() {
  const node = canvas.value;
  if (!node) return;
  const box = node.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = Math.max(1, box.width);
  height = Math.max(1, box.height);
  node.width = Math.round(width * dpr);
  node.height = Math.round(height * dpr);
  node.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0);
}

function starPoint(star, now) {
  const t = now / 1000;
  let x = star.x;
  let y = star.y;
  if (!reduceMotion) {
    x += Math.sin(t * 0.15 + star.phase) * 0.004;
    y += Math.sin(t * star.drift * 800 + star.phase) * 0.003;
  }
  return { x, y };
}

function paint(now) {
  const node = canvas.value;
  if (!node || !width) return;
  const ctx = node.getContext("2d");
  const t = reduceMotion ? 2 : now / 1000;
  ctx.clearRect(0, 0, width, height);

  const sky = ctx.createLinearGradient(0, 0, width, height);
  sky.addColorStop(0, "#070b18");
  sky.addColorStop(0.45, "#10203c");
  sky.addColorStop(1, "#08111f");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  const clouds = [
    [0.22 + Math.sin(t * 0.08) * 0.04, 0.28, "rgba(58,96,180,0.22)", 0.42],
    [0.72 + Math.cos(t * 0.06) * 0.05, 0.22, "rgba(92,70,160,0.16)", 0.36],
    [0.5 + Math.sin(t * 0.05 + 1) * 0.06, 0.48, "rgba(176,132,78,0.08)", 0.34],
  ];
  clouds.forEach(([x, y, color, radius]) => {
    const glow = ctx.createRadialGradient(x * width, y * height, 0, x * width, y * height, radius * width);
    glow.addColorStop(0, color);
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
  });

  const alive = [];
  ripples.forEach((ripple) => {
    const age = (now - ripple.t0) / 1000;
    if (age < 2.8) alive.push(ripple);
  });
  ripples.length = 0;
  alive.forEach((ripple) => ripples.push(ripple));

  stars.forEach((star) => {
    const point = starPoint(star, now);
    const px = point.x * width;
    const py = point.y * height;
    let boost = 0;
    let pushX = 0;
    let pushY = 0;
    ripples.forEach((ripple) => {
      const age = (now - ripple.t0) / 1000;
      const dx = point.x - ripple.x;
      const dy = (point.y - ripple.y) * (height / width);
      const dist = Math.hypot(dx, dy) || 0.001;
      [0, 0.18, 0.38, 0.58].forEach((delay, index) => {
        const local = age - delay;
        if (local < 0) return;
        const ring = local * (0.16 + index * 0.025);
        const gap = Math.abs(dist - ring);
        const hit = Math.max(0, 1 - gap / 0.028) * Math.max(0, 1 - local / 2.1);
        if (hit > boost) {
          boost = hit;
          pushX = (dx / dist) * hit * 10;
          pushY = (dy / dist) * hit * 10;
        }
      });
    });
    const twinkle = reduceMotion ? 0.8 : 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(t * (star.r > 1.4 ? 1.1 : 2.4) + star.phase));
    const depthFade = point.y > 0.72 ? Math.max(0, 1 - (point.y - 0.72) / 0.22) : 1;
    const alpha = Math.min(1, (0.18 + twinkle * (star.r > 1.4 ? 0.85 : 0.45) + boost * 0.9) * depthFade);
    const ox = pushX;
    const oy = pushY;
    const color = star.warm ? "255,214,170" : star.blue ? "186,210,255" : "244,247,252";
    ctx.fillStyle = `rgba(${color},${alpha.toFixed(3)})`;
    ctx.beginPath();
    ctx.arc(px + ox, py + oy, star.r * (1 + boost * 0.8), 0, Math.PI * 2);
    ctx.fill();
    if (star.r > 1.8 && alpha > 0.4) {
      ctx.strokeStyle = `rgba(${color},${(alpha * 0.35).toFixed(3)})`;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(px + ox - 7, py + oy);
      ctx.lineTo(px + ox + 7, py + oy);
      ctx.moveTo(px + ox, py + oy - 7);
      ctx.lineTo(px + ox, py + oy + 7);
      ctx.stroke();
    }
  });

  if (pointer.inside && !reduceMotion) {
    const glow = ctx.createRadialGradient(pointer.x * width, pointer.y * height, 0, pointer.x * width, pointer.y * height, width * 0.12);
    glow.addColorStop(0, "rgba(255,255,255,0.14)");
    glow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
  }

  ripples.forEach((ripple) => {
    const age = (now - ripple.t0) / 1000;
    const cx = ripple.x * width;
    const cy = ripple.y * height;
    const wash = Math.max(0, 1 - age / 1.4);
    const reach = Math.max(2, age * width * 0.16);
    const disc = ctx.createRadialGradient(cx, cy, reach * 0.2, cx, cy, reach);
    disc.addColorStop(0, `rgba(255,255,255,${(wash * 0.05).toFixed(3)})`);
    disc.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = disc;
    ctx.beginPath();
    ctx.arc(cx, cy, Math.max(reach, 1), 0, Math.PI * 2);
    ctx.fill();

    [0, 1, 2, 3].forEach((index) => {
      const local = Math.max(0, age - index * 0.12);
      const radius = (0.04 + index * 0.062 + local * 0.08) * width;
      const alpha = Math.max(0, 1 - local / 2.3) * (1 - index * 0.14);
      const color = index % 2 ? "255,214,170" : "255,255,255";
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${color},${(alpha * 0.28).toFixed(3)})`;
      ctx.lineWidth = Math.max(10, width * 0.012);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${color},${alpha.toFixed(3)})`;
      ctx.lineWidth = Math.max(2.5, width * 0.003);
      ctx.stroke();
    });
  });

  const veil = ctx.createLinearGradient(0, height * 0.58, 0, height);
  veil.addColorStop(0, "rgba(7,12,22,0)");
  veil.addColorStop(1, "rgba(7,12,22,0.72)");
  ctx.fillStyle = veil;
  ctx.fillRect(0, 0, width, height);

  if (reduceMotion && ripples.length === 0 && frame) {
    cancelAnimationFrame(frame);
    frame = 0;
  }
}

function tick(now) {
  paint(now);
  frame = requestAnimationFrame(tick);
}

function ensureLoop() {
  if (!frame) frame = requestAnimationFrame(tick);
}

function hit(event) {
  const node = canvas.value;
  if (!node) return null;
  const page = node.closest(".slidev-page");
  const pageNo = Number(page?.className.match(/slidev-page-(\d+)/)?.[1] || 0);
  const current = window.__slidev__?.nav?.currentSlideNo;
  if (pageNo && current && pageNo !== current) return null;
  const box = node.getBoundingClientRect();
  const x = (event.clientX - box.left) / box.width;
  const y = (event.clientY - box.top) / box.height;
  if (x < 0 || x > 1 || y < 0 || y > 1) return null;
  return { x, y };
}

function place(event) {
  const point = hit(event);
  pointer.inside = Boolean(point);
  if (point) {
    pointer.x = point.x;
    pointer.y = point.y;
  }
}

function leave() {
  pointer.inside = false;
}

function press(event) {
  if (event.button !== undefined && event.button !== 0) return;
  const point = hit(event);
  if (!point || point.y > 0.72) return;
  if (event.type === "pointerdown") {
    ripples.push({ x: point.x, y: point.y, t0: performance.now() });
    if (ripples.length > 5) ripples.shift();
    ensureLoop();
  }
  event.preventDefault();
  event.stopPropagation();
}

onMounted(() => {
  reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  build();
  resize();
  paint(0);
  if (!reduceMotion) ensureLoop();
  observer = new ResizeObserver(() => {
    resize();
    if (reduceMotion) paint(0);
  });
  observer.observe(canvas.value);
  window.addEventListener("pointermove", place, { passive: true });
  window.addEventListener("pointerleave", leave);
  window.addEventListener("pointerdown", press, true);
  window.addEventListener("click", press, true);
});

onUnmounted(() => {
  window.removeEventListener("pointermove", place);
  window.removeEventListener("pointerleave", leave);
  window.removeEventListener("pointerdown", press, true);
  window.removeEventListener("click", press, true);
  observer?.disconnect();
  if (frame) cancelAnimationFrame(frame);
});
</script>

<template>
  <div class="cover-field" aria-hidden="true">
    <canvas ref="canvas" />
  </div>
</template>
