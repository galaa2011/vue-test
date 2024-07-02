<template>
  <input class="post" ref="$post" @input="inputMessage" />
</template>
<script lang="ts" setup>
import { ref } from "vue";

const bc = new BroadcastChannel("post_message");
const $post = ref();

const inputMessage = () => {
  bc.postMessage($post.value.value);
};
</script>
<style lang="less" scoped>
.post {
  width: 50vw;
  height: 50vh;
}
</style>
