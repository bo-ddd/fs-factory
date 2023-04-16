<template>
        <div class="job-supervision">
                <div class="item"></div>
                <div class="item">
                        <BorderBox12 class="datav">
                                <div class="datav-head">
                                        厂区特殊作业管理
                                </div>
                                <div class="table  datav-content">
                                        <scroll-board :config="config" style="width:100%;height:100%; "></scroll-board>
                                </div>
                        </BorderBox12>
                </div>
                <div class="item">
                        <BorderBox12 class="datav">
                                <div class="datav-head">
                                        厂区特殊作业环境监测
                                </div>
                                <div class="table  datav-content">
                                        <scroll-board :config="config1" style="width:100%;height:100%; "></scroll-board>
                                </div>
                        </BorderBox12>
                </div>
                <div class="item">
                        <BorderBox12 class="datav">
                                <div class="datav-head">
                                        厂区特殊作业智能告警
                                </div>
                                <div class="table  datav-content">
                                        <scroll-board :config="config2" style="width:100%;height:100%" />
                                </div>
                        </BorderBox12>
                </div>
                <div class="item">
                        <BorderBox12 class="datav">
                                <div class="datav-head">
                                        厂区特殊作业数据可视化
                                </div>
                                <div class="table  datav-content">
                                        <QuantityTrend></QuantityTrend>
                                </div>
                        </BorderBox12>
                </div>
                <div class="item">
                        <BorderBox12 class="datav">
                                <div class="datav-head">
                                        厂区特殊设备实时监测{{ temperature1 }}
                                </div>
                                <div class="table  datav-content">
                                        <!-- <DataBackup></DataBackup> -->
                                        <scroll-board :config="config3" style="width:100%;height:100%" />

                                </div>
                        </BorderBox12>

                </div>

        </div>
</template>
<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { BorderBox12, ScrollBoard } from '@kjgl77/datav-vue3';
import QuantityTrend from "../../../../components/jobSupervision/QuantityTrend.vue"
import DataBackup from "../../../../components/jobSupervision/DataBackup.vue"
import { FullScreen } from '@icon-park/svg';
const config = reactive({
        header: ['作业名称', '作业描述', '作业人员', '作业设备'],
        data: [
                ['高空作业', '需使用护具和防护绳', '毛永根', '吊车'],
                ['引爆化学品', '需要专业技能和设备配合', '崔永川', '防护服'],
                ['雷区作业', '需在雷区内进行施工', '赵少飞', '防护服'],
                ['雷区作业', '需在雷区内进行施工', '姜宏连', '防护服'],
                ['高空作业', '需使用护具和防护绳', '吕青叶', '吊车'],
        ],
        waitTime: 5000,
        rowNum: 4,
        headerBGC: 'none',
        oddRowBGC: 'none',
        evenRowBGC: 'none',
        align: ['center', 'center', 'center', 'center']
})
const config1 = reactive({
        header: ['作业场所', '温度', '湿度', '噪声', '监测时间'],
        data: [
                ['活化车间', 25.6, 60.2, 68.5, '2023-03-01 12:30:00'],
                ['炭化车间', 26.5, 65.4, 70.2, '2023-03-01 14:30:00'],
                ['活化车间', 24.8, 60.3, 65.8, '2023-03-02 15:00:00'],
                ['炭化车间', 25.8, 55.5, 60.0, '2023-03-03 11:00:00'],
                ['成型车间', 24.8, 59.1, 85.0, '2023-03-05 09:00:00']
        ],
        waitTime: 5000,
        rowNum: 4,
        headerBGC: 'none',
        oddRowBGC: 'none',
        evenRowBGC: 'none',
        align: ['center', 'center', 'center', 'center', 'center']
})
const config2 = reactive({
        header: ['告警类型', '告警级别', '告警描述', '告警时间'],
        data: [
                ['车辆超速', '高', '物流公司粤B12345车辆超速', '2023-03-01 12:30:00'],
                ['设备停机', '中', '生产车间设备停机', '2023-03-01 14:30:00'],
                ['人员违规', '低', '员工路方云违规操作', '2023-03-02 10:00:00'],
                ['人员违规', '低', '员工乔文明违规操作', '2023-03-03 10:00:00'],
                ['车辆超速', '高', '物流公司粤B15625车辆超速', '2023-03-01 12:30:00'],

        ],
        waitTime: 5000,
        rowNum: 4,
        headerBGC: 'none',
        oddRowBGC: 'none',
        evenRowBGC: 'none',
        align: ['center', 'center', 'center', 'center']
})

