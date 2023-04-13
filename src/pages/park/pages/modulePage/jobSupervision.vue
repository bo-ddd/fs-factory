<template>
        <div class="job-supervision">
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

                        </dv-border-box-12>
                </div>
                <div class="item">
                        <dv-border-box-12 class="datav">

                        </dv-border-box-12>
                </div>
        </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import TypeComparison from "../../../../components/jobSupervision/TypeComparison.vue"

const config = reactive({
        header: ['作业类型', '作业时长', '操作人员'],
        data: [
                ['危化品装卸', 180, '张三'],
                ['挖掘机作业', 360, '李四'],
                ['高空作业', 120, '王五'],
                ['塔吊安装', 480, '赵六'],
                ['脚手架搭建', 240, '钱七'],
                ['脚手架搭建', 240, '钱七'],
                ['脚手架搭建', 240, '钱七']

        ],
        waitTime: 1000,
        headerBGC: 'none',
        oddRowBGC: 'none',
        evenRowBGC: 'none',
        // columnWidth:[100,150,80,100,100    ],
        align: ['center', 'center', 'center']
})

</script>
<style scoped lang="scss">
.job-supervision {
        height: 100%;
        display: grid;
        background-color: black;
        grid-template-columns: 1fr 3fr;
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-areas:
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
                                padding-left: 2rem;
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
                grid-area: a;
        }

        .item:nth-of-type(2) {
                grid-area: b;


        }

        .item:nth-of-type(3) {
                grid-area: c;
        }

        .item:nth-of-type(4) {
                grid-area: d;
        }
}
</style>
