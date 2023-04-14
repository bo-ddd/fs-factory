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
    const optionTrend: EChartsOption = {
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value',
   
  },
  tooltip: {
            trigger: 'item'
        },
  textStyle:{
        color:'#fff'
    },
  grid: {
            left: '5%',
            right: '5%',
            bottom: '5%',
            top: '5%',
            containLabel: true
        },
  series: [
    {
      data: [82, 93, 90, 93, 129, 133, 132],
      type: 'line',
      areaStyle: {},
      label: {
        show: true,
        position: 'top',
        color:'#fff',
        fontSize:'10'
      },
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
