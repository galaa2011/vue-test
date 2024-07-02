<template>
  <div></div>
</template>
<script lang="ts" setup>
import { from } from "rxjs";
debugger;
const source = from([1, 2, 3, 4, 5]);
const example = source.subscribe((val) => console.log(val));
// 取消订阅
example.unsubscribe();
</script>
