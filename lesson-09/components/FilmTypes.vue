<script setup>
const kinds = [
  {
    id: "poem",
    index: "知识",
    title: "古诗里的一个场景",
    text: "一句诗，一个会动的画面。只取抬头、明月、低头。",
    href: "https://x.com/PixelAigc/status/2098617270524428690/video/1",
  },
  {
    id: "anime",
    index: "动漫",
    title: "换脸 换装 换场景",
    text: "视频生成 好玩就行",
    href: "https://x.com/pika_labs/status/1867641187898995179/video/1",
  },
  {
    id: "science",
    index: "科普",
    title: "Vibe 知识大赏",
    text: "用视频的方式展示汉字的故事",
    href: "https://x.com/GitHub_Daily/status/2115994649861235132/video/1",
  },
];
</script>

<template>
  <div class="films">
    <a
      v-for="kind in kinds"
      :key="kind.id"
      class="film"
      :href="kind.href"
      target="_blank"
      rel="noopener noreferrer"
      @click.stop
    >
      <div class="stage" :class="`stage--${kind.id}`" aria-hidden="true">
        <img v-if="kind.id === 'poem'" class="still" src="/poem-preview.jpg" alt="" />
        <img v-else-if="kind.id === 'anime'" class="still still-person" src="/same-person-preview.jpg" alt="" />
        <img v-else class="still still-hanzi" src="/hanzi-preview.jpg" alt="" />
      </div>
      <p class="index">{{ kind.index }}</p>
      <h3>{{ kind.title }}</h3>
      <p>{{ kind.text }}</p>
    </a>
  </div>
</template>

<style scoped>
.films {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.95rem;
}

.film {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 0.85rem;
  text-align: left;
  background: #fff;
  border: 1px solid rgba(29, 29, 31, 0.08);
  border-radius: 22px;
  box-shadow: 0 18px 50px rgba(29, 29, 31, 0.06);
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}

.film:hover,
.film:focus-visible {
  border-color: #0071e3;
  box-shadow: 0 18px 50px rgba(0, 113, 227, 0.16);
}

.stage {
  height: 168px;
  margin-bottom: 0.85rem;
  overflow: hidden;
  border-radius: 16px;
}

.stage--poem { background: #10233f; }
.stage--anime { background: #111; }
.stage--science { background: linear-gradient(#e7f3ff, #f7fbff); }

.still {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 42%;
}
.still-person { object-fit: contain; object-position: center; background: #111; }
.still-hanzi { object-position: center 46%; }

.index {
  margin: 0 0 0.35rem;
  color: #0071e3;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

h3 {
  margin: 0 0 0.35rem;
  color: #17243b;
  font-size: 1.2rem;
  letter-spacing: -0.03em;
}

p { margin: 0; color: #52627b; font-size: 0.92rem; line-height: 1.45; }
</style>
