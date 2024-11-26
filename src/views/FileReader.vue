<template>
  <input class="file-reader" type="file" @change="handleChange" />
  <img :src="url" alt="本地图片" />
  <embed :src="pdf" type="application/pdf" width="100%" height="100%" />
</template>
<script lang="ts" setup>
import { ref } from "vue";

const url = ref("");
const pdf = ref("");

function handleChange(e: Event) {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (file.type === "application/pdf") {
        pdf.value = e.target?.result as string;
        return;
      }
      url.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
}
</script>
<style>
.file-reader {
  /*  */
}

img {
  width: auto;
  height: 200px;
}
</style>
