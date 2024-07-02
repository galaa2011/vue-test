<template>
  <div class="lottie-web" ref="$lt"></div>
  <span>{{ message }}</span>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import lottie from "lottie-web";

const lt = ref();
const $lt = ref();
const message = ref();

onMounted(() => {
  console.log($lt.value);
  lt.value = lottie.loadAnimation({
    container: $lt.value,
    renderer: "canvas",
    loop: true,
    autoplay: true,
    path: "https://wos2.58cdn.com.cn/iJkFeDcBiJiJ/rocket/_c-wNI_3E6.json",
  });
  console.log(lt.value);

  setTimeout(() => {
    // lt.value.setSpeed(10);
    lt.value.pause();
  }, 1000);

  setTimeout(() => {
    lt.value.goToAndPlay(10, true);
    // lt.value.play();
  }, 2000);
});

// 接收消息
const bc = new BroadcastChannel("post_message");
bc.onmessage = (e) => {
  message.value = e.data;
};
</script>
<style lang="less" scoped>
.lottie-web {
  width: 50vw;
  height: 50vh;
}
</style>
