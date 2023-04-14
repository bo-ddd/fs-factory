import * as mars3d from "mars3d"
import { Cesium } from "mars3d"
console.log(Cesium);
console.log(Cesium);
console.log(Cesium);
console.log(Cesium);
console.log(Cesium);

export let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.686288, lng: 117.229619, alt: 11333.9, heading: 359.2, pitch: -39.5 }
  }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  map.fixedLight = true // 固定光照，避免gltf模型随时间存在亮度不一致。

  // 创建矢量数据图层
  const graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // addDemoGraphic1(graphicLayer)
  // addDemoGraphic2(graphicLayer)
  addDemoGraphic3(graphicLayer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

const position = Cesium.Cartesian3.fromDegrees(116.39, 39.9, 0);
function addDemoGraphic3(graphicLayer) {
  const graphicCar = new mars3d.graphic.ModelEntity({
    name: "汽车",
    position: [117.159619, 31.796288, 10],
    style: {
      url: "//data.mars3d.cn/gltf/mars/qiche.gltf",
      scale: 0.1,
      heading: 0,
      minimumPixelSize: 1,
      label: {
        text: "皖A12345",
        font_size: 18,
        color: "#ffffff",
        // pixelOffsetY: -50,
        // distanceDisplayCondition: true,
        // distanceDisplayCondition_far: 10000,
        // distanceDisplayCondition_near: 0
      },
      // orientation: Cesium.Transforms.headingPitchRollQuaternion(
      //   position,
      //   new Cesium.HeadingPitchRoll(
      //     Cesium.Math.toRadians(100), // 设置这个属性即可（顺时针旋转的角度值）
      //     Cesium.Math.toRadians(0),
      //     Cesium.Math.toRadians(0)
      //   )
      // ),
    }
  })
  graphicLayer.addGraphic(graphicCar)

  // 移动模型
  graphicCar.moveTo({
    position: [117.159619, 31.996288, 10],
    time: 4000 // 移动的时长(单位 秒)
  })
}
