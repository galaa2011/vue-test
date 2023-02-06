<template>
  <div class="component-a">
    我是组件B
    <el-date-picker></el-date-picker>
    <el-color-picker></el-color-picker>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted } from "vue";
import { ElDatePicker, ElColorPicker } from "element-plus";

export default defineComponent({
  name: "ComponentB",

  components: {
    ElDatePicker,
    ElColorPicker,
  },

  beforeCreate() {
    console.log("ComponentB----beforeCreate");
  },
  created() {
    console.log("ComponentB----created");
  },
  beforeMount() {
    console.log("ComponentB----beforeMount");
  },
  mounted() {
    console.log("ComponentB----mounted");
  },
  setup() {
    console.log("ComponentB----setup");
    onBeforeMount(() => {
      console.log("ComponentB----onBeforeMount");
    });
    onMounted(() => {
      console.log("ComponentB----onMounted");
    });

    return {};
  },
});
</script>
