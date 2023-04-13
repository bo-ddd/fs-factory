<template>
  <div>page</div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue"
const a = ref("hahah")
const a2 = reactive({
  a: 888,
  b: 999
})

const hiddenTrouble = reactive({
  header: ["危险源编号", "监测时间", '监测数值'],
  data: [
    ["no1", "火灾隐患", "触电火灾隐患"],
    ["no8", "环境隐患", "噪音超标"],
    ["no9", "事故隐患", "设备安装不当"],
    ["no26", "人员隐患", "工作中未佩戴安全带"],
    ["no73", "化学品隐患", "化学品渗漏"],
    ["no38", "气体泄漏隐患", "气体泄漏"],
    ["no73", "机械故障隐患", "设备故障"],
    ["no2", "消防隐患", "消防通道被堵"],
    ["no4", "生产安全隐患", "防护设施不全"],
    ["no6", "其他隐患", "其他隐患描述"],
  ],
  columnWidth: [100, 200, 100, 100],
  align: ["center", "center", "center", "center", "center"],
  headerBGC: "none",
  oddRowBGC: "none",
  evenRowBGC: "none"
})

const aa = function () {
  console.log(111)
}

const b: any = 78
</script>
