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
        color: "#fff",
      },
      top:'10%'
    },
    tooltip: {
      trigger: 'item',
    },
    toolbox: {
      show: true
    },
    series: [
      {
        name: "风险分布",
        type: "pie",
        radius: [50, 80],
        center: ["50%", "60%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8

        },
        data: [
          { value: 10, name: "厂区A" },
          { value: 4, name: "厂区B" },
          { value: 6, name: "厂区C" },
        ],
        label: {
          color: "#fff",
          fontSize: 15,
          position: "outside",
          formatter: function (params:any) {
            let res: any = "";
            res = params.data.name;
            if (params.data.name === '厂区A') {
              return `${res}温度偏高`
            }
            if (params.data.name === '厂区B') {
              return `${res}天然气使用占比高`
            }
            if (params.data.name === '厂区C') {
              return `${res}辐射风险`
            }

          },
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
