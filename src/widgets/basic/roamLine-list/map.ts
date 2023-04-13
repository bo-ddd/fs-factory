/**
 * 飞行漫游
 * @copyright 火星科技 mars3d.cn
 * @author 火星胡椒 2022-02-19
 */

import * as mars3d from "mars3d"
import { $message } from "@mars/components/mars-ui/index"

let map: mars3d.Map // 地图对象
let graphicLayer: mars3d.layer.GraphicLayer

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars3d.BaseClass()

// 初始化当前业务
export function onMounted(mapInstance: mars3d.Map): void {
  map = mapInstance // 记录map

  graphicLayer = new mars3d.layer.GraphicLayer({
    hasEdit: true,
    isAutoEditing: true // 绘制完成后是否自动激活编辑
  })
  map.addLayer(graphicLayer)

  graphicLayer.on(
    [mars3d.EventType.editStart, mars3d.EventType.editMovePoint, mars3d.EventType.editStyle, mars3d.EventType.editRemovePoint],
    function (e: any) {
      const graphic = e.graphic
      startEditing(graphic)
      eventTarget.fire("editStart", e)
    }
  )
}

// 释放当前业务
export function onUnmounted(): void {
  eventTarget.off()
  graphicLayer.clear(true)
  graphicLayer.remove(true)
  graphicLayer = null
  map = null
}

/**
 * 通过id删除漫游对象
 *
 * @export
 * @param {number} id 对应矢量数据的id
 * @returns {void} 无
 */
export function deleteRoam(id: string) {
  const graphic = graphicLayer.getGraphicById(id)

  if (graphic) {
    graphicLayer.removeGraphic(graphic)
  }
}

// 新增漫游路线
export function addLine() {
  graphicLayer.startDraw({
    name: "飞行漫游路线",
    type: "polyline",
    style: {
      color: "#ffff00",
      width: 3,
      clampToGround: false
    },
    success: (graphic: mars3d.graphic.PolylineEntity) => {
      const time = mars3d.Util.formatDate(new Date(), "MMddHHmmss") // 时间
      if (graphic.attr.name == null || graphic.attr.name === "") {
        graphic.attr.name = "路线" + time
        graphic.attr.id = graphic.id

        eventTarget.fire("hasAddLine", { graphic })
      }
    }
  })
}

// =======================文件保存与导入=============================

/**
 * 保存文件
 *
 * @export
 * @param {any[]} arrFlyTable 任意类型的数组
 * @returns {void} 无
 */
export function saveFile(arrFlyTable: any[]) {
  const data = arrFlyTable
  if (data == null || data.length === 0) {
    $message("当前没有漫游路线数据！")
  } else {
    mars3d.Util.downloadFile("飞行漫游路线.json", JSON.stringify(data))
  }
}

/**
 * 下载JSON  属性编辑面板中的下载JSON
 *
 * @export
 * @param {*} data 对象
 * @returns {void} 无
 */
export function downloadJson(data: any) {
  mars3d.Util.downloadFile(data.name + ".json", JSON.stringify(data))
}


// ==============================属性编辑处理==========================

/**
 * 通过id获取到相应的矢量数据
 *
 * @export
 * @param {*} graphicObj 对象
 * @returns {void}
 */
export function startEditingById(graphicObj: any) {
  if (!graphicObj) {
    return
  }
  graphicLayer.clear()
  const graphic = new mars3d.graphic.PolylineEntity({
    id: graphicObj.id,
    positions: graphicObj.positions,
    style: graphicObj.style,
    attr: graphicObj.attr,
    show: false
  })
  graphicLayer.addGraphic(graphic)
  if (graphic == null) {
    return
  }

  graphic.flyTo()
  graphicLayer.startEditing(graphic)
}

// 开始编辑
function startEditing(graphic: mars3d.graphic.PolylineEntity) {
  graphic.show = true
  graphic.options.id = graphic.id
}
