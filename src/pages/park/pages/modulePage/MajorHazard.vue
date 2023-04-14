<template>
    <div class="major">
        <div class="header">

        </div>

        <div class="main">

            <BorderBox6 class="item">

                <div class="height">
                    <Title title="危险源统计">
                        <ClassifyChart></ClassifyChart>
                    </Title>
                </div>

                <div class="height">
                    <Title title="每日危险源数量">
                        <HazardContrast></HazardContrast>
                    </Title>
                </div>

                <div class="height">
                    <Title class="compo-title" title="隐患详情">

                        <ScrollBoard :config="hiddenTrouble" style="width: 25vw; height: 100%" />
                    </Title>
                </div>


            </BorderBox6>



            <BorderBox6 class="item">
                <Title title="企业信息">
                    <div class="aaa">
                        <div>企业编号:001</div>
                        <div>企业名称:山西恒锦盛科技有限公司</div>
                        <div>企业地址:山西省临汾市浮山县</div>
                        <div>联系人:李金平</div>
                        <div>联系电话:15267389275</div>
                        <div>企业邮箱:d@example.com</div>
                        <div>企业类型:建筑业</div>
                    </div>
                </Title>
            </BorderBox6>

            <BorderBox6 class="item">
                <Title title="监测预警">
                    <div class="park-status">

                        <div class="center">
                            <div class="round warning-level">
                                <img class="icon-unusual" src="../../assets/images/icon-unusual-blue.png" alt="">
                                <div>低风险</div>
                            </div>
                            <div class="warning-level-title title">
                                预警等级
                            </div>
                        </div>

                        <div class="center">
                            <div class="round commitment">
                                <img class="icon-unusual" src="../../assets/images/icon-unusual-red.png" alt="">
                                <div>高风险</div>
                            </div>
                            <div class="commitment-title title">
                                企业安全承诺
                            </div>
                        </div>

                        <div class="center">
                            <div class="round frequency">
                                <div>12</div>
                            </div>
                            <div class="frequency-title title">
                                报警次数
                            </div>
                        </div>
                    </div>
                    <ScrollBoard :config="warning" style="width: 25vw; height: calc(100% - 18rem);" />
                </Title>

            </BorderBox6>

            <BorderBox6 class="item">
                <Title title="园区企业">
                    <div class="enterprise">
                        <div>
                            <Decoration11 style="width:25rem;height:6rem;">山西恒锦盛科技有限公司</Decoration11>
                        </div>
                        <div @click="to">
                            <Decoration11 style="width:25rem;height:6rem;">浮山化工园F厂区</Decoration11>
                        </div>
                        <div @click="to">
                            <Decoration11 style="width:25rem;height:6rem;">浮山化工园G厂区</Decoration11>
                        </div>
                    </div>
                </Title>
            </BorderBox6>

            <BorderBox6 class="item">
                <Title title="事故记录">
                    <ScrollBoard :config="accidentRecords" style="width: 25vw; height: 100%" />
                </Title>
            </BorderBox6>

        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import { ElMessage } from "element-plus"
import { BorderBox6, Decoration11, ScrollBoard } from '@kjgl77/datav-vue3';
import Title from '../../../../components/EnergyManagementView.vue'
import ClassifyChart from '../../../../components/ClassifyChart/ClassifyChart.vue'
import HazardContrast from '../../../../components/HazardContrast/HazardContrast.vue'
const accidentRecords = reactive({
    header: ["事故时间", "影响范围", "受伤人数", "死亡人数"],
    data: [
        ["2022-08-19 08:00:00", "浮山化工A厂区", "1", "0"],
        ["2022-12-19 07:00:00", "浮山化工B厂区", "0", "0"],
        ["2022-08-19 08:30:00", "浮山化工A厂区", "2", "0"],
        ["2022-08-19 11:00:00", "浮山化工B厂区", "2", "0"],
        ["2022-02-19 16:00:00", "浮山化工C厂区", "1", "0"],
        ["2022-04-19 12:00:00", "浮山化工A厂区", "2", "0"],
        ["2022-12-19 21:00:00", "浮山化工C厂区", "1", "0"],
        ["2022-11-19 23:30:00", "浮山化工B厂区", "1", "0"],
        ["2022-12-19 09:20:00", "浮山化工A厂区", "2", "0"],
        ["2022-06-19 10:00:00", "浮山化工C厂区", "0", "0"]
    ],
    columnWidth: [100, 200, 100, 100],
    align: ["center", "center", "center", "center"],
    headerBGC: "none",
    oddRowBGC: "none",
    evenRowBGC: "none"
})

