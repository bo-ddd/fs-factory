<template>
        <div class="major">
                <div class="header">

                </div>
                <div class="main">

                        <dv-border-box-6 class="item">
                                <Title title="事件列表">
                                        <dv-decoration-11 class="red mt-20" style="width:100%;height:6rem;">
                                                火灾报警
                                        </dv-decoration-11>
                                        <!-- <dv-decoration-11 class="yellow mt-20" style="width:100%;height:6rem;">
                                        道路交通报警
                                </dv-decoration-11>
                                <dv-decoration-11 class="red mt-20" style="width:100%;height:6rem;">
                                        安防监控报警
                                </dv-decoration-11>
                                <dv-decoration-11 class="blue mt-20" style="width:100%;height:6rem;">
                                        电力故障报警
                                </dv-decoration-11> -->
                                </Title>
                        </dv-border-box-6>

                        <dv-border-box-6 class="item" id="map">
                                <!-- 地图 -->

                        </dv-border-box-6>

                        <dv-border-box-6 class="item">
                                <Title title="报警信息">

                                        <div class="park-status">
                                                <div class="center">
                                                        <div class="round commitment">
                                                                <img class="icon-unusual"
                                                                        src="../../../park/assets/images/icon-unusual-red.png"
                                                                        alt="">
                                                                <div>高风险</div>
                                                        </div>
                                                        <div class="commitment-title title">
                                                                报警级别
                                                        </div>
                                                </div>
                                        </div>

                                        <dv-decoration-11 class="blue mt-5"
                                                style="width:100%;height:60px;">处理人：周永峰</dv-decoration-11>
                                        <dv-decoration-11 class="blue mt-5" style="width:100%;height:60px;">处理时间：{{ date
                                        }}</dv-decoration-11>
                                        <dv-decoration-11 class="blue mt-5"
                                                style="width:100%;height:60px;">处理结果：上报消防部门</dv-decoration-11>
                                        <dv-decoration-11 class="blue mt-5"
                                                style="width:100%;height:60px;">处理状态：处理中</dv-decoration-11>

                                </Title>
                        </dv-border-box-6>

                        <dv-border-box-6 class="item">
                                <!-- 盾牌 -->
                                <div class="item-shied">
                                        <div>
                                                <div class="park-status">
                                                        <div class="center">
                                                                <div class="round warning-level">
                                                                        <img class="icon-unusual"
                                                                                src="../../../park/assets/images/icon-unusual-blue.png"
                                                                                alt="">
                                                                        <div>低风险</div>
                                                                </div>
                                                                <div class="warning-level-title title">
                                                                        预警等级
                                                                </div>
                                                        </div>
                                                </div>  
                                        </div>
                                        <div><img class="shied" src="../../assets/images/shield.gif" alt=""></div>
                                        <div>
                                                <div class="park-status">
                                                        <div class="center">
                                                                <div class="round warning-level">
                                                                        <img class="icon-unusual"
                                                                                src="../../../park/assets/images/icon-unusual-blue.png"
                                                                                alt="">
                                                                        <div>低风险</div>
                                                                </div>
                                                                <div class="warning-level-title title">
                                                                        预警等级
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </dv-border-box-6>

                </div>
        </div>
