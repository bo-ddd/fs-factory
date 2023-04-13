/**
 * 空间分析
 * @copyright 火星科技 mars3d.cn
 * @author 火星渣渣灰 2022-01-10
 */
import * as mars3d from "mars3d"
import { $message, $showLoading, $hideLoading } from "@mars/components/mars-ui/index"
const Cesium = mars3d.Cesium

let map: mars3d.Map // mars3d.Map三维地图对象
export const eventTarget: mars3d.BaseClass = new mars3d.BaseClass()

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
  onUnmountedSunlight()
  onUnmountedVisible()
  onUnmountedVolume()
  onUnmountedTerrainClip()
  onUnmountedTerrainOpacity()
  onUnmountedTerrainSlope()
  onUnmountedModelClip()
  onUnmountedModelFlat()
  onUnmountedModelLimit()

  eventTarget.off()
  map = null
}

// 创建销毁的变量
let lastDepthTestAgainstTerrain: boolean

// 是否启用深度监测,可以开启来测试矢量对象是否在地形下面或被遮挡。
function openTerrainDepthTest() {
  lastDepthTestAgainstTerrain = map.scene.globe.depthTestAgainstTerrain
  map.scene.globe.depthTestAgainstTerrain = true
}
function resetTerrainDepthTest() {
  if (Cesium.defined(lastDepthTestAgainstTerrain)) {
    map.scene.globe.depthTestAgainstTerrain = lastDepthTestAgainstTerrain
    lastDepthTestAgainstTerrain = null
  }
}

// **************************************日照分析******************************** //
let shadows: mars3d.thing.Shadows
export function setShadows(date: string, hours: number, minutes: number) {
  const dateTime = new Date(`${date} ${hours}:${minutes}:00`)

  if (shadows) {
    shadows.time = dateTime
  } else {
    shadows = new mars3d.thing.Shadows({
      multiplier: 1600,
      time: dateTime
    })
    map.addThing(shadows)

    shadows.on(mars3d.EventType.change, function () {
      const shadowTime = shadows.time
      eventTarget.fire("changeShadow", { shadowTime })
    })
  }

  return dateTime
}

export function startPlay(date: string, hours: number, minutes: number) {
  const currentTime = setShadows(date, hours, minutes)

  const startDate = new Date(date + " 00:00:00")
  const endDate = new Date(date + " 23:59:59")

  shadows.start(startDate, endDate, currentTime)
}
export function stopPlay() {
  if (shadows && shadows.isStart) {
    shadows.pause()
  }
}

export function onUnmountedSunlight() {
  if (shadows) {
    map.removeThing(shadows)
    shadows = null
  }
}

// **************************************可视域******************************** //
let arrViewField: mars3d.graphic.ViewShed[] = []

export function onMountedVisible() {
  // 不开启抗锯齿，可视域会闪烁
  map.scene.postProcessStages.fxaa.enabled = true
  // 不开启，无法投射到地球上
  openTerrainDepthTest()
}

export function onUnmountedVisible() {
  clearVisible()
  resetTerrainDepthTest()
}

export function clearVisible() {
  for (let i = 0, len = arrViewField.length; i < len; i++) {
    arrViewField[i].remove(true)
  }
  arrViewField = []
}

/**
 * 添加可视域
 * @export
 * @param {boolean} showFrustum 视椎线框
 * @returns {void}
 */
export function drawViewShed(opacity: number, showFrustum: boolean) {
  return map.graphicLayer
    .startDraw({
      type: "viewShed",
      style: {
        angle: 60,
        angle2: 45,
        addHeight: 0.5, // 在坐标点增加的高度值，规避遮挡，效果更友好
        opacity,
        showFrustum: showFrustum
      }
    })
    .then((graphic) => {
      arrViewField.push(graphic)
      return graphic
    })
}

/**
 * 所有的可视域参数更新；
 * 也可将最后一个可视域进行参数重置；
 * arrViewField[arrViewField.length - 1][option] = value
 *
 * @export
 * @param {string} option 可视域更改的参数
 * @param {(number | boolean)} value 参数值
 */
export function getLastViewShed(option: string, value: number | boolean) {
  if (arrViewField.length === 0) {
    return
  }

  for (let i = 0, len = arrViewField.length; i < len; i++) {
    arrViewField[i][option] = value
  }
}