const warning = reactive({
    header: ["危险源编号", "监测时间", "监测数值", "预警级别", "预警描述"],
    data: [
        ["no1", "2022-08-19 08:00:00", "123", "低级", "超过阀值"],
        ["no8", "2022-12-19 07:00:00", "321", "低级", "超过阀值"],
        ["no9", "2022-08-19 08:30:00", "897", "低级", "数据异常"],
        ["no26", "2022-08-19 11:00:00", "23", "低级", "超过预警值"],
        ["no73", "2022-02-19 16:00:00", "82", "低级", "超过阀值"],
        ["no38", "2022-04-19 12:00:00", "938", "低级", "超过阀值"],
        ["no73", "2022-12-19 21:00:00", "82", "低级", "数据异常"],
        ["no2", "2022-11-19 23:30:00", "289", "低级", "超过预警值"],
        ["no4", "2022-12-19 09:20:00", "962", "低级", "超过预警值"],
        ["no6", "2022-06-19 10:00:00", "162", "低级", "数据异常"]
    ],
    columnWidth: [100, 100, 100, 100, 100],
    align: ["center", "center", "center", "center", "center"],
    headerBGC: "none",
    oddRowBGC: "none",
    evenRowBGC: "none"
})

const hiddenTrouble = reactive({
    header: ["危险源编号", "监测时间", "监测数值"],
    data: [
        ["no1", "火灾隐患", "触电火灾隐患"],
        ["no8", "环境隐患", "噪音超标"],
        ["no9", "事故隐患", "设备安装不当"],
        ["no26", "人员隐患", "工作中未佩戴安全带"],
        ["no73", "化学品隐患", "化学品渗漏"],
        ["no38", "气体泄漏隐患", "气体泄漏"],
        ["no73", "机械故障隐患", "设备故障"],
        ["no2", "消防隐患", "消防通道被堵"],
        ["no4", "生产安全隐患", "防护设施不全"],
        ["no6", "其他隐患", "其他隐患描述"]
    ],
    align: ["center", "center", "center", "center", "center"],
    headerBGC: "none",
    oddRowBGC: "none",
    evenRowBGC: "none"
})

const to = function () {
    ElMessage({
        message: "暂未对接信息！！！",
        type: 'warning'
    })
}
</script>

<style scoped>
.height {
    height: 33%;
}

.major {
    /* https://unier.oss-cn-beijing.aliyuncs.com/avatar/bg.gif */
    background: url('https://unier.oss-cn-beijing.aliyuncs.com/avatar/bg.gif') no-repeat;
    background-size: cover;
    box-sizing: border-box;
    height: 100vh;
}

.header {
    height: 6vh;
}

.main {
    height: 94vh;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-template-areas:
        "left-aside_1 center center right-aside_1"
        "left-aside_1 center center right-aside_1"
        "left-aside_1 center1 center1 right-aside_2";
    gap: .5rem;
    box-sizing: border-box;
    overflow: hidden;
}

.item {
    background-color: #02a9bb31;
    padding: 2rem;
    box-sizing: border-box;
}

.item:nth-of-type(1) {
    grid-area: left-aside_1;
}

.item:nth-of-type(2) {
    grid-area: center;
    color: #01c0d5;
    font-size: 2rem;

}

.aaa {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    margin-top: 3rem;
}

.item:nth-of-type(3) {
    grid-area: right-aside_1;
}

.item:nth-of-type(4) {
    grid-area: center1;

}

.item:nth-of-type(5) {
    grid-area: right-aside_2;
}

.hazard-book {
    margin-top: 1rem;
    width: 100%;
    height: 90%;
}

.park-status {
    height: 15rem;
    margin: 2rem 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.icon-unusual {
    width: 5rem;
}

.round {
    width: 11rem;
    height: 11rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    border-radius: 50%;
}

.warning-level {
    font-size: 1.8rem;
    border: .2rem solid #01c0d5;
    background-color: rgba(67, 221, 255, .2);
    color: #01c0d5;
}

.commitment {
    font-size: 1.8rem;
    border: .2rem solid #FF4C3C;
    background-color: rgba(255, 76, 60, .2);
    color: #FF4C3C;
}

.frequency {
    font-size: 3rem;
    border: .2rem solid #01c0d5;
    background-color: rgba(67, 221, 255, .2);
    color: #01c0d5;
}

.warning-level-title {
    background-color: rgba(67, 221, 255, .2);
    color: #01c0d5;
}

.commitment-title {
    background-color: rgba(255, 76, 60, .2);
    color: #FF4C3C;
}

.frequency-title {
    background-color: rgba(67, 221, 255, .2);
    color: #01c0d5;
}

.center .title {
    height: 3rem;
    margin: 1rem auto 0;
    line-height: 3rem;
    text-align: center;
}

:deep(.dv-scroll-board .rows .ceil) {
    padding: 0;
    background-color: #01c0d500 !important;
    white-space: normal !important;
    color: #01c0d5;
}

:deep(.dv-scroll-board .header) {
    background-color: #01c0d500 !important;
    font-weight: 600;
    color: #01c0d5;
}

.enterprise {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    color: #01c0d5;
    font-size: 1.4rem;
}

.enterprise div {
    cursor: pointer;
}</style>
