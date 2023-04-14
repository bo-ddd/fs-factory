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
                    { value: 1, name: '山西恒锦盛科技有限公司' },
                    { value: 3, name: '浮山化工园A厂区' },
                    { value: 3, name: '浮山化工园B厂区' }],
                label: {
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
