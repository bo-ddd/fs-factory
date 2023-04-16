<template>
    <div id="histogram">

    </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue';
onMounted(() => {
    histogram();
});
const histogram = function () {
    const chartDom = document.getElementById('histogram')!;
    const myChart = echarts.init(chartDom);
    const option = {
        textStyle: {
            color:'#fff'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            textStyle:{
                color:'#fff'
            }
        },
        grid: {
            left: '3%',
            // right: '3%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['达发物流', '壹米滴答', '宇鑫物流', '创新物流', '次晨达物流']
        },
        series: [
            {
                name: '出库',
                type: 'bar',
                data: [1820, 2348, 2903, 1097, 1317]
            },
            {
                name: '入库',
                type: 'bar',
                data: [1932, 2343, 3100, 1219, 1311]
            }
        ]
    };
    option && myChart.setOption(option);
}
</script>
<style scoped>
#histogram{
    width: 100%;
    height: 100%;
}
</style>
