/**
 * 图上标绘
 * @copyright 火星科技 mars3d.cn
 * @author 火星胡椒 && 火星渣渣灰  2022-02-19
 */
import * as mars3d from "mars3d"
import * as api from "@mars/common/api"
import { $message } from "@mars/components/mars-ui/index"
import { saveGeoJSON2Kml, readJSON } from "@mars/utils/file-util"

let map: mars3d.Map // 地图对象

let graphicGroupLayer: mars3d.layer.GraphicGroupLayer

let storageType = "mars3d_plot"
// 组件销毁时，会触发graphicGroupLayer的removeGraphic事件，更新历史数据会导致数据遗失
//  onUnmounted中设为false，会比事件先执行
let isRemoveGraphic = null

export const eventTarget = new mars3d.BaseClass()

// 初始化当前业务
export function onMounted(mapInstance: mars3d.Map): void {
  map = mapInstance // 记录map

  if (!graphicGroupLayer) {
    isRemoveGraphic = true // 添加，删除数据时更新历史数据
    createLayer()
    getHistoricalRecordsList()
  }
  graphicGroupLayer.hasEdit = true
}

// 释放当前业务
export function onUnmounted(): void {
  isRemoveGraphic = false //  释放时不更新历史数据

  if (graphicGroupLayer) {
    graphicGroupLayer.stopDraw()
    // graphicGroupLayer.hasEdit = false
    graphicGroupLayer.clear()
    graphicGroupLayer.remove()
    graphicGroupLayer = null
  }

  eventTarget.off()
  map = null
}

// 存储类型
export function dataType(type: string) {
  storageType = type
}

let historyId: any
function createLayer(): void {
  graphicGroupLayer = new mars3d.layer.GraphicGroupLayer({
    name: "图上标绘",
    pid: 99, // 图层管理 中使用，父节点id
    defaultLayer: "默认分组",
    isRestorePositions: false, // 在标绘和编辑结束时，是否将坐标还原为普通值，true: 停止编辑时会有闪烁，但效率要好些。
    hasEdit: true,
    isAutoEditing: true
  })
  map.addLayer(graphicGroupLayer)

  // 监听添加了矢量数据
  graphicGroupLayer.on(mars3d.EventType.addGraphic, async (e: any) => {
    eventTarget.fire("addGraphic", e)
  })

  graphicGroupLayer.on(mars3d.EventType.removeGraphic, async (e: any) => {
    eventTarget.fire("removeGraphic", e)
    setTimeout(() => {
      // 关闭编辑的时候执行
      if (!e.layer.isEditing) {
        eventTarget.fire("editorHide")
      }
      if (isRemoveGraphic) {
        updateHistoryRecords()
      }
    }, 100)
  })

  // 绘制完成 添加
  graphicGroupLayer.on(mars3d.EventType.drawCreated, async (e: any) => {
    if (graphicGroupLayer.hasEdit) {
      eventTarget.fire("editStart", e)
    }

    if (historyId) {
      updateHistoryRecords()
    } else {
      historyId = await addHistoricalRecords()
    }
  })

  // 单击开始编辑
  graphicGroupLayer.on(mars3d.EventType.editStart, (e: any) => {
    setTimeout(() => {
      // 属性面板打开时，点击其他的矢量数据，打开后会被下面的执行关闭
      eventTarget.fire("editStart", e)
    }, 150)
    // graphicListTree()
  })

  // 更新
  graphicGroupLayer.on([mars3d.EventType.editMovePoint, mars3d.EventType.editStyle, mars3d.EventType.editRemovePoint], async (e: any) => {
    eventTarget.fire("updata", e)

    if (historyId) {
      updateHistoryRecords()
    }
  })

  graphicGroupLayer.on([mars3d.EventType.editStop], async (e: any) => {
    //
    setTimeout(() => {
      // 关闭编辑的时候执行
      if (!e.layer.isEditing) {
        eventTarget.fire("editorHide")
      }
      if (isRemoveGraphic) {
        updateHistoryRecords()
      }
    }, 100)
  })

  graphicGroupLayer.bindContextMenu([
    {
      text: "删除对象",
      callback: function (e: any) {
        e.graphic.remove()
      }
    }
  ])
}

// 获取所有的历史数据
async function getHistoricalRecordsList() {
  const { code, data } = await api.getHistoricalRecordsList({ type: storageType })
  if (code === 200 && data) {
    console.log("获取到历史数据", data)

    data.forEach((item) => {
      historyId = item.id
      if (item.content) {
        loadGeoJSON(JSON.parse(item.content), { clear: true, flyTo: true })
      }
    })
  } else {
    loadDemoData()
  }
}

// 添加历史数据
async function addHistoricalRecords() {
  const geojson = graphicGroupLayer.toGeoJSON({ stopEdit: false })

  const { code, data } = await api.addHistoricalRecords({
    title: geojson.layer.name,
    type: storageType,
    content: JSON.stringify(geojson)
  })

  if (code === 200 && data) {
    return data.id
  }
}

