<template>
  <div class="hello">
    <TestChart></TestChart>
    <h1>{{ props.msg }}</h1>
    <h2 @click="() => log(random(true))">
      {{ message }}
    </h2>
    <button :style="{ width: '100px' }" @click="state.count++">
      {{ state.count }}
    </button>
    <component :is="random(true) > 0.5 ? TestChart1 : TestChart2"></component>
    <div class="hello-slot">
      <slot></slot>
      <slot name="h1"></slot>
      {{ $slots.h1 }}
    </div>
    <div class="hello-show" v-show-log></div>
  </div>
</template>
<script lang="ts">
// import { debounce } from "lodash-es";

// window.addEventListener("scroll", debounce(console.log, 500));
export default {};
</script>
<script lang="ts" setup>
import {
  h,
  defineEmits,
  defineProps,
  defineExpose,
  onMounted,
  reactive,
  Directive,
  withDefaults,
} from "vue";
import { random } from "lodash-es";
import useTest from "@/hooks/useTest";
import TestChart1 from "./TestChart.vue";

const test = useTest();
console.log(test);

const TestChart2 = h("h1", ["TestChart2"]);
const props = withDefaults(defineProps<{ msg: string }>(), {
  msg: "这是默认的message",
});
const emits = defineEmits<{ (e: "hello-world", ...args: unknown[]): void }>();

console.log("vue setup");

const message = "world";

function log(...args: unknown[]) {
  console.log(...args);
  emits("hello-world", ...args);
}

const state = reactive({ count: 0 });

/**
 * 自定义指令
 */
const vShowLog: Directive = {
  beforeMount(el) {
    const observer = new IntersectionObserver(
      (entities) => {
        for (const entity of entities) {
          if (entity.intersectionRatio > 0.5) {
            console.log("元素：", entity.target, "曝光了");
          }
        }
      },
      { threshold: [0, 0.5, 1] }
    );
    observer.observe(el);
  },
};

onMounted(() => {
  // debugger;
});

/**
 * 组件对外暴漏的内容
 */
defineExpose({ state });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
  &-show {
    height: 1000px;
    background-color: beige;
  }
}
</style>
