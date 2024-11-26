<template>
  <img src="../assets/logo.png" alt="" />
  <div>LCP测试</div>
  <video src=""></video>
  <p>
    LCP测试LCP测试LCP测试LCP测试LCP测试LCP测试LCP测试LCP测试LCP测试LCP测试LCP测试
  </p>
</template>
<script lang="ts" setup>
let lcp: PerformanceEntry | null = null;

const observer = new PerformanceObserver((entries) => {
  for (const entry of entries.getEntries()) {
    if (!lcp || entry.startTime < lcp.startTime) {
      lcp = entry;
    }
  }
});

observer.observe({ type: "largest-contentful-paint", buffered: true });

// 在页面加载完成时，可以输出 LCP 值
window.addEventListener("load", () => {
  setTimeout(() => {
    if (lcp) {
      console.log("LCP:", lcp); // 输出 LCP 值
    }
  }, 1000); // 1秒后输出，确保所有内容都加载完成
});
</script>
