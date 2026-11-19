<script setup>
import { ref } from "vue";

const pick = ref("");

function choose(id) {
  pick.value = id;
}
</script>

<template>
  <div class="pick">
    <button
      type="button"
      class="pick-card"
      :class="{ wrong: pick === 'bad', dim: pick && pick !== 'bad' }"
      @click.stop="choose('bad')"
    >
      <span v-if="pick === 'bad'" class="pick-badge">✕ 不是这张</span>
      <div class="phone phone-bad" aria-hidden="true">
        <span class="block">今天读完了吗</span>
        <span class="block">阅读 12 页</span>
        <span class="block">休息 还没开始</span>
        <span class="block">绘画 已完成</span>
        <span class="btn-row"><i>开始阅读</i><i>休息</i><i>绘画</i></span>
      </div>
      <b>A · 堆在一起</b>
      <p>字一样大，三个按钮一样蓝。</p>
    </button>

    <button
      type="button"
      class="pick-card"
      :class="{ on: pick === 'good', dim: pick && pick !== 'good' }"
      @click.stop="choose('good')"
    >
      <span v-if="pick === 'good'" class="pick-badge">✓ 选对了</span>
      <div class="phone phone-good" aria-hidden="true">
        <strong>今天读完了吗</strong>
        <span class="row"><em>阅读</em><small>12 页</small></span>
        <span class="row"><em>休息</em><small>还没开始</small></span>
        <span class="row"><em>绘画</em><small>已完成</small></span>
        <span class="cta">开始阅读</span>
      </div>
      <b>B · 有顺序</b>
      <p>标题最大，只有一个主按钮。</p>
    </button>

    <p v-if="pick" class="pick-note" :class="{ 'is-wrong': pick === 'bad' }">
      {{
        pick === "good"
          ? "B 写明了这一屏要干什么。标题最大，下面是列表，最后只有一个能点的按钮。"
          : "A 每一块都一样大。先删到只剩一件事，再谈好不好看。"
      }}
    </p>
  </div>
</template>
