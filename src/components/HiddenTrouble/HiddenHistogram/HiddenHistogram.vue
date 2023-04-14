<template>
  <div id="main"></div>
</template>
<script setup lang="ts">
import * as echarts from "echarts"
import { onMounted } from "vue"
const init = function () {
  type EChartsOption = echarts.EChartsOption
  const chartDom = document.getElementById("main") as HTMLElement
  const myChart = echarts.init(chartDom)

  const option: EChartsOption = {
    legend: {
      textStyle: {
        color: "#fff"
      }
      
    },
    toolbox: {
      show: true
    },
    series: [
      {
        name: "Nightingale Chart",
        type: "pie",
        radius: [30, 80],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8
        },
        data: [
          { value: 40, name: "厂区A" },
          { value: 38, name: "厂区B" },
          { value: 32, name: "厂区C" },
          { value: 30, name: "脱硫塔" },
          { value: 23, name: "罐区" }
        ],
        label: {
          color: "#fff"
        }
      }
    ]
  }

  option && myChart.setOption(option)
}
onMounted(() => {
  init()
})
</script>
<style>
#main {
  width: 100%;
  height: 100%;
}
</style>
