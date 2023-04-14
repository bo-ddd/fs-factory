<template>
  <div id="hazardous"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue'
const hazardous = function () {
  type EChartsOption = echarts.EChartsOption
  const chartDomHazardous = document.getElementById('hazardous');
  const myChartHazardous = echarts.init(chartDomHazardous);
  const optionHazardous: EChartsOption = {
    title: {
    text: '危险材料包装'
  },
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          data: ['高空作业',
              '火工品装卸作业',
              '危险品包装作业',
              '有毒物质接触作业',
              '射线处理作业',
              '水上作业']
      },
      grid: {
          left: '10%',
          right: '10%',
          bottom: '10%',
          top: '10%',
          containLabel: true
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['温度', '风速', '氧含量', '高度']
      },
      yAxis: {
          type: 'value',

      },
      series: [
          {
              name: '高空作业',
              type: 'line',
              stack: 'Total',
              data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
              name: '火工品装卸作业',
              type: 'line',
              stack: 'Total',
              data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
              name: '危险品包装作业',
              type: 'line',
              stack: 'Total',
              data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
              name: '有毒物质接触作业',
              type: 'line',
              stack: 'Total',
              data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
              name: '射线处理作业',
              type: 'line',
              stack: 'Total',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
          },
          {
              name: '水上作业',
              type: 'line',
              stack: 'Total',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
      ]
  };
  optionHazardous && myChartHazardous.setOption(optionHazardous);
  window.addEventListener('resize', function () {
      myChartHazardous.resize()
  })
}
onMounted(() => {     
        hazardous()
})
</script>
<style scoped lang="scss">
#hazardous {
  height: 100%;
}
</style>
