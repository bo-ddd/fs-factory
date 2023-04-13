/**
 * 路线导航
 * @copyright 火星科技 mars3d.cn
 * @author 火星胡椒 2022-01-10
 */
import * as mars3d from "mars3d"
import { $alert } from "@mars/components/mars-ui/index"
const Cesium = mars3d.Cesium

let map: mars3d.Map // 地图对象

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars3d.BaseClass()

let pointLayer: mars3d.layer.GraphicLayer
let routeLayer: mars3d.layer.GraphicLayer

let gaodeRoute: mars3d.query.GaodeRoute

let passbyPointArr: any
let passPointArr: any
let passArea: any
let passAreaArr: any

// 初始化当前业务
export function onMounted(mapInstance: mars3d.Map): void {
  map = mapInstance // 记录map

  // 创建矢量数据图层
  pointLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(pointLayer)

  routeLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(routeLayer)

  gaodeRoute = new mars3d.query.GaodeRoute()

  // 途经点 和避让区域
  passbyPointArr = [] // 添加途经点
  passPointArr = [] // 添加途径矢量数据
  passArea = [] // 添加避让区域
  passAreaArr = [] // 添加避让矢量数量

  map.bindContextMenu([
    {
      text: "添加途径点",
      icon: "fa fa-smile-o",
      callback: (e) => {
        const point = mars3d.LngLatPoint.fromCartesian(e.cartesian)
        drawPassbyPoint(point.lng, point.lat)
      }
    },
    {
      text: "添加避让区域",
      icon: "fa fa-frown-o",
      callback: () => {
        drawPassArea()
      }
    },
    {
      text: "清除路线规划",
      icon: "fa fa-trash-o",
      callback: () => {
        clearCoumpute()
      }
    }
  ])
}

// 释放当前业务
export function onUnmounted(): void {
  map.bindContextMenu(map.getDefaultContextMenu())
  pointLayer.remove()
  routeLayer.remove() // 清除路线
  map.removeLayer(pointLayer)
  map.removeLayer(routeLayer)
  eventTarget.off()

  if (startGraphic) {
    startGraphic.remove(true)
    startGraphic = null
  }

  if (endGraphic) {
    endGraphic.remove(true)
    endGraphic = null
  }

  passbyPointArr = null
  passPointArr = null
  passArea = null
  passAreaArr = null
  map = null
}

// 绘制起点
let startGraphic: mars3d.graphic.BillboardEntity
export function drawStartPoint() {
  if (startGraphic) {
    startGraphic.remove(true)
  }
  return pointLayer
    .startDraw({
      type: "billboard",
      style: {
        image: "img/marker/route-start.png",
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
      }
    })
    .then((graphic: mars3d.graphic.BillboardEntity) => {
      startGraphic = graphic
      startCompute()
      return graphic.point
    })
}

// 绘制终点
let endGraphic: mars3d.graphic.BillboardEntity
export function drawEndPoint() {
  if (endGraphic) {
    endGraphic.remove(true)
  }
  return pointLayer
    .startDraw({
      type: "billboard",
      style: {
        image: "img/marker/route-end.png",
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
      }
    })
    .then((graphic: mars3d.graphic.BillboardEntity) => {
      endGraphic = graphic
      startCompute()
      return graphic.point
    })
}

