/**
 * 图上量算
 * @copyright 火星科技 mars3d.cn
 * @author 火星渣渣灰 2022-01-10
 */
import * as mars3d from "mars3d"
import { $showLoading, $hideLoading } from "@mars/components/mars-ui/index"
const Cesium = mars3d.Cesium

let map: mars3d.Map // 地图对象
let measure: mars3d.thing.Measure

export const eventTarget = new mars3d.BaseClass()

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance: mars3d.Map): void {
  map = mapInstance // 记录map

  measure = new mars3d.thing.Measure({
    name: "measure",
    pid: 99, // 图层管理 中使用，父节点id
    // 可设置文本样式
    label: {
      color: "#ffffff",
      font_family: "楷体",
      font_size: 20,
      background: false
    }
  })
  map.addThing(measure)

  measure.on(mars3d.EventType.start, () => {
    // 开始分析前回调(异步)
    $showLoading()
  })
  measure.on(mars3d.EventType.end, (e: any) => {
    // 分析完成后回调(异步)
    $hideLoading()
    const label = e.label

    eventTarget.fire("editorMeasureData", { label })

    // 剖面图的echart图表
    if (e.graphic?.type === mars3d.GraphicType.sectionMeasure) {
      if (e == null || e.arrPoint == null) {
        return
      }
      const arrPoint = e.arrPoint
      const arrLen = e.arrLen
      const arrHB = e.arrHB

      eventTarget.fire("echartDataLoad", { arrPoint, arrLen, arrHB })
    }
  })
  measure.on(mars3d.EventType.change, (e: any) => {
    const label = e.label
    eventTarget.fire("editorMeasureData", { label })
  })
  measure.on(mars3d.EventType.click, (e: any) => {
    const result = e.graphic?.measured

    eventTarget.fire("editorMeasureData", { label: result?.distanceStr || result?.areaStr })

    // 剖面图的echart图表
    if (e.graphic?.type === mars3d.GraphicType.sectionMeasure && result) {
      if (result == null || result.arrPoint == null) {
        return
      }
      const arrPoint = result.arrPoint
      const arrLen = result.arrLen
      const arrHB = result.arrHB
      eventTarget.fire("echartDataLoad", { arrPoint, arrLen, arrHB })
    }
  })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  clearMeasure()
  map.removeThing(measure)

  eventTarget.off()
  measure = null
  map = null
}

// 空间距离
export function onClickMeasureDistance(unit: string) {
  measure.distance({
    unit: unit,
    addHeight: 0 // 可以设置在绘制点基础自动增加高度（单位：米）
  })
}

// 贴地距离
export function onClickMeasureDistanceSurface(unit: string) {
  measure.distanceSurface({
    unit: unit
  })
}

// 剖面
export function onClickMeasureSection(unit: string) {
  measure.section({
    unit: unit,
    splitNum: 300 // 插值次数
  })
}

// 水平面积
export function onClickMeasureArea(unit: string) {
  measure.area({
    unit: unit,
    style: {
      color: "#00fff2",
      outline: true,
      outlineColor: "#fafa5a",
      outlineWidth: 1,
      opacity: 0.4,
      clampToGround: false // 贴地
    }
  })
}

// 贴地面积
export function onClickMeasureAreaSurface(unit: string) {
  measure.areaSurface({
    unit: unit,
    splitNum: 10 // step插值分割的个数
  })
}

// 角度
export function onClickMeasureAngle() {
  measure.angle()
}

// 高度差
export function onClickMeasureHeight(unit: string) {
  measure.height({
    unit: unit
  })
}

// 三角测量
export function onClickMeasureHeightTriangle(unit: string) {
  measure.heightTriangle({
    unit: unit
  })
}
// 坐标测量
export function onClickMeasurePoint() {
  measure.point()
}

// 是否仅拾取模型上的点
export function onChangeOnlyModel(value: boolean) {
  // 控制鼠标只取模型上的点，忽略地形上的点的拾取
  map.onlyPickModelPosition = value
}

// 清空测量数据
export function clearMeasure() {
  measure.clear()
  if (tipGraphic) {
    hideTipMarker()
  }
}

let tipGraphic: mars3d.graphic.BillboardEntity

export function showTipMarker(point: any, z: number, inthtml: any) {
  const _position_draw = Cesium.Cartesian3.fromDegrees(point.lng, point.lat, z)

  if (!tipGraphic) {
    tipGraphic = new mars3d.graphic.BillboardEntity({
      name: "当前点",
      position: _position_draw,
      style: {
        image: "img/marker/mark-green.png",
        scale: 1,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.2)
      }
    }).addTo(map.graphicLayer)
  }
  tipGraphic.setCallbackPosition(_position_draw)

  tipGraphic
    .bindPopup(inthtml, {
      offsetX: 0, // 左右的偏移像素值
      offsetY: -20 // 上下的偏移像素值
    })
    .openPopup()
}

export function hideTipMarker() {
  if (tipGraphic) {
    tipGraphic.remove(true)
    tipGraphic = null
  }
}
