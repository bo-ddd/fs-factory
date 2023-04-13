/**
 * 漫游路线
 * @copyright 火星科技 mars3d.cn
 * @author 火星胡椒 2022-01-10
 */
import * as mars3d from "mars3d"

let map: mars3d.Map // 地图对象
let graphicLayer: mars3d.layer.GraphicLayer
let roamLine: mars3d.graphic.FixedRoute

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars3d.BaseClass()

// 初始化当前业务
export function onMounted(mapInstance: mars3d.Map): void {
  map = mapInstance // 记录map

  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)
}

// 释放当前业务
export function onUnmounted(): void {
  map.trackedEntity = undefined
  roamLine.destroy()
  graphicLayer.remove()
  eventTarget.off()
  map = null
}

let cameraType: string
/**
 * 根据传来的数据，重新绘制一条漫游路线
 *
 * @export
 * @param {any} data 对象
 * @returns
 */
export function getRoamLineData(data: any) {
  cameraType = data.camera.type
  if (roamLine) {
    roamLine.destroy()
  }
  roamLine = new mars3d.graphic.FixedRoute(data)
  graphicLayer.addGraphic(roamLine)

  roamLine.on(mars3d.EventType.change, (event: any) => {
    let val = Math.ceil((event.second * 100) / event.second_all)
    val = Math.min(100, Math.max(1, val))

    const roamLineData = {
      ...event,
      percent: val,
      alt_str: mars3d.MeasureUtil.formatDistance(event.point?.alt),
      distance_str: mars3d.MeasureUtil.formatDistance(event.distance),
      second_str: formatTime(event.second)
    }

    eventTarget.fire("update", roamLineData)
  })

  if (data.clampToGround) {
    roamLine.autoSurfaceHeight().then(() => {
      startFly() // 异步计算完成贴地后再启动
    })
  } else {
    startFly()
  }
}

// 开始漫游，构造数据
function startFly() {
  roamLine.start()

  console.log("漫游路线详情", roamLine.info)

  // 显示基本信息，名称、总长、总时间
  const AllInfo = {
    followedX: roamLine.options.camera.followedX,
    followedZ: roamLine.options.camera.followedZ,
    offsetZ: roamLine.options.camera.offsetZ,
    cameraType: cameraType,
    name: roamLine.name,
    alllen: mars3d.MeasureUtil.formatDistance(roamLine.info.distance_all),
    alltime: formatTime(roamLine.info.second_all)
  }

  eventTarget.fire("baseInfoLoaded", AllInfo)

  if (map.viewer.timeline) {
    map.viewer.timeline.zoomTo(roamLine.startTime, roamLine.stopTime)
  }
}

// 格式化时间
function formatTime(strtime: number) {
  strtime = Number(strtime) || 0

  if (strtime < 60) {
    return strtime.toFixed(0) + "秒"
  } else if (strtime >= 60 && strtime < 3600) {
    const miao = Math.floor(strtime % 60)
    return Math.floor(strtime / 60) + "分钟" + (miao !== 0 ? miao + "秒" : "")
  } else {
    strtime = Math.floor(strtime / 60) // 秒转分钟
    return Math.floor(strtime / 60) + "小时" + Math.floor(strtime % 60) + "分钟"
  }
}

/**
 * 视角参数发生改变
 *
 * @export
 * @param {*} params 对象  setCameraOptions(cameraOptions)
 * @returns {void}
 */
export function setCameraOptions(params: any) {
  roamLine.setCameraOptions(params)
}

// 停止漫游
export function stopRoamLine() {
  roamLine.stop()
}

// 显示剖面图
export function getTerrainHeight(): Promise<any> {
  return roamLine.getTerrainHeight({ splitNum: 100 })
}
