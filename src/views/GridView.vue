<template>
  <div class="grid-view">
    <div
      class="grid-item"
      v-for="(item, index) in [
        Math.ceil(Math.random() * 200 + 100),
        Math.ceil(Math.random() * 200 + 100),
        Math.ceil(Math.random() * 200 + 100),
        Math.ceil(Math.random() * 200 + 100),
        Math.ceil(Math.random() * 200 + 100),
        Math.ceil(Math.random() * 200 + 100),
        Math.ceil(Math.random() * 200 + 100),
        Math.ceil(Math.random() * 200 + 100),
      ]"
      :key="item"
      :style="{
        height: `${item}px`,
        gridRowEnd: `span ${Math.ceil(item) + (index >= 4 ? 20 : 0)}`,
      }"
    >
      {{ item }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
</script>
<style lang="less" scoped>
.grid-view {
  --column: 4;
  display: grid;
  grid-template-columns: repeat(var(--column), 1fr);
  grid-gap: 0 10px;

  .grid-item {
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
