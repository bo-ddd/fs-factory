<template>
    <div class="park-area"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted } from 'vue';
onMounted(() => {
    park();
});
const park = function () {
    const myChart1 = echarts.init(document.getElementsByClassName('park-area')[0] as any);
    const option1 = {
        title: {
            // // text: '园区',
            // subtext: '面积统计',
            // left: 'center',
        },
        textStyle:{
            color:'#fff',
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            top:'center',
            textStyle:{
                color:'#fff'
            }
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                center:[
                    '70%', '50%'
                ],
                data: [
                    { value: 1048, name: '已使用占地面积' },
                    { value: 735, name: '未使用占地面积' },
                    { value: 580, name: '建筑面积' },
                    { value: 484, name: '已使用建筑面积' },
                    { value: 300, name: '未使用建筑面积' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    option1 && myChart1.setOption(option1);
}
</script>

<style scoped lang="less">
.park-area {
    width: 100%;
    height: 100%;
}
</style>
