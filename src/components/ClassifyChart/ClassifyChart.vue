<template>
    <div id="type-comparison"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue'
const typeComparison = function () {
    type EChartsOption = echarts.EChartsOption
    const chartDom = document.getElementById('type-comparison');
    const myChart = echarts.init(chartDom);
    const option: EChartsOption = {
        tooltip: {
            trigger: 'item'
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '5%',
            top: '5%',
            containLabel: true
        },
        series: [
            {
                type: 'pie',
                radius: ['20%', '47%'],
                center: ['50%', '50%'],
                data: [
                    { value: 1, name: '成型车间' },
                    { value: 3, name: '炭化车间' },
                    { value: 3, name: '活化车间' }],
                label: {
                    show: true,
                    position: "outside",
                    formatter:`{b}：{d}%`,
                    color: "#ffffff",
                    fontSize: 12    
                },  

            }
        ]

    };
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
#type-comparison {
    height: 100%;
}
</style>