// 途经点
export function drawPassbyPoint(jd?: number, wd?: number) {
  // 绑定右键菜单
  if (jd || wd) {
    const passbyPoint = new mars3d.graphic.BillboardEntity({
      position: [jd, wd],
      style: {
        image: "img/marker/mark-green.png",
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        clampToGround: true
      }
    })
    pointLayer.addGraphic(passbyPoint)
    passbyPointArr.push(passbyPoint.coordinate)
    passPointArr.push(passbyPoint)
    getpassbyPoint() // 计算途径点的个数，同步面板

    passbyPoint.bindContextMenu([
      {
        text: "删除此途经点",
        icon: "fa fa-trash-o",
        callback: () => {
          passbyPoint.remove()
          removePoint(passbyPoint)
          getpassbyPoint() // 计算途径点的个数，同步面板
          startCompute()
        }
      }
    ])
    startCompute()
    return
  }

  pointLayer
    .startDraw({
      type: "billboard",
      style: {
        image: "img/marker/mark-green.png",
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
      }
    })
    .then((graphic: mars3d.graphic.BillboardEntity) => {
      graphic.bindContextMenu([
        {
          text: "删除此途经点",
          icon: "fa fa-trash-o",
          callback: () => {
            graphic.remove()
            removePoint(graphic)
            getpassbyPoint() // 计算途径点的个数，同步面板
            startCompute()
          }
        }
      ])

      passbyPointArr.push(graphic.coordinate)
      passPointArr.push(graphic)
      getpassbyPoint() // 计算途径点的个数，同步面板
      startCompute()
    })
}

// 避让区
export function drawPassArea() {
  pointLayer
    .startDraw({
      type: "polygon",
      style: {
        color: "#ff0000",
        opacity: 0.3,
        outline: true,
        outlineWidth: 2,
        outlineColor: "#ffffff"
      }
    })
    .then((graphic: mars3d.graphic.PolygonEntity) => {
      graphic.bindContextMenu([
        {
          text: "删除此区域",
          icon: "fa fa-trash-o",
          callback: () => {
            removeArea(graphic.coordinates)
            getPassNumber()
            graphic.remove(true)
            startCompute()
          }
        }
      ])

      passArea.push(graphic.coordinates)
      passAreaArr.push(graphic)
      getPassNumber()
      startCompute()
    })
}

// 删除起点
export function clearStartPoint() {
  if (startGraphic) {
    startGraphic.remove(true)
  }
}

// 删除终点
export function clearEndPoint() {
  if (endGraphic) {
    endGraphic.remove(true)
  }
}

// 删除避让区
function removeArea(graphic: any[]) {
  passArea.forEach((itemArr: any[], index: number) => {
    let item = itemArr[0]
    let point = graphic[0]
    // 进行双重判断，以防起点重合
    if (item[0] === point[0] && item[1] === point[1] && item[2] === point[2]) {
      passArea.splice(index, 1)
    } else {
      item = itemArr[1]
      point = graphic[1]
      if (item[0] === point[0] && item[1] === point[1] && item[2] === point[2]) {
        passArea.splice(index, 1)
        passAreaArr.splice(index, 1)

        eventTarget.fire("passAreaArr", { passArea })
      }
    }
  })
}

// 删除途经点
function removePoint(point: mars3d.graphic.BillboardEntity) {
  passbyPointArr.forEach((item: any[], index: number) => {
    if (item[0] === point.coordinate[0] && item[1] === point.coordinate[1] && item[2] === point.coordinate[2]) {
      passbyPointArr.splice(index, 1)
      passPointArr.splice(index, 1)
    }
  })
}

// 计算避让区数量
function getPassNumber() {
  const num = passArea.length
  eventTarget.fire("passAreaArr", { num })
}
// 计算途经点数量
function getpassbyPoint() {
  const passPointNumber = passbyPointArr.length
  eventTarget.fire("passPoint", { passPointNumber })
}

// ======================计算路线======================

// 设置路线随机色
const randomColor = ["#eaf731", "#57f72e", "#2effd2", "#cc6e26", "#ff2ec7"]

