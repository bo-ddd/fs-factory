<template>
  <div class="history">
    <ScrollBoard :config="config" style="width:100%;height:100%" />
  </div>
</template>

<script lang="ts" setup>
import { ScrollBoard } from '@kjgl77/datav-vue3';
import { reactive } from "vue"
const config = reactive({
  header: ["演练日期", "演练类型", "演练地点", "组织单位"],
  data: [
    ['2023-03-15', '火灾应急演练', '山西华辉捷科技有限公司', '消防科'],
    ['2023-02-05', '网络攻击演练', '厂区B', '技术部'],
    ['2023-02-12', '公共卫生事件演练', '山西华辉捷科技有限公司', '感染预防控制科'],
    ['2023-02-04', '停电演练', '厂区C', '保卫科'],
    ['2023-01-08', '地震演练', '厂区A', '应急预案办公室'],
    ['2023-03-29', '事故演练', '山西华辉捷科技有限公司', '公路管理部门'],
  ],
    columnWidth: [100, 100, 110, 100],
  align: ["center", "center", "center", "center"],
  headerBGC: "none",
  oddRowBGC: "none",
  evenRowBGC: "none"
  // align: ["center", "center", "center", "center"]
})
</script>

<style lang="scss" scoped>
.history {
  height: calc(100% - 4rem);
  padding: 0 2rem 2rem;
  box-sizing: border-box;
}
</style>
