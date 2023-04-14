<template>
        <div class="job-supervision">
                <div class="item"></div>
                <div class="item">
                        <dv-border-box-12 class="datav">
                                <div class="datav-head">
                                        厂区特殊作业管理
                                </div>
                                <div class="table  datav-content">
                                        <dv-scroll-board :config="config" style="width:100%;height:100%; " />
                                </div>
                        </dv-border-box-12>
                </div>
                <div class="item">
                        <dv-border-box-12 class="datav">
                                <div class="datav-head">
                                        厂区特殊作业环境监测
                                </div>
                                <div class="table  datav-content">
                                        <dv-scroll-board :config="config1" style="width:100%;height:100%; " />
                                </div>
                        </dv-border-box-12>
                </div>
                <div class="item">
                        <dv-border-box-12 class="datav">
                                <div class="datav-head">
                                        厂区特殊作业智能告警
                                </div>
                                <div class="table  datav-content">
                                        <dv-scroll-board :config="config2" style="width:100%;height:100%; " />
                                </div>
                        </dv-border-box-12>
                </div>
                <div class="item">
                        <dv-border-box-12 class="datav">
                                <div class="datav-head">
                                        厂区特殊作业数据可视化
                                </div>
                                <div class="table  datav-content">
                                        <QuantityTrend></QuantityTrend>
                                </div>
                        </dv-border-box-12>
                </div>
                <div class="item">
                        <dv-border-box-12 class="datav">
                                <div class="datav-head">
                                        厂区特殊作业近期数据存储和备份时间统计
                                </div>
                                <div class="table  datav-content">
                                        <DataBackup></DataBackup>
                                </div>
                        </dv-border-box-12>

                </div>

        </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import QuantityTrend from "../../../../components/jobSupervision/QuantityTrend.vue"
import DataBackup from "../../../../components/jobSupervision/DataBackup.vue"
const config = reactive({
        header: ['作业名称', '作业描述', '作业人员', '作业设备'],
        data: [
                ['高空作业', '需使用护具和防护绳', '张三', '吊车'],
                ['引爆化学品', '需要专业技能和设备配合', '李四', '防护服'],
                ['雷区作业', '需在雷区内进行施工', '王五', '防护服'],
                ['雷区作业', '需在雷区内进行施工', '赵六', '防护服'],
                ['高空作业', '需使用护具和防护绳', '马七', '吊车'],
        ],
        waitTime: 1000,
        rowNum: 4,
        headerBGC: 'none',
        oddRowBGC: 'none',
        evenRowBGC: 'none',
        align: ['center', 'center', 'center', 'center']
})
const config1 = reactive({
        header: ['作业场所', '温度', '湿度', '噪声', '监测时间'],
        data: [
                ['车间A', 25.6, 60.2, 68.5, '2021-06-01 12:30:00'],
                ['车间A', 26.5, 65.4, 70.2, '2021-06-01 14:30:00'],
                ['车间B', 24.8, 60.3, 65.8, '2021-06-02 15:00:00'],
                ['车间C', 25.8, 55.5, 60.0, '2021-06-03 11:00:00'],
                ['车间D', 24.8, 59.1, 85.0, '2021-06-05 09:00:00']
        ],
        waitTime: 1000,
        rowNum: 4,
        headerBGC: 'none',
        oddRowBGC: 'none',
        evenRowBGC: 'none',
        align: ['center', 'center', 'center', 'center', 'center']
})
const config2 = reactive({
        header: ['告警类型', '告警级别', '告警描述', '告警时间'],
        data: [
                ['车辆超速', '高', '物流公司粤B12345车辆超速', '2021-06-01 12:30:00'],
                ['设备停机', '中', '生产车间设备停机', '2021-06-01 14:30:00'],
                ['人员违规', '低', '员工张三违规操作', '2021-06-02 10:00:00'],
                ['人员违规', '低', '员工李四违规操作', '2021-06-03 10:00:00'],
                ['车辆超速', '高', '物流公司粤B15625车辆超速', '2021-06-01 12:30:00'],

        ],
        waitTime: 1000,
        rowNum: 4,
        headerBGC: 'none',
        oddRowBGC: 'none',
        evenRowBGC: 'none',
        align: ['center', 'center', 'center', 'center']
})
// const config3 = reactive({
//         header: ['备份类型', '备份位置', '备份时间'],
//         data: [
//                 ['日常备份', '/data/backup', '2021-03-04'],
//                 ['日常备份', '/data/backup', '2021-03-14'],
//                 ['日常备份', '/data/backup', '2021-04-01'],
//                 ['月度备份', '/data/backup', '2021-05-01'],
//                 ['日常备份', '/data/backup', '2021-05-04'],
//                 ['日常备份', '/data/backup', '2021-06-04'],
//                 ['月度备份', '/data/backup', '2021-07-01'],
//                 ['年度备份', '/data/backup', '2021-12-01'],

//         ],
//         waitTime: 1000,
//         rowNum: 4,
//         headerBGC: 'none',
//         oddRowBGC: 'none',
//         evenRowBGC: 'none',
//         align: ['center', 'center', 'center']
// })

</script>
<style scoped lang="scss">
.job-supervision {
        background: url("../../assets/images/bg.gif");
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
                                font-size: 1.5rem;
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
