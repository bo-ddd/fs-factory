import * as mars3d from "mars3d"
let map: mars3d.Map // 地图对象

// 全局变量
let mapSplit: mars3d.control.MapSplit
let basemap: string | number | mars3d.layer.BaseTileLayer

// 初始化当前业务
export function onMounted(mapInstance: mars3d.Map): void {
  map = mapInstance // 记录map
  basemap = map.basemap
}

// 释放当前业务
export function onUnmounted(): void {
  map.removeControl(mapSplit, true)
  map.basemap = basemap
  map = null
}

export function getTileLayers() {
  const allLayers = map.getTileLayers()
  mapSplit = new mars3d.control.MapSplit({
    rightLayer: allLayers[0],
    leftLayer: allLayers[1]
  })
  map.addControl(mapSplit)
  return allLayers
}

export function creatTitle(options: any) {
  return mars3d.LayerUtil.create(options, map.options.templateValues)
}

// 左边地图切换
export function leftLayeChange(leftLayer: mars3d.layer.BaseTileLayer) {
  mapSplit.leftLayer = leftLayer
}

// 左边地图切换
export function rightLayerChange(rightLayer: mars3d.layer.BaseTileLayer) {
  mapSplit.rightLayer = rightLayer
}
