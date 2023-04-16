<template>
  <div id="lineChart"></div>
</template>
<script setup lang="ts">
import * as echarts from "echarts"
import { onMounted } from 'vue'
const line = function () {
  type EChartsOption = echarts.EChartsOption;

  const chartDom = document.getElementById('lineChart')!;
  const myChart = echarts.init(chartDom);
  const option: EChartsOption = {
    tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
    textStyle: {
      color: "#fff"
    },
    grid: {
      top: '10%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['厂区A', '厂区B', '厂区C'],
      axisLabel: {
        interval: 0,
      },
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name:'安全运行天数',
        data: [100, 180, 150],
        type: 'bar',
        barWidth: '60%',
      }
    ],
    color: "#045e86"


  }

  option && myChart.setOption(option);

}
onMounted(() => {
  line();
})
</script>
<style>
#lineChart {
  width: 100%;
  height: 100%;
}
</style>
