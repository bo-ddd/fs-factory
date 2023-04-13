/**
 * 我的标记
 *
 * @copyright 火星科技 mars3d.cn
 * @author 火星渣渣灰 2022-01-10
 */
import * as mars3d from "mars3d"
const Cesium = mars3d.Cesium

// 地图对象
let map: mars3d.Map
let graphicLayer: mars3d.layer.GraphicLayer
let editable = true // popup是否可以编辑

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars3d.BaseClass()

// 初始化当前业务
export function onMounted(mapInstance: mars3d.Map): void {
  map = mapInstance // 记录map

  graphicLayer = new mars3d.layer.GraphicLayer({
    name: "我的注记",
    pid: 99, // 图层管理 中使用，父节点id
    hasEdit: false
  })
  map.addLayer(graphicLayer)
  graphicLayer.hasEdit = editable

  bindLayerContextMenu() // 在图层绑定右键菜单,对所有加到这个图层的矢量数据都生效

  graphicLayer.bindPopup((event: any) => {
    const graphic = event.graphic
    if (!graphic) {
      return
    }

    const html = mars3d.Util.getTemplateHtml({
      title: "我的标记",
      template: [
        { field: "name", name: "名称" },
        { field: "remark", name: "备注", type: "textarea" },
        editable ? { field: "id", name: "确定", type: "button", className: "mars3d-popup-btn-custom" } : null
      ],
      attr: {
        id: graphic.id,
        ...graphic.attr
      },
      edit: editable,
      width: 190
    })
    return html
  })

  graphicLayer.on(mars3d.EventType.popupOpen, (event: any) => {
    const container = event.container
    // 打开popup之后的确定按钮
    const btnOk = container.querySelector(".mars3d-popup-btn")

    if (btnOk) {
      const graphic = event.graphic
      btnOk.addEventListener("click", () => {
        const popupEdiitem: NodeListOf<HTMLInputElement> = document.querySelectorAll(".mars3d-popup-edititem")

        popupEdiitem.forEach((item) => {
          let key = item.getAttribute("data-type")
          if (!key) {
            key = ""
          }
          graphic.attr[key] = item.value
        })

        graphic.label.text = graphic.attr.name
        // saveEntity(graphic, () => {
        graphicLayer.closePopup()
        // })
        const point = graphic.point.format()
        eventTarget.fire("clickPopupBtn", {
          name: graphic.attr.name,
          key: graphic.id,
          remark: graphic.attr.remark,
          point: JSON.stringify([point.lng, point.lat, point.alt])
        })
      })
    }
  })

  graphicLayer.on(mars3d.EventType.editMovePoint, (e) => {
    const graphic = e.graphic
    // saveEntity(graphic, null) // 编辑修改了点
  })
}

// 释放当前业务
export function onUnmounted(): void {
  editable = true

  if (graphicLayer) {
    graphicLayer.clear()
    map.removeLayer(graphicLayer, true)
    graphicLayer = null
  }

  eventTarget.off()
  map = null
}

// 防止点击之后未绘制数据，点击其他按钮
export function stopGraphicDraw() {
  graphicLayer.stopDraw()
}

// 添加注记
export async function onClickMarkerAdd() {
  return await graphicLayer
    .startDraw({
      type: "billboard",
      style: getStyle()
    })
    .then((graphic: mars3d.graphic.BillboardPrimitive) => {
      graphic.attr.name = "我的标记"
      const point = graphic.point.format()

      graphicLayer.openPopup(graphic)
      return {
        name: graphic.attr.name,
        key: graphic.id,
        remark: graphic.attr.remark,
        point: JSON.stringify([point.lng, point.lat, point.alt])
      }
    })
}

/**
 * 配置的样式 在加载json时使用相同的样式配置
 *
 * @return {*}
 */
