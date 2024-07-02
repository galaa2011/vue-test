<template>
  <div class="auto-text">{{ text }}</div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";

const TEXT = `简历标签迭代升级
项目信息：   todo
项目背景：C端简历标签，属性值，与类目建立三元关系配置能力；解决当前部分场景标签收集、展示不合理问题
项目状态：前置沟通
资源投入：预计投入FE1人
本周概要进展：
简历标签迭代升级前置沟通会：todo：根据殿君提供的接口整理前端调用场景，评估影响范围
C端简历标签迭代二次评审
下周进展
技术方案对齐，工作量评估
58赶集增加附件简历
项目信息：   附件简历
项目背景：优化求职体验，完成简历功能基础建设，新增简历附件功能
项目状态：三期需求测试阶段
资源投入：本周FE:5PD，累计FE:61PD
本周概要进展：
附件简历微信上传功能测试
上线计划：三期功能上线（三期上线顺序确认：6.13号测试完成服务端上线，小程序预计14号走特殊上线发布全量；端上微信上传入口页面待小程序全量后上线）`;
const text = ref();
const index = ref(0);
function setText() {
  text.value = TEXT.slice(0, index.value);
  index.value++;
  if (index.value <= TEXT.length) {
    setTimeout(setText, 100);
  }
}

onMounted(() => {
  setText();
});
</script>
<style>
.auto-text {
  font-size: 2rem;
  color: #333;
}
</style>
