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
  let app: any = {}
  const posList = [
    'left',
    'right',
    'top',
    'bottom',
    'inside',
    'insideTop',
    'insideLeft',
    'insideRight',
    'insideBottom',
    'insideTopLeft',
    'insideTopRight',
    'insideBottomLeft',
    'insideBottomRight'
  ] as const;

  app.configParameters = {
    rotate: {
      min: -90,
      max: 90
    },
    align: {
      options: {
        left: 'left',
        center: 'center',
        right: 'right'
      }
    },
    verticalAlign: {
      options: {
        top: 'top',
        middle: 'middle',
        bottom: 'bottom'
      }
    },
    position: {
      options: posList.reduce(function (map, pos) {
        map[pos] = pos;
        return map;
      }, {} as Record<string, string>)
    },
    distance: {
      min: 0,
      max: 100
    }
  };
  type BarLabelOption = NonNullable<echarts.BarSeriesOption['label']>;


  app.config = {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 15,
    onChange: function () {
      const labelOption: BarLabelOption = {
        rotate: app.config.rotate as BarLabelOption['rotate'],
        align: app.config.align as BarLabelOption['align'],
        verticalAlign: app.config
          .verticalAlign as BarLabelOption['verticalAlign'],
        position: app.config.position as BarLabelOption['position'],
        distance: app.config.distance as BarLabelOption['distance']
      };
      myChartTrend.setOption<echarts.EChartsOption>({
        series: [
          {
            label: labelOption
          },
          {
            label: labelOption
          },
          {
            label: labelOption
          },
          {
            label: labelOption
          }
        ]
      });
    }
  };


  const labelOption: BarLabelOption = {
    show: true,
    position: app.config.position as BarLabelOption['position'],
    distance: app.config.distance as BarLabelOption['distance'],
    align: app.config.align as BarLabelOption['align'],
    verticalAlign: app.config.verticalAlign as BarLabelOption['verticalAlign'],
    rotate: app.config.rotate as BarLabelOption['rotate'],
    fontSize: 16,
    rich: {
      name: {}
    }
  };
  const optionTrend: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    textStyle: {
      color: '#fff'
    },
    legend: {
      data: ['特殊作业数量', '监测数据数量', '告警数量'],
      textStyle: {
        color: '#fff'
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['4月10日', '4月11日', '4月12日', '4月13日', '4月14日', '4月15日', '4月16日']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '特殊作业数量',
        type: 'bar',
        barGap: 0,
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390, 210, 455]
      },
      {
        name: '监测数据数量',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 324, 414]
      },
      {
        name: '告警数量',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [3, 2, 3, 1, 2, 1, 2],
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
