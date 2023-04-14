<template>
  <div class="shape">
    <dv-scroll-board :config="config1" style="width:100%;height:100%" />
  </div>
</template>
  
<script lang="ts" setup>
import { reactive } from "vue"
const config1 = reactive({
  header: ["类型", "位置", "时间", "结果"],
  data: [
    ["自然", "工厂A", "10-02", "妥善处理"],
    ["自然", "工厂A", "10-02", "妥善处理"],
    ["自然", "工厂A", "10-02", "妥善处理"],
    ["自然", "工厂A", "10-02", "妥善处理"],
    ["自然", "工厂A", "10-02", "妥善处理"],
    ["自然", "工厂A", "10-02", "妥善处理"],
    ["自然", "工厂A", "10-02", "妥善处理"]
  ],
  index: true,
  columnWidth: [50],
  align: ["center"]
})
</script>
  
<style lang="scss" scoped>
.shape {
  height: calc(100% - 5rem);
  padding: 2rem;
  box-sizing: border-box;
}
</style>
