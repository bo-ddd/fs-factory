<template>
    <div class="park-bod"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted } from 'vue';

// let myEcharts = echarts;

// 挂载时初始化图表
onMounted(() => {
    parkBod();
});

// 卸载时销毁图表
// onUnmounted(() => {
//   // 销毁图表
//   myEcharts.dispose;
// });

const parkBod = function () {
    const myChart = echarts.init(document.getElementsByClassName('park-bod')[0] as any);

    const app: any = {};
    type EChartsOption = echarts.EChartsOption;
    // let option: EChartsOption;

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
    }; type BarLabelOption = NonNullable<echarts.BarSeriesOption['label']>;

    const labelOption: BarLabelOption = {
        show: true,
        position: app.config as BarLabelOption['position'],
        distance: app.config as BarLabelOption['distance'],
        align: app.config as BarLabelOption['align'],
        verticalAlign: app.config as BarLabelOption['verticalAlign'],
        rotate: app.config as BarLabelOption['rotate'],
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
            name: {}
        }
    };

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
            myChart.setOption<echarts.EChartsOption>({
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



    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['园区从业人员总数', '园区内从业人员数', '园区外从业人员数'],
            textStyle:{
                color:'#fff'
            }
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            // feature: {
            //     mark: { show: true },
            //     dataView: { show: true, readOnly: false },
            //     magicType: { show: true, type: ['line', 'bar', 'stack'] },
            //     restore: { show: true },
            //     saveAsImage: { show: true }
            // },
            iconStyle:{
                color:'#fff',
            }
        },
        xAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                data: ['2019', '2020', '2021', '2022', '2023'],
            }
        ],
        textStyle:{
            color:'#fff',
        },
        grid: {
            top: "10%",
            bottom: "0%",
            left: '0%',
            right: '10%',
            containLabel: true

        },
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '园区从业人员总数',
                type: 'bar',
                barGap: 0,
                label: {
                    show: true,
                    position: 'right',
                    valueAnimation: true,
                    color:'#fff',
                    fontSize:10,
                },
                emphasis: {
                    focus: 'series'
                },
                data: [370, 414, 392, 388, 420],
            },
            {
                name: '园区内从业人员数',
                type: 'bar',
                label: {
                    show: true,
                    position: 'right',
                    valueAnimation: true,
                    color:'#fff',
                    fontSize:10,
                },
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290]
            },
            {
                name: '园区外从业人员数',
                type: 'bar',
                label: {
                    show: true,
                    position: 'right',
                    valueAnimation: true,
                    color:'#fff',
                    fontSize:10,
                },
                emphasis: {
                    focus: 'series'
                },
                data: [150, 232, 201, 154, 190]
            }
        ]
    };

    option && myChart.setOption(option);

}
</script>

<style scoped lang="less">
.park-bod {
    height: 100%;
    width: 100%;
}
</style>