// **************************************方量分析******************************** //
let measure: mars3d.thing.Measure
let measureVolume: mars3d.graphic.VolumeMeasure

export function onMountedVolume() {
  measure = new mars3d.thing.Measure({
    label: {
      color: "#ffffff",
      font_family: "楷体",
      font_size: 20
    }
  })
  map.addThing(measure)

  measure.on(mars3d.EventType.start, function (event: any) {
    $showLoading()
    console.log("开始分析，坐标为", JSON.stringify(mars3d.PointTrans.cartesians2lonlats(event.positions))) // 方便测试拷贝坐标
  })
  measure.on(mars3d.EventType.end, function (event: any) {
    console.log("分析完成", event)
    $hideLoading()
  })
}

export function onUnmountedVolume() {
  if (measureVolume) {
    measureVolume.remove()
    measureVolume = null
  }
  if (measure) {
    measure.clear()
    measure.remove()

    measure = null
  }
}

// 清除
export function clear() {
  measure.clear()
}

// 点选高度
function showHeightVal() {
  const baseHeight = measureVolume.height.toFixed(1)
  const minHeight = measureVolume.minHeight.toFixed(1)
  const maxHeight = getFixedNum(measureVolume.maxHeight)

  // 触发自定义事件 heightVal ，改变vue面板中的值
  eventTarget.fire("heightVal", { baseHeight, minHeight, maxHeight })
}

function getFixedNum(val: number) {
  return Math.ceil(val * 10) / 10
}

// 方量分析
export function analysisMeasure() {
  // 手动绘制的方式分析
  measure
    .volume({
      splitNum: 6 // 面内插值次数，控制精度[注意精度越大，分析时间越长]
      // minHeight: 50  //可以设置一个固定的最低高度
    })
    .then((e: mars3d.graphic.VolumeMeasure) => {
      measureVolume = e
      showHeightVal()
    })
}

// 修改基础高度
export function baseHeight(num: number | undefined) {
  if (measureVolume && num) {
    measureVolume.height = num
    showHeightVal()
  }
}

// 修改底高
export function txtMinHeight(num: number | undefined) {
  if (!measureVolume) {
    return
  }
  if (num && num > measureVolume.height) {
    $message("墙底部高度不能高于基准面高")
    return
  }
  measureVolume.minHeight = num
}

// 修改顶高
export function txtMaxHeight(num: number | undefined) {
  if (!measureVolume) {
    return
  }
  const maxHeight = getFixedNum(measureVolume.polygonMaxHeight)
  if (num && num < maxHeight) {
    $message("墙顶部高度不能低于区域内的地表高" + maxHeight)
    measureVolume.maxHeight = Number(maxHeight)
    return
  }
  if (num && num < measureVolume.height) {
    $message("墙顶部高度不能低于基准面高")
    return
  }
  measureVolume.maxHeight = num
}

// 点选高度
export function selHeight() {
  if (measureVolume) {
    // 拾取高度
    map.graphicLayer.startDraw({
      type: "point",
      style: { color: "#00fff2" },
      success: (graphic) => {
        const height = graphic.point?.alt
        map.graphicLayer.removeGraphic(graphic)

        if (!height) {
          return
        }

        measureVolume.height = height

        showHeightVal()
      }
    })
  }
}

// **************************************地形开挖******************************** //
let terrainClip: mars3d.thing.TerrainClip

export function onMountedTerrainClip() {
  openTerrainDepthTest()

  terrainClip = new mars3d.thing.TerrainClip({
    image: "img/textures/poly-stone.jpg",
    imageBottom: "img/textures/poly-soil.jpg",
    splitNum: 80 // 井边界插值数
  })
  map.addThing(terrainClip)
}

export function onUnmountedTerrainClip() {
  resetTerrainDepthTest()
  if (terrainClip) {
    terrainClip.clear() // 清除挖地区域
    map.removeThing(terrainClip)
    terrainClip = null
  }
}

// 清除
export function removeAll() {
  terrainClip.clear() // 清除挖地区域
}

// 改变切割的深度
export function onChangeClipHeight(val: number) {
  terrainClip.diffHeight = val
}

