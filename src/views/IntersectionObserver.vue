<template>
  <div class="box-container">
    <div
      v-for="(item, index) in 5"
      :key="index"
      :ref="(el) => (box[index] = el as HTMLElement)"
      class="box"
      :style="{
        backgroundColor: useRandomColor(),
      }"
    >
      元素 {{ item }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import useTracker from "@/hooks/useTracker";
import useRandomColor from "@/hooks/useRandomColor";

const tracker = useTracker({
  threshold: 0.5,
  duration: 300,
  callback: console.log,
});

const box = ref<HTMLElement[]>([]);

onMounted(() => {
  box.value.forEach((el: HTMLElement) => {
    tracker(el, {
      element: el,
      pageType: "home",
      action: "view",
    });
  });
});
</script>

<style scoped>
.box {
  height: 500px;
  width: 50vw;
}
</style>
