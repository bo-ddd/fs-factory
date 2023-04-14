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


import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { onMounted, ref } from 'vue';

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

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(-10, 35, 60);
camera.updateProjectionMatrix();
const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

let controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/public/draco')
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader)
gltfLoader.load('/public/gltf/20221010170924_parent_directory_住宅楼21.gltf', function (gltf) {
  const model = gltf.scene;
  scene.add(model);
});


const light1 = new THREE.DirectionalLight(0xffffff, 1)
light1.position.set(0, 0, 10)
scene.add(light1)
const light2 = new THREE.DirectionalLight(0xffffff, 1)
light2.position.set(0, 0, -10)
scene.add(light2)
const light3 = new THREE.DirectionalLight(0xffffff, 1)
light3.position.set(10, 0, 0)
scene.add(light3)
const light4 = new THREE.DirectionalLight(0xffffff, 1)
light4.position.set(-10, 0, 0)
scene.add(light4)
const light5 = new THREE.DirectionalLight(0xffffff, 1)
light5.position.set(5, 10, 0)
scene.add(light5)
const light6 = new THREE.DirectionalLight(0xffffff, 1)
light6.position.set(0, 10, 0)
scene.add(light6)
const light7 = new THREE.DirectionalLight(0xffffff, 1)
light7.position.set(0, 10, 5)
scene.add(light7)
const light8 = new THREE.DirectionalLight(0xffffff, 1)
light8.position.set(0, 10, 0)
scene.add(light8)

onMounted(() => {
  renderer.setClearColor("#000")
  scene.background = new THREE.Color('black');
  let gf:any=document.querySelector('.map');
    gf.appendChild(renderer.domElement);
})


function render() {
  requestAnimationFrame(render)
  renderer.render(scene, camera)
  controls.update();
}
render();

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
</style>
