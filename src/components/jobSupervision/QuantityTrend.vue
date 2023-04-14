<template>
  <div id="quantity-trend"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue'
const typeComparison = function () {
  type EChartsOption = echarts.EChartsOption
  const chartDomTrend = document.getElementById('quantity-trend');
  const myChartTrend = echarts.init(chartDomTrend);
  const date = new Date()
  const data = []
  let day = date.getDate()
  for (let i = 0; i < 7; i++) {
    day--
    data.unshift((date.getMonth() + 1) + '月' + day + '日')
  }
  const optionTrend: EChartsOption = {
    textStyle:{
      color:'#fff'
    },
  tooltip: {
    trigger: 'axis',
  },
  toolbox: {
    // feature: {
    //   magicType: { show: true, type: ['line', 'bar'] },
    //   restore: { show: true },
    //   saveAsImage: { show: true }
    // },

  },
  grid: {
            left: '5%',
            right: '5%',
            bottom: '10%',
            top: '10%',
            containLabel: true
        },
  legend: {
    data: ['特殊作业数量', '监测数据数量', '告警数量'],
    top:'top',
    textStyle:{
      color:'#fff'
    }
  },
  xAxis: [
    {
      type: 'category',
      data: data,
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      interval: 2,
    },
  ],
  series: [
    {
      name: '特殊作业数量',
      type: 'bar',
      data: [
        2, 4, 7, 2, 2, 7, 1
      ]
    },
    {
      name: '监测数据数量',
      type: 'line',
      data: [
        2, 5, 9, 3, 2, 6, 1
      ]
    },
    {
      name: '告警数量',
      type: 'line',
      data: [1, 2, 3, 4, 6, 1, 2]
    }
  ]
};
  optionTrend && myChartTrend.setOption(optionTrend);
  window.addEventListener('resize', function () {
    myChartTrend.resize()
  })
}
onMounted(() => {
  typeComparison()
})
</script>
<style scoped lang="scss">
#quantity-trend {
  height: 100%;
}
</style>
