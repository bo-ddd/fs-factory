<template>
  <div class="history">
    <ScrollBoard :config="config" style="width:100%;height:100%" />
  </div>
</template>

<script lang="ts" setup>
  import { ScrollBoard } from '@kjgl77/datav-vue3';
import { reactive } from "vue"
const config = reactive({
  header: ["时间", "地点", "类型", "描述"],
  data: [
    ["2021-05-17", "工厂C仓库", "人为事故", "贸易纠纷引发人为暴力事件"],
    ["2021-05-17", "工厂C仓库", "人为事故", "贸易纠纷引发人为暴力事件"],
    ["2021-05-17", "工厂C仓库", "人为事故", "贸易纠纷引发人为暴力事件"],
    ["2021-05-17", "工厂C仓库", "人为事故", "贸易纠纷引发人为暴力事件"],
    ["2021-05-17", "工厂C仓库", "人为事故", "贸易纠纷引发人为暴力事件"],
    ["2021-05-17", "工厂C仓库", "人为事故", "贸易纠纷引发人为暴力事件"]
  ],
  index: true,
  columnWidth: [50],
  align: ["center"]
})
</script>

<style lang="scss" scoped>
.history {
  height: calc(100% - 4rem);
  padding:0 2rem 2rem ; 
  box-sizing: border-box;
}
</style>
