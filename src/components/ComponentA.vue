<template>
  <div class="component-a">
    我是组件A
    <el-date-picker></el-date-picker>
    <el-table></el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted } from "vue";
import { ElDatePicker, ElTable } from "element-plus";

export default defineComponent({
  name: "ComponentA",
  components: {
    ElDatePicker,
    ElTable,
  },

  beforeCreate() {
    console.log("ComponentA----beforeCreate");
  },
  created() {
    this.$nextTick(() => {
      console.log("ComponentA----created $nextTick");
    });
    console.log("ComponentA----created");
  },
  beforeMount() {
    console.log("ComponentA----beforeMount");
  },
  mounted() {
    console.log("ComponentA----mounted");
  },
  setup() {
    console.log("ComponentA----setup");
    onBeforeMount(() => {
      console.log("ComponentA----onBeforeMount");
    });
    onMounted(() => {
      console.log("ComponentA----onMounted");
    });

    return {};
  },
});
</script>
