/**
 * 地区导航
 * @copyright 火星科技 mars3d.cn
 * @author 火星渣渣灰 2022-01-10
 */
import * as mars3d from "mars3d"
const Cesium = mars3d.Cesium

let map: mars3d.Map // 地图对象
let geoJsonLayer: mars3d.layer.GeoJsonLayer

// 初始化当前业务
export function onMounted(mapInstance: mars3d.Map): void {
  map = mapInstance // 记录map
}

// 释放当前业务
export function onUnmounted(): void {
  if (geoJsonLayer) {
    geoJsonLayer.clear()
    map.removeLayer(geoJsonLayer)
    geoJsonLayer = null
  }
  map = null
}

export function goHome() {
  if (geoJsonLayer) {
    geoJsonLayer.clear()
  }
  map.flyHome()
}

export function centerAtRegion(feature: any) {
  if (geoJsonLayer) {
    geoJsonLayer.clear()
    geoJsonLayer.remove()
  }

  geoJsonLayer = new mars3d.layer.GeoJsonLayer({
    pid: 99,
    name: "地区导航",
    data: feature,
    symbol: {
      type: mars3d.GraphicType.polygon,
      styleOptions: {
        fill: true,
        color: "rgb(2,26,79)",
        opacity: 0.4,
        outline: true,
        outlineColor: "#39E09B",
        outlineWidth: 4,
        outlineOpacity: 0.8,
        arcType: Cesium.ArcType.GEODESIC,
        clampToGround: true
      }
    },
    popup: "{name}"
  })
  map.addLayer(geoJsonLayer)
  geoJsonLayer.flyTo()
}
