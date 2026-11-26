<script setup>
import { ref } from "vue";

const pages = [
  {
    emoji: "🎸",
    name: "乐队",
    line: "红黄蓝的鼓。自己组一套节奏。",
    src: "https://miaai-lab.github.io/Claude-Fable-5.2-HTML-Files/019-bauhaus-drum-machine.html",
  },
  {
    emoji: "🐟",
    name: "鱼塘",
    line: "正午的锦鲤。点水面，鱼会过来。",
    src: "https://miaai-lab.github.io/Claude-Fable-5.2-HTML-Files/009-koi-pond-noon.html",
  },
  {
    emoji: "🧲",
    name: "铁屑",
    line: "磁力线。可以做个小物理实验。",
    src: "https://miaai-lab.github.io/Claude-Fable-5.2-HTML-Files/013-iron-filings.html",
  },
  {
    emoji: "🌌",
    name: "极光",
    line: "峡湾上的极光、冰川。",
    src: "https://miaai-lab.github.io/Claude-Fable-5.2-HTML-Files/020-aurora-over-the-fjord.html",
  },
  {
    emoji: "🏺",
    name: "陶轮",
    line: "在网页里拉一只碗。",
    src: "https://miaai-lab.github.io/Claude-Fable-5.2-HTML-Files/025-pottery-wheel.html",
  },
  {
    emoji: "🍮",
    name: "果冻字",
    line: "打一个字母，它会掉下来，还会晃。",
    src: "https://miaai-lab.github.io/Claude-Fable-5.2-HTML-Files/041-jelly-alphabet.html",
  },
  {
    emoji: "🌿",
    name: "青苔",
    line: "在石板上点一下，青苔慢慢长出来。",
    src: "https://miaai-lab.github.io/Claude-Fable-5.2-HTML-Files/043-lichen-on-slate.html",
  },
  {
    emoji: "🐜",
    name: "蚁巢",
    line: "一窝蚂蚁。它们会自己走出一条路。",
    src: "https://miaai-lab.github.io/Claude-Fable-5.2-HTML-Files/079-formicarium.html",
  },
];

const current = ref(0);
</script>

<template>
  <div class="stage">
    <div class="names">
      <button
        v-for="(page, index) in pages"
        :key="page.src"
        type="button"
        :class="{ on: current === index }"
        @click.stop="current = index"
      >
        <b><i aria-hidden="true">{{ page.emoji }}</i>{{ page.name }}</b>
        <span>{{ page.line }}</span>
      </button>
    </div>
    <div class="screen">
      <iframe
        :key="pages[current].src"
        :src="pages[current].src"
        :title="pages[current].name"
        allow="autoplay; fullscreen; pointer-lock"
      />
    </div>
  </div>
</template>

<style scoped>
.stage {
  display: grid;
  grid-template-columns: 15.5rem minmax(0, 1fr);
  gap: 0.85rem;
  min-height: 0;
  height: 31.5rem;
}

.names {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-height: 0;
  overflow: auto;
  padding-right: 0.15rem;
}

button {
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
  padding: 0.48rem 0.7rem;
  text-align: left;
  background: #fff;
  border: 1px solid rgba(29, 29, 31, 0.08);
  border-radius: 14px;
  cursor: pointer;
}

button.on {
  border-color: #0071e3;
  background: #f4f9ff;
}

b {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: #17243b;
  font-size: 0.98rem;
}

i {
  font-style: normal;
  font-weight: 400;
  line-height: 1;
}

span {
  color: #52627b;
  font-size: 0.75rem;
  line-height: 1.35;
}

.screen {
  min-width: 0;
  overflow: hidden;
  background: #0c1220;
  border: 1px solid rgba(29, 29, 31, 0.1);
  border-radius: 22px;
  box-shadow: 0 18px 50px rgba(29, 29, 31, 0.08);
}

iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  background: #0c1220;
}
</style>
