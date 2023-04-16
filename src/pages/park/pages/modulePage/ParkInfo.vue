<template>
    <div class="main">
        <!-- title -->
        <div class="nav"></div>
        <!-- 园区基本信息 -->
        <div class="park-info">
            <borderBox title="园区基本信息">
                <div class="info-box">
                    <div v-for="item in parkInfo" :key="item.id">
                        <div class="info-item">
                            <div>
                                <img :src="item.imgPath" alt="" class="item-img">
                            </div>
                            <div>
                                <div class="item-title">{{ item.title }}</div>
                                <div class="item-content">{{ item.content }}</div>
                            </div>
                        </div>
                    </div>
                </div>
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
        <div class="enterprise-equipment">
            <Button @click="open" title="企业设备管理"></Button>
        </div>
        <!-- 企业装置信息 enterprise-installation-->
        <div class="enterprise-installation">
            <button2View @click="open" title="企业装置信息"></button2View>
        </div>
        <!-- 楼宇(企业)信息 具体看楼宇表-->
        <div class="building-info">
            <Button @click="open" title="楼宇信息"></Button>
        </div>

        <!-- mars3D -->
        <div class="map" id="map"></div>

        <!-- 园区企业信息 -->
        <div class="enterprise-info">
            <borderBox title="园区企业信息">
                <enterpriseInfo></enterpriseInfo>
            </borderBox>
        </div>
        <!-- 园区车辆信息  开停车状态 -->
        <div class="car-info">
            <borderBox title="园区设备开停车">
                <scroll-board :config="carInfo" />
            </borderBox>
        </div>
        <!-- 园区物流情况 -->
        <div class="logistics-info">
            <borderBox title="园区物流情况">
                <histograms></histograms>
                <!-- <dv-scroll-board :config="logisticsInfo" /> -->
            </borderBox>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ScrollBoard } from '@kjgl77/datav-vue3'
import borderBox from "../../../../components/EnergyManagementView.vue";
import parkAreaInfo from "../../../../components/parkInfo/parkAreaInfo.vue";
import parkBodNum from "../../../../components/parkInfo/parkBodNum.vue";
import enterpriseInfo from "../../../../components/parkInfo/enterpriseInfo.vue";
import histograms from '../../../../components/parkInfo/histogram.vue';
import Button from "../../../../components/buttom-1View.vue";
import button2View from "@mars/components/button-2View.vue";
import iconPark from '../../assets/images/icon-park.png';
import iconAddress from '../../assets/images/icon-address.png';
import iconOccupancy from '../../assets/images/icon-occupancy.png';
import iconBuilding from '../../assets/images/icon-building.png';
import { ElMessage } from 'element-plus';

import AMapLoader from "@amap/amap-jsapi-loader"
import { onMounted } from 'vue';


const carInfo = {
    header: ['时间', '车位', '停车状态', '所属企业'],
    data: [
        ['2021-01-01 08:00', 'ABCD0001', '停止', '企业A'],
        ['2021-01-02 09:00', 'ABCD0002', '开启', '企业A'],
        ['2021-01-03 10:00', 'ABCD0003', '开启', '企业B'],
        ['2021-01-03 10:00', 'ABCD0003', '停止', '企业A'],
        ['2021-01-03 10:00', 'ABCD0003', '停止', '企业B'],
        ['2021-01-03 10:00', 'ABCD0003', '开启', '企业A'],
        ['2021-01-03 10:00', 'ABCD0003', '停止', '企业B'],
    ],
    headerBGC: 'none',
    oddRowBGC: 'none',
    evenRowBGC: 'none',
    align: ['center', 'center', 'center', 'center']
}
const logisticsInfo = {
    header: ['物流ID', '物流企业', '物流状态', '记录'],
    data: [
        ['ABCD0001', '华辉捷', '进货', '2021-01-01 08:00'],
        ['ABCD0002', '恒锦盛', '出货', '2021-01-02 09:00'],
        ['ABCD0003', '恒锦盛', '出货', '2021-01-03 10:00'],
        ['ABCD0003', '华辉捷', '出货', '2021-01-03 10:00'],
        ['ABCD0003', '华辉捷', '进货', '2021-01-03 10:00'],
        ['ABCD0003', '恒锦盛', '出货', '2021-01-03 10:00'],
        ['ABCD0003', '华辉捷', '出货', '2021-01-03 10:00'],
    ],
    headerBGC: 'none',
    oddRowBGC: 'none',
    evenRowBGC: 'none',
}
const parkInfo = [
    {
        id: 1,
        imgPath: iconPark,
        title: '园区名称',
        content: '浮山化工园区'
    },
    {
        id: 2,
        imgPath: iconAddress,
        title: '园区地址',
        content: '山西省临汾市浮山县'
    },
    {
        id: 3,
        imgPath: iconOccupancy,
        title: '占地面积',
        content: '300亩'
    },
    {
        id: 4,
        imgPath: iconBuilding,
        title: '建筑面积',
        content: '100亩'
    },
]
const open = () => {
  ElMessage('暂无权限');
  console.log(ElMessage);
  
}

const aMap = () => {
  return AMapLoader.load({
    key: "9a08b1085292817f6ca0f8aede5e1e44", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.DistrictSearch", "AMap.Weather", "AMap.Geocoder", "AMap.Marker"],
    Loca: {
      // 是否加载 Loca， 缺省不加载
      version: "2.0.0" // Loca 版本，缺省 1.3.2
    }
  })
}

async function mapInit() {
  await aMap()
    .then((AMap) => {
      const map = new AMap.Map("map", {
        center: [111.8478, 36.02333333333333],
        zoom: 15,
        pitch: 40,
        mapStyle: "amap://styles/blue",
        viewMode: "3D",
        showMarker: true,
        showCircle: true,
        panToLocation: true,
        zoomToAccuracy: true
      })
      const markerContent =
        "" + '<div class="custom-content-marker">' + '  <img src="//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png">' + "</div>"
      const marker = new AMap.Marker({
        position: [111.8478, 36.02333333333333],
        // 将 html 传给 content
        content: markerContent,
        // 以 icon 的 [center bottom] 为原点
        offset: new AMap.Pixel(-13, -30)
      })
      map.add(marker)
    })
    .catch((e) => {
      console.log(e)
    })
}
onMounted(() => {
  mapInit()
})
</script>

<style scoped lang="less">
::v-deep(canvas){
    width: 100% !important;
    height: 100% !important;
}
.main {
    font-size: 1.4rem;
    height: 100vh;
    background-image: url("https://unier.oss-cn-beijing.aliyuncs.com/avatar/bj-4.gif");
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

.info-box {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
}

.info-box .item-img {
    width: 5rem;
    height: 5rem;
    margin-right: 2rem;
}

.info-box .item-title {
    color: #02e4f2;
    font-size: 2rem;
    font-weight: bold;
    padding: .5rem 0;
}

.info-box .item-content {
    font-size: 1rem;
    color: #66c9e4;
    font-weight: bold;

}

.info-box .info-item {
    display: flex;
    align-items: center;
    width: 21rem;
    height: 100%;
}

.main .title {
    grid-area: title;
    margin: 0 auto;
    text-align: center;
    font-size: 2rem;
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

.enterprise-equipment, .enterprise-installation, .building-info {  
    display: flex;
    align-items: center;
    justify-content: center;
}
.map{
    width: 100%;
    height: 100%;
}
</style>
