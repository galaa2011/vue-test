<template>
  <div class="order">
    <ComponentA></ComponentA>
    <ComponentB></ComponentB>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  defineAsyncComponent,
} from "vue";
// import ComponentA from "@/components/ComponentA.vue";
// import ComponentB from "@/components/ComponentB.vue";

export default defineComponent({
  name: "OrderView",
  components: {
    // ComponentB,
    // ComponentB: defineAsyncComponent(
    //   () =>
    //     import(
    //       /* webpackChunkName: "component-b" */ "@/components/ComponentB.vue"
    //     )
    // ),
  },
  computed: {
    componentA() {
      return window["smart-seed"]?.default;
    },
  },
  beforeCreate() {
    console.log("父组件----beforeCreate");
  },
  created() {
    console.log("父组件----created");
  },
  beforeMount() {
    console.log("父组件----beforeMount");
  },
  mounted() {
    console.log("父组件----mounted");
  },
  setup() {
    console.log("父组件----setup");
    onBeforeMount(() => {
      console.log("父组件----onBeforeMount");
    });
    onMounted(() => {
      console.log("父组件----onMounted");
    });

    return {};
  },
});
</script>