// 开始计算
function startCompute() {
  if (!startGraphic || !endGraphic) {
    return
  }

  setTimeout(() => {
    const area = mars3d.MeasureUtil.getArea(passArea[0]) / 1000000
    if (area > 40) {
      $alert("高德接口对避让区面积有限制，您当前设置面积过大，请重新缩小范围绘制。")
    }
  }, 10)

  const points = [startGraphic.coordinate]
  clearCoumpute()
  // 添加途径点
  if (passbyPointArr.length > 0) {
    passbyPointArr.forEach((item: any[]) => {
      points.push(item)
    })
  }

  points.push(endGraphic.coordinate)

  // 当两点存在时 自动计算
  gaodeRoute
    .queryDriving({
      points: points,
      avoidpolygons: passArea,
      extensions: "all",
      strategy: "11"
    })
    .then((data: any) => {
      if (!data || data.paths.length < 1) {
        eventTarget.fire("pathMsg")
        return
      }

      const roadpath: any = []
      // 添加速度控制面板
      for (let i = 0; i < data.paths.length; i++) {
        const path = data.paths[i]
        const points = path.points

        if (!path.steps || path.steps.length < 1 || !points || points.length < 1) {
          continue
        }

        // 漫游路线
        const graphic = new mars3d.graphic.FixedRoute({
          positions: points,
          speed: 200,
          showStop: true,
          polyline: {
            materialType: mars3d.MaterialType.Color,
            color: randomColor[i % 5],
            opacity: 0.8,
            width: 4,
            showAll: true,
            clampToGround: true
          },
          model: {
            uri: "//data.mars3d.cn/gltf/mars/qiche.gltf",
            scale: 0.3,
            minimumPixelSize: 30,
            clampToGround: true,
            show: false
          },
          attr: path
        })
        routeLayer.addGraphic(graphic)

        roadpath.push({
          pathMsg: path,
          id: graphic.id
        })
      }

      eventTarget.fire("pathMsg", { roadpath })
    })
}

// 清除计算的结果
function clearCoumpute() {
  routeLayer.clear() // 清除路线
  removeTrack() // 取消当前的视角跟随
}

//= ============ 计算漫游路线 ======================

function getFlylineById(id: string) {
  return routeLayer.getGraphicById(id)
}

// 开始漫游
let nowFline: mars3d.graphic.FixedRoute
function roamOneById(id: string) {
  reset()
  nowFline = getFlylineById(id)
  nowFline.model.show = true
  nowFline.start()
}

// 漫游自动结束 或点击 停止导航按钮 后，重置界面和操作
export function reset() {
  removeTrack()
  if (nowFline) {
    nowFline.model.show = false
    nowFline.stop()
    nowFline = null
  }
  map.clock.multiplier = 1 // 重置速度面板
  map.closeHighlight()
}

// 开始导航
export function startNavigation(id: string) {
  reset()

  if (id) {
    roamOneById(id)
    openHighlightForLine(id)
  }
}

//= ===========开始视角跟随=============
export function startGS(id: string) {
  // 判断当前点击的视角跟随的id 是否是已在导航时的id
  if (nowFline) {
    // 表示已开始漫游即已点击开始导航
    if (nowFline.id === id) {
      nowFline.setCameraOptions({
        type: "gs",
        heading: 90,
        radius: 1000
      })
    } else {
      $alert("当前路径沒有车辆运行！")
    }
  }
}

// 取消当前的视角跟随
export function removeTrack() {
  if (nowFline) {
    nowFline.setCameraOptions()
  }
  map.trackedEntity = undefined
}

//= ====================其他操作==========================
/**
 * 是否高亮漫游路线
 *
 * @export
 * @param {string} [id]
 * @returns {void} 无
 */
export function openHighlightForLine(id?: string) {
  const graphic = routeLayer.getGraphicById(id)
  if (!graphic) {
    return
  }

  graphic.polyline.openHighlight({
    width: 10,
    materialType: mars3d.MaterialType.LineFlow,
    materialOptions: {
      color: Cesium.Color.AQUA,
      image: "./img/textures/arrow-h.png",
      repeat: new Cesium.Cartesian2(50, 1),
      speed: 40
    }
  })

  graphic.flyTo()
}

/**
 *
 * 速度发生改变
 * @export
 * @param {number} num
 */
export function resetSpeed(num: number) {
  if (num === undefined) {
    return
  }
  map.clock.multiplier = num / 120
}
