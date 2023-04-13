/**
 * 地图打印
 * @copyright 火星科技 mars3d.cn
 * @author 火星渣渣灰 2022-01-10
 */
import * as mars3d from "mars3d"
import "./print-map.less"
import { printImage } from "@mars/utils/mars-util"

let map: mars3d.Map // 地图对象

let mapParentDiv: HTMLElement

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance: mars3d.Map) {
  map = mapInstance // 记录首次创建的map

  // 隐藏div
  hideElement(".mars3d-control")
  hideElement(".cesium-viewer-toolbar")
  hideElement(".cesium-viewer-fullscreenContainer")

  mapParentDiv = document.getElementById("centerDiv")
  if (mapParentDiv) {
    mapParentDiv.style.position = "absolut"
  }
  changeSize()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  // 还原显示div
  showElement(".mars3d-control")
  showElement(".cesium-viewer-toolbar")
  showElement(".cesium-viewer-fullscreenContainer")

  const body = document.querySelector("body")
  if (body) {
    body.style.overflow = "hidden"
    body.style.background = "#000"
  }

  if (mapParentDiv) {
    mapParentDiv.style.position = ""
    mapParentDiv.style.width = "100%"
    mapParentDiv.style.height = "100%"
    mapParentDiv.style.transform = "scale(1.0)"
  }

  map = null
}

// 显示隐藏部分控件
function hideElement(name: string) {
  const element: HTMLElement | null = document.querySelector(name)

  if (element) {
    mars3d.DomUtil.removeClass(element, "showElement")
    mars3d.DomUtil.addClass(element, "hideElement")
  }
}
function showElement(name: string) {
  const element: HTMLElement | null = document.querySelector(name)

  if (element) {
    mars3d.DomUtil.removeClass(element, "hideElement")
    mars3d.DomUtil.addClass(element, "showElement")
  }
}

let ratio: number
function mm2px(mm: number) {
  if (!ratio) {
    // mm转为px
    const div = document.createElement("div")
    div.style.width = "1cm"
    div.id = "puc"
    document.body.appendChild(div)

    const w: string = getComputedStyle(div, null).width
    ratio = Number(w.substring(0, w.length - 2)) / 10
    div.parentNode.removeChild(div)
  }
  return Math.round(mm * ratio)
}

export function changeSize(type?: string) {
  let width
  let height
  let isZongxiang

  // type单位为：mm毫米
  switch (type) {
    case "A4H":
      width = 297
      height = 210
      break
    case "A4Z":
      width = 210
      height = 297
      isZongxiang = true
      break
    case "A3H":
      width = 420
      height = 297
      break
    case "A3Z":
      width = 297
      height = 420
      isZongxiang = true
      break
    default:
      width = 297
      height = 210
      break
  }

  // 減去边框
  if (isZongxiang) {
    width -= 10
    height -= 10
  } else {
    width -= 10
    height -= 15
  }

  const clientWidth = document.body.clientWidth
  const clientHeight = document.body.clientHeight
  const divWidth = mm2px(width)
  const divHeight = mm2px(height)

  let scale = Math.min(clientWidth / divWidth, clientHeight / divHeight)
  let x = 0
  let y = 0
  if (scale > 1) {
    scale = 1
  } else {
    x = -(divWidth - clientWidth) / 2
    y = -(divHeight - clientHeight) / 2
  }

  if (mapParentDiv) {
    mapParentDiv.style.position = ""
    mapParentDiv.style.width = width + "mm"
    mapParentDiv.style.height = height + "mm"
    mapParentDiv.style.transform = "matrix(" + scale + ",0,0," + scale + "," + x + "," + y + ")"
  }
}

export function expImage() {
  map.expImage()
}

export function printview() {
  map.expImage({ download: false }).then((result) => {
    printImage(result.image)
  })
}