function getStyle() {
  return {
    scale: 1,
    image: "img/marker/mark-red.png",
    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1, 8.0e6, 0.2),
    highlight: {
      type: mars3d.EventType.click,
      image: "img/marker/mark-blue.png"
    },
    label: {
      text: "{name}",
      font_size: 20,
      outline: true,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 3,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, -50),
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 200000)
    }
  }
}

// 清空
export function onClickMarkerDeleteAll() {
  graphicLayer.clear()
}

// 是否可以编辑
export function onClickMarkerEditor(val: boolean) {
  editable = val
  graphicLayer.hasEdit = val
}

// 在表格中删除对应的矢量数据
export function deleteItemById(id: string | number) {
  const graphic = graphicLayer.getGraphicById(id)
  if (graphic) {
    graphicLayer.closePopup()
    graphic.remove()
  }
}

// 在表格中定位至对应的矢量数据
export function flyTo(id: string | number) {
  const graphic = graphicLayer.getGraphicById(id)
  if (graphic) {
    // 参数解释：点数据：radius控制视距距离
    map.flyToGraphic(graphic, { radius: 2500 })
  }
}

/**
 * 获取所有矢量数据以便保存为json文件
 *
 * @param {*} 无
 * @return {arr} arr 矢量图层获取到的所有矢量数据的信息
 */
export function getJsonData() {
  const arr = []

  graphicLayer.eachGraphic((e) => {
    const attr = e.attr
    const point = e.point.format()

    arr.push({
      id: e.id,
      key: e.id,
      name: attr.name,
      remark: attr.remark,
      point: JSON.stringify([point.lng, point.lat, point.alt])
    })
  }, null)

  return arr
}

/**
 * 打开文件进行的下步操作
 * 循环文件内的所有的数据，添加至矢量数据
 * 在调用getGraphicAttrList方法添加数据至表格内
 *
 * @param {*} arr 接收到JSON数据
 * @param {boolean} isclear 是否清除其他矢量数据 即是否叠加文件
 * @param {*} [historyData={ historyId: "", sureToHistory: false }] 兼容历史记录的加载
 */
export function loadJson(arr: any, isclear: boolean) {
  if (arr == null || !arr.length) {
    return
  }
  const array = []
  if (isclear) {
    graphicLayer.clear()
  }

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (!item.point) {
      continue
    }

    if (!isclear) {
      // 叠加时，清除已有同id数据
      const graphic = graphicLayer.getGraphicById(item.id)
      if (graphic) {
        graphicLayer.removeGraphic(graphic)
        eventTarget.fire("removeMarker", graphic)
      }
    }

    const graphic = new mars3d.graphic.BillboardEntity({
      id: item.id,
      position: JSON.parse(item.point),
      style: getStyle(),
      attr: {
        name: item.name || "我的标记",
        remark: item.remark || ""
      }
    })
    graphicLayer.addGraphic(graphic)
    array.push({ ...item, key: item.id })

    // saveEntity(graphic, null, historyData)
  }

  graphicLayer.flyTo({ duration: 2.0, scale: 2 })

  return array
}

function bindLayerContextMenu() {
  graphicLayer.bindContextMenu([
    {
      text: "删除对象",
      icon: "fa fa-trash-o",
      show: (event) => {
        const graphic = event.graphic
        if (!graphic || graphic.isDestroy) {
          return false
        } else {
          return true
        }
      },
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return
        }
        const parent = graphic.parent // 右击是编辑点时
        graphicLayer.removeGraphic(graphic)
        if (parent) {
          graphicLayer.removeGraphic(parent)
        }
        eventTarget.fire("removeMarker", graphic)
      }
    }
  ])
}

// function saveEntity(graphic, callback: any, historyData = { historyId: "", sureToHistory: true }) {
//   if (callback) {
//     callback()
//   }

// 由矢量数据事件drawCreated 、 editMovePoint 以及popup的确定点击事件触发
// eventTarget.fire("editorGraphicEnd", {
//   name: graphic.attr.name,
//   key: graphic.id,
//   historyData
// })
// }