const config3 = reactive({
        header: ['设备名称', '检测类型', '数值', '检测类型', '数值'],
        data: [
                ['反应釜', '温度','250℃' , '压力', '5.5MPa'],
                ['管道', '水流量', '1500'+'吨/小时', '压力', '0.8MPa'],
                ['蒸汽炉', '温度', '260℃', '压力', '5.5MPa'],
                ['橡胶加工设备', '温度', '250℃', '压力', '5.5MPa'],
                ['氮气发生器', '温度', '250℃', '压力', '5.5MPa'],
                ['变压器', '温度', '250℃', '压力', '5.5MPa'],
                ['蒸汽轮机', '温度', '250℃', '压力', '5.5MPa'],
                ['泵', '温度', '250℃', '压力', '5.5MPa'],
                ['空调设备', '温度', '250℃', '压力', '5.5MPa'],
                ['车间照明设备', '温度', '250℃', '压力', '5.5MPa'],
        ],
        waitTime: 5000,
        rowNum: 4,
        headerBGC: 'none',
        oddRowBGC: 'none',
        evenRowBGC: 'none',
        align: ['center', 'center']
})
setInterval(() => {
        config3.data[0][2] = Math.ceil(Math.random() * 4 + 247)+'℃'
        config3.data[0][4] = (Math.ceil(Math.random()* 20)/10+4)+'MPa'
        config3.data[1][2] = Math.ceil(Math.random() * 4 + 247)+'℃'
        config3.data[1][4] = (Math.ceil(Math.random()* 20)/10+4)+'MPa'
        config3.data[2][2] = Math.ceil(Math.random() * 4 + 247)+'℃'
        config3.data[2][4] = (Math.ceil(Math.random()* 20)/10+4)+'MPa'
        config3.data[3][2] = Math.ceil(Math.random() * 4 + 247)+'℃'
        config3.data[3][4] = (Math.ceil(Math.random()* 20)/10+4)+'MPa'
        config3.data[4][2] = Math.ceil(Math.random() * 4 + 247)+'℃'
        config3.data[4][4] = (Math.ceil(Math.random()* 20)/10+4)+'MPa'
        config3.data[5][2] = Math.ceil(Math.random() * 4 + 247)+'℃'
        config3.data[5][4] = (Math.ceil(Math.random()* 20)/10+4)+'MPa'
        config3.data[6][2] = Math.ceil(Math.random() * 4 + 247)+'℃'
        config3.data[6][4] = (Math.ceil(Math.random()* 20)/10+4)+'MPa'
        config3.data[7][2] = Math.ceil(Math.random() * 4 + 247)+'℃'
        config3.data[7][4] = (Math.ceil(Math.random()* 20)/10+4)+'MPa'
        config3.data[8][2] = Math.ceil(Math.random() * 4 + 247)+'℃'
        config3.data[8][4] = (Math.ceil(Math.random()* 20)/10+4)+'MPa'
        config3.data[9][2] = Math.ceil(Math.random() * 4 + 247)+'℃'
        config3.data[9][4] = (Math.ceil(Math.random()* 20)/10+4)+'MPa'


}, 2000)
</script>
<style scoped lang="scss">
.job-supervision {
        background: url("https://unier.oss-cn-beijing.aliyuncs.com/avatar/bg.gif");
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        height: 100vh;
        display: grid;
        background-color: black;
        grid-template-columns: 1fr 2fr 1fr;
        grid-template-rows: 6rem 4fr 4fr;
        grid-template-areas:
                'title title title'
                'a e c'
                'b e d'

        ;

        .item {
                .datav {
                        height: 100%;
                        width: 100%;
                        padding: 0 2rem 2rem 2rem;
                        box-sizing: border-box;

                        .datav-head {
                                height: 5rem;
                                color: #fff;
                                line-height: 5rem;
                                box-sizing: border-box;
                                font-size: 2rem;
                                font-weight: bold;
                        }

                        .datav-content {
                                height: calc(100% - 5rem);

                                width: 100%;
                        }


                }
        }



        .item:nth-of-type(1) {
                grid-area: title;
        }

        .item:nth-of-type(2) {
                grid-area: a;
        }

        .item:nth-of-type(3) {
                grid-area: b;
        }

        .item:nth-of-type(4) {
                grid-area: c;
        }

        .item:nth-of-type(5) {
                grid-area: d;
        }

        .item:nth-of-type(5) {
                grid-area: e;
        }

}
</style>
