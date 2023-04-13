<template>
    <div id="main"></div>
</template>
<script setup lang="ts">
import * as echarts from "echarts"
import { onMounted } from 'vue'
const init = function () {
  type EChartsOption = echarts.EChartsOption
  const chartDom = document.getElementById("main") as HTMLElement;
  const myChart = echarts.init(chartDom)

  const option: EChartsOption = {
                xAxis: {
                    type: 'category',
                    data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'bar'
                    }
                ]
            };
  option && myChart.setOption(option)
}
onMounted(() => {
    init();
})
</script>
<style>
#main{
    width: 100%;
    height: 100%;
}
</style>
