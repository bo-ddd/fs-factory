<template>
  <div class="duty">
    <ScrollBoard :config="config2" style="width:100%;height:100%" />
  </div>
</template>
  
<script lang="ts" setup>
import { ScrollBoard } from '@kjgl77/datav-vue3';
import { reactive } from "vue"
const config2 = reactive({
  header: ["人员", "职位", "联系方式", "部门"],
  data: [
    ["范海林", "保安", "13633427825", "保卫科"],
    ["崔勇", "组长", "13633427825", "后勤部"],
    ["徐晓鹏", "保安", "13633427825", "保卫科"],
    ["赵健宇", "组长", "13633427825", "后勤部"],
    ["何梅", "保洁", "13633427825", "卫生部"]
  ],
  columnWidth: [100, 100, 110, 100],
  align: ["center", "center", "center", "center"],
  headerBGC: "none",
  oddRowBGC: "none",
  evenRowBGC: "none"
})
</script>
  
<style lang="scss" scoped>
.duty {
  height: calc(100% - 4rem);
  padding: 0 2rem 2rem;
  box-sizing: border-box;
}
</style>
