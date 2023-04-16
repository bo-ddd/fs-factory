<template>
    <div id="data-backup"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue'
const backup = function () {
    type EChartsOption = echarts.EChartsOption
    const chartDomBackup = document.getElementById('data-backup');
    const myChartBackup = echarts.init(chartDomBackup);
    const date = new Date()
    const data = []
    let day = date.getDate()
    for (let i = 0; i < 7; i++) {
        day--
        data.unshift((date.getMonth() + 1) + '月' + day + '日')
    }
    const optionBackup: EChartsOption = {
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
//   legend: {
//     data: ['反应釜', '管道', '蒸汽炉','橡胶加工设备','氮气发生器','蒸汽轮机','泵','空调设备','车间照明设备'],
//     top:'top',
//     textStyle:{
//       color:'#fff'
//     }
//   },
  xAxis: [
    {
      type: 'category',
      data: ['反应釜', '管道', '蒸汽炉','橡胶加工设备','氮气发生器','蒸汽轮机','泵','空调设备'],
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
      name: '温度',
      type: 'bar',
      data: [
        2, 4, 7, 2, 2, 7, 1
      ]
    },
    {
      name: '压力',
      type: 'bar',
      data: [
        2, 5, 9, 3, 2, 6, 1
      ]
    },
    {
      name: '水流量',
      type: 'bar',
      data: [1, 2, 3, 4, 6, 1, 2]
    },
    {
      name: '转速',
      type: 'bar',
      data: [1, 2, 3, 4, 6, 1, 2]
    }
  ]
};
    optionBackup && myChartBackup.setOption(optionBackup);
    window.addEventListener('resize', function () {
        myChartBackup.resize()
    })
}
onMounted(() => {
    backup()
})
</script>
<style scoped lang="scss">
#data-backup {
    height: 100%;
}
</style>
