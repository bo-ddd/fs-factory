<template>
  <div class="shape">
    <ScrollBoard :config="config1" style="width:100%;height:100%" />
  </div>
</template>
  
<script lang="ts" setup>
import { ScrollBoard } from '@kjgl77/datav-vue3';
import { reactive } from "vue"
const config1 = reactive({
  header: ["类型", "位置", "时间", "结果"],
  data: [
    ["火灾应急演练", "厂区A", "2022-03-15", "已处理"],
    ["网络攻击演练", "厂区A", "2022-02-05", "已处理"],
    ["公共卫生事件演练", "厂区C", "2022-12-12", "已处理"],
    ["停电演练", "厂区A", "2023-03-01", "已处理"],
    ["地震演练", "厂区C", "2023-03-12", "处理中"],
    ["事故演练", "厂区B", "2023-03-26", "待处理"],
  ],
})
</script>
  
<style lang="scss" scoped>
.shape {
  height: calc(100% - 4rem);
  padding:0 2rem 2rem ; 
  box-sizing: border-box;
}
</style>
