<template>
  <div class="home">
    <HelloWorld ref="$hello" @hello-world="helloWorld">
      这是slot内容
      <template v-slot:h1>
        <h1>这也是slot内容</h1>
      </template>
    </HelloWorld>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    HelloWorld,
  },
  setup() {
    const $hello = ref();

    onMounted(() => {
      console.log($hello.value);
    });

    return {
      $hello,
      helloWorld: console.log,
    };
  },
});
</script>