// 添加矩形
export function onClickDrawExtent(height: number) {
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: "#007be6",
      opacity: 0.8
    },
    success: function (graphic: mars3d.graphic.RectangleEntity) {
      // 绘制成功后回调
      const positions = graphic.getOutlinePositions(false)
      map.graphicLayer.clear()

      console.log(JSON.stringify(mars3d.PointTrans.cartesians2lonlats(positions))) // 打印下边界

      terrainClip.addArea(positions, { diffHeight: height })
    }
  })
}
// 添加多边形
export function onClickDraw(height: number) {
  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#007be6",
      opacity: 0.5,
      outline: false
    },
    success: function (graphic: mars3d.graphic.PolygonEntity) {
      // 绘制成功后回调
      const positions = graphic.positionsShow
      map.graphicLayer.clear()

      console.log(JSON.stringify(mars3d.PointTrans.cartesians2lonlats(positions))) // 打印下边界

      terrainClip.addArea(positions, { diffHeight: height })
    }
  })
}

// **************************************地表透明度******************************** //
let underground: mars3d.thing.Underground

export function onMountedTerrainOpacity() {
  underground = new mars3d.thing.Underground({
    alpha: 0.5
  })
  map.addThing(underground)
}

export function onUnmountedTerrainOpacity() {
  if (underground) {
    map.removeThing(underground)
    underground = null
  }
}

// 透明度发生改变
export function onChangeOpacity(value: number) {
  underground.alpha = value
}

// 复选框，是否开启地下模式
export function onCheckedOpacity(value: boolean) {
  underground.enabled = value
}

// **************************************坡度坡向******************************** //
let slope: mars3d.thing.Slope
let contourLine: mars3d.thing.ContourLine

export function onMountedTerrainSlope() {
  // 剖度坡向
  slope = new mars3d.thing.Slope({
    arrow: {
      scale: 0.3, // 箭头长度的比例（范围0.1-0.9）
      width: 15, // 箭头宽度
      color: Cesium.Color.YELLOW,
      show: true
    }
  })
  map.addThing(slope)

  slope.on(mars3d.EventType.end, function (event: any) {
    console.log("分析完成", event)
    // event.data[0] 数组内返回值说明： {
    //     position:position,  //坐标位置
    //     slope: slopeValDou, //度数法值，α(坡度)=arc tan (高程差/水平距离)
    //     slopeStr1: text1,   //度数法值字符串
    //     slopeStr2: text2,   //百分比法值字符串，坡度 = (高程差/水平距离)x100%
    //     direction: slopeAngle //坡向值（0-360度）
    // }
    $hideLoading()
  })

  // 渲染效果
  contourLine = new mars3d.thing.ContourLine({
    contourShow: false, // 是否显示等高线
    shadingType: "none", // 地表渲染效果类型:无nono, 高程 elevation, 坡度slope, 坡向aspect
    shadingAlpha: 0.6 // 地表渲染的透明度
  })
  map.addThing(contourLine)
}

export function onUnmountedTerrainSlope() {
  if (slope) {
    slope.clear()
    map.removeThing(slope)
    slope = null
  }
  if (contourLine) {
    contourLine.clear()
    map.removeThing(slope)
    contourLine = null
  }
}

// 清除绘制的数据
export function removeSlopeData() {
  slope.clear()
  contourLine.clear()
}

// 改变阴影
export function onChangeShadingType(val: string) {
  contourLine.shadingType = val
}

// 添加矩形
export function onClickDrawSlopeExtent(splitNum: number) {
  removeSlopeData()
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: "#007be6",
      opacity: 0.8,
      outline: false
    },
    success: (graphic) => drawSlopeSuccess(graphic.getOutlinePositions(false), splitNum)
  })
}

// 绘制多边形
export function onClickDrawSlope(splitNum: number) {
  removeSlopeData()
  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#29cf34",
      opacity: 0.3,
      outline: true,
      outlineColor: "#ffffff",
      clampToGround: true
    },
    success: (graphic) => drawSlopeSuccess(graphic.positionsShow, splitNum)
  })
}

function drawSlopeSuccess(positions: any, splitNum: number) {
  $showLoading()
  // 绘制成功后回调
  map.graphicLayer.clear()

  console.log("绘制坐标为", JSON.stringify(mars3d.PointTrans.cartesians2lonlats(positions))) // 方便测试拷贝坐标

  contourLine.positions = positions

  slope.add(positions, {
    splitNum: splitNum, // splitNum插值分割的个数
    radius: 1, // 缓冲半径（影响坡度坡向的精度）
    count: 4 // 缓冲的数量（影响坡度坡向的精度）会求周边(count*4)个点
  })
  $hideLoading()
}