// 更新历史数据
async function updateHistoryRecords() {
  const geojson = graphicGroupLayer.toGeoJSON({ stopEdit: false })

  const { code } = await api.updateHistoryRecords({
    id: historyId,
    title: geojson.layer.name,
    type: storageType,
    content: JSON.stringify(geojson)
  })

  if (code === 200) {
    eventTarget.fire("updataPlotTree")

    console.log("更新历史数据")
  } else {
    console.log("更新失败")
  }
}

// 删除历史数据
async function deleteHistoricalRecordsById() {
  const { code } = await api.deleteHistoricalRecordsById(historyId)

  if (code === 200) {
    console.log("删除历史数据")
  } else {
    console.log("删除失败")
  }
}

// 保存文件
export function onClickMarkerSavefile() {
  if (graphicGroupLayer.length === 0) {
    $message("当前没有标注任何数据，无需保存！")
    return
  }
  const geojson = graphicGroupLayer.toGeoJSON()
  mars3d.Util.downloadFile("我的标绘数据.json", JSON.stringify(geojson))
}

// 打开保存的文件
export async function impFile(file: any, isClearLayer: boolean) {
  const jsonData = await readJSON(file)
  graphicGroupLayer.loadGeoJSON(jsonData, {
    flyTo: true,
    clear: isClearLayer
  })
  // graphicListTree()
}

// 清空
export function onClickMarkerDeleteAll() {
  graphicGroupLayer.clear()
  deleteHistoricalRecordsById()
}

// 是否可以编辑
export function onClickMarkerEditor(val: boolean) {
  graphicGroupLayer.hasEdit = val
}

/**
 * 是否开启Popup
 *
 * @export
 * @param {boolean} val true开启Popup false关闭Popup
 */
export function isShowPopup(val: boolean) {
  if (val) {
    graphicGroupLayer.bindPopup((event: any) => {
      const graphic = event.graphic
      const html = mars3d.Util.getTemplateHtml({
        title: "属性编辑",
        template: [
          { field: "name", name: "名称" },
          { field: "remark", name: "备注", type: "textarea" },
          { name: "确定", type: "button", className: "mars3d-popup-btn-custom" }
        ],
        attr: graphic.attr,
        edit: true,
        width: 190
      })
      return html
    })

    graphicGroupLayer.on(mars3d.EventType.popupOpen, (event: any) => {
      const container = event.container
      // 打开popup之后的确定按钮
      const btnOk = container.querySelector(".mars3d-popup-btn")

      if (btnOk) {
        const graphic = event.graphic
        btnOk.addEventListener("click", () => {
          const popupEdititem: any = document.querySelectorAll(".mars3d-popup-edititem")
          popupEdititem.forEach((item) => {
            let key = item.getAttribute("data-type")
            if (!key) {
              key = ""
            }
            graphic.attr[key] = item.value
          })

          map.closePopup()
          // graphicListTree()
        })
      }
    })
  } else {
    graphicGroupLayer.unbindPopup()
    graphicGroupLayer.off(mars3d.EventType.popupOpen)
  }
}

function loadDemoData() {
  if (window.location.hostname.indexOf("mars") === -1) {
    return
  }

  // 实际系统时可以注释下面代码，该代码是mars3d官网在线加载演示数据
  if (defultJson) {
    loadGeoJSON(defultJson, { clear: true, flyTo: true })
  }
}

// 没有历史记录时显示 默认数据
let defultJson: any
export function defultData(result: any) {
  defultJson = result
}

// 加载数据
function loadGeoJSON(json: any, options: any) {
  if (json == null) {
    return
  }
  graphicGroupLayer.loadGeoJSON(json, options)
}

// *****************************************标号面板*********************************** //
// 开始标记
export function startDraw(drawOptions: any) {
  drawOptions = mars3d.Util.clone(drawOptions) // 需要拷贝

  graphicGroupLayer.selectedLayer.startDraw({
    drawShow: true, // 绘制时，是否显示模型，可避免在3dtiles上拾取坐标存在问题。
    ...drawOptions
  })
}

export function changeItemImage(item: any) {
  return mars3d.Util.template(item.image, map.options.templateValues)
}

export function changeItemUrl(item: any) {
  return mars3d.Util.template(item.style.url, map.options.templateValues)
}

export function updateTemplateValues(url: any) {
  if (map?.options?.templateValues) {
    return mars3d.Util.template(url, map.options.templateValues)
  } else {
    return url
  }
}

// ******************************************列表面板********************************** //
export function graphicListTree() {
  const arrGroup = graphicGroupLayer.getLayers() as mars3d.layer.GraphicLayer[]
  return arrGroup
}

