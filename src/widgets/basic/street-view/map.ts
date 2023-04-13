/**
 * 百度街景
 *
 * @copyright 火星科技 mars3d.cn
 * @author 火星渣渣灰 2022-01-10
 */
import * as mars3d from "mars3d"
import streetimg from "./image/streetimg.png"
import "./baidu.less"

const Cesium = mars3d.Cesium

let map: mars3d.Map // 地图对象
let lastBasemap: string | number | mars3d.layer.BaseTileLayer

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance: mars3d.Map) {
  window.addEventListener("message", postMessage)
  map = mapInstance // 记录首次创建的map

  lastBasemap = map.basemap

  map.basemap = "腾讯电子"
  initStreeView()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 释放街景
  if (streeViewDiv) {
    mars3d.DomUtil.remove(streeViewDiv)
    streeViewDiv = null
  }
  if (streeViewIframe) {
    mars3d.DomUtil.remove(streeViewIframe)
    streeViewIframe = null
  }

  // 地图解绑事件
  map.off(mars3d.EventType.click, onMapClick)

  // 清空加载的矢量数据
  if (graphic) {
    map.graphicLayer.removeGraphic(graphic, true)
    graphic = null
  }

  // 将地图恢复原来的样式
  const centerDiv = mars3d.DomUtil.get("centerDiv")
  if (centerDiv) {
    centerDiv.style.position = ""
    centerDiv.style.height = "100%"
    centerDiv.style.width = "100%"
  }

  map.basemap = lastBasemap
  map = null
  window.removeEventListener("message", postMessage)
}

/**
 * 创建街景的div，与地图进行联动
 */
let streeViewDiv: HTMLElement | null
let streeViewIframe: any

function initStreeView() {
  const point = { lat: 31.833789, lng: 117.183995 }

  const pointBd = getBaiduPoint(point)
  const marsDiv = document.getElementById("mars-main-view")
  streeViewDiv = mars3d.DomUtil.create("div", "streeViewDiv", marsDiv) // 创建标签
  streeViewIframe = mars3d.DomUtil.create("iframe", "streeViewIframe", streeViewDiv) // 在创建的标签中添加子标签
  streeViewIframe.setAttribute("name", "streetscape") // 在标签中添加元素
  streeViewIframe.setAttribute("scrolling", "no") // 在标签中添加元素
  streeViewIframe.setAttribute("frameborder", "0") // 在标签中添加元素
  streeViewIframe.setAttribute("src", `${process.env.BASE_URL}assets/streetscape.html?lng=${pointBd.lng}&lat=${pointBd.lat}`) // 在标签中添加元素

  const centerDiv = mars3d.DomUtil.get("centerDiv")
  if (centerDiv) {
    centerDiv.style.position = ""
    centerDiv.style.height = "100%"
    centerDiv.style.width = "50%"
  }

  // 单击地图事件
  map.on(mars3d.EventType.click, onMapClick)
}

function onMapClick(event: any) {
  const cartesian = event.cartesian
  if (cartesian) {
    const point = mars3d.LngLatPoint.fromCartesian(cartesian)

    if (streeViewIframe && streeViewIframe.contentWindow.setPosition) {
      streeViewIframe.contentWindow.setPosition(point) // 根据经纬度坐标展示全景图
    }
  }
}

let graphic: mars3d.graphic.BillboardEntity
function postMessage(e: any) {
  const position = e.data
  if (graphic) {
    graphic.position = position
  } else {
    graphic = new mars3d.graphic.BillboardEntity({
      position: position,
      style: {
        image: streetimg,
        scale: 1,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        clampToGround: true
      }
    })
    map.graphicLayer.addGraphic(graphic)
  }
  map.flyToGraphic(graphic, { radius: 800 })
}

function getBaiduPoint(point: any) {
  const pointbd = mars3d.PointTrans.wgs2bd([point.lng, point.lat])
  return { lng: pointbd[0], lat: pointbd[1] }
}
