<script setup>
import { ref } from "vue";

const pick = ref("poem");
</script>

<template>
  <div class="tasks">
    <button type="button" class="task" :class="{ on: pick === 'poem' }" @click.stop="pick = 'poem'">
      <div class="screen night" aria-hidden="true">
        <img src="/night-sky.jpg" alt="" />
        <i class="moon" />
      </div>
      <p class="index">01</p>
      <h3>古诗里的一个场景</h3>
      <p>从会背的诗里挑一句。推荐《静夜思》《春晓》《咏鹅》。5 秒，一个动作。</p>
    </button>
    <button type="button" class="task" :class="{ on: pick === 'shot' }" @click.stop="pick = 'shot'">
      <div class="screen forest" aria-hidden="true">
        <img src="/forest-flight.jpg" alt="" />
      </div>
      <p class="index">02</p>
      <h3>把自己放进一个镜头</h3>
      <p>用自己的照片穿越森林，进入梦幻奇异世界。</p>
    </button>
  </div>
  <p v-if="pick === 'shot'" class="note">只用自己的照片。不拍同学，不上传别人的脸。</p>
</template>

<style scoped>
.tasks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.task {
  padding: 0.85rem;
  text-align: left;
  background: #fff;
  border: 1px solid rgba(29, 29, 31, 0.08);
  border-radius: 22px;
  box-shadow: 0 18px 50px rgba(29, 29, 31, 0.06);
  cursor: pointer;
}

.task.on { border-color: #0071e3; }

.screen {
  position: relative;
  height: 220px;
  margin-bottom: 0.85rem;
  overflow: hidden;
  border-radius: 16px;
  background: #163056;
}

.screen.forest { background: #d5e4cf; }

.moon {
  position: absolute;
  top: 12%;
  right: 30%;
  width: 32px;
  height: 32px;
  background: radial-gradient(circle at 38% 36%, #fffaf0, #f4e7c2 62%, #e4d29a);
  border-radius: 50%;
  box-shadow: 0 0 16px 7px rgba(244, 231, 194, 0.42);
}

.task.on .moon { animation: moon-drift 5.6s ease-in-out infinite alternate; }

@keyframes moon-drift {
  from { transform: translate(10px, 4px); }
  to { transform: translate(-28px, -12px); }
}

@media (prefers-reduced-motion: reduce) {
  .task.on .moon { animation: none; }
}

.screen img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.index {
  margin: 0 0 0.35rem;
  color: #0071e3;
  font-size: 0.75rem;
  font-weight: 800;
}

h3 { margin: 0 0 0.35rem; color: #17243b; font-size: 1.28rem; letter-spacing: -0.03em; }
.task > p, .note { margin: 0; color: #52627b; font-size: 0.95rem; line-height: 1.45; }
.note { margin-top: 0.85rem; }
</style>
