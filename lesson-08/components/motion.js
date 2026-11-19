// Motion Prompt #002 #005 #013 · MIT License (c) 2026 Shohei Ohtaki
// https://showheyohtaki.github.io/motion-prompt/
// Timings and easing stay as published. Words and colors belong to this lesson.

import { onUnmounted, ref } from "vue";
import { onSlideEnter } from "@slidev/client";

export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, x) => a + (b - a) * x;
export const P = (t, a, b) => clamp((t - a) / (b - a));
export const eOut5 = (x) => 1 - (1 - x) ** 5;
export const eIO = (x) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2);
export const backOut = (x, s = 2.6) =>
  1 + (s + 1) * (x - 1) ** 3 + s * (x - 1) ** 2;

export function bez(x1, y1, x2, y2) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sx = (t) => ((ax * t + bx) * t + cx) * t;
  const sy = (t) => ((ay * t + by) * t + cy) * t;
  return (x) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let lo = 0;
    let hi = 1;
    let t = x;
    for (let i = 0; i < 40; i += 1) {
      if (sx(t) < x) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
    return sy(t);
  };
}

export const liquidEase = bez(0.7, 0, 0.2, 1);

export function maskY(u, start, end) {
  const p = eOut5(P(u, start, end));
  return { transform: `translateY(${(1 - p) * 110}%)` };
}

export function useHold(seconds) {
  const u = ref(0);
  let frame = 0;
  onSlideEnter(() => {
    cancelAnimationFrame(frame);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      u.value = seconds;
      return;
    }
    u.value = 0;
    const t0 = performance.now();
    const tick = (now) => {
      u.value = Math.min(seconds, (now - t0) / 1000);
      if (u.value < seconds) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  });
  onUnmounted(() => cancelAnimationFrame(frame));
  return u;
}