// **************************************模型剖切******************************** //
let planClipTilesetLayer:mars3d.layer.TilesetLayer

export function onUnmountedModelClip() {
  clearModelClipData()
  planClipTilesetLayer = null
}

export function clearModelClipData() {
  if (planClipTilesetLayer) {
    planClipTilesetLayer.planClip.clear()
  }
}

// 绘制裁剪线
export function onDrawLine() {
  clearModelClipData()

  map.graphicLayer.startDraw({
    type: "polyline",
    maxPointNum: 2,
    style: {
      color: "#007be6",
      opacity: 0.8,
      outline: false
    },
    success: (graphic: mars3d.graphic.PolylineEntity) => {
      // 绘制成功后回调
      const positions = graphic.positionsShow
      map.graphicLayer.clear()

      planClipTilesetLayer = planClipTilesetLayer || map.pickTilesetLayer(positions) // 拾取绘制返回的模型
      if (!planClipTilesetLayer) {
        $message("请单击选择模型")
        return
      }

      planClipTilesetLayer.planClip.positions = positions
    }
  })
}

// 绘制裁剪面
export function onDrawPoly(val: string) {
  clearModelClipData()

  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: "#007be6",
      opacity: 0.8
    },
    success: (graphic: mars3d.graphic.RectangleEntity) => {
      // 绘制成功后回调
      const positions = graphic.getOutlinePositions(false)
      map.graphicLayer.clear()

      let clipOutSide
      if (val === "1") {
        clipOutSide = true
      } else {
        clipOutSide = false
      }

      const isAdd = addModelCilpPoly(positions, clipOutSide)
      if (!isAdd) {
        $message("请单击选择模型")
      }
    }
  })
}

function addModelCilpPoly(positions: any, clipOutSide: boolean) {
  planClipTilesetLayer = planClipTilesetLayer || map.pickTilesetLayer(positions) // 拾取绘制返回的模型
  if (!planClipTilesetLayer) {
    return false
  }

  if (planClipTilesetLayer) {
    planClipTilesetLayer.planClip.clear()
  }

  planClipTilesetLayer.planClip.positions = positions
  planClipTilesetLayer.planClip.clipOutSide = clipOutSide

  return true
}

// 改变裁剪距离
export function onClipDistance(value: number) {
  if (planClipTilesetLayer) {
    planClipTilesetLayer.planClip.distance = value
  }
}

// 改变内外裁剪状态
export function onChangeOutsideClip(val: string) {
  if (!planClipTilesetLayer) {
    return
  }

  if (val === "1") {
    planClipTilesetLayer.planClip.clipOutSide = true
  } else {
    planClipTilesetLayer.planClip.clipOutSide = false
  }
}

export function onCheckedModel() {
  return map.graphicLayer
    .startDraw({
      type: "point",
      style: {
        color: "#007be6"
      }
    })
    .then((graphic) => {
      // 绘制成功后回调
      const position = graphic.positionShow
      map.graphicLayer.clear()

      planClipTilesetLayer = map.pickTilesetLayer([position]) // 拾取绘制返回的模型
      if (!planClipTilesetLayer) {
        $message("请单击选择模型")
        return
      }


      const radius = planClipTilesetLayer.boundingSphere.radius / 2
      const name = planClipTilesetLayer.name || "未命名"

      return { radius, name }
    })
}

// 按方向剖切模型
export function clipping(type: string) {
  if (planClipTilesetLayer) {
    planClipTilesetLayer.planClip.type = mars3d.ClipType[type]
  }
}

// **************************************模型压平******************************** //
let demoTilesetLayer: mars3d.layer.TilesetLayer
let _mxypTileset: mars3d.layer.TilesetLayer

export function onMountedModelFlat() {
  demoTilesetLayer = map.getLayerByAttr("大雁塔", "name")
  if (demoTilesetLayer) {
    demoTilesetLayer.show = true
    map.addLayer(demoTilesetLayer)

    _mxypTileset = demoTilesetLayer
    map.setCameraView({ lat: 34.215516, lng: 108.960251, alt: 834, heading: 4, pitch: -48, roll: 0 })
  }

  return _mxypTileset?.name || "未命名"
}