// 获取所有矢量图层
export function getGraphics(layer: any) {
  return layer.getGraphics()
}

// 判断图层状态是否被激活
export function isActivateGraphic(layer: any) {
  return graphicGroupLayer.isActivate(layer)
}

export function onUnmoted() {
  eventTarget.off("loadTreeData")
}

// 对分组进行操作
export function addNewPlotTree(layerId: string, treeName: string, isAddNew: boolean) {
  if (graphicGroupLayer.hasLayer(treeName)) {
    $message("存在同名分组，请修改")
    return
  }

  if (isAddNew) {
    // 新增
    graphicGroupLayer.createLayer(treeName)
    eventTarget.fire("addNewPlot")
  } else {
    const layer = graphicGroupLayer.getLayerById(layerId)
    // 修改
    layer.name = treeName
    eventTarget.fire("addNewPlot")
  }
  if (isRemoveGraphic) {
    setTimeout(() => {
      updateHistoryRecords()
    }, 500)
  }
}

// 定位至对应的矢量数据
export function flyToPlotTreeGraphic(id: string) {
  const graphic = graphicGroupLayer.getGraphicById(id)
  map.flyToGraphic(graphic)
}

// 显示隐藏对应矢量数据
export function showHideGarahic(checked: boolean, e: any) {
  if (e.children) {
    const layer = map.getLayerById(e.key)
    layer.eachGraphic((item: mars3d.graphic.BaseGraphic) => {
      item.show = checked
    })
  } else {
    const graphic = graphicGroupLayer.getGraphicById(e.id)
    graphic.show = checked
  }
}

// 打开编辑面板
export function openEditorPannel(id: string) {
  const graphic = graphicGroupLayer.getGraphicById(id)
  graphic && graphic.startEditing()
}

// 删除对应矢量数据
export function deletePlotTreeGraphic(id: string) {
  const graphic = graphicGroupLayer.getGraphicById(id)
  graphic && graphic.remove()
}

/**
 *
 * 删除所有的空分组
 * 至少保留一个图层
 * @export
 */
export function deleteEmptyLayer() {
  if (graphicGroupLayer.length < 2) {
    $message("不能删除所有图层，需要至少保留1个图层！")
    return
  }
  graphicGroupLayer.deleteEmptyLayer()
  if (isRemoveGraphic) {
    updateHistoryRecords()
  }
}

// 置为激活图层
export function onLayerMenuIsActivate(layerId: string) {
  graphicGroupLayer.eachLayer((layer: any) => {
    layer.isActivate = false
    if (layer.id === layerId) {
      graphicGroupLayer.selectedLayer = layer
      layer.isActivate = true
    }
  }, null)
}

export function onMenuDeleteLayer(id: string) {
  const layer = graphicGroupLayer.getLayerById(id)
  if (layer) {
    if (graphicGroupLayer.getLayers().length > 0) {
      if (!graphicGroupLayer.isActivate(layer)) {
        layer.clear()
        graphicGroupLayer.removeLayer(layer)

        if (isRemoveGraphic) {
          updateHistoryRecords()
        }
      } else {
        $message("无法删除激活图层")
      }
    }
  }
}

// 下载图层JSON
export function onMenuSaveLayerGeojson(id: string, name: string) {
  const layer = graphicGroupLayer.getLayerById(id)
  const geojson = layer.toGeoJSON()
  mars3d.Util.downloadFile(name + ".json", JSON.stringify(geojson))
}

export function onMenuSaveLayerKML(id: string, name: string) {
  const layer = graphicGroupLayer.getLayerById(id)
  const geojson = layer.toGeoJSON()

  const kml = saveGeoJSON2Kml(geojson, { name: name })

  mars3d.Util.downloadFile(name + ".kml", kml)
}

// 下载矢量数据JSON
export function onMenuSaveGraphicGeojson(id: string, name: string) {
  const layer = graphicGroupLayer.getGraphicById(id)
  const geojson = layer.toGeoJSON()
  mars3d.Util.downloadFile(name + ".json", JSON.stringify(geojson))
}

export function onMenuSaveGraphicKML(id: string, name: string) {
  const layer = graphicGroupLayer.getGraphicById(id)
  const geojson = layer.toGeoJSON()

  const kml = saveGeoJSON2Kml(geojson, { name: name })
  mars3d.Util.downloadFile(name + ".kml", kml)
}

export async function onMenuOverGeojson(file: any, id: string) {
  const layer = graphicGroupLayer.getLayerById(id)
  const jsonData = await readJSON(file)
  graphicGroupLayer.loadGeoJSON(jsonData, {
    flyTo: true,
    layer
  })
}

export function moveToLayer(graphicId: string, layerId: string) {
  const layer = graphicGroupLayer.getLayerById(layerId)
  const graphic = graphicGroupLayer.getGraphicById(graphicId)
  graphicGroupLayer.moveToLayer(graphic, layer)
}
