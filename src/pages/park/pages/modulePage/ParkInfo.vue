<template>
    <div class="main">
        <!-- title -->
        <div class="nav"></div>
        <!-- 园区基本信息 -->
        <div class="park-info">
            <borderBox title="园区基本信息">
                北荣
            </borderBox>
        </div>
        <!-- 园区人数统计分析   用柱状图 -->
        <div class="park-bod_num">
            <borderBox title="园区人数统计">
                <parkBodNum></parkBodNum>
            </borderBox>
        </div>
        <!-- 园区面积 -->
        <div class="park-area_info">
            <borderBox title="园区面积信息统计">
                <parkAreaInfo></parkAreaInfo>
            </borderBox>
        </div>

        <!-- 企业设备管理 button  enterprise-equipment_Administration -->
        <div class="enterprise-equipment">企业设备管理</div>
        <!-- 企业装置信息 enterprise-installation-->
        <div class="enterprise-installation">企业装置信息</div>
        <!-- 楼宇(企业)信息 具体看楼宇表-->
        <div class="building-info">楼宇信息</div>

        <!-- mars3D -->
        <div class="map"></div>

        <!-- 园区企业信息 -->
        <div class="enterprise-info">
            <borderBox title="园区企业信息">
                <enterpriseInfo></enterpriseInfo>
            </borderBox>
        </div>
        <!-- 园区车辆信息  开停车状态 -->
        <div class="car-info">
            <borderBox title="园区设备开停车">
                <dv-scroll-board :config="carInfo" />
            </borderBox>
        </div>
        <!-- 园区物流情况 -->
        <div class="logistics-info">
            <borderBox title="园区物流情况">
                <dv-scroll-board :config="logisticsInfo" />
            </borderBox>
        </div>
    </div>
</template>

<script lang="ts" setup>
import borderBox from "../../../../components/EnergyManagementView.vue";
import parkAreaInfo from "../../../../components/parkInfo/parkAreaInfo.vue";
import parkBodNum from "../../../../components/parkInfo/parkBodNum.vue";
import enterpriseInfo from "../../../../components/parkInfo/enterpriseInfo.vue";

const carInfo = {
    header: ['时间', '车位', '停车状态', '所属企业'],
    data: [
        ['2021-01-01 08:00', 'ABCD0001', '停止', '行1列3'],
        ['2021-01-02 09:00', 'ABCD0002', '开启', '行2列3'],
        ['2021-01-03 10:00', 'ABCD0003', '开启', '行3列3'],
        ['2021-01-03 10:00', 'ABCD0003', '停止', '行3列3'],
        ['2021-01-03 10:00', 'ABCD0003', '停车', '行3列3'],
        ['2021-01-03 10:00', 'ABCD0003', '开启', '行3列3'],
        ['2021-01-03 10:00', 'ABCD0003', '停车', '行3列3'],
    ],
    headerBGC:'none',
    oddRowBGC:'none',
    evenRowBGC:'none',
}
const logisticsInfo = {
    header: ['物流ID', '物流企业', '物流状态', '记录'],
    data: [
        ['ABCD0001', '企业A', '进货', '2021-01-01 08:00'],
        ['ABCD0002', '企业A', '出货', '2021-01-02 09:00'],
        ['ABCD0003', '企业B', '出货', '2021-01-03 10:00'],
        ['ABCD0003', '企业A', '出货', '2021-01-03 10:00'],
        ['ABCD0003', '企业B', '进货', '2021-01-03 10:00'],
        ['ABCD0003', '企业A', '出货', '2021-01-03 10:00'],
        ['ABCD0003', '企业A', '出货', '2021-01-03 10:00'],
    ],
    headerBGC:'none',
    oddRowBGC:'none',
    evenRowBGC:'none',
}
</script>

<style scoped lang="less">
.main {
    font-size: 1.4rem;
    height: 100vh;
    background-image: url("../../../../../public/img/parkInfo/bj-4.gif");
    background-size: cover;
    background-repeat: no-repeat;
    display: grid;
    gap: 1rem;
    box-sizing: border-box;
    grid-template-columns: 3fr 2fr 2fr 2fr 3fr;
    grid-template-rows: 6rem 4fr 4fr 4fr;
    grid-template-areas:
        'title title title title title'
        'park-info map map map enterprise-info'
        'park-bod_num map map map car-info'
        'park-area_info enterprise-equipment enterprise-installation building-info logistics-info'
    ;
    color: #fff;
}
.main .title {
    grid-area: title;
    margin: 0 auto;
    text-align: center;
    font-size: 2rem;
    /* -webkit-text-stroke: .1rem rgb(94, 94, 218); */
    /* color: transparent; */
    font-weight: 550;
}

.main .park-info {
    background: rgba(18, 33, 64, .5);
    padding: 2rem;
    box-sizing: border-box;
    grid-area: park-info;
}

.main .enterprise-equipment {
    grid-area: enterprise-equipment;
}

.main .car-info {
    padding: 2rem;
    box-sizing: border-box;
    grid-area: car-info;
    background: rgba(18, 33, 64, .5);
}

.main .enterprise-installation {
    grid-area: enterprise-installation;
}

.main .building-info {
    grid-area: building-info;
}

.main .enterprise-info {
    grid-area: enterprise-info;
    background: rgba(18, 33, 64, .5);
    padding: 2rem;
    box-sizing: border-box;
}

.main .park-bod_num {
    padding: 2rem;
    box-sizing: border-box;
    grid-area: park-bod_num;
    background: rgba(18, 33, 64, .5);
}

.main .map {
    grid-area: map;
}

.main .logistics-info {
    grid-area: logistics-info;
    padding: 2rem;
    box-sizing: border-box;
    background: rgba(18, 33, 64, .5);
}

.main .park-area_info {
    padding: 2rem;
    box-sizing: border-box;
    grid-area: park-area_info;
    background: rgba(18, 33, 64, .5);
}
</style>
