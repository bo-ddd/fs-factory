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
        xAxis: {
            type: 'category',
            data: data
        },
        tooltip: {
            trigger: 'axis',
        },
        textStyle: {
            color: '#fff'
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: '10%',
            top: '10%',
            containLabel: true
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 24,
            interval: 5,
            axisLabel: {
                formatter: '{value} 时'
            }
        },
        series: [
            {
                data: [15, 9, 13, 15, 11, 18, 17],
                type: 'line',
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' 时';
                    }
                },
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
