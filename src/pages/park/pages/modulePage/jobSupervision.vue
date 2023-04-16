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
                                        厂区特殊设备实时监测
                                </div>
                                <div class="table  datav-content">
                                        <!-- <DataBackup></DataBackup> -->
                                        <scroll-board  :config="config3" style="width:100%;height:100%" />

                                </div>
                        </BorderBox12>

                </div>

        </div>
</template>
<script setup lang="ts">
import { reactive, ref, computed, defineExpose } from 'vue'
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
let data=reactive([
                ['反应釜', '温度','250℃' , '压力', '5.5MPa'],
                ['管道', '水流量', '1500m³/h', '压力', '1.5MPa'],
                ['蒸汽炉', '温度', '260℃', '压力', '0.8MPa'],
                ['橡胶加工设备', '温度', '120℃', '压力', '6MPa'],
                ['氮气发生器', '生成氮气速度', '36L/min', '氮气纯度', '99.99%'],
                ['变压器', '电压', '10KV', '传输效率', '95%'],
                ['蒸汽轮机', '转速', '2000r/min', '压力', '2.5MPa'],
                ['泵', '水流量', '500m³/h', '扬程', '100m'],
                ['空调设备', '温度', '22℃', '湿度', '40%RH'],
                ['车间照明设备', '关照强度', '500Lux', '射灯功率', '100W']
        ])
        setInterval(() => {
        data[0][2] = Math.ceil(Math.random() * 4 + 247)+'℃'
        data[0][4] = (Math.ceil(Math.random()* 20)/10+4)+'MPa'
        data[1][2] = Math.ceil(Math.random() * 100 + 1450)+'m³/h'
        data[1][4] = (Math.ceil(Math.random()* 20)/10)+'MPa'
        data[2][2] = Math.ceil(Math.random() * 4 + 257)+'℃'
        data[2][4] = (Math.ceil(Math.random()* 20)/10)+'MPa'
        data[3][2] = Math.ceil(Math.random() * 4 + 117)+'℃'
        data[3][4] = (Math.ceil(Math.random()* 20)/10+5)+'MPa'
        data[4][2] = Math.ceil(Math.random() * 8 + 32)+'L/min'
        data[5][2] = Math.ceil(Math.random() * 4 + 8)+'KV'
        data[5][4] = (Math.ceil(Math.random()* 40)/10+95)+'MPa'
        data[6][2] = Math.ceil(Math.random() * 200 + 1900)+'r/min'
        data[6][4] = (Math.ceil(Math.random()* 20)/10+2)+'MPa'
        data[7][2] = Math.ceil(Math.random() * 40 + 450)+'m³/h'
        data[7][4] = Math.ceil(Math.random()* 10+90)+'m'
        data[8][2] = Math.ceil(Math.random() * 5 + 20)+'℃'
        data[8][4] = Math.ceil(Math.random()* 10+35)+'%RH'
        data[9][2] = Math.ceil(Math.random() * 50 + 450)+'Lux'
        data[9][4] = Math.ceil(Math.random()* 20+90)+'W'
}, 2000)

const config3 = reactive({
        header: ['设备名称', '检测类型', '数值', '检测类型', '数值'],
        data:data,
        waitTime: 5000,
        // indexHeader:'#',
        // index:true,
        rowNum: 4,
        // carousel:'page',
        headerBGC: 'none',
        oddRowBGC: 'none',
        evenRowBGC: 'none',
        align: ['center', 'center', 'center', 'center', 'center']
})

 
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
