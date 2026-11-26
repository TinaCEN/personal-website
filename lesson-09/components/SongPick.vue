<script setup>
import { ref } from "vue";

const pick = ref("day");
</script>

<template>
  <div class="songs">
    <button type="button" :class="{ on: pick === 'day' }" @click.stop="pick = 'day'">
      <span class="still"><img src="/apple-pie.jpg" alt=""></span>
      <b>把今天发生的事情写成歌</b>
      <span>今天我吃了一个美味的苹果派，我想把这个写成一首简单的小歌曲</span>
    </button>
    <button type="button" :class="{ on: pick === 'dayoff' }" @click.stop="pick = 'dayoff'">
      <span class="still"><img src="/christmas-song.jpg" alt=""></span>
      <b>把某个节日写成一首歌</b>
      <span>我想要给圣诞节写一首歌，要有欢快的气氛，节奏比较适中，听着很开心</span>
    </button>
  </div>
  <p class="prompt">{{ pick === "day"
    ? "节奏是快还是慢？要钢琴还是小提琴，还是笛子，歌词有没有。"
    : "中秋，节奏齐一点，可以有四句很短的词，15 秒。不要突然很吵。" }}</p>
</template>

<style scoped>
.songs { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem; }
button {
  padding: 1.15rem 1.2rem;
  text-align: left;
  background: #fff;
  border: 1px solid rgba(29, 29, 31, 0.08);
  border-radius: 20px;
  box-shadow: 0 14px 36px rgba(29, 29, 31, 0.05);
  cursor: pointer;
}
button.on { border-color: #0071e3; }
.still {
  display: block;
  height: 148px;
  margin: -0.15rem -0.15rem 0.85rem;
  overflow: hidden;
  border-radius: 14px;
  background: #f3efe6;
}
.still img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
b { display: block; margin-bottom: 0.3rem; color: #17243b; font-size: 1.25rem; }
span { color: #52627b; font-size: 0.98rem; }
.prompt {
  margin: 0.95rem 0 0;
  padding: 0.9rem 1rem;
  color: #1b4fa0;
  font-size: 1.15rem;
  font-weight: 650;
  line-height: 1.5;
  background: #e8f2ff;
  border-radius: 16px;
}
</style>
