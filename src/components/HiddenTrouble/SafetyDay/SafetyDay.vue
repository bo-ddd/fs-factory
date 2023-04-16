<template>
    <div id="safeChart"></div>
  </template>
  <script setup lang="ts">
  import * as echarts from "echarts"
  import { onMounted } from 'vue'
  const line = function () {
  
  type EChartsOption = echarts.EChartsOption;
  
  const chartDom = document.getElementById('safeChart')!;
  const myChart = echarts.init(chartDom);
  const option: EChartsOption= {
    textStyle:{
        color:'#fff'
    },
    yAxis: {
      type: 'category',
      data: [
        '运输状况',
        '环境质量',
        '公共设施',
        '应急资源',
        '经济状况',
        '生产状况',
        '生产设备'
      ]
    },
    xAxis: {
      type: 'value'
    },
    grid:{
        left:'15%',
        right:'5%'
    },
    series: [
      {
        data: [
          {
            value: 80,
            itemStyle: {
              color: '#96bfff'
            }
          },
          {
            value: 88,
            itemStyle: {
              color: '#32c5e5'
            }
          },
          {
            value: 94,
            itemStyle: {
              color: '#99d9c9'
            }
          },
          {
            value: 80,
            itemStyle: {
              color: '#58a6a8'
            }
          },
          {
            value: 89,
            itemStyle: {
              color: '#e690d1'
            }
          },
          {
            value: 87,
            itemStyle: {
              color: '#fb7293'
            }
          },
          {
            value: 99,
            itemStyle: {
              color: '#e062ae'
            }
          }
        ],
        type: 'bar',
        barWidth: '25%'
      }
    ],
    tooltip: {
      trigger: 'axis',
      formatter: function (datas:any) {
        if (datas[0].name==='生产设备'){
            const res = '园区'+datas[0].name+'整体运转情况优秀';
            return res;
        }
        if (datas[0].name==='生产状况'){
            const res = '园区'+datas[0].name+'整体状态良好';
            return res;
        }
        if (datas[0].name==='经济状况'){
            const res = '园区'+datas[0].name+'稳定';
            return res;
        }
        if (datas[0].name==='应急资源'){
            const res = '园区'+datas[0].name+'储备情况良好';
            return res;
        }
        if (datas[0].name==='公共设施'){
            const res = '园区'+datas[0].name+'配套齐全';
            return res;
        }
        if (datas[0].name==='环境质量'){
            const res = '园区'+datas[0].name+'优良';
            return res;
        }
        if (datas[0].name==='运输状况'){
            const res = '园区'+datas[0].name+'良好';
            return res;
        }
        
      }
    }
  };
  
  option && myChart.setOption(option);
  
  
  }
  onMounted(() => {
    line();
  })
  </script>
  <style>
  #safeChart {
    width: 100%;
    height: 100%;
  }
  </style>
  