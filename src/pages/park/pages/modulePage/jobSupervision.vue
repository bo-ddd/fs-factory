<template>
        <div class="job-supervision">
                <div class="item"></div>
                <div class="item">
                        <dv-border-box-12 class="datav">
                                <div class="datav-head">
                                        厂区特殊作业类型对比
                                </div>
                                <div class="datav-content">
                                        <TypeComparison></TypeComparison>
                                </div>
                        </dv-border-box-12>
                </div>
                <div class="item">
                        <dv-border-box-12 class="datav">
                                <div class="datav-head">
                                        厂区特殊作业监管
                                </div>
                                <div class="table  datav-content">
                                        <dv-scroll-board :config="config" style="width:100%;height:100%; " />
                                </div>
                        </dv-border-box-12>
                </div>
                <div class="item">
                        <dv-border-box-12 class="datav">
                                <div class="datav-head">
                                        厂区特殊作业数量趋势
                                </div>
                                <div class=" datav-content">
                                        <QuantityTrend></QuantityTrend>
                                </div>
                        </dv-border-box-12>
                </div>
                <div class="item">
                        <dv-border-box-12 class="datav">
                                <div class="datav-head">
                                        厂区特殊作业环境参数
                                </div>
                                <div class="job-parameter datav-content">
                                        <div class="parameter">
                                                <div class="parameter-head">
                                                        高空作业
                                                </div>
                                                <div class=" parameter-content">
                                                        <JobHeights></JobHeights>
                                                </div>
                                        </div>
                                        <div class="parameter">
                                                <div class="parameter-head">
                                                        有毒物质接触
                                                </div>
                                                <div class=" parameter-content">
                                                        <ContactToxic></ContactToxic>
                                                </div>

                                        </div>
                                        <div class="parameter">
                                                <div class="parameter-head">
                                                        危险材料包装
                                                </div>
                                                <div class=" parameter-content">
                                                        <Hazardous></Hazardous>
                                                </div>


                                        </div>
                                        <div class="parameter">
                                                <div class="parameter-head">
                                                        火工品装卸
                                                </div>
                                                <div class=" parameter-content">
                                                        <Initiating></Initiating>
                                                </div>


                                        </div>
                                        <div class="parameter">
                                                <div class="parameter-head">
                                                        射线处理
                                                </div>
                                                <div class=" parameter-content">
                                                        <!-- <Radiatio></Radiatio> -->
                                                </div>


                                        </div>
                                        <div class="parameter">
                                                <div class="parameter-head">
                                                        水上作业
                                                </div>
                                                <div class=" parameter-content">
                                                        <!-- <WaterOperations></WaterOperations> -->
                                                </div>


                                        </div>
                                </div>
                        </dv-border-box-12>
                </div>
        </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import TypeComparison from "../../../../components/jobSupervision/TypeComparison.vue"
import QuantityTrend from "../../../../components/jobSupervision/QuantityTrend.vue"
import ContactToxic from "../../../../components/jobSupervision/ContactToxicSubstances.vue"
import Hazardous from "../../../../components/jobSupervision/HazardousMaterialPackaging.vue"
import Radiatio from "../../../../components/jobSupervision/RadiationProcessing.vue"
import WaterOperations from "../../../../components/jobSupervision/WaterOperations.vue"
import Initiating from "../../../../components/jobSupervision/InitiatingExplosiveDevice.vue"
import JobHeights from "../../../../components/jobSupervision/JobHeights.vue"

const config = reactive({
        header: ['作业类型', '作业时长', '操作人员'],
        data: [
                ['危化品装卸', 180, '张三'],
                ['挖掘机作业', 360, '李四'],
                ['高空作业', 120, '王五'],
                ['塔吊安装', 480, '赵六'],
                ['脚手架搭建', 240, '钱七'],
        ],
        waitTime: 1000,
        rowNum: 4,
        headerBGC: 'none',
        oddRowBGC: 'none',
        evenRowBGC: 'none',
        align: ['center', 'center', 'center']
})

</script>
<style scoped lang="scss">
.job-supervision {
        height: 100vh;
        display: grid;
        background-color: black;
        grid-template-columns: 1fr 3fr;
        grid-template-rows: 6rem 4fr 4fr 4fr;
        grid-template-areas:
                'title title'
                'a d'
                'b d'
                'c d'
        ;

        .item {
                .datav {
                        height: 100%;
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

                .job-parameter {

                        display: grid;
                        gap: 1rem;
                        grid-template-columns: 1fr 1fr 1fr;
                        grid-template-rows: 1fr 1fr;
                        grid-template-areas:
                                'parameter-a parameter-b parameter-c'
                                'parameter-d parameter-e parameter-f'
                        ;

                        .parameter {
                                .parameter-head {
                                        height: 5rem;
                                        color: #fff;
                                        line-height: 5rem;
                                        box-sizing: border-box;
                                        font-size: 1.5rem;
                                        font-weight: bold;
                                }

                                .parameter-content {
                                        height: calc(100% - 5rem);
                                }
                        }

                        .parameter:nth-of-type(1) {
                                grid-area: parameter-a;
                        }

                        .parameter:nth-of-type(2) {
                                grid-area: parameter-b;
                        }

                        .parameter:nth-of-type(3) {
                                grid-area: parameter-c;
                        }

                        .parameter:nth-of-type(4) {
                                grid-area: parameter-d;
                        }

                        .parameter:nth-of-type(5) {
                                grid-area: parameter-e;
                        }

                        .parameter:nth-of-type(6) {
                                grid-area: parameter-f;
                        }
                }
        }

}</style>