export function onUnmountedModelFlat() {
  if (_mxypTileset) {
    _mxypTileset.flat.clear()
    _mxypTileset = null
  }

  if (demoTilesetLayer) {
    map.removeLayer(demoTilesetLayer)
    demoTilesetLayer = null
  }
}

export function clearModelFlatData() {
  if (_mxypTileset) {
    _mxypTileset.flat.clear()
  }
}

export function onCheckedModelFlat() {
  return map.graphicLayer
    .startDraw({
      type: "point",
      style: {
        color: "#007be6"
      }
    })
    .then((graphic: mars3d.graphic.PointPrimitive) => {
      // 绘制成功后回调
      // map.removeLayer(_mxypTileset)
      _mxypTileset = null

      const position = graphic.positionShow
      map.graphicLayer.clear()

      const layer = map.pickTilesetLayer([position]) // 拾取绘制返回的模型
      if (!layer) {
        $message("请单击选择模型")
        return
      }

      _mxypTileset = layer

      return layer.name || "未命名"
    })
}

// 压平高度
export function onChangeFlatHeight(val: number) {
  if (_mxypTileset) {
    _mxypTileset.flat.updateHeight(val)
  }
}

// 绘制矩形
export function onDrawExtent(height: number) {
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: "#007be6",
      opacity: 0.8
    },
    success: (graphic: mars3d.graphic.RectangleEntity) => {
      // 绘制成功后回调
      const positions = graphic.getOutlinePositions(false)
      map.graphicLayer.clear()

      showMxypTilesetFlat(positions, height)
    }
  })
}
// 绘制多边形
export function onDraw(height: number) {
  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#007be6",
      opacity: 0.5
    },
    success: (graphic: mars3d.graphic.PolygonPrimitive) => {
      // 绘制成功后回调
      const positions = graphic.positionsShow
      map.graphicLayer.clear()

      showMxypTilesetFlat(positions, height)
    }
  })
}

function showMxypTilesetFlat(positions: any, height: number) {
  _mxypTileset = _mxypTileset || map.pickTilesetLayer(positions) // 拾取绘制返回的模型

  if (_mxypTileset) {
    _mxypTileset.flat.addArea(positions, { height: height })
  } else {
    $message("请单击选择模型")
  }
}

// **************************************限高分析******************************** //
let limitHeight: mars3d.thing.LimitHeight

export function onMountedModelLimit() {
  if (!limitHeight) {
    limitHeight = new mars3d.thing.LimitHeight({
      color: "rgba(255,0,0,0.5)",
      height: 80, // 限高
      bottomHeight: 0 // 模型地面的海拔高度（单位：米）
    })
    map.addThing(limitHeight)
  }
}

export function onUnmountedModelLimit() {
  removeModelLimitData()
  if (limitHeight) {
    map.removeThing(limitHeight)
    limitHeight = null
  }
}

export function removeModelLimitData() {
  if (limitHeight) {
    limitHeight.clear()
    map.graphicLayer.clear()
  }
}

// 图上选点
export function onMapClickPoint() {
  return map.graphicLayer
    .startDraw({
      type: "point",
      style: {
        color: "#007acc"
      }
    })
    .then((graphic: mars3d.graphic.PointPrimitive) => {
      const position = graphic.positionShow
      const point = mars3d.LngLatPoint.fromCartesian(position)

      limitHeight.bottomHeight = point.alt

      map.graphicLayer.clear()
      return point.alt
    })
}

// 绘制矩形
export function onDrawModelLimitExtent() {
  map.graphicLayer.clear()
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: "#ffff00",
      opacity: 0.3,
      clampToGround: true
    },
    success: (graphic: mars3d.graphic.RectangleEntity) => drawModelLimitSuccess(graphic.getOutlinePositions(false))
  })
}

// 绘制面
export function onDrawModelLimitPloy() {
  map.graphicLayer.clear()
  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#ffff00",
      opacity: 0.3,
      clampToGround: true
    },
    success: (graphic: mars3d.graphic.PolygonEntity) => drawModelLimitSuccess(graphic.positionsShow)
  })
}

// 绘制矢量数据成功回调函数
function drawModelLimitSuccess(positions: any) {
  limitHeight.positions = positions
  map.graphicLayer.clear()
  // console.log(JSON.stringify(mars3d.PointTrans.cartesians2lonlats(positions))); //可以打印下边界
}

// 限高分析
export function onChangeLimitHeight(val: number) {
  limitHeight.height = val
}
