<template>
  <div id="hnitiating"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue'
const hnitiating = function () {
  type EChartsOption = echarts.EChartsOption
  const chartDomHnitiating = document.getElementById('hnitiating');
  console.log(chartDomHnitiating);
  
      const myChartHnitiating = echarts.init(chartDomHnitiating);
      const optionHnitiating: EChartsOption = {
        title: {
        text: '火工品装卸'
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
     optionHnitiating && myChartHnitiating.setOption(optionHnitiating);
      window.addEventListener('resize', function () {
          myChartHnitiating.resize()
      })
  
}
onMounted(() => {
     hnitiating()

})
</script>
<style scoped lang="scss">
#hnitiating {
  height: 100%;
}
</style>