</template>
<script setup lang="ts">
import Title from '../../../../components/EnergyManagementView.vue'
import { ref, onUnmounted, onMounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
const date = ref(new Date().toLocaleString())


const aMap = () => {
        return AMapLoader.load({
                key: "9a08b1085292817f6ca0f8aede5e1e44", // 申请好的Web端开发者Key，首次调用 load 时必填
                version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: [
                        "AMap.DistrictSearch",
                        "AMap.Weather",
                        "AMap.Geocoder",
                        "AMap.Marker",
                ],
                Loca: {
                        // 是否加载 Loca， 缺省不加载
                        version: "2.0.0", // Loca 版本，缺省 1.3.2
                },
        });
};

async function mapInit() {
        await aMap().then((AMap) => {
               const map = new AMap.Map("map", {
                        center: [111.8478, 36.02333333333333],
                        zoom: 12.2,
                        pitch: 40,
                        mapStyle: "amap://styles/blue",
                        viewMode: "3D",
                        showMarker: true,
                        showCircle: true,
                        panToLocation: true,
                        zoomToAccuracy: true,
                });
               const markerContent = '' +
                        '<div class="custom-content-marker">' +
                        '   <img src="//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png">' +
                        '</div>';
                const marker = new AMap.Marker({
                        position: [111.8478, 36.02333333333333],
                        // 将 html 传给 content
                        content: markerContent,
                        // 以 icon 的 [center bottom] 为原点
                        offset: new AMap.Pixel(-13, -30)
                });
                map.add(marker);
        }).catch((e) => {
                console.log(e);
        });
}


onUnmounted(() => {
        // map.value.destory()
})
onMounted(() => {
        mapInit()
})


</script>
        
<style scoped>
.mt-20 {
        margin-top: 2rem;
}

.mt-5 {
        margin-top: 5%;
}

.red {
        color: red;
}

.yellow {
        color: yellow;
}

.blue {
        color: #02a8bb;
}

.shied {
        width: 25rem;
        width: 25rem;
}



/* 高德地图 */
html,
body,
#container {
        height: 100%;
        width: 100%;
}

.custom-content-marker {
        position: relative;
        width: 2rem;
        height: 3rem;
}

.custom-content-marker img {
        width: 100%;
        height: 100%;
}

.custom-content-marker .close-btn {
        position: absolute;
        top: -.6rem;
        right: -.8rem;
        width: 1.5rem;
        height: 1.5rem;
        font-size: 1.2rem;
        background: #ccc;
        border-radius: 50%;
        color: #fff;
        text-align: center;
        line-height: 1.5rem;
        box-shadow: -.1rem .1rem .1rem rgba(10, 10, 10, .2);
}

.custom-content-marker .close-btn:hover {
        background: #666;
}

/* 高德地图 */


.major {
        background: url('../../../park/assets/images/bg.gif') no-repeat;
        background-size: cover;
        box-sizing: border-box;
        height: 100vh;
}

.header {
        height: 6vh;
}

.main {
        font-size: 1.6rem;
        height: 94vh;
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
        grid-template-rows: repeat(3, 1fr);
        grid-template-areas:
                "left-aside_1 center  right-aside_1"
                "left-aside_1 center  right-aside_1"
                "left-aside_1 center1  right-aside_1";
        gap: .5rem;
        box-sizing: border-box;
        overflow: hidden;
}

.item {
        padding: 2rem;
        box-sizing: border-box;
}

.item:nth-of-type(1) {
        /* background-color: #02a9bb31; */
        background-color: #0425a731;
        grid-area: left-aside_1;
}

.item:nth-of-type(2) {
        grid-area: center;
        color: #01c0d5;
}

.item:nth-of-type(3) {
        background-color: #0425a731;
        grid-area: right-aside_1;
}

.item:nth-of-type(4) {
        grid-area: center1;
}

.item-shied {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
}

.warning-level {
        font-size: 1.8rem;
        border: .2rem solid #01c0d5;
        background-color: rgba(67, 221, 255, .2);
        color: #01c0d5;
}

.warning-level-title {
        background-color: rgba(67, 221, 255, .2);
        color: #01c0d5;
}

.center .title {
        height: 3rem;
        margin: 1rem auto 0;
        line-height: 3rem;
        text-align: center;
        font-size: 1.4rem;
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

.commitment {
        font-size: 1.8rem;
        border: .2rem solid #FF4C3C;
        background-color: rgba(255, 76, 60, .2);
        color: #FF4C3C;
}

.icon-unusual {
        width: 5rem;
}

.commitment-title {
        background-color: rgba(255, 76, 60, .2);
        color: #FF4C3C;
}

.park-status {
        margin: 2rem 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
}
</style>
