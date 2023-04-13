/**
 * 视角书签
 *
 * @copyright 火星科技 mars3d.cn
 * @author 火星渣渣灰 2022-01-10
 */
import * as mars3d from "mars3d"

let map: mars3d.Map // mars3d.Map三维地图对象

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance: mars3d.Map): void {
  map = mapInstance // 记录map
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 添加书签
export async function butAddTxtName() {
  return await map
    .expImage({
      download: false,
      width: 300
    })
    .then((item: any) => {
      return {
        image: item.image,
        center: map.getCameraView()
      }
    })
}

// 飞向视角
export function flytoView(center: any) {
  map.setCameraView(center)
}
