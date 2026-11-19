<script setup>
import { computed } from "vue";
import { useNav } from "@slidev/client";

const { clicks } = useNav();

const cell = 168;

const pieces = [
  { step: 1, x: -110, y: -120, delay: 0, tone: 0, cells: [[0, 0], [1, 0], [0, 1], [1, 1]] },
  { step: 1, x: 680, y: -70, delay: 0.14, tone: 1, cells: [[0, 0], [1, 0], [2, 0], [3, 0]] },
  { step: 2, x: 960, y: 110, delay: 0, tone: 0, cells: [[0, 0], [0, 1], [0, 2], [1, 2]] },
  { step: 3, x: -30, y: 210, delay: 0, tone: 1, cells: [[0, 0], [1, 0], [2, 0], [1, 1]] },
  { step: 3, x: -80, y: 430, delay: 0.16, tone: 0, cells: [[1, 0], [2, 0], [0, 1], [1, 1]] },
  { step: 4, x: 560, y: 530, delay: 0, tone: 1, cells: [[0, 0], [1, 0], [2, 0], [3, 0]] },
];

const dropped = computed(() => clicks.value);
</script>

<template>
  <div class="block-fall" aria-hidden="true">
    <span
      v-for="(piece, i) in pieces"
      :key="i"
      class="piece"
      :class="{ on: dropped >= piece.step, 'tone-b': piece.tone === 1 }"
      :style="{ left: `${piece.x}px`, top: `${piece.y}px`, transitionDelay: `${piece.delay}s` }"
    >
      <i
        v-for="(c, j) in piece.cells"
        :key="j"
        :style="{ left: `${c[0] * cell}px`, top: `${c[1] * cell}px` }"
      />
    </span>
  </div>
</template>

<style scoped>
.block-fall {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.piece {
  position: absolute;
  opacity: 0.15;
  transform: translateY(-860px);
  transition: transform 0.9s cubic-bezier(0.18, 0.9, 0.28, 1.12);
}

.piece.on { transform: translateY(0); }

.piece i {
  position: absolute;
  width: 150px;
  height: 150px;
  background: #d5e7ff;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1.5px rgba(0, 113, 227, 0.14);
}

.piece.tone-b i { background: #c3dbfb; }

@media (prefers-reduced-motion: reduce) {
  .piece { transition: none; }
}
</style>
