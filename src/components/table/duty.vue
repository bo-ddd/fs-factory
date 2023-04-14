<template>
  <div class="duty">
    <dv-scroll-board :config="config2" style="width:100%;height:100%" />
  </div>
</template>
  
  <script lang="ts" setup>
import { reactive } from "vue"
const config2 = reactive({
  header: ["人员", "职位", "部门"],
  data: [
    ["成瑞红", "经理", "销售"],
    ["成瑞红", "经理", "销售"],
    ["成瑞红", "经理", "销售"],
    ["成瑞红", "经理", "销售"],
    ["成瑞红", "经理", "销售"]
  ],
  index: true,
  columnWidth: [50],
  align: ["center"]
})
</script>
  
  <style lang="scss" scoped>
.duty {
  height: calc(100% - 5rem);
  padding: 2rem;
  box-sizing: border-box;
}
</style>
