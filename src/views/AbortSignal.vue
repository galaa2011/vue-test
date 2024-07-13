<template>
  <div>
    <h1>AbortSignal</h1>
    <p>
      AbortSignal是一个内置类，它表示一个信号对象，允许您与DOM请求（例如Fetch）通信，并在需要时中止它。
    </p>
    <p>
      当您想要取消一个请求，因为它花费的时间太长而无法完成时，它就会很有用。
    </p>
    <p>这是一个如何使用AbortSignal的例子：</p>
    <pre v-highlights="code">
      <code class="javascript">
        const controller = new AbortController();
        const signal = controller.signal;

        fetch('https://jsonplaceholder.typicode.com/posts', { signal })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error(error));

        setTimeout(() => controller.abort(), 5000);
      </code>
    </pre>
  </div>
</template>
<script lang="ts" setup>
// import { ref } from 'vue';
</script>
<style lang="less" scoped>
pre {
  background-color: #f4f4f4;
  padding: 1rem;
  overflow-x: auto;
}
</style>
