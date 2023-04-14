<template>
    <div id="hazardContrast"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue'
const typeComparison = function () {
    type EChartsOption = echarts.EChartsOption
    const chartDom = document.getElementById('hazardContrast');
    const myChart = echarts.init(chartDom);
    const option: EChartsOption = {
        textStyle: { color: '#fff' },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            textStyle: { color: '#fff' },
            data: ['浮山A厂区', '浮山B厂区', '浮山C厂区']
        },
        grid: {
            top: "10%",
            bottom: "10%",
            left: '10%',
            right: '10%',
            containLabel: true

        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['4月1日', '4月2日', '4月3日', '4月4日', '4月5日', '4月6日', '4月7日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '浮山A厂区',
                type: 'line',
                stack: 'Total',
                data: [1, 1, 2, 2, 0, 3, 1]
            },
            {
                name: '浮山B厂区',
                type: 'line',
                stack: 'Total',
                data: [1, 0, 0, 2, 1, 0, 1]
            },
            {
                name: '浮山C厂区',
                type: 'line',
                stack: 'Total',
                data: [1, 2, 1, 0, 0, 1, 1]
            }
        ]
    }
    option && myChart.setOption(option);
    window.addEventListener('resize', function () {
        myChart.resize()
    })
}
onMounted(() => {
    typeComparison()
})
</script>
<style scoped lang="scss">
#hazardContrast {
    height: 100%;
}
</style>
