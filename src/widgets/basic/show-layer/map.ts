/**
 * 三维模型模块
 * @copyright 火星科技 mars3d.cn
 * @author 火星胡椒 2022-01-13
 */
import * as mars3d from "mars3d"

let map: mars3d.Map // 地图对象
let arrLayer: any = []

// 初始化当前业务
export function onMounted(mapInstance: mars3d.Map): void {
  map = mapInstance // 记录map

}

// 释放当前业务
export function onUnmounted(): void {
  arrLayer.forEach((layer: any) => {
    if (layer._hasRemoveLayer && layer.isAdded) {
      map.removeLayer(layer)
      layer._hasRemoveLayer = false
    }
  })
  arrLayer = []
  map = null
}



export function flyToModel(layerId: string, center: any) {
  if (Array.isArray(layerId)) {
    layerId.forEach((element: any) => {
      const layer = map.getLayerById(element)
      if (layer) {
        arrLayer.push(layer)
      }
    })
  } else {
    const layer = map.getLayerById(layerId)
    if (layer) {
      arrLayer.push(layer)
    }
  }

  arrLayer.forEach((layer: any) => {
    if (!layer.isAdded) {
      map.addLayer(layer)
      layer._hasRemoveLayer = true
    }
    layer.show = true

    if (center) {
      map.setCameraView(center)
    } else {
      layer.flyTo()
    }
  })
}
