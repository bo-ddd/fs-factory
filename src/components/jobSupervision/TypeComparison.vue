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
    
        series: [
            {
                type: 'pie',
                radius: ['20%', '47%'],
                center: ['50%', '50%'],
                data: [
                    { value: 1048, name: '高空作业' },
                    { value: 735, name: '火工品装卸作业' },
                    { value: 580, name: '危险品包装作业' },
                    { value: 484, name: '有毒物质接触作业' },
                    { value: 300, name: '射线处理作业' },
                    { value: 300, name: '水上作业' }],
                label: {
                    fontSize: 10,
                    color: '#fff'
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
